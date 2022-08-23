import { Link } from 'react-router-dom';
import React from 'react';
import '../App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Library Homepage</h1>
        <Link className="Link" to="/dashboard">Dashboard</Link>
        <Link className="Link" to="/login">Login</Link>
        <Link className="Link" to="/signup">Signup</Link>
      </header>
    </div>
  );
}

export default Home;