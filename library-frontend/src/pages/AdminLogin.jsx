// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = ({ setAuth }) => {
  
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
  
//   const navigate = useNavigate();  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const loginDetails = { username, password };
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/admin/login', loginDetails);
//       console.log('Login successful:', response.data);
  
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);  
//         navigate('/admin/dashboard');  
//       }
//     } catch (error) {
//       console.log('Login failed:', error);
//     }
//   };
  
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}  
//             placeholder="Username"
//             className="block w-full p-2 mb-4 border border-gray-300 rounded"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}  
//             placeholder="Password"
//             className="block w-full p-2 mb-4 border border-gray-300 rounded"
//             required
//           />
//           <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">Login</button>
//         </form>
//         {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      console.log('Login successful:', response.data);
      navigate('/admin/dashboard'); // Redirect to the admin dashboard upon successful login
    } catch (err) {
      setError('Invalid credentials, please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="block w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="block w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
