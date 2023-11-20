import { apiConfig, bearerAuth } from './apiConfig';
import { useAuth } from '../security/AuthContext';
import axios from "axios";


export const actionsApi = {
    authenticate,
    register,
    searchMovie,
    selectMovie
}

export function authenticate(username, password) {
    return apiConfig.post('/actions/login', {username, password})
}

export function register(registerData) {
    return apiConfig.post('/actions/register', registerData)
}

export function searchMovie(searchTerm) {
    return apiConfig.post('/actions/movie/search', searchTerm)
}

export function selectMovie(selectedMovie) {
    return apiConfig.post('/actions/movie/add', selectedMovie)
}




