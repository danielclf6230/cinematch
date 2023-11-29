import React from "react";
import { FaMehRollingEyes } from 'react-icons/fa';
import { FaHandMiddleFinger } from "react-icons/fa";
import { FaHands } from "react-icons/fa";

const MaybeButton = ({ onClick, text }) =>
    <button className="swipeButton maybe" onClick={onClick}>
        {text}
        <FaHands  className="shrink-icon"/>
    </button>;

export default MaybeButton;
