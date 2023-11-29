import React from "react";
import { FaMehRollingEyes } from 'react-icons/fa';
const MaybeButton = ({ onClick, text }) =>
    <button className="swipeButton maybe" onClick={onClick}>
        {text}
    <FaMehRollingEyes  className="shrink-icon"/>
    </button>;

export default MaybeButton;
