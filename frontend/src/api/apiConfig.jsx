import axios from 'axios';
import { parseJwt } from '../security/AuthContext';
import { actionsApi } from './actionsApi';

/**
 * The base URL for the API requests.
 *
 * @constant {string}
 */
const BASE_URL = 'http://localhost:8080/api';

/**
 * Axios instance for API configuration.
 *
 * @type {import('axios').AxiosInstance}
 */
const apiConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

/**
 * Request interceptor to add the Authorization header.
 *
 * @function
 * @param {import('axios').AxiosRequestConfig} config - The Axios request configuration.
 * @returns {import('axios').AxiosRequestConfig} The modified request configuration.
 */
apiConfig.interceptors.request.use(
    (config) => {
        // Log the request details (headers, data, etc.) to the console
        console.log('Request:', config);

        // Check if there's an authenticated user with a token
        const user = localStorage.getItem('user');
        if (user) {
            const token = JSON.parse(user).token;
            if (token) {
                // Add the Authorization header with the token
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        // Log any request errors
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

/**
 * Response interceptor.
 *
 * @function
 * @param {import('axios').AxiosResponse} response - The Axios response.
 * @returns {import('axios').AxiosResponse} The unmodified response.
 */
apiConfig.interceptors.response.use(
    (response) => {
        // Log the response details (headers, data, etc.) to the console
        console.log('Response:', response);
        return response;
    },
    (error) => {
        // Log any response errors
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);

/**
 * Generates a Bearer Authorization string.
 *
 * @function
 * @param {string} token - The token to include in the Authorization header.
 * @returns {string} The Bearer Authorization string.
 */
function bearerAuth(token) {
    return `Bearer ${token}`;
}

export { apiConfig, bearerAuth };
