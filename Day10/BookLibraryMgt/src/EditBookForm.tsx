import React, { useState } from "react";
import { useBookContext } from "./BookContext";
import { Props } from "./Interfaces";

const EditBookForm: React.FC<Props> = ({ id, title, author, closeForm }) => {
  const { updateBook } = useBookContext();
  const [newTitle, setNewTitle] = useState(title);
  const [newAuthor, setNewAuthor] = useState(author);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(id, { title: newTitle, author: newAuthor });
    closeForm(); // Close the edit form after saving
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label>
        Title:
        <input
          type="text"
          className="border p-2 rounded"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          className="border p-2 rounded"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          required
        />
      </label>
      <div className="flex justify-center gap-2">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
          Save
        </button>
        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={closeForm}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
