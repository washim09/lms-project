const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
//const upload = require('../middleware/upload');
const bookController = require('../controllers/bookController');
const upload = require('../middleware/multerConfig'); // Multer config for file handling
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');


// Public route to get all books (no authentication required)
router.get('/', bookController.getAllBooks);

// Protected route to add a new book (admin only, with image upload)
router.post('/add', verifyToken, isAdmin, upload.single('image'), bookController.addBook);

// Protected route to update a book by ID (admin only, with optional image upload)
router.put('/:id', verifyToken, isAdmin, upload.single('image'), bookController.updateBookById);

// Protected route to delete a book by ID (admin only)
router.delete('/:id', verifyToken, isAdmin, bookController.deleteBookById);


// router.post('/', (req, res) => {
//   res.status(200).json({ message: 'Test route works!' });
// });


// GET /api/books - Fetch all books (Public route)
// router.get('/books', async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (error) {
//     console.error('Error fetching books:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// PUT /api/books/:id - Update a book (Protected route)
// router.put('/books/:id', verifyToken, upload.single('image'), async (req, res) => {
//   try {
//     const updatedData = {
//       name: req.body.name,
//       author: req.body.author,
//       availabilityStatus: req.body.availabilityStatus,
//     };

//     if (req.file) {
//       updatedData.image = req.file.filename; 
//     }

//     const book = await Book.findByIdAndUpdate(req.params.id, updatedData, { new: true });
//     res.status(200).json(book); 
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update book' });
//   }
// });

// DELETE /api/books/:id - Delete a book (Protected route)
// router.delete('/books/:id', verifyToken, async (req, res) => {
//   try {
//     await Book.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Book deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete book' });
//   }
// });

module.exports = router;
