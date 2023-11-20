import React, { useEffect, useState } from 'react';
import cardData from "./cardData";
import { swipefunction } from "./swipeUtils";
import Button from "./Button";

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

    // const renderMoviesList = (movies, title) => (
    //     <div>
    //         <h3>{title}</h3>
    //         <ul>
    //             {movies.map((movie, index) => (
    //                 <li key={index}>
    //                     {`Movie ${movie.id} (Score:${movie.score})`}
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );

    const handleChooseMovie = () => {
        if (likedCards !== null && room !== '') {
            // Signal the server to reset scores
            socket.emit('reset_scores', { room });

            // Pass the likedMovie and the room to server
            socket.emit('choose_movie', { likedCards, dislikedCards, maybeCards, room });
            setWaiting(true);
        }
    };


    useEffect(() => {
        socket.on('match_result', (matchedCardsWithScores) => {
            const resultText = `You got Matched. The movies are: ${matchedCardsWithScores.map(card => `Movie ${card.id} (Score: ${card.score})`).join(', ')}`;
            setResult(resultText);
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
    }, []);

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
                    <div>
                        <p>No more movies to swipe!</p>
                        <button onClick={handleChooseMovie}>Start match</button>
                        {waiting && <p>Waiting for the other user to choose a number.</p>}
                        {result && <p>{result}</p>}
                        {/*{renderMoviesList(likedCards, 'Liked Movies')}*/}
                        {/*{renderMoviesList(maybeCards, 'Maybe Movies')}*/}
                        {/*{renderMoviesList(dislikedCards, 'Disliked Movies')}*/}
                    </div>
                )}
            </div>
        </div>
    );
}

export default GroupSwipe;
