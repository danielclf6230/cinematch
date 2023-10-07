
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Register from './components/Register'



function App() {
  return (
      <div>
        <Router>
          <div>
            <Header/>
            <div className="container">
              <Routes>
                <Route path='/register' element={<Register />}/>
              </Routes>
            </div>
          </div>
        </Router>
      </div>
  );

}

export default App;
