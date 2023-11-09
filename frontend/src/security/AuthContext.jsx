import React, { createContext, useContext, useState, useEffect } from 'react'
import {Navigate} from "react-router-dom";

const AuthContext = createContext()

const adminRoute = (Component) => {
    return (props) => {
        const { isAdmin, getUserData } = useAuth();
        if (getUserData() === null) {
            return <Navigate to="/" />;
        }
        else if (!isAdmin()) {
            return <Navigate to="/home" />;
        }
        return <Component {...props} />;
    };
};

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        setUser(storedUser)
    }, [])

    const getUser = () => {
        return JSON.parse(localStorage.getItem('user'))
    }

    const userIsAuthenticated = () => {
        let storedUser = localStorage.getItem('user')
        if (!storedUser) {
            return false
        }

        storedUser = JSON.parse(storedUser)

        // if user has token expired, logout user
        return true
    }

    const isAdmin = () => {
        // Add logic to check if the user has the admin role
        const userData = getUserData();
        console.log(userData)
        return userData && userData.roles.some(role => role.name === 'ROLE_ADMIN');
    }

    const userLogin = (authenticatedUser) => {
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        setUser(authenticatedUser);
        console.log('Logged in as ' + authenticatedUser.userData.username)
    };

    const userLogout = () => {
        localStorage.removeItem('user')
        setUser(null)
        console.log('Session invalidated')
    }

    const getToken = () => user ? user.token : null;

    const getUserData = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log("Stored User Data: ", storedUser);

        return storedUser ? storedUser.userData : null;
    }


    const contextValue = {
        user,
        getUser,
        userIsAuthenticated,
        isAdmin,
        userLogin,
        userLogout,
        getToken,
        getUserData,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export function useAuth() {
    return useContext(AuthContext)
}

export { AuthProvider, adminRoute }

export function parseJwt(token) {
    if (!token) { return }
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
}

export const handleLogError = (error) => {
    if (error.response) {
        console.log(error.response.data)
    } else if (error.request) {
        console.log(error.request)
    } else {
        console.log(error.message)
    }
}