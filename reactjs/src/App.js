import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000`
      : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getBooks();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const getBooks = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/books`)
        .then((res) => res.json())
        .then((data) => {
          console.log({data});
          setBooks(data);
        });
    } catch (error) {
      setError(error.message || `Unexpected Error`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Books:</h1>
        <ul>
          <li>Books</li>
        </ul>
      </header>
    </div>
  );
}

export default App; 