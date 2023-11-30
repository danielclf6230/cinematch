import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { swipefunction } from "./swipeUtils";
import SideMenu from "./SideMenu";
import { addFavorites, entitiesApi } from "../api/entitiesApi";
import { imagesApi } from "../api/imagesApi";
import DislikeButton from "./DislikeButton";
import LikeButton from "./LikeButton";
import MaybeButton from "./MaybeButton";
import cardData from "./cardData";
import { HiOutlineInformationCircle } from "react-icons/hi";

function Swipe() {
    const [cards, setCards] = useState(cardData);
    const [currentCard, setCurrentCard] = useState(0);
    const [likedCards, setLikedCards] = useState([]);
    const [dislikedCards, setDislikedCards] = useState([]);
    const [maybeCards, setMaybeCards] = useState([]);
    const [combinedList, setCombinedList] = useState([]);
    const [showDescription, setShowDescription] = useState(false);
    const [totalCards, setTotalCards] = useState(0);
    const [swipeIndex, setSwipeIndex] = useState(0);
    const [swipingComplete, setSwipingComplete] = useState(false); // Track swiping completion

    let startX = 0;

    useEffect(() => {
        // Fetch movie data when the component mounts
        fetchMovieData();
    }, []);

    useEffect(() => {
        // Update the combined list whenever liked, maybe, or disliked cards change
        const updatedCombinedList = [...likedCards, ...maybeCards, ...dislikedCards];
        setCombinedList(updatedCombinedList);
    }, [likedCards, maybeCards, dislikedCards]);

    // useEffect(() => {
    //     // Call handleResult when swiping is complete
    //     if (swipingComplete) {
    //         const movieIds = combinedList
    //             .sort(sortByType)
    //             .slice(0, 3)
    //             .map((movie) => movie.id);
    //         console.log(movieIds);
    //         handleResult(movieIds);
    //     }
    // }, [swipingComplete, combinedList]);

    const swipe = (direction) => {
        swipefunction(
            direction,
            cards,
            currentCard,
            setCards,
            setLikedCards,
            setDislikedCards
        );
        setSwipeIndex((prevIndex) => prevIndex + 1);

        // Check if all swipes are completed
        if (swipeIndex === totalCards - 1) {
            setSwipingComplete(true);
        }
    };

    const handleDragStart = (e) => {
        startX = e.clientX;
    };

    const handleDragEnd = (e) => {
        const dragDirection = e.clientX - startX < 0 ? "left" : "right";
        if (dragDirection === "left") {
            swipe("left");
        } else if (dragDirection === "right") {
            swipe("right");
        }
    };

    const maybe = () => {
        const updatedMaybe = [...maybeCards, { ...cards[currentCard], score: 3 }];
        setMaybeCards(updatedMaybe);
        setCards((prevCards) => prevCards.filter((_, index) => index !== currentCard));
    };

    const fetchMovieData = async () => {
        try {
            const movieData = await entitiesApi.getMovies();
            const posterPromises = movieData.map((movie) => fetchMoviePoster(movie.id));
            const posterDataArray = await Promise.all(posterPromises);

            const updatedCardData = movieData.map((movie, index) => ({
                id: movie.id,
                image: URL.createObjectURL(new Blob([posterDataArray[index]])),
                title: movie.title,
                rated: movie.rated,
                description: movie.description,
            }));

            setCards(updatedCardData);
            setTotalCards(updatedCardData.length); // Set the total number of cards
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    const fetchMoviePoster = async (movieId) => {
        try {
            return await imagesApi.getMoviePosterById(movieId);
        } catch (error) {
            console.error('Error fetching movie poster:', error);
        }
    };

    const renderMoviesList = (movies) => (
        <div>
            <ul className="result-list">
                {movies.slice(0, 3).map((movie, index) => (
                    <li key={index}>
                        <div className="resultPoster">
                            <img src={movie.image} alt={`Card ${movie.id}`} />
                            <div className="movieTitle">
                                <span className="idNumber">#{index + 1}.</span> {movie.title}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    const handleResult = async (moviesId) => {
        try {
            // Call the acceptFriendRequest function from entitiesApi
            await entitiesApi.addFavorites(moviesId);
            // Optionally, you can update the request list or perform any other actions
            console.log('Movie Result Saved');
            // After accepting the request, you may want to refresh the friend requests list
        } catch (error) {
            console.error('Error movie save:', error);
            // Handle the error, e.g., show an error message to the user
        }
    };


    const showInfo = () => {
        setShowDescription(true);
    };

    const hideInfo = () => {
        setShowDescription(false);
    };

    const sortByType = (a, b) => {
        const typeOrder = { Like: 1, Maybe: 2, Dislike: 3 };
        return typeOrder[a.type] - typeOrder[b.type];
    };

    const movieIds = combinedList
        .sort(sortByType)
        .slice(0, 3)
        .map((movie) => movie.id);
    console.log(movieIds);

    return (
        <div className="App">
            <SideMenu />
            <div className="cardArea">
                {cards.length > 0 ? (
                    <div
                        className="card-container"
                        draggable
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="posterContainer">
                            <img
                                className="posterImage"
                                src={cards[currentCard].image}
                                alt={`Card ${cards[currentCard].id}`}
                            />
                            <div className="darkOverlay">
                                <h2>{cards[currentCard].title} | {cards[currentCard].rated}</h2>
                            </div>
                            {showDescription && (
                                <div className="overlay" onClick={hideInfo}>
                                    <div className="descriptionModal">
                                        <h2>{cards[currentCard].title}</h2>
                                        <br/>
                                        <p>{cards[currentCard].description}</p>
                                    </div>
                                </div>
                            )}
                            <div className="darkOverlay2">
                                <p className="counter">{swipeIndex + 1}/{totalCards}</p>
                                <HiOutlineInformationCircle className="info" onClick={showInfo} />
                            </div>
                        </div>
                        <div className="swipeButtons row align-self-center">
                            <div className="dis-button col">
                                <DislikeButton onClick={() => swipe("left")} text="" disabled={cards.length === 0} />
                            </div>
                            <div className="may-button col">
                                <MaybeButton onClick={maybe} text="" disabled={cards.length === 0} />
                            </div>
                            <div className="lik-button col">
                                <LikeButton onClick={() => swipe("right")} text="" disabled={cards.length === 0} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="cm-form result">
                        <h1>Your Top 3!</h1>
                        {renderMoviesList(combinedList.sort(sortByType), 'Combined Movies')}
                        <button onClick={() => handleResult(movieIds)}>
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Swipe;
