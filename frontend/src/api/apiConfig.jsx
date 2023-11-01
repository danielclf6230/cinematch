import axios from 'axios';
import { parseJwt } from '../security/AuthContext';
import { actionsApi } from './actionsApi';

const BASE_URL = 'http://localhost:8080/api';

const apiConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiConfig.interceptors.request.use(
    (config) => {
        // Log the request details (headers, data, etc.) to the console
        console.log('Request:', config);

        // If token is expired, redirect the user to login
        if (config.headers.Authorization) {
            const token = config.headers.Authorization.split(' ')[1];
            if (Date.now() > token.exp * 1000) {
                window.location.href = '/';
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

// Response interceptor
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

function bearerAuth(token) {
    return `Bearer ${token}`;
}

async function getValidToken() {
    // Get the token from your source (localStorage, cookies, etc.)
    const user = localStorage.getItem('user');
    const token = user.token

    if (token) {
        const tokenData = parseJwt(token);
        if (Date.now() < tokenData.exp * 1000) {
            // Token is valid, return it
            return token;
        }
    }

    // Token is expired or not found, return null
    return null;
}

export { apiConfig, bearerAuth, getValidToken };
