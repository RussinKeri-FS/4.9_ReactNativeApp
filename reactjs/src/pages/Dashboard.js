import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../App.css';

function Dashboard() {
  const [books, setBooks] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [values, setValues] = useState({
    name: '',
    author: ''
  })

  const API_BASE = process.env.NODE_ENV === 'development'
    ? `http://localhost:8000/api/v1`
    : process.env.REACT_APP_BASE_URL;

    let ignore = false;
    useEffect(() => {
      

      if(!ignore){
        getBooks();
      }

      return () => {
        ignore = true;
      }
    }, [])

    const getBooks = async () => {
      setLoading(true)
      try {
        await fetch(`${API_BASE}/books`)
                  .then(res => res.json())
                  .then(data => {
                    console.log({data})
                    setBooks(data)
                  })
      } catch(error) {
        setError(error.message || "Unexpected Error")
      } finally {
        setLoading(false)
      }
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Books:</h1>
        <Link to="/">Home</Link>
        <ul>
        {books?.map((book) => (
            <Link to={`/books/${book._id}`}>{book.name}</Link>
        ))}
        </ul>
      </header>
    </div>
  );
}

export default Dashboard;