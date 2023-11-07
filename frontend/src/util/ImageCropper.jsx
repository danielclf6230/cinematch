
//Tried to make an image cropper utility class but idk
import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({ src }) => {
    const [crop, setCrop] = useState({ aspect: 1 });

    const onCropChange = (newCrop) => {
        setCrop(newCrop);
    };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels);
    };

    const getCropDimensions = (width, height) => {
        if (width > height) {
            return { width: 300, height: Math.min(300, height) };
        } else {
            return { width: Math.min(300, width), height: 300 };
        }
    };

    const onImageLoaded = (image) => {
        const { width, height } = image;
        const cropDimensions = getCropDimensions(width, height);
        setCrop({
            unit: 'px',
            width: cropDimensions.width,
            height: cropDimensions.height,
            aspect: cropDimensions.width / cropDimensions.height,
        });
    };

    return (
        <ReactCrop
            src={src}
            crop={crop}
            onChange={onCropChange}
            onComplete={onCropComplete}
            onImageLoaded={onImageLoaded}
        />
    );
};

export default ImageCropper;
