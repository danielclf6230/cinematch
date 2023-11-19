import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './/res/logo_v1.png'; // Adjust the path as needed


class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="sideMenu col-2">
                <div>
                    <Link to="/home" className="navbar-brand"><h2>Profile</h2></Link> <br/>
                    <Link to="/swipe" className="navbar-brand"><h2>Messages</h2></Link> <br/>
                    <Link to="/moviesearch" className="navbar-brand"><h2>Search</h2></Link> <br/>
                </div>
            </div>
        )}
}

export default SideMenu;