// routes/adminAuthRoutes.js
const express = require('express');
const Admin = require('../models/Admin'); // Ensure this path is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Admin registration
// router.post('/register', async (req, res) => {
//   const { username, name, email, password, contactNumber } = req.body;

//   // Validate request
//   if (!username || !name || !email || !password || !contactNumber) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     // Check if email already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     // Create new admin
//     const newAdmin = new Admin({ username, name, email, password, contactNumber });
//     await newAdmin.save();
//     res.status(201).json({ message: 'Admin registered successfully' });
//   } catch (error) {
//     console.error('Error registering admin:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Admin login
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Please provide both username and password' });
//   }

//   try {
//     const admin = await Admin.findOne({ username });
//     if (!admin) {
//       return res.status(400).json({ message: 'Invalid username or password' });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid username or password' });
//     }

//     res.status(200).json({ message: 'Login successful', admin, role: 'admin' }); 
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

module.exports = router;
