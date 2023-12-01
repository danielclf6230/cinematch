import { apiConfig, bearerAuth } from './apiConfig';

export const entitiesApi = {
    getUserInfo,
    getUsers,
    getUsersByUsername,
    getUsersById,
    sendFriendRequest,
    removeFriendRequest,
    getFriendRequests,
    acceptFriendRequest,
    deleteFriendRequest,
    getFriends,
    getFriend,
    removeFriend,
    getMovies,
    deleteMovie,
    addFavorites,
    getFavourites,
    addSharedFavorites,
    getSharedFavorites,
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

export async function sendFriendRequest(recipientUserId) {
    const response = await apiConfig.post(`/entities/users/friend-requests/${recipientUserId}`);
    return response.data;
}

export async function removeFriendRequest(recipientUserId) {
    const response = await apiConfig.delete(`/entities/users/friend-requests/${recipientUserId}`);
    return response.data;
}

export async function getFriendRequests() {
    const response = await apiConfig.get(`/entities/friend-requests`);
    return response.data;
}

export async function acceptFriendRequest(requestId) {
    const response = await apiConfig.put(`/entities/friend-requests/${requestId}`);
    return response.data;
}

export async function deleteFriendRequest(requestId) {
    const response = await apiConfig.delete(`/entities/friend-requests/${requestId}`);
    return response.data;
}

export async function getFriends() {
    const response = await apiConfig.get(`/entities/friends`);
    return response.data;
}

export async function getFriend(friendUserId) {
    const response = await apiConfig.get(`/entities/friends/${friendUserId}`);
    return response.data;
}

export async function removeFriend(friendUserId) {
    const response = await apiConfig.delete(`/entities/friends/${friendUserId}`);
    return response.data;
}


export async function getMovies() {
    const response = await apiConfig.get(`/entities/movies`);
    return response.data;
}

export async function deleteMovie(movieId) {
    const response = await apiConfig.delete(`/entities/movies/${movieId}`); //admin method
    return response.data;
}

//give the ids of the 3 movies in the solo swipe
// ex.  {
//          "movieIds": [4, 7, 9]
//      }
export async function addFavorites(moviesId) {
    const favoriteMovieDTO = { movieIds: moviesId };
   return apiConfig.post(`/entities/user/favorite-movies`, favoriteMovieDTO);

}

//returns an array of 3 movies.
export async function getFavourites() {
    return apiConfig.get(`/entities/user/favorite-movies`);
}

//just use this on one of the pair of users.
export async function addSharedFavorites(otherUsersId, moviesId) {
    const favoriteMovieDTO = { movieIds: moviesId };
    return apiConfig.post(`/entities/share-movies/${otherUsersId}`, favoriteMovieDTO);
}


export async function getSharedFavorites(otherUsersId) {
    return apiConfig.get(`/entities/share-movies/${otherUsersId}`);
}
