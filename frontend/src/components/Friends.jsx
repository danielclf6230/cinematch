// App.js
import React, { useState} from 'react';
import { entitiesApi } from '../api/entitiesApi';
import SideMenu from "./SideMenu";
import {actionsApi} from "../api/actionsApi";

const Friends = () => {
    const [searchUserName, setSearchUserName] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const handleSearchUser = async () => {
        try {
            const response = await entitiesApi.getUsersByUsername(searchUserName);
            console.log(response.data);
            setSearchResult(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <SideMenu/>
            <div>
                <h2>Search User</h2>
            <input
                type="text"
                placeholder="Enter username"
                onChange={(e) => setSearchUserName(e.target.value)}
            />
            <button onClick={handleSearchUser}>Search</button>

                <div>
                    <h2>Friend List</h2>
                    <ul>
                        {searchResult.map((user) => (
                            <li>
                                <p>{`${user.username}`}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default Friends;
