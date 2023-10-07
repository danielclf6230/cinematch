import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div>
                            <Link to="/" className="navbar-brand">Home</Link>
                            <Link to="/register" className="navbar-brand">Register</Link>
                            <Link to="/login" className="navbar-brand">Login</Link>
                        </div>
                    </nav>
                </header>
            </div>
        )}
}

export default Header;