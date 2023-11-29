import React from "react";
import { FaThumbsUp } from 'react-icons/fa';
const LikeButton = ({ onClick, text }) => <button className="swipeButton like" onClick={onClick}>{text}
    <FaThumbsUp className="shrink-icon" /></button>;

export default LikeButton;
