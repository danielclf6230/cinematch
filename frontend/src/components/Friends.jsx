// App.js
import React, { useState } from 'react';
import FriendRequestButton from '../components/Friend/FriendRequestButton';
import FriendRequestList from '../components/Friend/FriendRequestList';

const Friends = () => {
    const [friendRequests, setFriendRequests] = useState([]);

    const handleSendRequest = (userId) => {
        // Simulate updating the state with a new friend request
        setFriendRequests([
            ...friendRequests,
            { id: friendRequests.length + 1, senderName: `User ${userId}` },
        ]);
    };

    const handleAcceptRequest = (requestId) => {
        // Simulate accepting a friend request (you would replace this with an API call)
        setFriendRequests(friendRequests.filter((request) => request.id !== requestId));
        // You may want to update your local database here
    };

    return (
        <div>
            <FriendRequestButton userId={1} onSendRequest={handleSendRequest} />
            <FriendRequestList friendRequests={friendRequests} onAcceptRequest={handleAcceptRequest} />
        </div>
    );
};

export default Friends;
