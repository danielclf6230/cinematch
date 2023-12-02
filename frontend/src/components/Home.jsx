import React, { useContext, useEffect } from 'react';
import { useAuth } from '../security/AuthContext';
import UserList from './UserList';
import Profile from './AvatarPreview';
import AvatarPreview from "./AvatarPreview";
import AvatarUpload from "./AvatarUpload";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";

/**
 * React functional component representing the home page of the application.
 *
 * @component
 * @example
 * // Example usage within another React component
 * import Home from './Home';
 * //...
 * <Home />
 */
function Home() {
    /**
     * Object containing authentication-related information and functions.
     * @type {Object}
     * @property {Function} getUserData - Function to retrieve user data.
     */
    const { getUserData } = useAuth();

    /**
     * User data obtained from the authentication context.
     * @type {Object}
     */
    const userData = getUserData();

    /**
     * Effect hook to log the user data when it changes.
     */
    useEffect(() => {
        console.log('hi !' + userData);
    }, [userData]);

    /**
     * Renders the Home component.
     *
     * @returns {JSX.Element} - JSX representation of the Home component.
     */
    return (
        <div className="App">
            <SideMenu />
            <div className="Profile container">
                <div className="col-sm-12 gx-0">
                    <h1>~Welcome {userData.firstName}~</h1>
                </div>
                <div className="row pro">
                    <div className="col-6">
                        <AvatarPreview />
                        <AvatarUpload />
                    </div>
                    <div className="userInfo col-6">
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels"><strong>First Name:</strong></label>
                                <input type="text" className="form-control" value={userData.firstName} readOnly />
                            </div>
                            <div className="col-md-6">
                                <label className="labels"><strong>Last Name:</strong></label>
                                <input type="text" className="form-control" value={userData.lastName} readOnly />
                            </div>
                            <div className="col-md-6">
                                <label className="labels"><strong>Username: </strong></label>
                                <input type="text" className="form-control" value={userData.username} readOnly />
                            </div>
                            <div className="col-md-6">
                                <label className="labels"><strong>Email: </strong></label>
                                <input type="text" className="form-control" value={userData.email} readOnly />
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className="col-12">*/}
                {/*    <UserList />*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

/**
 * Default export of the Home component.
 * @exports Home
 */
export default Home;
