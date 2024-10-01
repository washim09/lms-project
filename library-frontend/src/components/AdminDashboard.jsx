import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddBookForm from "./AddBookForm"; 
import EditBookForm from "./EditBookForm"; 

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null); // Track the book being edited
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const navigate = useNavigate();

  // Fetch books with token validation and redirect if not present
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login"); // Redirect to login if token is missing
    } else {
      fetchBooks(token);
    }
  }, [navigate]);

  // Function to fetch books
  const fetchBooks = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/books", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      if (error.response && error.response.status === 401) {
        // Token is invalid, redirect to login
        localStorage.removeItem("token"); // Remove invalid token
        navigate("/admin/login");
      }
    }
  };

  // Handle when edit is clicked
  const handleEditClick = (book) => {
    setEditingBook(book); // Pass book data to edit form
  };

  // Handle saving the updated book
  const handleBookSaved = (updatedBook) => {
    setBooks(books.map(book => (book._id === updatedBook._id ? updatedBook : book)));
    setEditingBook(null); // Close edit modal after saving
  };

  // Handle adding a new book
  const handleBookAdded = (newBook) => {
    // Automatically fetch the updated book list or add the book to the state
    fetchBooks(localStorage.getItem("token"));
    setShowAddBookForm(false); // Hide the add book form after adding a book
  };

  // Handle deletion with confirmation
  const handleDeleteClick = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the delete request
          },
        });
        setBooks(books.filter(book => book._id !== bookId));
      } catch (error) {
        console.error("Error deleting the book:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-1/6 bg-blue-400 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">MATERIAL DASHBOARD</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/admin/dashboard" className="text-white">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/logout" className="text-white">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="w-5/6 p-4">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <button
            onClick={() => setShowAddBookForm(!showAddBookForm)} // Toggle the form visibility
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {showAddBookForm ? "CLOSE FORM" : "ADD BOOK"}
          </button>
        </header>

        {showAddBookForm && <AddBookForm onBookAdded={handleBookAdded} />}
        {editingBook && (
          <EditBookForm
            book={editingBook}
            onBookSaved={handleBookSaved}
            onCancel={() => setEditingBook(null)}
          />
        )}

        <h3 className="text-2xl font-bold mb-4">Books List</h3>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Author</th>
              <th className="py-2 px-4 border">Availability</th>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Created At</th>
              <th className="py-2 px-4 border">Updated At</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? books.map((book) => (
              // Add a check for undefined or missing _id
              book && book._id ? (
                <tr key={book._id}>
                  <td className="py-2 px-4 border">{book._id}</td>
                  <td className="py-2 px-4 border">{book.name}</td>
                  <td className="py-2 px-4 border">{book.author}</td>
                  <td className="py-2 px-4 border">{book.availabilityStatus}</td>
                  <td className="py-2 px-4 border">
                    {book.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${book.image}`}
                        alt={book.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td className="py-2 px-4 border">{new Date(book.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">{new Date(book.updatedAt).toLocaleDateString()}</td>
                  <td className="py-6 px-4 border flex space-x-2">
                    <button
                      onClick={() => handleEditClick(book)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(book._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ) : null // Handle missing book._id gracefully
            )) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No books available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminDashboard;
