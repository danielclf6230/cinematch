import React, {useEffect, useState} from 'react';
import cardData from "./cardData";
import {swipefunction} from "./swipeUtils";
import Button from "./Button";
import {entitiesApi} from "../api/entitiesApi";
import {imagesApi} from "../api/imagesApi";

function GroupSwipe({ socket, username, room }) {
    const [cards, setCards] = useState(cardData);
    const [currentCard, setCurrentCard] = useState(0);
    const [likedCards, setLikedCards] = useState([]);
    const [dislikedCards, setDislikedCards] = useState([]);
    const [maybeCards, setMaybeCards] = useState([]);
    const [waiting, setWaiting] = useState(false);
    const [result, setResult] = useState('');

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

    const maybe = () => {
        const updatedMaybe = [...maybeCards, { ...cards[currentCard] }];
        setMaybeCards(updatedMaybe);
        setCards((prevCards) =>
            prevCards.filter((_, index) => index !== currentCard)
        );
    };


    const handleChooseMovie = () => {
        if (likedCards !== null && room !== '') {
            // Signal the server to reset scores
            socket.emit('reset_scores', { room });

            // Pass the likedMovie and the room to server
            socket.emit('choose_movie', { likedCards, dislikedCards, maybeCards, room });
            setWaiting(true);
        }
    };

    // const fetchMovieData = async () => {
    //     try {
    //         // Fetch movie data from the MovieList component
    //         const movieData = await entitiesApi.getMovies();
    //
    //         // Use Promise.all to fetch all posters concurrently
    //         const posterPromises = movieData.map(movie => fetchMoviePoster(movie.id));
    //         const posterDataArray = await Promise.all(posterPromises);
    //
    //         // Update cardData with the formatted movie data including posters
    //         const updatedCardData = movieData.map((movie, index) => ({
    //             id: movie.id,
    //             image: URL.createObjectURL(new Blob([posterDataArray[index]])),
    //             title: movie.title, //this allows to print the title after
    //             score: 0,
    //         }));
    //
    //         setCards(updatedCardData);
    //     } catch (error) {
    //         console.error('Error fetching movie data:', error);
    //     }
    // };
    //
    // const fetchMoviePoster = async (movieId) => {
    //     try {
    //         // Fetch the movie poster using getMoviePosterById with movieId
    //         // Return the poster data
    //         return await imagesApi.getMoviePosterById(movieId);
    //     } catch (error) {
    //         console.error('Error fetching movie poster:', error);
    //         // Return a placeholder or default poster data in case of an error
    //         // return defaultPosterData;
    //     }
    // };


    useEffect(() => {

        if (cards.length === 0) {
            handleChooseMovie();
        }

        socket.on('match_result', (matchedCardsWithScores) => {
            console.log(matchedCardsWithScores);
            const formattedResult = matchedCardsWithScores
                .slice(0, 3)
                .map((card, index) => (
                    <li key={index}>
                        <div className="resultPoster">
                            <img
                                src={card.poster}
                                alt={`Card ${card.id}`}
                            />
                            <div className="movieTitle">{card.title}</div>
                        </div>
                        {/*(Score: {card.score})*/}
                    </li>
                ));
            setResult(formattedResult);
            setWaiting(false);
        });

        // socket.on('no_match_result', (choices) => {
        //     setResult(`Sorry, no match found. Your choice: ${numberInput}, Other's choice: ${choices.find(num => num !== parseInt(numberInput))}`);
        //     setWaiting(false);
        // });

        return () => {
            socket.off('match_result');
            // socket.off('no_match_result');
        };
    }, [cards]);

    // useEffect(() => {
    //     // Fetch movie data when the component mounts
    //     fetchMovieData();
    // }, []);


    return (
        <div className="App">
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
                    <div className="cm-form">
                        {waiting && <p>Wait for other users to finish...</p>}
                        {result && <ul className="result-list">{result}</ul>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default GroupSwipe;
