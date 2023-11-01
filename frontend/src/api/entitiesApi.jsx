import { apiConfig, bearerAuth } from './apiConfig';
import { useAuth } from '../security/AuthContext';

export const entitiesApi = {
    getUserInfo,
    getUsers,
}
export function getUserInfo(token) {
    console.log('Bearer token:', bearerAuth(token));
    return apiConfig
        .get('/entities/user', { headers: { Authorization: bearerAuth(token) } })
        .catch(error => {
            console.error('Error:', error);
            throw error; // Rethrow the error so you can handle it at the caller level.
        });
}


//maybe we can call tokens from inside api classes?
export function getUsers(token) {
    return apiConfig
        .get('/users', { headers: { Authorization: bearerAuth(token) } })
        .then((response) => {
            return response.data; // Return the list of users
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error; // Rethrow the error so you can handle it at the caller level.
        });
}