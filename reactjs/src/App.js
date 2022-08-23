import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import authService from "./services/auth.service.js";

import Book from "./pages/Book";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logout = () => {
    authService.logout();
  };

  return (
    <div>
      <h1>Demo</h1>
      <div>
        {
        currentUser === true 
        ? <h2>Logged In</h2> 
        : <h2>Logged Out</h2>}
      </div>
      <section>
      <Router>
      <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/books/:id" exact element={<Book />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </Router>
      </section>
    </div>
  );
}

export default App;