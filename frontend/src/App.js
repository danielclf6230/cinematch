
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Register from './components/Register'
import TestGetUsers from "./components/TestGetUsers";



function App() {
  return (
      <div>
        <Router>
          <div>
            <Header/>
            <div className="container">
              <Routes>
                <Route path='/register' element={<Register />}/>
                  <Route path="/test-get-users" component={TestGetUsers} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
  );

}

export default App;
