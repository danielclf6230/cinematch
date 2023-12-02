import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import {actionsApi} from "../api/actionsApi";
import {entitiesApi} from "../api/entitiesApi";
import {useAuth, handleLogError} from "../security/AuthContext";

class SideMenu extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: true, // Set this state based on your user's admin status
        };
    }

    render() {
        const { isAdmin } = this.state;

        return (

            <div className="sideMenu">
                <div className="sideMenuContainer">
                    <Link to="/home" className="navbar-brand"><h2 className="sideButton">Profile</h2></Link> <br/>
                    <Link to="/swipe" className="navbar-brand"><h2 className="sideButton">Swipe</h2></Link> <br/>
                    <Link to="/room" className="navbar-brand"><h2 className="sideButton">Group Swipe</h2></Link> <br/>
                    <Link to="/friends" className="navbar-brand"><h2 className="sideButton">Friends</h2></Link> <br/>
                    {isAdmin && <Link to="/admin" className="navbar-brand" ><h2 className="sideButton">Search</h2></Link> }<br />
                    {/*<Link to="/admin" className="navbar-brand"><h2>Search</h2></Link> <br/>*/}
                </div>
            </div>
        )}
}

export default SideMenu;