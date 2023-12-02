/**
 * Array containing card data objects.
 * Each object represents a card with properties such as id, title, image, and score.
 *
 * @type {Object[]}
 * @property {number} id - The unique identifier for the card.
 * @property {string} title - The title or name associated with the card.
 * @property {string} image - The URL or path to the image associated with the card.
 * @property {number} score - The score or numerical value associated with the card.
 * @example
 * // Example usage
 * const cardData = [
 *   {
 *     id: 0,
 *     title: "Card 1",
 *     image: "path/to/image1.jpg",
 *     score: 10
 *   },
 *   // ... additional card objects
 * ];
 * export default cardData;
 */
const cardData = [
    {
        id: 0,
        title: "",
        image: "",
        score: 0
    },
];

/**
 * Default export of the cardData array.
 * @exports cardData
 */
export default cardData;
