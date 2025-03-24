import React, { createContext, useContext, useState, useEffect } from 'react';
import {Book, BookContextType } from "./Interfaces";

// Create Context
const BookContext = createContext<BookContextType | null>(null);

// API Base URL
const API_URL = "https://67d17ef590e0670699ba5929.mockapi.io/books?";

// Provider Component
export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch books when component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Add a new book (POST)
  const addBook = async (book: Omit<Book, 'id'>) => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      const newBook = await response.json();
      setBooks((prev) => [newBook, ...prev]);
    } catch (err) {
      setError("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  // Update a book (PUT)
  const updateBook = async (id: number, updatedBook: Omit<Book, 'id'>) => {
    try {
      setLoading(true);
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });
      setBooks((prev) =>
        prev.map((book) => (book.id === id ? { id, ...updatedBook } : book))
      );
    } catch (err) {
      setError("Failed to update book");
    } finally {
      setLoading(false);
    }
  };

  // Delete a book (DELETE)
  const deleteBook = async (id: number) => {
    try {
      setLoading(true);
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      setError("Failed to delete book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook, loading, error }}>
      {children}
    </BookContext.Provider>
  );
};

// Custom hook for accessing book context
export const useBookContext = () => useContext(BookContext)!;
