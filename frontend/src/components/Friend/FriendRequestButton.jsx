// FriendRequestButton.js
import React, { useState } from 'react';

const FriendRequestButton = ({ userId, onSendRequest }) => {
    const [isRequestSent, setRequestSent] = useState(false);

    const handleSendRequest = () => {
        // Simulate sending a friend request (you would replace this with an API call)
        setRequestSent(true);
        onSendRequest(userId);
    };

    return (
        <button onClick={handleSendRequest} disabled={isRequestSent}>
            {isRequestSent ? 'Request Sent' : 'Send Friend Request'}
        </button>
    );
};

export default FriendRequestButton;
