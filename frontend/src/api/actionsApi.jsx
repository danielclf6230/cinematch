import { apiConfig } from './apiConfig';
import { useAuth } from '../security/AuthContext';

/**
 * Object containing various actions related to user authentication and movie operations.
 *
 * @namespace actionsApi
 * @property {Function} authenticate - Authenticates a user with the provided credentials.
 * @property {Function} register - Registers a new user with the provided data.
 * @property {Function} searchMovie - Searches for movies based on a provided search term.
 * @property {Function} selectMovie - Selects a movie based on the provided movie data.
 */
export const actionsApi = {
    authenticate,
    register,
    searchMovie,
    selectMovie
};

/**
 * Authenticates a user with the provided username and password.
 *
 * @function authenticate
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise} A promise that resolves with the authentication response.
 */
export function authenticate(username, password) {
    return apiConfig.post('/actions/login', { username, password });
}

/**
 * Registers a new user with the provided registration data.
 *
 * @function register
 * @param {Object} registerData - The registration data of the new user.
 * @returns {Promise} A promise that resolves with the registration response.
 */
export function register(registerData) {
    return apiConfig.post('/actions/register', registerData);
}

/**
 * Searches for movies based on the provided search term.
 *
 * @function searchMovie
 * @param {string} searchTerm - The search term for movie search.
 * @returns {Promise} A promise that resolves with the search results.
 */
export function searchMovie(searchTerm) {
    return apiConfig.post('/actions/movie/search', searchTerm);
}

/**
 * Selects a movie based on the provided movie data.
 *
 * @function selectMovie
 * @param {Object} selectedMovie - The data of the selected movie.
 * @returns {Promise} A promise that resolves with the selection response.
 */
export function selectMovie(selectedMovie) {
    return apiConfig.post('/actions/movie/add', selectedMovie);
}
