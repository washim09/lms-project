// routes/transactionRoutes.js
const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Record a transaction
router.post('/record', async (req, res) => {
  const { userId, bookId, dueDate, transactionType } = req.body;
  try {
    const newTransaction = new Transaction({
      user: userId,
      book: bookId,
      dueDate,
      transactionType,
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
