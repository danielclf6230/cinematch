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
    const [swipingComplete, setSwipingComplete] = useState(false);
    // const [topThree, setTopThree] = useState([]);
    // const [fetchResultComplete, setFetchResultComplete] = useState(false);
    // const [reset, setReset] = useState(false);

    let startX = 0;

    useEffect(() => {
        // Fetch movie data when the component mounts
        fetchMovieData();
    }, []);



    useEffect(() => {
        // Update the combined list whenever liked, maybe, or disliked cards change
        const updatedCombinedList = [...likedCards, ...maybeCards, ...dislikedCards];
        console.log("Updated Combined List:", updatedCombinedList);
        setCombinedList(updatedCombinedList);
    }, [likedCards, maybeCards, dislikedCards]);


    useEffect(() => {
        // Call handleResult when swiping is complete
        if (swipingComplete) {
            const movieIds = combinedList
                .sort(sortByScoreAndYear)
                .slice(0, 3)
                .map((movie) => movie.id);
            console.log(movieIds);
        }
    }, [swipingComplete, combinedList]);

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
        setSwipeIndex((prevIndex) => prevIndex + 1);
        if (swipeIndex === totalCards - 1) {
            setSwipingComplete(true);
        }

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
                year: movie.year,
            }));

            setCards(updatedCardData);
            setTotalCards(updatedCardData.length);
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
                {Array.isArray(movies) && movies
                    .slice(0, 3)
                    .map((movie, index) => (
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


    // const handleResult = async (moviesId) => {
    //     try {
    //         await entitiesApi.addFavorites(moviesId);
    //         console.log('Movie Result Saved');
    //     } catch (error) {
    //         console.error('Error movie save:', error);
    //     }
    // };

    // const fetchResult = async () => {
    //     try {
    //         const FavouriteListData = await entitiesApi.getFavourites();
    //         if (FavouriteListData.data.length === 0) {
    //             setFetchResultComplete(false);
    //         } else {
    //             setFetchResultComplete(true);
    //             setTopThree(FavouriteListData);
    //         }
    //     } catch (error) {
    //         setFetchResultComplete(false);
    //         console.error('Error fetching Favourite List:', error);
    //     }
    // };

    const showInfo = () => {
        setShowDescription(true);
    };

    const hideInfo = () => {
        setShowDescription(false);
    };

    const sortByScoreAndYear = (a, b) => {
        // If types are equal, compare by score
        const scoreComparison = b.score - a.score; // Sorting in descending order by score
        // If scores are equal, compare by year
        if (scoreComparison === 0) {
            return b.year - a.year;
        }

        return scoreComparison;
    };


    //
    // const handleReset = () => {
    //     setLikedCards([]);
    //     setDislikedCards([]);
    //     setMaybeCards([]);
    //     setCombinedList([]);
    //     setSwipeIndex(0);
    //     setSwipingComplete(false);
    //     setFetchResultComplete(false);
    //     setReset(true);
    //     setCurrentCard(0);
    // };

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
                            {renderMoviesList(combinedList.sort(sortByScoreAndYear))}
                            {/*<div className="reset-button">*/}
                            {/*    <button onClick={handleReset}>Reset</button>*/}
                            {/*</div>*/}
                        </div>
                    )}
                </div>
        </div>
    );
}

export default Swipe;
