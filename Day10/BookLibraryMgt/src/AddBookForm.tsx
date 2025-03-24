import React, { useState } from "react";
import { useBookContext } from "./BookContext";
import './App.css';

const AddBookForm: React.FC = () => {
  const { addBook } = useBookContext();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    addBook({ title, author });
    setTitle("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <h2 className="text-lg font-semibold">Add New Book</h2>
      <input
        className="border p-2 rounded w-full"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mt-2"
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button
        className={`mt-3 px-3 py-1 rounded text-white ${
          !title.trim() || !author.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
        }`}
        type="submit"
        disabled={!title.trim() || !author.trim()}
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
