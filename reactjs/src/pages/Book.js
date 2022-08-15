import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../App.css';

function Book() {
  const [books, setBooks] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [values, setValues] = useState({
    name: '',
    author: ''
  })

  const { id } = useParams()
  const navigate = useNavigate();


  const API_BASE = process.env.NODE_ENV === 'development'
    ? `http://localhost:8000/api/v1`
    : process.env.REACT_APP_BASE_URL;

    let ignore = false;
    useEffect(() => {
      

      if(!ignore){
        getBook();
      }

      return () => {
        ignore = true;
      }
    }, [])

    const getBook = async () => {
      setLoading(true)
      try {
        await fetch(`${API_BASE}/books/${id}`)
                  .then(res => res.json())
                  .then(data => {
                    console.log({data})
                    // const { name, author } = data;
                    setValues({
                        name: data.name,
                        author: data.author
                    })
                  })
      } catch(error) {
        setError(error.message || "Unexpected Error")
      } finally {
        setLoading(false)
      }
    }

    const deleteBook = async () => {
        try {
            await fetch(`${API_BASE}/books/${id}`, {
                method: 'DELETE'
            })
                      .then(res => res.json())
                      .then(data => {
                        setBooks(data)
                        navigate("/dashboard", { replace: true })
                      })
          } catch(error) {
            setError(error.message || "Unexpected Error")
          } finally {
            setLoading(false)
          }
    }

    const updateBook= async () => {
        try {
            await fetch(`${API_BASE}/books/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                      .then(res => res.json())
                      .then(data => {
                        console.log({data})
                      })
          } catch(error) {
            setError(error.message || "Unexpected Error")
          } finally {
            setLoading(false)
          }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateBook();
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
        <h1>Book Library</h1>
        <h5>{values && values.name}</h5>
        <p>{values && values.author}</p>
        <button onClick={() => deleteBook()}>Delete Book</button>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>

        <form onSubmit={(event) => handleSubmit(event)}>
            <label>
                Name:
                <input type="text" name="name" value={values.name} onChange={handleInputChanges} />
            </label>
            <label>
                Class:
                <input type="text" name="author" value={values.author} onChange={handleInputChanges} />
            </label>
            <input type="submit" value="Submit" />
        </form>

      </header>
    </div>
  );
}

export default Book;