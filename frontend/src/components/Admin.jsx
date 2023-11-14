import React from 'react';
import { adminRoute } from '../security/AuthContext';

function Admin() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin!</p>
        </div>
    );
}

export default adminRoute(Admin);
