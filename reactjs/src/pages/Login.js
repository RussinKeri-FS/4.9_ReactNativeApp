import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import authService from "../services/auth.service.js";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await authService.login(email, password).then(
        (res) => {
          navigate("/dashboard");
        },
        (error) => {
          console.error(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        <Link className="Link" to="/">
          Home
        </Link>
        <Link className="Link" to="/dashboard">
          Dashboard
        </Link>
        <section>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </section>
      </header>
    </div>
  );
}

export default Login;