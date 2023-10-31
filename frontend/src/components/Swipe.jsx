import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ".src/App.css";
import cardData from "./cardData";
import Button from "./Button";
import {swipefunction} from "./swipeUtils";


function Swipe() {
    const [cards, setCards] = useState(cardData);
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

    return (
        <div className="App">
            {cards.length > 0 ? (
                <div
                    className="card-container"
                    draggable
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="card">
                        <img
                            src={cards[currentCard].image}
                            alt={`Card ${cards[currentCard].id}`}
                        />
                    </div>
                </div>
            ) : (
                <p>No more movies to swipe!</p>
            )}

            <div className="buttons">
                <div className="buttons">
                    <Button
                        text="Dislike"
                        disabled={cards.length === 0}
                    />
                    <Button onClick={maybe} text="Maybe" disabled={cards.length === 0} />
                    <Button
                        onClick={() => swipe("right")}
                        text="Like"
                        disabled={cards.length === 0}
                    />
                </div>
            </div>

            {/* <div className="liked-cards">
        <h2>Liked Movies</h2>
        <ul>
          {likedCards.map((likedCard, index) => (
            <li
              key={index}
            >{`Movie ${likedCard.id} (Score:${likedCard.score})`}</li>
          ))}
        </ul>
      </div>
      <div className="maybe-cards">
        <h2>Maybe Movies</h2>
        <ul>
          {maybeCards.map((maybeCard, index) => (
            <li
              key={index}
            >{`Movie ${maybeCard.id} (Score:${maybeCard.score})`}</li>
          ))}
        </ul>
      </div>
      <div className="disliked-cards">
        <h2>Dislike Movies</h2>
        <ul>
          {dislikedCards.map((dislikeCard, index) => (
            <li
              key={index}
            >{`Movie ${dislikeCard.id} (Score:${dislikeCard.score})`}</li>
          ))}
        </ul>
      </div> */}
        </div>
    );
}

export default Swipe;
