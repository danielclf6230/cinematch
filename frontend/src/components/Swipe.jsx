import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {swipefunction} from "./swipeUtils";
import SideMenu from "./SideMenu";
import {entitiesApi} from "../api/entitiesApi";
import {imagesApi} from "../api/imagesApi";
import DislikeButton from "./DislikeButton";
import LikeButton from "./LikeButton";
import MaybeButton from "./MaybeButton";
import cardData from "./cardData";

function Swipe() {
    const [cards, setCards] = useState(cardData);
    const [currentCard, setCurrentCard] = useState(0);
    const [likedCards, setLikedCards] = useState([]);
    const [dislikedCards, setDislikedCards] = useState([]);
    const [maybeCards, setMaybeCards] = useState([]);
    const [combinedList, setCombinedList] = useState([]);


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


    const swipe = (direction) => {
        swipefunction(
            direction,
            cards,
            currentCard,
            setCards,
            setLikedCards,
            setDislikedCards
        );
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

    //add currentCard into maybeCards temp list, and add into
    const maybe = () => {
        const updatedMaybe = [...maybeCards, { ...cards[currentCard], score: 3 }];
        //update the MaybeCards list
        setMaybeCards(updatedMaybe);
        //use the index only, if the index not equals the currentCard index, put inprevCards list
        setCards((prevCards) =>
            prevCards.filter((_, index) => index !== currentCard)
        );
    };




    const fetchMovieData = async () => {
        try {
            // Fetch movie data from the MovieList component
            const movieData = await entitiesApi.getMovies();

            // Use Promise.all to fetch all posters concurrently
            const posterPromises = movieData.map(movie => fetchMoviePoster(movie.id));
            const posterDataArray = await Promise.all(posterPromises);

            // Update cardData with the formatted movie data including posters
            const updatedCardData = movieData.map((movie, index) => ({
                id: movie.id,
                image: URL.createObjectURL(new Blob([posterDataArray[index]])),
                title: movie.title, //this allows to print the title after
                rated: movie.rated,
                score: 0,
            }));

            setCards(updatedCardData);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    const fetchMoviePoster = async (movieId) => {
        try {
            // Fetch the movie poster using getMoviePosterById with movieId
            // Return the poster data
            return await imagesApi.getMoviePosterById(movieId);
        } catch (error) {
            console.error('Error fetching movie poster:', error);
            // Return a placeholder or default poster data in case of an error
            // return defaultPosterData;
        }
    };

    const renderMoviesList = (movies) => (
        <div>
            <ul>
                {movies
                    .slice(0, 3)
                    .map((movie,index) => (
                    <li key={index}>
                        <div className="resultPoster">
                            <img
                                src={movie.image}
                                alt={`Card ${movie.id}`}
                            />
                            <div className="movieTitle">
                                <span className="idNumber">#{index + 1}.</span> {movie.title}
                            </div>
                        </div>
                        {/*(Score: {card.score})*/}
                    </li>
                ))}
            </ul>
        </div>
    );

    const sortByType = (a, b) => {
        const typeOrder = { Like: 1, Maybe: 2, Dislike: 3 };
        return typeOrder[a.type] - typeOrder[b.type];
    };

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
                            <img className="posterImage"
                                 src={cards[currentCard].image}
                                 alt={`Card ${cards[currentCard].id}`}
                            />
                            <div className="darkOverlay">
                                <h2>{cards[currentCard].title} / {cards[currentCard].rated}</h2>
                            </div>
                        </div>
                        <div className="swipeButtons row align-self-center">
                            <div className="dis-button col">
                                <DislikeButton
                                    onClick={() => swipe("left")}
                                    text=""
                                    disabled={cards.length === 0}
                                />
                            </div>
                            <div className="may-button col">
                            <MaybeButton
                                onClick={maybe}
                                text=""
                                disabled={cards.length === 0}
                            />
                            </div>
                            <div className="lik-button col">
                            <LikeButton
                                onClick={() => swipe("right")}
                                text=""
                                disabled={cards.length === 0}
                            />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="cm-form result">
                        <h1>Your Top 3!</h1>
                        {renderMoviesList(combinedList.sort(sortByType), 'Combined Movies')}
                    </div>
                )}


            </div>
        </div>
    );
}

export default Swipe;
