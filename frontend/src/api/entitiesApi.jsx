import { apiConfig, bearerAuth } from './apiConfig';

export const entitiesApi = {
    getUserInfo,
    getUsers,
    getUsersByUsername,
    getUsersById,
    getMovies,
}
export function getUserInfo(token) {
    console.log('Bearer token:', bearerAuth(token));
    return apiConfig
        .get('/entities/user', { headers: { Authorization: bearerAuth(token) } })
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

export async function getMovies() {
    const response = await apiConfig.get(`/entities/movies`);
    return response.data;//supposedly returns list of movies
}

