// models/Transaction.js
const mongoose = require('mongoose');

// Define the schema for a Transaction
const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
    enum: ['borrowed', 'returned'],
  },
});

// Create a model from the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

// Export the model
module.exports = Transaction;
