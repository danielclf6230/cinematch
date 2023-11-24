import React from 'react';

const FriendRequests = ({ friendRequests, onAccept, onReject }) => {
    return (
        <div>
            <h2>Friend Requests</h2>
            <ul>
                {friendRequests.map((request) => (
                    <li key={request.id}>
                        {request.id} wants to be your friend
                        <button onClick={() => onAccept(request)}>Accept</button>
                        <button onClick={() => onReject(request)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendRequests;
