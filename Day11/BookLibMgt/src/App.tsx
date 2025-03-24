import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './BookList';
import EditBookPage from "./EditBookPage";
import AddBookForm from "./AddBookForm";
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add-book" element={<AddBookForm />} />
        <Route path="/edit-book/:id" element={<EditBookPage />} />
      </Routes>
    </Router>
  );
};

export default App;
