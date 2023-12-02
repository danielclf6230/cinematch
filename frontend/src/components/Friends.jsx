import React, { useEffect, useState } from 'react';
import { entitiesApi } from '../api/entitiesApi';
import SideMenu from "./SideMenu";
import { AiOutlineSearch } from "react-icons/ai";

/**
 * React functional component for managing friend-related actions, including searching for users,
 * sending friend requests, accepting friend requests, deleting friends, and displaying friend lists.
 *
 * @component
 * @example
 * // Example usage within another React component
 * import Friends from './Friends';
 * //...
 * <Friends />
 */
const Friends = () => {
    /**
     * State to manage the entered username for user search.
     * @type {string}
     */
    const [searchUserName, setSearchUserName] = useState('');

    /**
     * State to store the search result of users.
     * @type {Object[]}
     */
    const [searchResult, setSearchResult] = useState([]);

    /**
     * State to manage errors during user actions.
     * @type {string | null}
     */
    const [error, setError] = useState(null);

    /**
     * State to store the user's friend list.
     * @type {Object[]}
     */
    const [friendList, setFriendList] = useState([]);

    /**
     * State to store the list of friend requests.
     * @type {Object[]}
     */
    const [requestList, setRequestList] = useState([]);

    /**
     * State to indicate whether a friend request has been sent.
     * @type {boolean}
     */
    const [friendRequestSent, setFriendRequestSent] = useState(false);

    /**
     * Resets the search fields and results.
     * @function
     */
    const resetSearch = () => {
        setSearchUserName('');
        setSearchResult([]);
        setError(null);
        setFriendRequestSent(false);
    };

    /**
     * Handles the user search action.
     * Calls the `entitiesApi.getUsersByUsername` method to search for users.
     * Updates the state with the search result or displays an error if no user is found.
     *
     * @async
     * @function
     */
    const handleSearchUser = async () => {
        try {
            resetSearch();

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

    /**
     * Handles accepting a friend request.
     * Calls the `entitiesApi.acceptFriendRequest` method and updates the friend requests list.
     *
     * @async
     * @param {number} requestId - The ID of the friend request to accept.
     * @function
     */
    const handleAcceptFriendRequest = async (requestId) => {
        try {
            await entitiesApi.acceptFriendRequest(requestId);
            console.log('Friend request accepted successfully');
            fetchFriendsData();
            fetchFriendRequest();
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    /**
     * Handles sending a friend request.
     * Calls the `entitiesApi.sendFriendRequest` method and updates the state.
     *
     * @async
     * @param {number} recipientUserId - The ID of the user to send the friend request.
     * @function
     */
    const handleSendFriendRequest = async (recipientUserId) => {
        try {
            await entitiesApi.sendFriendRequest(recipientUserId);
            console.log('Friend request sent successfully');
            setFriendRequestSent(true);
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    /**
     * Handles deleting a friend.
     * Calls the `entitiesApi.removeFriend` method and updates the friend list.
     *
     * @async
     * @param {number} friendUserId - The ID of the friend to be deleted.
     * @function
     */
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

    /**
     * Fetches the user's friend data and updates the friend list state.
     * @async
     * @function
     */
    const fetchFriendsData = async () => {
        try {
            const friendListData = await entitiesApi.getFriends();
            setFriendList(friendListData);
        } catch (error) {
            console.error('Error fetching friend data:', error);
        }
    };

    /**
     * Fetches the user's friend requests and updates the friend requests list state.
     * @async
     * @function
     */
    const fetchFriendRequest = async () => {
        try {
            const friendRequestData = await entitiesApi.getFriendRequests();
            setRequestList(friendRequestData);
        } catch (error) {
            console.error('Error fetching request data:', error);
        }
    };

    /**
     * Effect hook to fetch friend data and friend requests data when the component mounts.
     */
    useEffect(() => {
        fetchFriendsData();
        fetchFriendRequest();
    }, []);

    /**
     * Renders the Friends component.
     *
     * @returns {JSX.Element} JSX representation of the Friends component.
     */
    return (
        <div className="App">
            <SideMenu />
            <div className="row friends">
                <div className="searchBox col-6">
                    <h2>Search User</h2>
                    <div className="friendSearch">
                        <input
                            className="searchInput"
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
                </div>

                <div className="col-6">
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
                    {requestList.length > 0 && (
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
                    )}
                </div>
            </div>
        </div>
    );
}

/**
 * Default export of the Friends component.
 * @exports Friends
 */
export default Friends;
