/**
 * Function to handle swiping action and update card lists accordingly.
 *
 * @param {string} direction - The direction of the swipe ("left" or "right").
 * @param {Object[]} cards - The array of card objects.
 * @param {number} currentCard - The index of the current card in the cards array.
 * @param {Function} setCards - The state update function for the cards array.
 * @param {Function} setLikedCards - The state update function for the liked cards array.
 * @param {Function} setDislikedCards - The state update function for the disliked cards array.
 * @returns {void}
 *
 * @example
 * // Example usage of swipefunction
 * swipefunction("left", cards, currentCard, setCards, setLikedCards, setDislikedCards);
 */
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
        const currentDislikedCard = { ...cards[currentCard], score: 0};
        setDislikedCards((prevDislikedCards) => [
            ...prevDislikedCards,
            currentDislikedCard,
        ]);
        setCards((prevCards) =>
            prevCards.filter((_, index) => index !== currentCard)
        );
    } else if (direction === "right") {
        const currentLikedCard = { ...cards[currentCard], score: 5};
        setLikedCards((prevLikedCards) => [...prevLikedCards, currentLikedCard]);
        setCards((prevCards) =>
            prevCards.filter((_, index) => index !== currentCard)
        );
    }
};
