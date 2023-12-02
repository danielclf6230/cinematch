import { apiConfig } from './apiConfig';

/**
 * Image-related API functions for avatars and movie posters.
 *
 * @namespace
 * @type {object}
 */
export const imagesApi = {
    getAvatar,
    getAvatarById,
    uploadAvatar,
    getMoviePosterById,
    uploadMoviePoster,
}
/**
 * Get the user's avatar.
 *
 * @async
 * @function
 * @returns {Promise<ArrayBuffer>} A promise that resolves to the user's avatar image as an ArrayBuffer.
 * @throws {Error} If there is an error fetching the avatar.
 */
export async function getAvatar() {
    return apiConfig
        .get('/images/avatar', { responseType: 'arraybuffer' })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error('Error fetching avatar: ' + error);
        });
}


/**
 * Get the avatar of a user by user ID.
 *
 * @async
 * @function
 * @param {string} userId - The ID of the user.
 * @returns {Promise<ArrayBuffer>} A promise that resolves to the user's avatar image as an ArrayBuffer.
 * @throws {Error} If there is an error fetching the avatar by user ID.
 */
export async function getAvatarById(userId) {
    return apiConfig
        .get(`/images/avatar/${userId}`, { responseType: 'arraybuffer' })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error('Error fetching avatar by user ID: ' + error);
        });
}

/**
 * Upload a user's avatar.
 *
 * @async
 * @function
 * @param {FormData} formData - Form data containing the avatar image.
 * @returns {Promise} A promise that resolves when the avatar is successfully uploaded.
 * @throws {Error} If there is an error uploading the avatar.
 */
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

/**
 * Get the movie poster by movie ID.
 *
 * @async
 * @function
 * @param {string} movieId - The ID of the movie.
 * @returns {Promise<ArrayBuffer>} A promise that resolves to the movie poster image as an ArrayBuffer.
 * @throws {Error} If there is an error fetching the movie poster by ID.
 */
export async function getMoviePosterById(movieId) {
    return apiConfig
        .get(`/images/movie/${movieId}`, { responseType: 'arraybuffer' })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error('Error fetching movie poster by ID: ' + error);
        });
}

/**
 * Upload a movie poster by movie ID (admin method).
 *
 * @async
 * @function
 * @param {string} movieId - The ID of the movie.
 * @param {FormData} formData - Form data containing the movie poster image.
 * @returns {Promise} A promise that resolves when the movie poster is successfully uploaded.
 * @throws {Error} If there is an error uploading the movie poster.
 */
export async function uploadMoviePoster(movieId, formData) {
    //admin method
    return apiConfig
        .post(`/images/movie/${movieId}`, formData, {headers: { 'Content-Type': 'multipart/form-data', },})
        .then((response) => response.data)
        .catch((error) => {
            console.log(error)
            throw new Error('Error uploading avatar: ' + error);
        })
}