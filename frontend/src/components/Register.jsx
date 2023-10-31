import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = { firstName, lastName, username, password, email };
            // Send a POST request to your server's registration endpoint
            const response = await axios.post('http://localhost:8080/api/actions/register', user);
            // Optionally, handle success or navigate to a success page
            console.log('Registration successful:', response.data);
        } catch (error) {
            // Handle errors (e.g., display validation errors or show an error message)
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="cm-form">
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="custom-field" htmlFor="firstName">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <span className="pholder">First Name</span>
                    </label>

                </div>
                <div>
                    <label className="custom-field" htmlFor="lastName">
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <span className="pholder">Last Name</span>
                    </label>

                </div>
                <div>
                    <label className="custom-field" htmlFor="username">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <span className="pholder">Username</span>
                    </label>
                </div>
                <div>
                    <label className="custom-field" htmlFor="password">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="pholder">Password</span>
                    </label>

                </div>
                <div>
                    <label className="custom-field" htmlFor="email">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span className="pholder">Email</span>
                    </label>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
