// App.js
import React, { useState } from 'react';
import {entitiesApi, sendFriendRequest} from '../api/entitiesApi';
import SideMenu from "./SideMenu";

const Friends = () => {
    const [searchUserName, setSearchUserName] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [error, setError] = useState(null);

    const handleSearchUser = async () => {
        try {

            if (!searchUserName) {
                setError('Please enter a username');
                return;
            }
            const userSearch = await entitiesApi.getUsersByUsername(searchUserName);
            console.log(userSearch);
            const updatedUserSearch = userSearch.map((user) => ({
                username: user.username,
                userId: user.userId,
            }));


            if(updatedUserSearch.length===0){
                setError('No user found');
                return;
            }

            setSearchResult(updatedUserSearch); // Ensure searchResult is always an array
            setError(null);

        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while fetching user data');
        }
    };

    const handleSendFriendRequest = async (recipientUserId) => {
        try {
            // Call the sendFriendRequest function from entitiesApi
            await entitiesApi.sendFriendRequest(recipientUserId);
            // Optionally, you can update the search result or perform any other actions
            console.log('Friend request sent successfully');
        } catch (error) {
            console.error('Error sending friend request:', error);
            // Handle the error, e.g., show an error message to the user
        }
    };


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
                            <button onClick={() => handleSendFriendRequest(user.userId)}>
                                Add Friend
                            </button>
                        </li>
                    ))}
                </ul>

                <div>
                    <h2>Friend List</h2>

                </div>
            </div>
        </div>
    );
}

export default Friends;
