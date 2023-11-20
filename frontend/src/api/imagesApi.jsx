import { apiConfig } from './apiConfig';

export const imagesApi = {
    getAvatar,
    getAvatarById,
    uploadAvatar,
    getMoviePosterById,
    uploadMoviePoster,
}

export async function getAvatar() {
    return apiConfig
        .get('/images/avatar', { responseType: 'arraybuffer' })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error('Error fetching avatar: ' + error);
        });
}

export async function getAvatarById(userId) {
    return apiConfig
        .get(`/images/avatar/${userId}`, { responseType: 'arraybuffer' })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error('Error fetching avatar by user ID: ' + error);
        });
}

export async function uploadAvatar(formData) {
        // Send the cropped image to the server for upload using axios
        return apiConfig
            .post('/images/upload/avatar', formData, {headers: { 'Content-Type': 'multipart/form-data', },})
            .then((response) => response.data)
            .catch((error) => {
                console.log(error)
                throw new Error('Error uploading avatar: ' + error);
            })
}

export async function getMoviePosterById(movieId) {
    return apiConfig
        .get(`/movie/${movieId}`, { responseType: 'arraybuffer' })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error('Error fetching movie poster by ID: ' + error);
        });
}

export async function uploadMoviePoster(movieId, formData) {
    //admin method
    return apiConfig
        .post(`/movie/${movieId}`, formData, {headers: { 'Content-Type': 'multipart/form-data', },})
        .then((response) => response.data)
        .catch((error) => {
            console.log(error)
            throw new Error('Error uploading avatar: ' + error);
        })
}