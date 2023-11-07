import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth,  handleLogError } from '../security/AuthContext';
import { actionsApi } from '../api/actionsApi';
import {entitiesApi} from "../api/entitiesApi";

function Login() {
    const navigate = useNavigate();
    const Auth = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Check if the user is already authenticated when the component mounts
        if (Auth.userIsAuthenticated()) {
            Auth.userLogout();
        }
    }, [Auth]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

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


            navigate('/home');
        } catch (error) {
            handleLogError(error);
            setErrorMessage(error.response.data)
        }
    }

    return (
        <div className="cm-form">
            <h2>Login User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="custom-field">
                    <input type="text" name="username" onChange={handleInputChange} required/>
                    <span className="pholder">Username</span>
                    </label>
                </div>
                <div>
                    <label className="custom-field">
                    <input type="password" name="password" onChange={handleInputChange} required/>
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

export default Login;
