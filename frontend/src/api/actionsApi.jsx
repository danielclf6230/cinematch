import { apiConfig, bearerAuth } from './apiConfig';

export const actionsApi = {
    authenticate,
    register
}

export function authenticate(username, password) {
    return apiConfig.post('/actions/login', {username, password}, {headers: {'Content-Type': 'application/json'}})
        .then(response => {
            return {
                status: response.status,
                data: response.data,
            };
        });
}

export function register(registerData) {
    return apiConfig.post('/actions/register', registerData)
        .then(response => {
            return {
                status: response.status,
                data: response.data,
            };
        });
}
