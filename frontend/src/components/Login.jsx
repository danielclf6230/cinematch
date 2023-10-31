import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; // Import Axios

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {username, password};
      // Send a POST request to your server's registration endpoint
      const response = await axios.post('http://localhost:8080/api/actions/login', user);
      // Optionally, handle success or navigate to a success page
      console.log('Login successful:', response.data);
    } catch (error) {
      // Handle errors (e.g., display validation errors or show an error message)
      console.error('Login failed:', error);
    }
  };

  return (
      <div className="cm-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
          </div>
        </form>
        <div>
            <span>
              New here? <Link to="/Register">Create an Account</Link>
            </span>
        </div>
      </div>
  );
}

export default Login;
