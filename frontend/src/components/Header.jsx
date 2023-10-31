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
                        <div className="menu-ops">
                            <Link to="/" className="navbar-brand">home</Link>
                            <Link to="/register" className="navbar-brand">register</Link>
                            <Link to="/login" className="navbar-brand">login</Link>
                        </div>
                        <div className="cm-logo">
                            <h1>CINEMATCH</h1>
                        </div>
                    </nav>
                </header>
            </div>
        )}
}

export default Header;