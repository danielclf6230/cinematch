import React, { Component } from 'react';
import axios from 'axios';

export default class TestGetUsers extends Component {
    state = {
        users: [
            {
                "userId": 1,
                "firstName": "John",
                "lastName": "Doe",
                "username": "johndoe",
                "email": "john@example.com"
            },
        ]

    };

    componentDidMount() {
        axios.get('http://localhost:8080/api/entities/user')
            .then(res => {
                const users = res.data;
                this.setState({ users });
            })
    }

    render() {

        return (
            <div>
                <h2>User List</h2>
                    <ul>
                        {
                            this.state.users
                                .map(user =>
                                    <li key={user.userId}>{user.username}</li>
                                )
                        }
                    </ul>

            </div>
        );
    }
}
