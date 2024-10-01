import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBookForm = ({ selectedBook, onBookUpdated, onBookAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    availabilityStatus: 'Available',
    image: null,
  });

  // Populate the form with the selected book's data when editing
  useEffect(() => {
    if (selectedBook) {
      setFormData({
        name: selectedBook.name,
        author: selectedBook.author,
        availabilityStatus: selectedBook.availabilityStatus,
        image: null, // Don't populate the file input
      });
    }
  }, [selectedBook]);

  // Handle input change for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image input separately
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Set image file
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        throw new Error('No token found');
      }
  
      const bookData = new FormData();
      bookData.append('name', formData.name);  // Use formData state
      bookData.append('author', formData.author);  // Use formData state
      bookData.append('availabilityStatus', formData.availabilityStatus);  // Use formData state
      bookData.append('image', formData.image); // Assuming image is part of the form
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,  // Add the token here
        },
      };
  
      const response = await axios.post('http://localhost:5000/api/books/add', bookData, config);
  
      if (response.status === 200) {
        console.log('Book added successfully!');
        // Optionally clear the form or handle success response
        onBookAdded(); // If you want to trigger any parent component function
        setFormData({
          name: '',
          author: '',
          availabilityStatus: 'Available',
          image: null,
        });
      }
    } catch (error) {
      console.error('Error adding/updating book:', error.response?.data || error.message);
    }
  };  

  return (
    <div className="p-6 bg-gray-800 shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold mb-4 text-white">{selectedBook ? 'Edit Book' : 'Add Book'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Book Name"
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <select
          name="availabilityStatus"
          value={formData.availabilityStatus}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
          {selectedBook ? 'Update Book' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
