// Friends.jsx
import React, { useEffect, useState } from 'react';
import { entitiesApi } from '../api/entitiesApi';
import SideMenu from "./SideMenu";

const Friends = () => {
    const [searchUserName, setSearchUserName] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [error, setError] = useState(null);
    const [friendList, setFriendList] = useState([]);
    const [requestList, setRequestList] = useState([]);

    const handleSearchUser = async () => {
        try {
            if (!searchUserName) {
                setError('Please enter a username');
                return;
            }

            const userSearch = await entitiesApi.getUsersByUsername(searchUserName);

            if (userSearch.length === 0) {
                setError('No user found');
                return;
            }

            setSearchResult(userSearch);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while fetching user data');
        }
    };

    const handleAcceptFriendRequest = async (requestId) => {
        try {
            await entitiesApi.acceptFriendRequest(requestId);
            // Refresh friend data after accepting the request
            fetchFriendsData();
            fetchFriendRequest();
            console.log('Friend request accepted successfully');
        } catch (error) {
            console.error('Error accepting friend request:', error);
            setError('Error accepting friend request');
        }
    };

    const handleSendFriendRequest = async (recipientUserId) => {
        try {
            await entitiesApi.sendFriendRequest(recipientUserId);
            console.log('Friend request sent successfully');
            // Optionally, you can update the search result or perform any other actions
        } catch (error) {
            console.error('Error sending friend request:', error);
            setError('Error sending friend request');
        }
    };

    const handleCancelFriendRequest = async (recipientUserId) => {
        try {
            await entitiesApi.removeFriendRequest(recipientUserId);
            // Refresh friend requests after canceling the request
            fetchFriendRequest();
            console.log('Friend Request Canceled');
        } catch (error) {
            console.error('Error canceling friend request:', error);
            setError('Error canceling friend request');
        }
    };

    const handleDeleteFriend = async (friendUserId) => {
        try {
            await entitiesApi.removeFriend(friendUserId);
            // Refresh friend list after deleting a friend
            fetchFriendsData();
            console.log('Friend Deleted');
        } catch (error) {
            console.error('Error deleting friend:', error);
            setError('Error deleting friend');
        }
    };

    const fetchFriendsData = async () => {
        try {
            const friendListData = await entitiesApi.getFriends();
            setFriendList(friendListData);
        } catch (error) {
            console.error('Error fetching friend data:', error);
            setError('Error fetching friend data');
        }
    };

    const fetchFriendRequest = async () => {
        try {
            const friendRequestData = await entitiesApi.getFriendRequests();
            setRequestList(friendRequestData);
        } catch (error) {
            console.error('Error fetching request data:', error);
            setError('Error fetching friend request data');
        }
    };

    const isFriend = (user) => {
        return friendList.some((friend) => friend.userId === user.userId);
    };

    const isFriendRequestSent = (user) => {
        return requestList.some((request) => request.requester.userId === user.userId);
    };

    useEffect(() => {
        fetchFriendsData();
        fetchFriendRequest();
    }, []);

    return (
        <div className="App">
            <SideMenu />
            <div>
                <h2>Search User</h2>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={searchUserName}
                    onChange={(e) => setSearchUserName(e.target.value)}
                />
                <button onClick={handleSearchUser}>Search</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <ul>
                    {searchResult.map((user) => (
                        <li key={user.userId}>
                            {user.username}{' '}
                            {isFriend(user) ? (
                                'Already friends'
                            ) : isFriendRequestSent(user) ? (
                                <>
                                    <button onClick={() => handleCancelFriendRequest(user.userId)} disabled>
                                        Friend Request Sent
                                    </button>
                                    <button onClick={() => handleCancelFriendRequest(user.userId)}>
                                        Cancel Request
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => handleSendFriendRequest(user.userId)}>
                                    Add Friend
                                </button>
                            )}
                        </li>
                    ))}
                </ul>

                <div>
                    <h2>Friend List</h2>
                    <ul>
                        {friendList.map((friend) => (
                            <li key={friend.userId}>
                                {friend.username}
                                <button onClick={() => handleDeleteFriend(friend.userId)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2>Friend Request</h2>
                    <ul>
                        {requestList.map((request) => (
                            <li key={request.requestId}>
                                {request.requester && (
                                    <>
                                        {request.requester.username} wants to be your friend
                                        {request.requestStatus === 'PENDING' && (
                                            <button onClick={() => handleAcceptFriendRequest(request.requestId)}>
                                                Accept
                                            </button>
                                        )}
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Friends;
