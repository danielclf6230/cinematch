import React from 'react';
import { adminRoute } from '../security/AuthContext';
import MovieSearch from "./MovieSearch";

function Admin() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin!</p>
            <MovieSearch />
        </div>

    );
}

export default adminRoute(Admin);
