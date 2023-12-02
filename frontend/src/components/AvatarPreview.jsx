import React, { useState, useEffect } from 'react';
import { imagesApi } from '../api/imagesApi';

/**
 * React functional component for displaying an avatar preview.
 *
 * @component
 * @example
 * // Usage within another React component
 * import AvatarPreview from './AvatarPreview';
 * //...
 * <AvatarPreview />
 */
function AvatarPreview() {
    /**
     * State to manage the avatar image URL.
     * @type {string | null}
     */
    const [avatar, setAvatar] = useState(null);

    /**
     * Effect to fetch the avatar data when the component mounts.
     * @effect
     */
    useEffect(() => {
        // Fetch the avatar when the component mounts
        fetchAvatar();
    }, []);

    /**
     * Asynchronously fetches the avatar data from the imagesApi.
     * Creates a Blob from the data and updates the avatar state with the generated URL.
     * Handles errors by logging them to the console.
     *
     * @async
     * @function
     * @throws {Error} If there is an error fetching the avatar data.
     */
    const fetchAvatar = async () => {
        try {
            const avatarData = await imagesApi.getAvatar();
            const avatarUrl = URL.createObjectURL(new Blob([avatarData]));
            setAvatar(avatarUrl);
        } catch (error) {
            console.error('Error fetching avatar:', error);
        }
    };

    /**
     * Renders the AvatarPreview component.
     *
     * @returns {JSX.Element} JSX representation of the component.
     */
    return (
        <div className="Avatar">
            {avatar ? (
                <img src={avatar} alt="AvatarPreview" />
            ) : (
                <p>No avatar available</p>
            )}
        </div>
    );
}

/**
 * Default export of the AvatarPreview component.
 * @exports AvatarPreview
 */
export default AvatarPreview;
