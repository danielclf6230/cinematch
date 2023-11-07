import React from 'react';
import { useAuth } from '../security/AuthContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const Auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Call the userLogout function from AuthContext
        Auth.userLogout();

        // Redirect to the login page or any other page
        navigate('/login');
    };

    return (
        <div>
            <h2>Logout</h2>
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
