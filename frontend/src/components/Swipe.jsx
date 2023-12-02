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

/**
 * React component for the Swipe feature, allowing users to swipe through movie cards.
 * @component
 * @example
 * // Example usage of Swipe component
 * import Swipe from './Swipe';
 * function App() {
 *   return (
 *     <div>
 *       <Swipe />
 *     </div>
 *   );
 * }
 */
function Swipe() {
    /**
     * State to manage the movie cards.
     * @type {Object[]}
     */
    const [cards, setCards] = useState(cardData);

    /**
     * State to track the current card being displayed.
     * @type {number}
     */
    const [currentCard, setCurrentCard] = useState(0);

    /**
     * State to store liked movie cards.
     * @type {Object[]}
     */
    const [likedCards, setLikedCards] = useState([]);

    /**
     * State to store disliked movie cards.
     * @type {Object[]}
     */
    const [dislikedCards, setDislikedCards] = useState([]);

    /**
     * State to store maybe movie cards.
     * @type {Object[]}
     */
    const [maybeCards, setMaybeCards] = useState([]);

    /**
     * State to store the combined list of liked, disliked, and maybe cards.
     * @type {Object[]}
     */
    const [combinedList, setCombinedList] = useState([]);

    /**
     * State to control whether to show movie descriptions.
     * @type {boolean}
     */
    const [showDescription, setShowDescription] = useState(false);

    /**
     * State to store the total number of movie cards.
     * @type {number}
     */
    const [totalCards, setTotalCards] = useState(0);

    /**
     * State to track the index of the current swipe.
     * @type {number}
     */
    const [swipeIndex, setSwipeIndex] = useState(0);

    /**
     * State to indicate whether swiping is complete.
     * @type {boolean}
     */
    const [swipingComplete, setSwipingComplete] = useState(false);

    // Other state variables that are commented out, as they are not used in the current code.

    /**
     * Variable to store the initial X coordinate during drag.
     * @type {number}
     */
    let startX = 0;

    /**
     * Effect to fetch movie data when the component mounts.
     */
    useEffect(() => {
        fetchMovieData();
    }, []);

    /**
     * Effect to update the combined list whenever liked, maybe, or disliked cards change.
     */
    useEffect(() => {
        const updatedCombinedList = [...likedCards, ...maybeCards, ...dislikedCards];
        setCombinedList(updatedCombinedList);
    }, [likedCards, maybeCards, dislikedCards]);

    /**
     * Effect to handle the result when swiping is complete.
     */
    useEffect(() => {
        if (swipingComplete) {
            const movieIds = combinedList
                .sort(sortByScoreAndYear)
                .slice(0, 3)
                .map((movie) => movie.id);
            console.log(movieIds);
        }
    }, [swipingComplete, combinedList]);

    /**
     * Function to handle swiping in a specified direction.
     * @param {string} direction - The direction of the swipe (either "left" or "right").
     */
    const swipe = (direction) => {
        swipefunction(direction, cards, currentCard, setCards, setLikedCards, setDislikedCards);
        setSwipeIndex((prevIndex) => prevIndex + 1);
        if (swipeIndex === totalCards - 1) {
            setSwipingComplete(true);
        }
    };

    /**
     * Function to handle the start of a drag event.
     * @param {object} e - The drag event object.
     */
    const handleDragStart = (e) => {
        startX = e.clientX;
    };

    /**
     * Function to handle the end of a drag event and determine the swipe direction.
     * @param {object} e - The drag event object.
     */
    const handleDragEnd = (e) => {
        const dragDirection = e.clientX - startX < 0 ? "left" : "right";
        if (dragDirection === "left") {
            swipe("left");
        } else if (dragDirection === "right") {
            swipe("right");
        }
    };

    /**
     * Function to handle moving a movie to the "Maybe" list.
     */
    const maybe = () => {
        const updatedMaybe = [...maybeCards, { ...cards[currentCard], score: 3 }];
        setMaybeCards(updatedMaybe);
        setCards((prevCards) => prevCards.filter((_, index) => index !== currentCard));
        setSwipeIndex((prevIndex) => prevIndex + 1);
        if (swipeIndex === totalCards - 1) {
            setSwipingComplete(true);
        }
    };

    /**
     * Function to fetch movie data from the API.
     */
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

    /**
     * Function to fetch a movie's poster image from the API.
     * @param {number} movieId - The ID of the movie.
     * @returns {Promise<Blob>} - A promise that resolves to the poster image data.
     */
    const fetchMoviePoster = async (movieId) => {
        try {
            return await imagesApi.getMoviePosterById(movieId);
        } catch (error) {
            console.error('Error fetching movie poster:', error);
        }
    };

    /**
     * Function to render the list of movies.
     * @param {Object[]} movies - The list of movies to render.
     * @returns {JSX.Element} - The rendered movie list.
     */
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

    /**
     * Function to show the movie description overlay.
     */
    const showInfo = () => {
        setShowDescription(true);
    };

    /**
     * Function to hide the movie description overlay.
     */
    const hideInfo = () => {
        setShowDescription(false);
    };

    /**
     * Function to sort movies by score and year.
     * @param {Object} a - The first movie object.
     * @param {Object} b - The second movie object.
     * @returns {number} - The comparison result.
     */
    const sortByScoreAndYear = (a, b) => {
        const scoreComparison = b.score - a.score;
        if (scoreComparison === 0) {
            return b.year - a.year;
        }
        return scoreComparison;
    };

    // Uncomment the following section if you decide to use the commented-out state variables.

    // /**
    //  * Function to handle resetting the component state.
    //  */
    // const handleReset = () => {
    //   setLikedCards([]);
    //   setDislikedCards([]);
    //   setMaybeCards([]);
    //   setCombinedList([]);
    //   setSwipeIndex(0);
    //   setSwipingComplete(false);
    //   setCurrentCard(0);
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
