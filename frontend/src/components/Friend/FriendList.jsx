import React from 'react';

const FriendList = ({ friendList }) => {
    return (
        <div>
            <h2>Friend List</h2>
            <ul>
                {friendList.map((friend) => (
                    <li key={friend.id}>{friend.id}</li>
                ))}
            </ul>
        </div>
    );
};

export default FriendList;
