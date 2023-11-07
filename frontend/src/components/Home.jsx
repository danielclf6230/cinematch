import React, {useContext, useEffect} from 'react';
import { useAuth } from '../security/AuthContext';
import UserList from './UserList';
import Profile from './AvatarPreview';
import AvatarPreview from "./AvatarPreview";
import AvatarUpload from "./AvatarUpload";


function Home() {
    const { getUserData } = useAuth(); // Access the user data from the context
    const userData = getUserData();


    useEffect(() => {
        console.log('hi !' +userData)
    }, [userData]);
    //this was just to test
    return (

        <div>
            <div className="sideMenu">
                <div>
                    <h2>Side 1</h2> <br/>
                    <h2>Side 2</h2> <br/>
                    <h2>Side 1</h2>
                </div>
            </div>
            <div>
                <h2>User Information</h2>
                <ul>
                    <AvatarUpload />
                    <li><AvatarPreview /></li>
                    <li><strong>ID:</strong> {userData.userId}</li>
                    <li><strong>First Name:</strong> {userData.firstName}</li>
                    <li><strong>Last Name:</strong> {userData.lastName}</li>
                    <li><strong>Username:</strong> {userData.username}</li>
                    <li><strong>Email:</strong> {userData.email}</li>
                </ul>

                <UserList />
            </div>
        </div>
    );
}

export default Home;
