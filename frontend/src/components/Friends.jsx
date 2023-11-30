// App.js
import React, {useEffect, useState} from 'react';
import {entitiesApi} from '../api/entitiesApi';
import SideMenu from "./SideMenu";
import {AiOutlineSearch} from "react-icons/ai";

const Friends = () => {
    const [searchUserName, setSearchUserName] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [error, setError] = useState(null);
    const [friendList, setFriendList]= useState([]);
    const [requestList, setRequestList]= useState([]);
    const [friendRequestSent, setFriendRequestSent] = useState(false);

    const resetSearch = () => {
        setSearchUserName('');
        setSearchResult([]);
        setError(null);
        setFriendRequestSent(false);
    };

    const handleSearchUser = async () => {
        try {
            resetSearch(); // Reset the search fields and results

            if (!searchUserName) {
                setError('Please enter a username');
                return;
            }

            const userSearch = await entitiesApi.getUsersByUsername(searchUserName);
            const updatedUserSearch = userSearch.map((user) => ({
                username: user.username,
                userId: user.userId,
            }));

            if (updatedUserSearch.length === 0) {
                setError('No user found');
                return;
            }

            setSearchResult(updatedUserSearch);
            setError(null);

        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while fetching user data');
        }
    };

    // const handleSearchUser = async () => {
    //     try {
    //         if (!searchUserName) {
    //             setError('Please enter a username');
    //             return;
    //         }
    //
    //         // Reset the friendRequestSent state when initiating a new search
    //         setFriendRequestSent(false);
    //
    //         const userSearch = await entitiesApi.getUsersByUsername(searchUserName);
    //         console.log(userSearch);
    //         const updatedUserSearch = userSearch.map((user) => ({
    //             username: user.username,
    //             userId: user.userId,
    //         }));
    //
    //         if (updatedUserSearch.length === 0) {
    //             setError('No user found');
    //             return;
    //         }
    //
    //         setSearchResult(updatedUserSearch); // Ensure searchResult is always an array
    //         setError(null);
    //
    //     } catch (error) {
    //         console.error('Error:', error);
    //         setError('An error occurred while fetching user data');
    //     }
    // };

    const handleAcceptFriendRequest = async (requestId) => {
        try {
            // Call the acceptFriendRequest function from entitiesApi
            await entitiesApi.acceptFriendRequest(requestId);
            // Optionally, you can update the request list or perform any other actions
            console.log('Friend request accepted successfully');
            // After accepting the request, you may want to refresh the friend requests list
            fetchFriendsData();
            fetchFriendRequest();
        } catch (error) {
            console.error('Error accepting friend request:', error);
            // Handle the error, e.g., show an error message to the user
        }
    };


    const handleSendFriendRequest = async (recipientUserId) => {
        try {
            // Call the sendFriendRequest function from entitiesApi
            await entitiesApi.sendFriendRequest(recipientUserId);
            // Optionally, you can update the search result or perform any other actions
            console.log('Friend request sent successfully');
            setFriendRequestSent(true); // Update state to indicate the request has been sent
        } catch (error) {
            console.error('Error sending friend request:', error);
            // Handle the error, e.g., show an error message to the user
        }
    };

    const handleDeleteFriend = async (friendUserId) => {
        try {
            await entitiesApi.removeFriend(friendUserId);
            fetchFriendsData();
            console.log('Friend Deleted');
        } catch (error) {
            console.error('Error deleting friend:', error);
            setError('Error deleting friend');
        }
    };


    useEffect(() => {
        fetchFriendsData();
        fetchFriendRequest();
    }, []);

    const fetchFriendsData = async () => {
        try {
            const friendListData = await entitiesApi.getFriends();
            setFriendList(friendListData);
        } catch (error) {
            console.error('Error fetching friend data:', error);
        }
    };


    const fetchFriendRequest = async () => {
        try {
            const friendRequestData = await entitiesApi.getFriendRequests();
            setRequestList(friendRequestData);
        } catch (error) {
            console.error('Error fetching request data:', error);
        }
    };

    return (
        <div className="App">
            <SideMenu />
            <div className="friends">

                <h2>Search User</h2>
                <div className="friendSearch">
                    <input className="searchInput"
                           type="text"
                           placeholder="Enter username"
                           value={searchUserName}
                           onChange={(e) => setSearchUserName(e.target.value)}
                    />
                    <button className="searchButton" onClick={handleSearchUser}>
                        <AiOutlineSearch />
                    </button>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <ul>
                    {searchResult.map((user) => (
                        <li key={user.userId}>
                            <br />
                            {user.username}{' '}
                            {friendList.some((friend) => friend.userId === user.userId) ? (
                                <span>Already a Friend</span>
                            ) : (
                                friendRequestSent ? (
                                    <span>Friend Request Sent</span>
                                ) : (
                                    <button onClick={() => handleSendFriendRequest(user.userId)}>
                                        Add Friend
                                    </button>
                                )
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
}

export default Friends;
