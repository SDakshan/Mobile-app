import React from 'react';

import Home from './components/Home';
import Registration from './components/Registration';
import About from './components/About';
import './firebase'; // This ensures the config runs and logs to console
import UserList from './components/userlist';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
        <Link to="/" className="navbar-brand">My App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/registration" className="nav-link">Register</Link></li>
            <li className="nav-item"><Link to="/users" className="nav-link">User</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
            
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<UserList />} />


      </Routes>
    </div>
  );
}

export default App;