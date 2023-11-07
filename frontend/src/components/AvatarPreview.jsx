import React, { useState, useEffect } from 'react';
import { imagesApi } from '../api/imagesApi';

function AvatarPreview() {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        // Fetch the avatar when the component mounts
        fetchAvatar();
    }, []);

    const fetchAvatar = async () => {
        try {
            const avatarData = await imagesApi.getAvatar();
            const avatarUrl = URL.createObjectURL(new Blob([avatarData]));
            setAvatar(avatarUrl);
        } catch (error) {
            console.error('Error fetching avatar:', error);
        }
    };

    return (
        <div>
            {avatar ? (
                <img src={avatar} alt="AvatarPreview" />
            ) : (
                <p>No avatar available</p>
            )}
        </div>
    );
}

export default AvatarPreview;
