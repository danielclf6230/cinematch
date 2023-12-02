import React from 'react';
import { adminRoute } from '../security/AuthContext';
import MovieSearch from "./MovieSearch";
import SideMenu from "./SideMenu";

/**
 * Admin component represents the admin dashboard.
 * This component is wrapped with the adminRoute higher-order component (HOC) from the AuthContext.
 *
 * @component
 * @example
 * // Example usage of Admin component:
 * // import Admin from './path/to/Admin';
 * // <Admin />
 *
 * @returns {JSX.Element} The rendered Admin component.
 */
function Admin() {
    return (
        <div className="App Admin">
            <SideMenu />
            <div className="col">
                <h1>Admin Dashboard - Welcome Admin!</h1>
                <MovieSearch />
            </div>
        </div>
    );
}

export default adminRoute(Admin);
