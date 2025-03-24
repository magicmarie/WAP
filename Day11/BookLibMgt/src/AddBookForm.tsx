import React from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { addBookAtom, titleAtom, authorAtom } from "./atoms";

const AddBookForm: React.FC = () => {
  const [, addBook] = useAtom(addBookAtom);
  const [title, setTitle] = useAtom(titleAtom);
  const [author, setAuthor] = useAtom(authorAtom);
  const navigate = useNavigate(); // React Router hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return; // Don't submit empty fields

    addBook({ title, author });

    // Clear the title and author atoms after the form submission
    setTitle("");
    setAuthor("");

    navigate("/"); // Redirect to the book list after adding
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label>
        Title:
        <input
          type="text"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          className="border p-2 rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </label>
      <div className="flex justify-center gap-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Book
        </button>
      </div>
    </form>
  );
};

export default AddBookForm;
