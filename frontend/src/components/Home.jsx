import React, {useContext, useEffect} from 'react';
import { useAuth } from '../security/AuthContext';
import UserList from './UserList';
import Profile from './AvatarPreview';
import AvatarPreview from "./AvatarPreview";
import AvatarUpload from "./AvatarUpload";
import {Link} from "react-router-dom";
import SideMenu from "./SideMenu";


function Home() {
    const { getUserData } = useAuth(); // Access the user data from the context
    const userData = getUserData();


    useEffect(() => {
        console.log('hi !' +userData)
    }, [userData]);
    //this was just to test
    return (

        <div className="App">
            <SideMenu />
            <div className="Profile container">
                <div className="col-sm-12 gx-0">
                    <h1>Welcome {userData.firstName}!</h1>
                </div>
                <div className="row">
                    <div className="col-6">
                        <AvatarUpload />
                        <AvatarPreview />
                    </div>
                    <div className="userInfo col-6">
                            {/*<h2><strong>ID:</strong> {userData.userId}</h2>*/}
                            <h2><strong>First Name:</strong> {userData.firstName}</h2>
                            <h2><strong>Last Name:</strong> {userData.lastName}</h2>
                            <h2><strong>Username:</strong> {userData.username}</h2>
                            <h2><strong>Email:</strong> {userData.email}</h2>
                    </div>
                </div>
                {/*<div className="col-12">*/}
                {/*    <UserList />*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default Home;
