// src/controllers/bookController.js
//const Book = require('../models/Book');


// const addBook = async (req, res) => {
//   try {
//     const { bookName, author, availability } = req.body;
//     const availabilityStatus = availability === 'true' ? 'Available' : 'Issued';

    
//     if (!bookName || !author || !req.file) {
//       return res.status(400).json({ error: 'All fields including an image are required' });
//     }

    
//     const newBook = new Book({
//       name: bookName,               
//       author,
//       availabilityStatus,           
//       image: req.file.filename,     
//     });

    
//     const savedBook = await newBook.save();
//     res.status(201).json(savedBook);
//   } catch (error) {
//     console.error('Error adding book:', error);
//     res.status(500).json({ error: 'Error adding book' });
//   }
// };


// Fetch all books


// const addBook = async (req, res) => {
//   try {
//     const { bookName, author, availabilityStatus } = req.body;
//     const image = req.file.path; 

//     const newBook = new Book({
//       name: bookName,
//       author,
//       availabilityStatus,
//       image,
//     });

//     const savedBook = await newBook.save();

   
//     res.status(201).json(savedBook);
//   } catch (error) {
//     res.status(500).json({ error: 'Error adding book' });
//   }
// };

// const getBooks = async (req, res) => {
//   try {
//     const books = await Book.find({});
//     res.status(200).json(books);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch books' });
//   }
// };

// Controller for handling book updates
// const updateBook = async (req, res) => {
//   try {
//     const updatedData = {
//       name: req.body.name,
//       author: req.body.author,
//       availabilityStatus: req.body.availabilityStatus,
//     };

//     if (req.file) {
//       updatedData.image = req.file.filename; 
//     }

    
//     const updatedBook = await Book.findByIdAndUpdate(req.params.id, updatedData, { new: true });

//     if (!updatedBook) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     res.status(200).json(updatedBook); 
//   } catch (error) {
//     res.status(500).json({ message: "Error updating the book", error });
//   }
// };

// Delete a book by ID
// const deleteBook = async (req, res) => {
//   try {
//     const bookId = req.params.id;
//     const deletedBook = await Book.findByIdAndDelete(bookId);

//     if (!deletedBook) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     res.status(200).json({ message: "Book deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting the book", error });
//   }
// };

const Book = require("../models/Book");

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

// Add a new book
const addBook = async (req, res) => {
  try {
    const { name, author, availabilityStatus } = req.body;
    const image = req.file ? req.file.filename : null;  // Get image from req.file

    const newBook = new Book({
      name,
      author,
      availabilityStatus,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: "Error adding book" });
  }
};


// Update a book by ID
const updateBookById = async (req, res) => {
  const { id } = req.params;
  const { name, author, availabilityStatus } = req.body;

  try {
    const updatedData = {
      name,
      author,
      availabilityStatus
    };

    // If a new image is uploaded, update the image field
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: "Error updating book" });
  }
};


// Delete a book by ID
const deleteBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting book" });
  }
};

// Export all functions
module.exports = {
  getAllBooks,
  addBook,
  updateBookById,
  deleteBookById,
};
