import React from "react";

/**
 * Functional component representing a swipe button.
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The function to be executed when the button is clicked.
 * @param {string} props.text - The text content of the button.
 * @returns {JSX.Element} - The rendered SwipeButton component.
 * @example
 * // Example usage of SwipeButton component
 * import SwipeButton from './SwipeButton';
 * function MyComponent() {
 *   return (
 *     <SwipeButton onClick={() => handleButtonClick()} text="Dislike" />
 *   );
 * }
 */
const SwipeButton = ({ onClick, text }) => <button className="swipeButton dislike" onClick={onClick}>{text}</button>;

export default SwipeButton;
