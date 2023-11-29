import React from "react";
import { FaThumbsUp } from 'react-icons/fa';
const LikeButton = ({ onClick, text }) => <button className="swipeButton like" onClick={onClick}>{text}
    <FaThumbsUp className="thumbsUp" /></button>;

export default LikeButton;
