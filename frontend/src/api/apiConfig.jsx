import axios from 'axios';
import { parseJwt } from '../security/AuthContext';
import {actionsApi} from "./actionsApi";

const BASE_URL = 'http://localhost:8080/api';



const apiConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json'
    },
});

apiConfig.interceptors.request.use(function (config) {
    // If token is expired, redirect the user to login
    if (config.headers.Authorization) {
        const token = config.headers.Authorization.split(' ')[1];
        if (Date.now() > token.exp * 1000) {
            window.location.href = '/';
        }
    }
    return config;
});

function bearerAuth(user) {
    return `Bearer ${user.accessToken}`;
}

export { apiConfig, bearerAuth };
