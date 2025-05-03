import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
       
    </div>
  );
}

export default App;
