import React, { useEffect, useState } from 'react';
import { entitiesApi } from '../api/entitiesApi';

function Home() {
    const [userInfo, setUserInfo] = useState({});
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await entitiesApi.getUserInfo(user);
                setUserInfo(response);
                console.log(response)
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchData().then(r => console.log(r));
    }, [user]);

    return (
        <div>
            <h2>User Information</h2>
            <ul>
                <li><strong>ID:</strong> {userInfo.id}</li>
                <li><strong>First Name:</strong> {userInfo.firstName}</li>
                <li><strong>Last Name:</strong> {userInfo.lastName}</li>
                <li><strong>Username:</strong> {userInfo.username}</li>
                <li><strong>Email:</strong> {userInfo.email}</li>
            </ul>
        </div>
    );
}

export default Home;
