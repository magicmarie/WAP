import { useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { booksAtom, fetchBooksAtom, loadingAtom, errorAtom } from "./atoms";
import SingleBook from "./SingleBook";

const BookList = () => {
  const [books] = useAtom(booksAtom);
  const [, fetchBooks] = useAtom(fetchBooksAtom);
  const [loading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center bg-gray-800 text-white p-4 mb-4 rounded-lg">
        <h1 className="text-xl font-bold">Book Library</h1>
        <button
          type="button"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/add-book")} // Navigate to AddBook page
        >
          Add Book
        </button>
      </nav>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <SingleBook key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
