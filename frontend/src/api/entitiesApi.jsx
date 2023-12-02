import { apiConfig, bearerAuth } from './apiConfig';

/**
 * Object containing functions to interact with entities.
 *
 * @namespace
 * @property {Function} getUserInfo - Get user information.
 * @property {Function} getUsers - Get a list of users.
 * @property {Function} getUsersByUsername - Get users by username.
 * @property {Function} getUsersById - Get user by ID.
 * @property {Function} sendFriendRequest - Send a friend request to a user.
 * @property {Function} removeFriendRequest - Remove a friend request sent.
 * @property {Function} getFriendRequests - Get pending friend requests.
 * @property {Function} acceptFriendRequest - Accept a friend request.
 * @property {Function} deleteFriendRequest - Delete a friend request.
 * @property {Function} getFriends - Get user's friends.
 * @property {Function} getFriend - Get information about a friend.
 * @property {Function} removeFriend - Remove a friend.
 * @property {Function} getMovies - Get a list of movies.
 * @property {Function} deleteMovie - Delete a movie (admin method).
 * @property {Function} addFavorites - Add favorite movies.
 * @property {Function} getFavourites - Get user's favorite movies.
 * @property {Function} addSharedFavorites - Add shared favorite movies with another user.
 * @property {Function} getSharedFavorites - Get shared favorite movies with another user.
 */
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
};

/**
 * Get user information using the provided token.
 *
 * @function
 * @param {string} token - User authentication token.
 * @returns {Promise} A promise that resolves to the user information.
 */
export function getUserInfo(token) {
    console.log('Bearer token:', bearerAuth(token));
    return apiConfig
        .get('/entities/user', { headers: { Authorization: bearerAuth(token) } });
}

/**
 * Get a list of users.
 *
 * @async
 * @function
 * @returns {Promise} A promise that resolves to a list of users.
 */
export async function getUsers() {
    const response = await apiConfig.get('/entities/users');
    return response.data;
}

/**
 * Get users by username.
 *
 * @async
 * @function
 * @param {string} username - Username to search for.
 * @returns {Promise} A promise that resolves to user information.
 */
export async function getUsersByUsername(username) {
    const response = await apiConfig.get(`/entities/users/${username}`);
    return response.data;
}

/**
 * Get user by ID.
 *
 * @async
 * @function
 * @param {string} userId - User ID.
 * @returns {Promise} A promise that resolves to user information.
 */
export async function getUsersById(userId) {
    const response = await apiConfig.get(`/entities/user/${userId}`);
    return response.data;
}
/**
 * Send a friend request to a user.
 *
 * @async
 * @function
 * @param {string} recipientUserId - ID of the recipient user.
 * @returns {Promise} A promise that resolves when the friend request is sent.
 */
export async function sendFriendRequest(recipientUserId) {
    const response = await apiConfig.post(`/entities/users/friend-requests/${recipientUserId}`);
    return response.data;
}

/**
 * Remove a friend request sent.
 *
 * @async
 * @function
 * @param {string} recipientUserId - ID of the recipient user.
 * @returns {Promise} A promise that resolves when the friend request is removed.
 */
export async function removeFriendRequest(recipientUserId) {
    const response = await apiConfig.delete(`/entities/users/friend-requests/${recipientUserId}`);
    return response.data;
}

/**
 * Get pending friend requests.
 *
 * @async
 * @function
 * @returns {Promise} A promise that resolves to a list of friend requests.
 */
export async function getFriendRequests() {
    const response = await apiConfig.get(`/entities/friend-requests`);
    return response.data;
}

/**
 * Accept a friend request.
 *
 * @async
 * @function
 * @param {string} requestId - ID of the friend request to accept.
 * @returns {Promise} A promise that resolves when the friend request is accepted.
 */
export async function acceptFriendRequest(requestId) {
    const response = await apiConfig.put(`/entities/friend-requests/${requestId}`);
    return response.data;
}

/**
 * Delete a friend request.
 *
 * @async
 * @function
 * @param {string} requestId - ID of the friend request to delete.
 * @returns {Promise} A promise that resolves when the friend request is deleted.
 */
export async function deleteFriendRequest(requestId) {
    const response = await apiConfig.delete(`/entities/friend-requests/${requestId}`);
    return response.data;
}

/**
 * Get user's friends.
 *
 * @async
 * @function
 * @returns {Promise} A promise that resolves to a list of friends.
 */
export async function getFriends() {
    const response = await apiConfig.get(`/entities/friends`);
    return response.data;
}

/**
 * Get information about a friend.
 *
 * @async
 * @function
 * @param {string} friendUserId - ID of the friend user.
 * @returns {Promise} A promise that resolves to information about the friend.
 */
export async function getFriend(friendUserId) {
    const response = await apiConfig.get(`/entities/friends/${friendUserId}`);
    return response.data;
}

/**
 * Remove a friend.
 *
 * @async
 * @function
 * @param {string} friendUserId - ID of the friend user to remove.
 * @returns {Promise} A promise that resolves when the friend is removed.
 */
export async function removeFriend(friendUserId) {
    const response = await apiConfig.delete(`/entities/friends/${friendUserId}`);
    return response.data;
}

/**
 * Get a list of movies.
 *
 * @async
 * @function
 * @returns {Promise} A promise that resolves to a list of movies.
 */
export async function getMovies() {
    const response = await apiConfig.get(`/entities/movies`);
    return response.data;
}

/**
 * Delete a movie (admin method).
 *
 * @async
 * @function
 * @param {string} movieId - ID of the movie to delete.
 * @returns {Promise} A promise that resolves when the movie is deleted.
 */
export async function deleteMovie(movieId) {
    const response = await apiConfig.delete(`/entities/movies/${movieId}`);
    return response.data;
}

/**
 * Add favorite movies.
 *
 * @async
 * @function
 * @param {number[]} moviesId - IDs of the movies to add as favorites.
 * @returns {Promise} A promise that resolves when the movies are added as favorites.
 */
export async function addFavorites(moviesId) {
    const favoriteMovieDTO = { movieIds: moviesId };
    return apiConfig.post(`/entities/user/favorite-movies`, favoriteMovieDTO);
}

/**
 * Get user's favorite movies.
 *
 * @async
 * @function
 * @returns {Promise} A promise that resolves to a list of favorite movies.
 */
export async function getFavourites() {
    return apiConfig.get(`/entities/user/favorite-movies`);
}

/**
 * Add shared favorite movies with another user.
 *
 * @async
 * @function
 * @param {string} otherUsersId - ID of the other user to share favorites with.
 * @param {number[]} moviesId - IDs of the movies to share as favorites.
 * @returns {Promise} A promise that resolves when the favorites are shared.
 */
export async function addSharedFavorites(otherUsersId, moviesId) {
    const favoriteMovieDTO = { movieIds: moviesId };
    return apiConfig.post(`/entities/share-movies/${otherUsersId}`, favoriteMovieDTO);
}

/**
 * Get shared favorite movies with another user.
 *
 * @async
 * @function
 * @param {string} otherUsersId - ID of the other user to get shared favorites from.
 * @returns {Promise} A promise that resolves to a list of shared favorite movies.
 */
export async function getSharedFavorites(otherUsersId) {
    return apiConfig.get(`/entities/share-movies/${otherUsersId}`);
}
