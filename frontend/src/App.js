
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './security/AuthContext';
import Header from './components/Header';
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Swipe from './components/Swipe'
import Admin from './components/Admin'
import Room from "./components/Room";




function App() {
  return (
      <AuthProvider>
        <Router>
          <div>
            <Header/>
            <div className="row gx-0">
              <Routes>
                  <Route path='/' element={<Login />}/>
                  <Route path='/register' element={<Register />}/>
                  <Route path="/home" element={<Home />} />
                  <Route path="/swipe" element={<Swipe />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/room" element={<Room />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
  );

}

export default App;
