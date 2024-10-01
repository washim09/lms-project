import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch books (with or without token)
        const response = await axios.get("http://localhost:5000/api/books", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleIssueBook = async (bookId) => {
    // Handle issue book functionality (requires login)
  };

  const handleReturnBook = async (bookId) => {
    // Handle return book functionality (requires login)
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {books.map((book) => (
        <div key={book._id} className="bg-gray-900 text-white rounded-lg shadow-lg p-4">
          {book.image && (
            <div className="flex justify-center items-center w-full h-80 mb-4">
              <img
                src={`http://localhost:5000/uploads/${book.image}`}
                alt={book.name}
                className="object-contain max-h-full"
              />
            </div>
          )}
          <div className="flex justify-between">
            <h4 className="text-xl font-bold mb-2">{book.name}</h4>
            <p className="text-gray-400 mb-4">by {book.author}</p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => handleIssueBook(book._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 transition duration-300"
            >
              Issue
            </button>
            <button
              onClick={() => handleReturnBook(book._id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-400 transition duration-300"
            >
              Return
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
