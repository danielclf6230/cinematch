import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, handleLogError } from '../security/AuthContext';
import { actionsApi } from '../api/actionsApi';
import { entitiesApi } from "../api/entitiesApi";

/**
 * React functional component representing the login page of the application.
 *
 * @component
 * @example
 * // Example usage within another React component
 * import Login from './Login';
 * //...
 * <Login />
 */
function Login() {
    /**
     * Function to navigate to different pages within the application.
     * @type {Function}
     */
    const navigate = useNavigate();

    /**
     * Object containing authentication-related information and functions.
     * @type {Object}
     */
    const Auth = useAuth();

    /**
     * State variable to store the entered username.
     * @type {string}
     */
    const [username, setUsername] = useState('');

    /**
     * State variable to store the entered password.
     * @type {string}
     */
    const [password, setPassword] = useState('');

    /**
     * State variable to store and display error messages.
     * @type {string}
     */
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Effect hook to check if the user is already authenticated when the component mounts.
     */
    useEffect(() => {
        if (Auth.userIsAuthenticated()) {
            Auth.userLogout();
        }
    }, [Auth]);

    /**
     * Function to handle input changes and update the corresponding state variables.
     *
     * @param {Object} e - Event object representing the input change event.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    /**
     * Function to handle form submission, authenticate the user, and navigate to the appropriate page.
     *
     * @param {Object} e - Event object representing the form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await actionsApi.authenticate(username, password);
            const accessToken = response.data;
            const info = await entitiesApi.getUserInfo(accessToken);

            const authenticatedUser = { token: accessToken, userData: info.data };
            Auth.userLogin(authenticatedUser);

            setUsername('');
            setPassword('');

            if (info.data.roles.some(role => role.name === 'ROLE_ADMIN')) {
                navigate('/admin'); // Navigate to the admin page
            } else {
                navigate('/home'); // Navigate to the home page (or any other page for non-admin users)
            }
        } catch (error) {
            handleLogError(error);
            setErrorMessage(error.response.data);
        }
    }

    /**
     * Renders the Login component.
     *
     * @returns {JSX.Element} - JSX representation of the Login component.
     */
    return (
        <div className="cm-form">
            <h2>Login User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="custom-field">
                        <input type="text" name="username" onChange={handleInputChange} required />
                        <span className="pholder">Username</span>
                    </label>
                </div>
                <div>
                    <label className="custom-field">
                        <input type="password" name="password" onChange={handleInputChange} required />
                        <span className="pholder">Password</span>
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
}

/**
 * Default export of the Login component.
 * @exports Login
 */
export default Login;
