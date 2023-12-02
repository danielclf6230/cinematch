import React from "react";
import { FaThumbsDown } from 'react-icons/fa';

/**
 * Functional React component representing a dislike button with an optional text label.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {function} props.onClick - The function to be called when the button is clicked.
 * @param {string} [props.text] - Optional text label for the button.
 * @returns {JSX.Element} JSX representation of the DislikeButton.
 * @example
 * // Example usage within another React component
 * import DislikeButton from './DislikeButton';
 * //...
 * <DislikeButton onClick={handleDislike} text="Dislike" />
 */
const DislikeButton = ({ onClick, text }) =>
    <button className="swipeButton dislike" onClick={onClick} >
        {text}
        <FaThumbsDown className="shrink-icon" />
    </button>;

/**
 * Default export of the DislikeButton component.
 * @exports DislikeButton
 */
export default DislikeButton;
