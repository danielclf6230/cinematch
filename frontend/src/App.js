
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Register from './components/Register'
import Login from './components/Login'
import Swipe from "./components/Swipe";



function App() {
  return (
      <div>
        <Router>
          <div>
            <Header/>
            <div className="container">
              <Routes>
                <Route path='/register' element={<Register />}/>
                  <Route path='/' element={<Swipe />}/>
                  <Route path='/login' element={<Login />}/>
              </Routes>
            </div>
          </div>
        </Router>
      </div>
  );

}

export default App;
