// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  const { username, name, email, contactNumber } = req.body;
  try {
    const newUser = new User({ username, name, email, contactNumber });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
