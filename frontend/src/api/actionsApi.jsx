import { apiConfig, bearerAuth } from './apiConfig';
import { useAuth } from '../security/AuthContext';


export const actionsApi = {
    authenticate,
    register
}

export function authenticate(username, password) {
    return apiConfig.post('/actions/login', {username, password})
}

export function register(registerData) {
    return apiConfig.post('/actions/register', registerData)
}


