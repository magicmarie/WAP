import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { updateBookAtom, newAuthorAtom, newTitleAtom } from "./atoms";
import type { Props } from "./Interfaces";

const EditBookForm: React.FC<Props> = ({ id, title, author }) => {
  const [, updateBook] = useAtom(updateBookAtom);
  const [newTitle, setNewTitle] = useAtom(newTitleAtom);
  const [newAuthor, setNewAuthor] = useAtom(newAuthorAtom);
  const [, setIsEditing] = useState(false);

  useEffect(() => {
    setNewTitle(title);
    setNewAuthor(author);
  }, [title, author, setNewTitle, setNewAuthor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook({ id, updatedBook: { title: newTitle, author: newAuthor } });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(title);
    setNewAuthor(author);
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
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          onClick={handleCancel} // Trigger cancel
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
