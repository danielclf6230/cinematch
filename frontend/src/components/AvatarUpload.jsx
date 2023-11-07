import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { imagesApi } from '../api/imagesApi';



function AvatarUpload() {
    const [src, setSrc] = useState(null);
    const [file, setFile] = useState(null);
    const imageRef = useRef(null);

    const handleFileChange = (e) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => setSrc(reader.result));
        reader.readAsDataURL(e.target.files[0]);
        setFile(e.target.files[0]);
    };


    const handleImageLoaded = (image) => {
        imageRef.current = image;
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

            try {
                await imagesApi.uploadAvatar(formData);
                console.log('Avatar uploaded successfully');
            } catch (error) {
                console.error('Error uploading avatar:', error);
            }

    };

        return (
            <div>
                <h2>Avatar Upload</h2>
                <input type="file" onChange={handleFileChange} accept=".jpg, .jpeg, .png, .gif, .bmp, .svg, .webp" />
                {src && (
                    <>
                        <img src={src} ref={imageRef} alt="Selected Image" />
                        <button onClick={handleUpload}>Upload Image</button>
                    </>
                )}
            </div>
        );

}

export default AvatarUpload;
