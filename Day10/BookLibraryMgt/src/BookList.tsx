import React from "react";
import { useBookContext } from "./BookContext";
import SingleBook from "./SingleBook";

const BookList: React.FC = () => {
  const { books } = useBookContext();

  if (books.length === 0) {
    return <p className="text-center text-gray-600">No books available.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-center mb-4">List of Books</h1>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <SingleBook key={book.id} {...book} closeForm={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
