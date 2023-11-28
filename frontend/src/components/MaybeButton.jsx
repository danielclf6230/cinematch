import React from "react";

const MaybeButton = ({ onClick, text }) => <button className="swipeButton maybe" onClick={onClick}>{text}</button>;

export default MaybeButton;
