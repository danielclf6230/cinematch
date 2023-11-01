import { apiConfig, bearerAuth } from './apiConfig';

export const entitiesApi = {
    getUserInfo
}

export function getUserInfo(user) {
    return apiConfig.get('/entities/user', { headers: { Authorization: bearerAuth(user) }
    }).then(response => {
        return {
            status: response.status,
            data: response.data,
        };
    });
}

