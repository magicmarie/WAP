import React, { useState } from "react";
import { useAtom } from "jotai";
import { deleteBookAtom, isEditingAtom } from "./atoms";
import EditBookForm from "./EditBookForm";
import type { Props } from "./Interfaces";

const SingleBook: React.FC<Props> = ({ id, title, author }) => {
  const [, deleteBook] = useAtom(deleteBookAtom);

  const [isEditing, setIsEditing] = useState(false);
  // const [isEditing, setIsEditing] = useAtom(isEditingAtom(id));

  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col h-full">
      {isEditing ? (
        <EditBookForm id={id} title={title} author={author} />
      ) : (
        <>
          <h2 className="text-lg font-semibold">
            {title.length > 100 ? `${title.slice(0, 100)}...` : title}
          </h2>
          <p className="text-gray-600">by {author}</p>

          <div className="mt-auto flex justify-center gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              type="button"
              onClick={() => setIsEditing(true)} // Only change the state for this specific book
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              type="button"
              onClick={() => deleteBook(id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleBook;
