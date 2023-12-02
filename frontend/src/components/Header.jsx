import React from 'react';
import { Link } from 'react-router-dom';
import logo from './res/logo_v1.png';
import { useAuth, handleLogError } from '../security/AuthContext';

/**
 * React functional component representing the header/navigation bar of the application.
 *
 * @component
 * @example
 * // Example usage within another React component
 * import Header from './Header';
 * //...
 * <Header />
 */
const Header = () => {
    /**
     * Object containing authentication-related information and functions.
     * @type {Object}
     * @property {Object} user - User information if authenticated.
     * @property {Function} logout - Function to log out the user.
     */
    const { user, logout } = useAuth();

    /**
     * Renders the Header component.
     *
     * @returns {JSX.Element} - JSX representation of the Header component.
     */
    return (
        <div>
            <header>
                <nav className="row navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="menu-ops col">
                        <Link to={user ? '/home' : '/'} className="navbar-brand">
                            home
                        </Link>
                        <Link to="/register" className="navbar-brand">
                            register
                        </Link>
                        {user ? (
                            <>
                                <Link to="/" className="navbar-brand" onClick={logout}>
                                    logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="navbar-brand">
                                    login
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="cm-title col">
                        <h1>CINEMATCH</h1>
                    </div>
                    <div className="cm-logo col-1">
                        <img src={logo} alt="Cinematch Logo" />
                    </div>
                </nav>
            </header>
        </div>
    );
};

/**
 * Default export of the Header component.
 * @exports Header
 */
export default Header;
