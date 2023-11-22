// FriendRequestList.js
import React from 'react';

const FriendRequestList = ({ friendRequests, onAcceptRequest }) => {
    return (
        <div>
            <h2>Friend Requests</h2>
            <ul>
                {friendRequests.map((request) => (
                    <li key={request.id}>
                        {request.senderName} wants to be your friend
                        <button onClick={() => onAcceptRequest(request.id)}>
                            Accept
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendRequestList;
