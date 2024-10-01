import React, { useState } from "react";
import axios from "axios";

const EditBookForm = ({ book, onBookSaved, onCancel }) => {
  const [editFormData, setEditFormData] = useState({
    name: book.name,
    author: book.author,
    availabilityStatus: book.availabilityStatus,
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setEditFormData({
      ...editFormData,
      image: e.target.files[0],
    });
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", editFormData.name);
    formData.append("author", editFormData.author);
    formData.append("availabilityStatus", editFormData.availabilityStatus);
    if (editFormData.image) {
      formData.append("image", editFormData.image);
    }
  
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
  
      const response = await axios.put(
        `http://localhost:5000/api/books/${book._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
  
      onBookSaved(response.data); // Call the callback function to handle the updated book data
    } catch (error) {
      console.error("Error saving the updated book:", error.response?.data || error.message);
    }
  };  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl mb-4">Edit Book</h2>
        <form onSubmit={handleSaveClick}>
          <div className="mb-4">
            <label className="block text-gray-700">Book Name</label>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={editFormData.author}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Availability</label>
            <select
              name="availabilityStatus"
              value={editFormData.availabilityStatus}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3"
              required
            >
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Book Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookForm;
