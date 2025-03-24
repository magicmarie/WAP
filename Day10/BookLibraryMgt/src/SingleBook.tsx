import React, { useState } from "react";
import { useBookContext } from "./BookContext";
import EditBookForm from "./EditBookForm";
import { Props } from "./Interfaces";

const SingleBook: React.FC<Props> = ({ id, title, author }) => {
  const { deleteBook } = useBookContext();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col h-full">
      {isEditing ? (
        <EditBookForm id={id} title={title} author={author} closeForm={() => setIsEditing(false)} />
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
              onClick={() => setIsEditing(true)}
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
