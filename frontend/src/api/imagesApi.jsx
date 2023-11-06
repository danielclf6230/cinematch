import { apiConfig } from './apiConfig';

export const imagesApi = {
    getAvatar,
    getAvatarById,

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
