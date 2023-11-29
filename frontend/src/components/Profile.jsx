import React, { useState, useEffect } from 'react';
import { imagesApi } from '../api/imagesApi';
import { entitiesApi } from '../api/entitiesApi';

function Profile({ userId }) {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the user's profile data, including the avatar, when the component mounts
        fetchUserProfile();
    }, [userId]);

    const fetchUserProfile = async () => {
        try {
            // Fetch the user's avatar using getAvatarById
            const avatarData = await imagesApi.getAvatarById(userId);

            // Fetch the user's profile data using getUsersById
            const userData = await entitiesApi.getUsersById(userId);

            // Combine the user data with the avatar data
            setUserProfile({ ...userData, avatar: URL.createObjectURL(new Blob([avatarData])) });
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {userProfile ? (
                        <div className="Profile">
                            <div className="col">
                                <h2>User Profile</h2>
                                <img src={userProfile.avatar} alt="AvatarPreview" />
                            </div>

                            <p>Name: {userProfile.firstName} {userProfile.lastName}</p>
                            <p>Username: {userProfile.username}</p>
                            <p>Email: {userProfile.email}</p>
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
