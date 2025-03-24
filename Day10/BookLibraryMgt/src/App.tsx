import React from "react";
import { BookProvider } from "./BookContext";
import BookList from "./BookList";
import AddBookForm from "./AddBookForm";

const App: React.FC = () => {
  return (
    <BookProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Book Library</h1>
        <AddBookForm />
        <BookList />
      </div>
    </BookProvider>
  );
};

export default App;
