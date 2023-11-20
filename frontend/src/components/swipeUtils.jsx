export const swipefunction = (
    direction,
    cards,
    currentCard,
    setCards,
    setLikedCards,
    setDislikedCards
) => {
    if (cards.length === 0) {
        return;
    }

    if (direction === "left") {
        const currentDislikedCard = { ...cards[currentCard]};
        setDislikedCards((prevDislikedCards) => [
            //This is a way to make a copy of the previous dislikedCards state array
            ...prevDislikedCards,
            //value that you want to add
            currentDislikedCard,
        ]);
        setCards((prevCards) =>
            prevCards.filter((_, index) => index !== currentCard)
        );
    } else if (direction === "right") {
        const currentLikedCard = { ...cards[currentCard]};
        setLikedCards((prevLikedCards) => [...prevLikedCards, currentLikedCard]);
        setCards((prevCards) =>
            prevCards.filter((_, index) => index !== currentCard)
        );
    }
};
