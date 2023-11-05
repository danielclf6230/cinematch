import { apiConfig, bearerAuth } from './apiConfig';

export const entitiesApi = {
    getUserInfo,
    getUsers,
    getUsersByUsername,
    getUsersById,
}
export function getUserInfo() {
    return apiConfig
        .get('/entities/user')
}


export async function getUsers() {
        const response = await apiConfig.get('/entities/users');
        return response.data; // Return the list of users
}

export async function getUsersByUsername(username) {
        const response = await apiConfig.get(`/entities/users/${username}`);
        return response.data;
}

export async function getUsersById(userId) {
    const response = await apiConfig.get(`/entities/user/${userId}`);
    return response.data;
}