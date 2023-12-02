import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { imagesApi } from '../api/imagesApi';

/**
 * React functional component for uploading and cropping an avatar image.
 *
 * @component
 * @example
 * // Usage within another React component
 * import AvatarUpload from './AvatarUpload';
 * //...
 * <AvatarUpload />
 */
function AvatarUpload() {
    /**
     * State to manage the source URL of the selected image.
     * @type {string | null}
     */
    const [src, setSrc] = useState(null);

    /**
     * State to manage the selected file.
     * @type {File | null}
     */
    const [file, setFile] = useState(null);

    /**
     * Reference to the image element for cropping.
     * @type {React.MutableRefObject<HTMLImageElement | null>}
     */
    const imageRef = useRef(null);

    /**
     * Handles the change event when a file is selected.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
     * @function
     */
    const handleFileChange = (e) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => setSrc(reader.result));
        reader.readAsDataURL(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    /**
     * Handles the image load event and sets the imageRef.
     *
     * @param {HTMLImageElement} image - The loaded image element.
     * @function
     */
    const handleImageLoaded = (image) => {
        imageRef.current = image;
    };

    /**
     * Handles the upload of the selected avatar image.
     * Uses FormData to append the file and calls the `imagesApi.uploadAvatar` method.
     * Reloads the window after successful upload.
     *
     * @async
     * @function
     * @throws {Error} If there is an error uploading the avatar.
     */
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            await imagesApi.uploadAvatar(formData);
            console.log('Avatar uploaded successfully');
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
        window.location.reload();
    };

    /**
     * Renders the AvatarUpload component.
     *
     * @returns {JSX.Element} JSX representation of the component.
     */
    return (
        <div className="avatarUpload">
            <br />
            <label className="uploadButton">
                Upload Image
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png, .gif, .bmp, .svg, .webp"
                    style={{ display: 'none' }}
                />
            </label>
            {src && (
                <>
                    <img className="Avatar" src={src} ref={imageRef} alt="Selected Image" />
                    <button className="separateButton" onClick={handleUpload}>
                        Confirm
                    </button>
                </>
            )}
        </div>
    );
}

/**
 * Default export of the AvatarUpload component.
 * @exports AvatarUpload
 */
export default AvatarUpload;
