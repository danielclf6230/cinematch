import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import logo from './/res/logo_v1.png'; // Adjust the path as needed


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
                            <Link to="/swipe" className="navbar-brand">swipe</Link>
                            <Link to="/room" className="navbar-brand">room</Link>
                            <Link to="/friends" className="navbar-brand">friends</Link>
                        </div>
                        <div className="cm-logo col">
                            {/*<img src={logo} alt="Cinematch" />*/}
                        </div>
                        <div className="col"></div>
                    </nav>
                </header>
            </div>
        )}
}

export default Header;