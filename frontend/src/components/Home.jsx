import React, { useContext } from 'react';
import { useAuth } from '../security/AuthContext';
import UserList from './UserList';
import Avatar from './Avatar';

function Home() {
    const { getUserData } = useAuth(); // Access the user data from the context
    const userData = getUserData();

    //this was just to test
    return (
        <div>
            <h2>User Information</h2>
            <ul>
                <li><Avatar /></li>
                <li><strong>ID:</strong> {userData.userId}</li>
                <li><strong>First Name:</strong> {userData.firstName}</li>
                <li><strong>Last Name:</strong> {userData.lastName}</li>
                <li><strong>Username:</strong> {userData.username}</li>
                <li><strong>Email:</strong> {userData.email}</li>
            </ul>

            <UserList />
        </div>
    );
}

export default Home;
