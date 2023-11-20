import React, { useState, useEffect } from 'react';
import { entitiesApi } from '../api/entitiesApi';
import Profile from './Profile'; // Import the Profile component

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        // Initially, fetch all users
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        try {
            const userData = await entitiesApi.getUsers();
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query) => {
        if (query.trim() === '') {
            return;
        }

        try {
            const userData = await entitiesApi.getUsersByUsername(query);
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchQuery(inputValue); // Update the searchQuery state

        if (inputValue.trim() === '') {
            // If the input becomes empty, fetch all users
            fetchAllUsers();
        } else {
            // Otherwise, search for users as the user types
            handleSearch(inputValue);
        }
    };

    const handleOpenProfile = (userId) => {
        // Set the selected user ID to open their profile
        setSelectedUserId(userId);
    };

    const handleCloseProfile = () => {
        // Close the selected user's profile
        setSelectedUserId(null);
    };

    return (
        <div>
            <h2>User List</h2>
            {/*<div>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        placeholder="Search by username"*/}
            {/*        value={searchQuery}*/}
            {/*        onChange={handleInputChange} // Update results as you type*/}
            {/*    />*/}
            {/*</div>*/}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {users.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.userId}>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>
                                        <button
                                            onClick={() => handleOpenProfile(user.userId)}
                                            style={{ background: 'white', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            {user.username}
                                        </button>
                                    </td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
            {selectedUserId !== null && <Profile userId={selectedUserId} onClose={handleCloseProfile} />}
        </div>
    );
}

export default UserList;
