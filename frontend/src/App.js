
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './security/AuthContext';
import Header from './components/Header';
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'


function App() {
  return (
      <AuthProvider>
        <Router>
          <div>
            <Header/>
            <div className="container">
              <Routes>
                  <Route path='/' element={<Login />}/>
                  <Route path='/register' element={<Register />}/>
                  <Route path="/home" element={<Home />} />
                </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
  );

}

export default App;
