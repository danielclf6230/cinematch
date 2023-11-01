import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { actionsApi } from '../api/actionsApi'; // Import the API function

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
    });

    const [isError, setIsError] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the register API function
            const response = await actionsApi.register(formData);

            if (response.status === 201) {
                navigate('/');
            } else {
                console.error('Registration failed with status:', response.status);
            }
        } catch (error) {
            setIsError(true);
        }
    };

    return (
        <div>
            <h2>Register User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" onChange={handleInputChange} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" onChange={handleInputChange} />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" onChange={handleInputChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleInputChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={handleInputChange} />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
    );
}

export default Register;
