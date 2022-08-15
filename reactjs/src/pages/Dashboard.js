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

    const createBook = async () => {
      try {
          await fetch(`${API_BASE}/books`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(values)
          }).then(() => getBooks())
        } catch(error) {
          setError(error.message || "Unexpected Error")
        } finally {
          setLoading(false)
        }
  }

    const handleSubmit = (event) => {
      event.preventDefault();
      createBook();
  }

  const handleInputChanges = (event) => {
      event.persist();
      setValues((values) => ({
          ...values,
          [event.target.name]: event.target.value
      }))
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Books:</h1>
        <Link to="/">Home</Link>
        <ul>
          {
            books?.map(book => (
              <li key={book._id}>
                <Link to={`/books/${book._id}`}>{book.name}</Link>
              </li>
            ))
          }
        </ul>
        <form onSubmit={(event) => handleSubmit(event)}>
            <label>
                Name:
                <input type="text" name="name" value={values.name} onChange={handleInputChanges} />
            </label>
            <label>
                Author:
                <input type="text" name="author" value={values.author} onChange={handleInputChanges} />
            </label>
            <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default Dashboard;