import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import authService from "../services/auth.service.js";
import booksService from "../services/book.service";
import "../App.css";

function Dashboard() {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    name: "",
    author: "",
  });

  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {
    booksService.getAllPrivateBooks().then(
      (res) => {
        setBooks(res.data);
      },
      (error) => {
        console.log("Secured Page Error: ", error.res);
        if (error.res && error.res.status === 403) {
          authService.logout();
          navigate("/login");
        }
      }
    );
  }, []);

  const getBooks = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/books`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setBooks(data);
        });
    } catch (error) {
      setError(error.message || `Unexpected Error`);
    } finally {
      setLoading(false);
    }
  };

  const createBook = async () => {
    try {
      await fetch(`${API_BASE}/books`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(() => getBooks());
    } catch (error) {
      setError(error.message || `Unexpected Error`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBook();
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
        <h1>Books</h1>
        <div className="book-list">
          <ul>
            {books &&
              books.map((book) => {
                return (
                  <li key={book._id}>
                    <Link className="Link" to={`/movies/${book._id}`}>
                      {book.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <label className="formLabel">
            Title:&nbsp;
            <input
              className="formInput"
              type="text"
              name="title"
              placeholder="book title"
              value={values.name}
              onChange={handleInputChanges}
            />
          </label>
          <label className="formLabel">
            Author:&nbsp;
            <input
              className="formInput"
              type="text"
              name="authorr"
              placeholder="movie author"
              value={values.author}
              onChange={handleInputChanges}
            />
          </label>
          <button className="button" type="submit">
            Add Book
          </button>
        </form>
      </header>
    </div>
  );
}

export default Dashboard;