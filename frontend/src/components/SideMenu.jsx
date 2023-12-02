import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actionsApi } from "../api/actionsApi";
import { entitiesApi } from "../api/entitiesApi";
import { useAuth, handleLogError } from "../security/AuthContext";

/**
 * React component for displaying a side menu with navigation links.
 * @component
 * @example
 * // Example usage of SideMenu component
 * import SideMenu from './SideMenu';
 * function App() {
 *   return (
 *     <div>
 *       <SideMenu />
 *     </div>
 *   );
 * }
 */
class SideMenu extends Component {
    /**
     * Constructor for the SideMenu component.
     * @constructor
     * @param {Object} props - The component props.
     */
    constructor(props) {
        super(props);
        /**
         * State to determine if the user is an admin.
         * @type {boolean}
         */
        this.state = {
            isAdmin: true, // Set this state based on your user's admin status
        };
    }

    /**
     * Render method for the SideMenu component.
     * @returns {JSX.Element}
     */
    render() {
        /**
         * Destructuring state to get isAdmin.
         * @type {boolean}
         */
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
        );
    }
}

export default SideMenu;
