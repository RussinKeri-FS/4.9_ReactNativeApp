const express = require("express");
const router = express.Router();

const Book = require("../models/book");
// RESTful Endpoints
// GET, POST, PATCH, DELETE

const getBook = async (req, res, next) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book === null) {
      return res.status(404).json({ message: `Book Not Found` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.book = book;
  next();
};

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ONE (by ID)
router.get("/:id", getBook, async (req, res, next) => {
  res.json(res.book);
});

// POST
router.post("/", async (req, res, next) => {
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH
router.patch('/:id', getBook, async (req, res) => {
  if(req.body.name != null){
      res.book.name = req.body.name
  }
  if(req.body.author != null){
      res.book.author = req.body.author
  }
  try {
      const updatedBook = await res.book.save()
      res.json(updatedBook)
  } catch(error) {
      res.status(400).json({ message: error.message })
  }
})

// DELETE
router.delete("/:id", getBook, async (req, res, next) => {
  try {
    await res.book.remove();
    res.json({ message: `Removed Book` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
