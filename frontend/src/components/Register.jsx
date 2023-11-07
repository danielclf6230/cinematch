import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { actionsApi } from '../api/actionsApi';
import helpers from '../util/helpers';
import { useAuth, handleLogError } from "../security/AuthContext";

function Register() {

    const Auth = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
    })

    useEffect(() => {
        // Check if the user is already authenticated when the component mounts
        if (Auth.userIsAuthenticated()) {
            Auth.userLogout();
        }
    }, [Auth]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.password !== confirmPassword) {
            helpers.displayValidity('confirmPassword','Passwords do not match');
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


    return (
        <div className="cm-form">
            <h2>Register User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="custom-field">
                    <input
                        type="text"
                        name="firstName"
                        onChange={handleInputChange}
                        maxLength="16"
                        required
                    />
                    <span className="pholder">First Name</span>
                </label>
                </div>
                <div>
                    <label className="custom-field">
                    <input
                        type="text"
                        name="lastName"
                        onChange={handleInputChange}
                        maxLength="16"
                        required
                    />
                    <span className="pholder">Last Name</span>
                </label>
                </div>
                <div>
                    <label className="custom-field">
                    <input
                        type="text"
                        name="username"
                        onChange={handleInputChange}
                        pattern="[A-Za-z0-9@#$%^&*]+"
                        title="Please enter a username containing letters (A-Z, a-z), numbers (0-9), and the following symbols: @ # $ % ^ & *."
                        minLength="6"
                        maxLength="14"
                        required
                    />
                    <span className="pholder">Username</span>
                </label>
                </div>
                <div>
                    <label className="custom-field">
                    <input
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        minLength="8"
                        maxLength="20"
                        pattern="^(?=.*\d)(?=.*\W).*$"
                        title="Password must contain at least one number and one symbol"
                        required
                    />
                        <span className="pholder">Password</span>
                    </label>
                </div>
                <div>
                    <label className="custom-field">
                    <input
                        type="password"
                        name="confirmPassword"
                        onChange={handleInputChange}
                        required
                    />
                    <span className="pholder">Confirm Password</span>
                </label>
                </div>
                <div>
                    <label className="custom-field">
                    <input
                        type="email"
                        name="email"
                        onChange={handleInputChange}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        title="Please enter a valid email address in the format email@example.com"
                        required
                    />
                        <span className="pholder">Email</span>
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/">Login</Link></p>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
}

export default Register;
