import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, handleLogError } from '../security/AuthContext';
import { actionsApi } from '../api/actionsApi';
import {entitiesApi} from "../api/entitiesApi";

function Login() {
    const navigate = useNavigate();
    const Auth = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [userInfo, setUserInfo] = useState({});

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

        if (!(username && password)) {
            setIsError(true);
            return;
        }

        try {
            const response = await actionsApi.authenticate(username, password);
            const accessToken = response.data;
            const info = await entitiesApi.getUserInfo(accessToken);

            const authenticatedUser = { token: accessToken, userData: info.data };
            console.log("Authenticated user:" + authenticatedUser.userData.username)
            Auth.userLogin(authenticatedUser);

            setUsername('');
            setPassword('');
            setIsError(false);

            navigate('/home');
        } catch (error) {
            handleLogError(error);
            setIsError(true);
        }
    }

    return (
        <div>
            <h2>Login User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" onChange={handleInputChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleInputChange} />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;
