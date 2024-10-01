const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create Admin function (registration)
const createAdmin = async (req, res) => {
  try {
    const { username, name, email, password, contactNumber } = req.body;

    if (!username || !name || !email || !password || !contactNumber) {
      return res.status(400).json({ error: 'Please fill all required fields' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      name,
      email,
      password: hashedPassword,  // Save hashed password
      contactNumber,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Login Admin function
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the admin exists with the provided username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    console.log('Admin found:', admin);

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, admin.password);

    console.log('Password valid:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // If password is valid, generate a token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response with token
    return res.status(200).json({
      message: 'Login successful',
      token,
      role: 'admin',
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { createAdmin, loginAdmin };
