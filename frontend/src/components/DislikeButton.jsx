import React from "react";

const DislikeButton = ({ onClick, text }) => <button className="swipeButton dislike" onClick={onClick}>{text}</button>;

export default DislikeButton;
