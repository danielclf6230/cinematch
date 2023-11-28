import React from "react";

const LikeButton = ({ onClick, text }) => <button className="swipeButton like" onClick={onClick}>{text}</button>;

export default LikeButton;
