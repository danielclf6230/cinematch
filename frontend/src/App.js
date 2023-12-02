import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './security/AuthContext';
import Header from './components/Header';
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Swipe from './components/Swipe'
import Admin from './components/Admin'
import Room from "./components/Room"
import MovieSearch from "./components/MovieSearch";
import Friends from "./components/Friends";

/**
 * Main application component that sets up the React Router and renders different
 * components based on the route.
 *
 * @function App
 * @returns {JSX.Element} JSX representation of the application.
 */
function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    {/* Render the Header component */}
                    <Header />

                    {/* Main content area */}
                    <div className="row gx-0">
                        <Routes>
                            {/* Define routes and corresponding components */}
                            <Route path="/" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/swipe" element={<Swipe />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/room" element={<Room />} />
                            <Route path="/friends" element={<Friends />} />
                            <Route path="/moviesearch" element={<MovieSearch />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
