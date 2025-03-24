import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { useParams } from "react-router-dom";

import { booksAtom, fetchBooksAtom } from "./atoms";
import EditBookForm from "./EditBookForm";

const EditBookPage = () => {
  const { id } = useParams();
  const [books] = useAtom(booksAtom);
  const fetchBooks = useSetAtom(fetchBooksAtom);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (!id) return <p className="text-red-500">Invalid Book ID!</p>;

  const book = books.find((b) => b.id === id);

  if (!book) return <p className="text-red-500">Book not found!</p>;

  return (
    <EditBookForm
      id={book.id}
      title={book.title}
      author={book.author}
    />
  );
};

export default EditBookPage;
