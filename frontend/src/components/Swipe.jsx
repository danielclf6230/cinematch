import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import cardData from "./cardData";
import Button from "./Button";
import { swipefunction } from "./swipeUtils";
import SideMenu from "./SideMenu";
import MovieList from "./MovieList";
import {entitiesApi} from "../api/entitiesApi";
import {getMoviePosterById} from "../api/imagesApi";

function Swipe() {
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState(0);
    const [likedCards, setLikedCards] = useState([]);
    const [dislikedCards, setDislikedCards] = useState([]);
    const [maybeCards, setMaybeCards] = useState([]);

    let startX = 0;

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

    useEffect(() => {
        // Fetch movie data when the component mounts
        fetchMovieData();
    }, []);


    const fetchMovieData = async () => {
        try {
            // Fetch movie data from the MovieList component
            const movieData = await entitiesApi.getMovies(); // Use the actual function or method to fetch data from MovieList

            // Update cardData with the formatted movie data
            const updatedCardData = movieData.map(movie => ({
                id: movie.id,
                image: getMoviePosterById(movie.id),
                score: 0,
            }));

            setCards(updatedCardData);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    const renderMoviesList = (movies, title) => (
        <div>
            <h3>{title}</h3>
            <ul>
                {movies.map((movie, index) => (
                    <li key={index}>
                        {`Movie ${movie.id}`}
                    </li>
                ))}
            </ul>
        </div>
    );

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
                        <div className="card col align-self-center">
                            <img
                                src={cards[currentCard].image}
                                alt={`Card ${cards[currentCard].id}`}
                            />
                        </div>

                        <div className="buttons col align-self-center">
                            <Button
                                onClick={() => swipe("left")}
                                text="Dislike"
                                disabled={cards.length === 0}
                            />
                            <Button
                                onClick={maybe}
                                text="Maybe"
                                disabled={cards.length === 0}
                            />
                            <Button
                                onClick={() => swipe("right")}
                                text="Like"
                                disabled={cards.length === 0}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        {renderMoviesList(likedCards, 'Liked Movies')}
                        {renderMoviesList(maybeCards, 'Maybe Movies')}
                        {renderMoviesList(dislikedCards, 'Disliked Movies')}
                    </div>
                )}


            </div>
        </div>
    );
}

export default Swipe;
