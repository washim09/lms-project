const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(403).json({ message: 'Unauthorized: Admins only' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized: Admins only' });
  }

  next();
};

module.exports = { verifyToken, isAdmin };
