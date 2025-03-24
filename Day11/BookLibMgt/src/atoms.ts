import { atom } from "jotai";
import type { Book } from "./Interfaces";

// API Base URL
const API_URL = "https://67d17ef590e0670699ba5929.mockapi.io/books?";

// Atoms
const booksAtom = atom<Book[]>([]);
const loadingAtom = atom<boolean>(false);
const errorAtom = atom<string | null>(null);
const titleAtom = atom("");
const authorAtom = atom("");
const newTitleAtom = atom("");
const newAuthorAtom = atom("");

// Fetch books on initialization
// the docs say it's a convention to pass `null` for the first argument for read/write ops
const fetchBooksAtom = atom(null, async (_get, set) => {
  set(loadingAtom, true);
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    set(booksAtom, data);
  } catch {
    set(errorAtom, "Failed to fetch books");
  } finally {
    set(loadingAtom, false);
  }
});

const addBookAtom = atom(null, async (get, set, book: Omit<Book, "id">) => {
  set(loadingAtom, true);
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    const newBook = await response.json();
    set(booksAtom, [newBook, ...get(booksAtom)]);
  } catch {
    set(errorAtom, "Failed to add book");
  } finally {
    set(loadingAtom, false);
  }
});

const updateBookAtom = atom(null, async (get, set, { id, updatedBook }: { id: string; updatedBook: Omit<Book, "id"> }) => {
  set(loadingAtom, true);
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });

    set(
      booksAtom,
      get(booksAtom).map((book) => (book.id === id ? { id, ...updatedBook } : book))
    );
  } catch {
      set(errorAtom, "Failed to update book");
  } finally {
      set(loadingAtom, false);
  }
});

const deleteBookAtom = atom(null, async (get, set, id: string) => {
  set(loadingAtom, true);
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    set(booksAtom, get(booksAtom).filter((book) => book.id !== id));
  } catch {
    set(errorAtom, "Failed to delete book");
  } finally {
    set(loadingAtom, false);
  }
});

export {
  addBookAtom,
  authorAtom,
  booksAtom,
  deleteBookAtom,
  errorAtom,
  fetchBooksAtom,
  loadingAtom,
  newAuthorAtom,
  newTitleAtom,
  titleAtom,
  updateBookAtom,
};
