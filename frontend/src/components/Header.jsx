import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './/res/logo_v1.png'; // Adjust the path as needed


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="row navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="menu-ops col">
                            <Link to="/home" className="navbar-brand">home</Link>
                            <Link to="/register" className="navbar-brand">register</Link>
                            <Link to="/" className="navbar-brand">login</Link>
                            <Link to="/" className="navbar-brand">logout</Link>

                        </div>
                        <div className="cm-title col">
                            <h1>CINEMATCH</h1>
                        </div>
                        <div className="cm-logo col-1">
                            <img src={logo} alt="Cinematch Logo" />
                        </div>
                    </nav>
                </header>
            </div>
        )}
}

export default Header;