import React from 'react';
import { adminRoute } from '../security/AuthContext';
import MovieSearch from "./MovieSearch";
import SideMenu from "./SideMenu";

function Admin() {
    return (
        <div className="row">
            <SideMenu />
            <div className="col">
                <h1>Admin Dashboard - Welcome Admin!</h1>
                <MovieSearch />
            </div>
        </div>
    );
}

export default adminRoute(Admin);
