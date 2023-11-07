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
                            <Link to="/home" className="navbar-brand">home</Link>
                            <Link to="/register" className="navbar-brand">register</Link>
                            <Link to="/" className="navbar-brand">login</Link>
                            <Link to="/swipe" className="navbar-brand">swipe</Link>
                        </div>
                        <div className="cm-logo">

                        </div>
                    </nav>
                </header>
            </div>
        )}
}

export default Header;