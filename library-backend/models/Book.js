const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Book name is required'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  availabilityStatus: {
    type: String,
    enum: ['Available', 'Issued'],
    required: [true, 'Availability status is required'],
  },
  image: {
    type: String, // Path of the uploaded image
  },
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
