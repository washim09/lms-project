// routes/adminRoutes.js
const express = require('express');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { createAdmin, loginAdmin } = require('../controllers/adminController');


// POST /api/admin/auth/register - Register a new admin
router.post('/authMiddleware/register', createAdmin);

// POST /api/admin/login - Login Admin
router.post('/login', loginAdmin);

// Register new admin
router.post('/register', async (req, res) => {
  const { username, name, password, email, contactNumber } = req.body;
  try {
    const newAdmin = new Admin({ username, name, password, email, contactNumber });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login admin
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
