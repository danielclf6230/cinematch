// App.js
import React, { useState, useEffect } from 'react';
import FriendRequests from '../components/Friend/FriendRequests';
import FriendList from '../components/Friend/FriendList';
import {io} from "socket.io-client";


const socket = new io('http://localhost:3001');

const Friends = () => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [searchUserId, setSearchUserId] = useState('');

    const handleSearch = () => {
        // Perform the search based on searchUserId
        // For simplicity, assume the user with the entered Socket ID exists
        sendFriendRequest(searchUserId);
    };


    useEffect(() => {
        // Listen for friend requests
        socket.on('friendRequest', (request) => {
            setFriendRequests((prevRequests) => [...prevRequests, request]);
        });

        // Listen for accepted friend requests
        socket.on('friendRequestAccepted', (friend) => {
            setFriendList((prevList) => [...prevList, friend]);
            setFriendRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== friend.id)
            );
        });

        return () => {
            // Disconnect socket on component unmount
            socket.disconnect();
        };
    }, []);

    const sendFriendRequest = (friendId) => {
        const request = { id: friendId, status: 'pending' };
        socket.emit('sendFriendRequest', request);
        setFriendRequests([...friendRequests, request]);
    };

    const acceptFriendRequest = (request) => {
        socket.emit('acceptFriendRequest', request);
        setFriendList([...friendList, request]);
        setFriendRequests((prevRequests) =>
            prevRequests.filter((r) => r.id !== request.id)
        );
    };

    const rejectFriendRequest = (request) => {
        socket.emit('rejectFriendRequest', request);
        setFriendRequests((prevRequests) =>
            prevRequests.filter((r) => r.id !== request.id)
        );
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter User 2 Socket ID"
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
            />
            <button onClick={handleSearch}>Send Friend Request</button>

            <FriendRequests
                friendRequests={friendRequests}
                onAccept={acceptFriendRequest}
                onReject={rejectFriendRequest}
            />
            <FriendList friendList={friendList} />
        </div>
    );
}

export default Friends;
