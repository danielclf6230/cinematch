import React, { useState, useEffect } from 'react';
import { imagesApi } from '../api/imagesApi';
import {entitiesApi} from "../api/entitiesApi";

function Profile({ userId }) {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the user's profile data, including the avatar, when the component mounts
        fetchUserProfile();
    }, [userId]);

    const fetchUserProfile = async () => {
        try {
            // Fetch the user's profile data
            const userData = await fetchUserData(userId);
            setUserProfile(userData);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async (userId) => {
        try {
            // Use the getAvatarById function from imagesApi to fetch the user's avatar
            const avatarData = await imagesApi.getAvatarById(userId);

            // Use your API function to fetch the remaining user data
            const userData = await entitiesApi.get(`/api/users/${userId}`);

            // Combine the user data with the avatar data
            return { ...userData, avatar: URL.createObjectURL(new Blob([avatarData])) };
        } catch (error) {
            throw new Error('Error fetching user data: ' + error);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {userProfile ? (
                        <div>
                            <h2>User Profile</h2>
                            <img src={userProfile.avatar} alt="Avatar" />
                            <p>Name: {userProfile.firstName} {userProfile.lastName}</p>
                            <p>Username: {userProfile.username}</p>
                            <p>Email: {userProfile.email}</p>
                            {/* Add more user profile information as needed */}
                        </div>
                    ) : (
                        <p>No user profile available</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Profile;
