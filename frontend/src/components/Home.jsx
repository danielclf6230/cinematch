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
                <div className="row pro">
                    <div className="col-6">
                        <AvatarPreview />
                        <AvatarUpload />
                    </div>
                    <div className="userInfo col-6">
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels"><strong>First Name:</strong></label>
                                <input type="text" className="form-control" value={userData.firstName} readOnly/>
                            </div>
                            <div className="col-md-6">
                                <label className="labels"><strong>Last Name:</strong></label>
                                <input type="text" className="form-control" value={userData.lastName} readOnly/>
                            </div>
                            <div className="col-md-6">
                                <label className="labels"><strong>Username: </strong></label>
                                <input type="text" className="form-control" value={userData.username} readOnly/>
                            </div>
                            <div className="col-md-6">
                                <label className="labels"><strong>Email: </strong></label>
                                <input type="text" className="form-control" value={userData.email} readOnly/>
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

export default Home;
