import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";

function Book() {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    name: "",
    author: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getBook();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const getBook = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/books/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setValues({
            name: data.name,
            author: data.author,
          });
        });
    } catch (error) {
      setError(error.message || `Unexpected Error`);
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async () => {
    try {
      await fetch(`${API_BASE}/books/${id}`, {
        method: `PATCH`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
        });
    } catch (error) {
      setError(error.message || `Unexpected Error`);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async () => {
    try {
      await fetch(`${API_BASE}/books/${id}`, {
        method: `DELETE`,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setBooks(data);
          navigate("/dashboard", { replace: true });
        });
    } catch (error) {
      setError(error.message || `Unexpected Error`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBook();
  };

  const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link className="Link" to="/">
          Home
        </Link>
        <Link className="Link" to="/dashboard">
          Dashboard
        </Link>
        <h1>Book Info</h1>
        <div className="book-info">
          <h4>{values && values.name}</h4>
          <h5>{values && values.author}</h5>
        </div>

        <div className="form">
          <form onSubmit={(event) => handleSubmit(event)}>
            <label className="formLabel">
              Title:&nbsp;
              <input
                className="formInput"
                type="text"
                name="title"
                value={values.name}
                onChange={handleInputChanges}
              />
            </label>
            <label className="formLabel">
              Author:&nbsp;
              <input
                className="formInput"
                type="text"
                name="author"
                value={values.author}
                onChange={handleInputChanges}
              />
            </label>
            <button className="button" type="submit">
              Edit Book Info
            </button>
            <button className="deleteButton" onClick={() => deleteBook()}>
              Delete Book
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default Book;