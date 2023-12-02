import React from "react";
import { FaThumbsUp } from 'react-icons/fa';

/**
 * React functional component representing a "Like" button with a thumbs-up icon.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.onClick - Function to be executed on button click.
 * @param {string} props.text - Text content for the button.
 * @returns {JSX.Element} - JSX representation of the LikeButton component.
 * @example
 * // Example usage within another React component
 * import LikeButton from './LikeButton';
 * //...
 * <LikeButton onClick={handleLike} text="Like" />
 */
const LikeButton = ({ onClick, text }) => (
    <button className="swipeButton like" onClick={onClick}>
        {text}
        <FaThumbsUp className="shrink-icon" />
    </button>
);

/**
 * Default export of the LikeButton component.
 * @exports LikeButton
 */
export default LikeButton;
