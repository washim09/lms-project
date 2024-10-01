const bcrypt = require('bcryptjs');

const testPassword = async () => {
  // The plain password you want to test
  const plainPassword = '123456';

  // The hashed password from your database
  const hashedPassword = '$2a$10$P9yNUzgWju4jM78UaAL85eErYMo7kl8NP5lFYhE8gg7Ka1fDuwXo2'; // Paste your hashed password here

  // Compare the plain password with the hashed password
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  console.log('Password valid:', isMatch);
};

testPassword();
