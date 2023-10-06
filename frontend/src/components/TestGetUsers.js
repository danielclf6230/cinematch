import React, { useEffect, useState } from 'react';

function TestGetUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Define the URL of your API endpoint for fetching users
        const apiUrl = 'http://localhost:8080/api/entities/user';

        // Make an HTTP GET request to fetch users
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched users
                setUsers(data);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }, []); // The empty dependency array means this effect runs once when the component mounts

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
}

export default TestGetUsers;
