import React from "react";
import { FaHands } from "react-icons/fa";

/**
 * Functional component representing a "Maybe" button with an icon.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 * @param {string} props.text - The text content of the button.
 * @returns {JSX.Element} - The rendered MaybeButton component.
 */
const MaybeButton = ({ onClick, text }) =>
    <button className="swipeButton maybe" onClick={onClick}>
        {text}
        <FaHands className="shrink-icon" />
    </button>;

export default MaybeButton;
