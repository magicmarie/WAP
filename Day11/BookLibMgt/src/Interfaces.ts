// Define Book interface
export interface Book {
  id: string;
  title: string;
  author: string;
}

// Define Context Type
export interface BookContextType {
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => Promise<void>;
  updateBook: (id: number, updatedBook: Omit<Book, 'id'>) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}


export interface Props {
  id: string;
  title: string;
  author: string;
}
