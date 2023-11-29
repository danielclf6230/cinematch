import React from "react";
import { FaThumbsDown } from 'react-icons/fa';

const DislikeButton = ({ onClick, text }) =>
    <button className="swipeButton dislike" onClick={onClick} >
    {text}
        <FaThumbsDown style={{ color: 'blue' }} />
    </button>;

export default DislikeButton;
