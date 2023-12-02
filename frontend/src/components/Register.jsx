import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { actionsApi } from '../api/actionsApi';
import helpers from '../util/helpers';
import { useAuth, handleLogError } from "../security/AuthContext";

/**
 * React component for user registration.
 * @component
 * @example
 * // Example usage of Register component
 * import Register from './Register';
 * function App() {
 *   return (
 *     <div>
 *       <Register />
 *     </div>
 *   );
 * }
 */
function Register() {
    /**
     * Authentication context hook.
     * @type {Object}
     */
    const Auth = useAuth();

    /**
     * Navigation hook for programmatic navigation.
     * @type {Function}
     */
    const navigate = useNavigate();

    /**
     * State hook to store error messages.
     * @type {string}
     */
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * State hook to store the confirmation password.
     * @type {string}
     */
    const [confirmPassword, setConfirmPassword] = useState('');

    /**
     * State hook to store form data.
     * @type {Object}
     */
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
    });

    /**
     * Effect hook to check if the user is already authenticated when the component mounts.
     */
    useEffect(() => {
        if (Auth.userIsAuthenticated()) {
            Auth.userLogout();
        }
    }, [Auth]);

    /**
     * Event handler for input changes in the form.
     * @param {Object} e - The event object.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }

        e.target.setCustomValidity('');
    }

    /**
     * Event handler for form submission.
     * @param {Object} e - The event object.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== confirmPassword) {
            helpers.displayValidity('confirmPassword', 'Passwords do not match');
            return;
        }

        try {
            // Call the register API function
            const response = await actionsApi.register(formData);
            if (response.status === 201) navigate('/');
        } catch (error) {
            handleLogError(error);
            // Server returned a 409 status code, indicating a bad request error.
            if (error.response.data.startsWith('The username')) {
                helpers.displayValidity('username', error.response.data);
            } else if (error.response.data.includes('email')) {
                helpers.displayValidity('email', error.response.data);
            } else {
                setErrorMessage(error.response.data);
            }
        }
    }

    /**
     * Render the Register component.
     * @returns {JSX.Element}
     */
    return (
        <div className="cm-form">
            <h2>Register User</h2>
            <form onSubmit={handleSubmit}>
                {/* ... (Input fields and labels) ... */}
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/">Login</Link></p>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
}

export default Register;
