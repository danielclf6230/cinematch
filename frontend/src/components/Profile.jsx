import React, { useState, useEffect } from 'react';
import { imagesApi } from '../api/imagesApi';
import { entitiesApi } from '../api/entitiesApi';

/**
 * React component for displaying a user profile, including avatar and user details.
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.userId - The unique identifier of the user.
 * @example
 * // Example usage of Profile component
 * import Profile from './Profile';
 * function UserProfile({ userId }) {
 *   return (
 *     <div>
 *       <h2>User Profile Page</h2>
 *       <Profile userId={userId} />
 *     </div>
 *   );
 * }
 */
function Profile({ userId }) {
    /**
     * State hook to store the user profile data.
     * @type {Object | null}
     */
    const [userProfile, setUserProfile] = useState(null);

    /**
     * State hook to track the loading status of the profile.
     * @type {boolean}
     */
    const [loading, setLoading] = useState(true);

    /**
     * Effect hook to fetch the user's profile data, including the avatar, when the component mounts or when userId changes.
     */
    useEffect(() => {
        fetchUserProfile();
    }, [userId]);

    /**
     * Asynchronous function to fetch the user's profile data.
     * @async
     * @function
     * @returns {Promise<void>}
     */
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

    /**
     * Render the Profile component.
     * @returns {JSX.Element}
     */
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
