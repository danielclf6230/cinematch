import React from 'react';
import { useAuth } from '../security/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * React functional component representing the logout page of the application.
 *
 * @component
 * @example
 * // Example usage within another React component
 * import Logout from './Logout';
 * //...
 * <Logout />
 */
function Logout() {
    /**
     * Object containing authentication-related information and functions.
     * @type {Object}
     */
    const Auth = useAuth();

    /**
     * Function to navigate to different pages within the application.
     * @type {Function}
     */
    const navigate = useNavigate();

    /**
     * Function to handle the logout process and redirect to the login page.
     */
    const handleLogout = () => {
        // Call the userLogout function from AuthContext
        Auth.userLogout();

        // Redirect to the login page or any other page
        navigate('/login');
    };

    /**
     * Renders the Logout component.
     *
     * @returns {JSX.Element} - JSX representation of the Logout component.
     */
    return (
        <div>
            <h2>Logout</h2>
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

/**
 * Default export of the Logout component.
 * @exports Logout
 */
export default Logout;
