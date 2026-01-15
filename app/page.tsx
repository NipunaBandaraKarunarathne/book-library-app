"use client";

import { useState, useEffect } from "react";
import NavBar from "@/components/templates/NavBar";
import BookList from "@/components/organisms/BookList";
import BookForm from "@/components/organisms/BookForm";
import { Book } from "@/types/book";
import DeleteDialog from "@/components/molecules/DeleteDialog";
import { deleteBook, getBooks } from "@/services/bookService";
import ToastContainer from "@/components/molecules/ToastContainer";
import { useToast } from "@/hooks/useToast";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [addingBook, setAddingBook] = useState(false);

  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const { toasts, addToast } = useToast();

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      console.error(err);
      addToast("Failed to fetch books", "error");
    }
  }

  async function handleDeleteConfirm() {
    if (!bookToDelete) return;

    try {
      await deleteBook(bookToDelete.id);
      setBooks((prev) => prev.filter((b) => b.id !== bookToDelete.id));
      addToast("Book deleted successfully!", "success");
      setBookToDelete(null);
    } catch (err) {
      console.error(err);
      addToast("Failed to delete book", "error");
    }
  }

  return (
    <>
      <NavBar
        view={view}
        onToggleView={() => setView(view === "grid" ? "list" : "grid")}
        onSearch={setSearch}
      />

      <main className="p-4">
        <BookList
          books={books}
          view={view}
          search={search}
          onAdd={() => setAddingBook(true)}
          onEdit={(book) => setEditingBook(book)}
          onDelete={(book) => setBookToDelete(book)}
          onToggleView={() => setView(view === "grid" ? "list" : "grid")}
        />
      </main>

      {/* ADD BOOK */}
      {addingBook && (
        <BookForm
          onClose={() => setAddingBook(false)}
          onSuccess={(newBook) => {
            setBooks((prev) => [...prev, newBook]);
            addToast("Book added successfully!", "success");
            setAddingBook(false);
          }}
        />
      )}

      {/* EDIT BOOK */}
      {editingBook && (
        <BookForm
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSuccess={(updatedBook) => {
            setBooks((prev) =>
              prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
            );
            addToast("Book updated successfully!", "success");
            setEditingBook(null);
          }}
        />
      )}

      {/* DELETE CONFIRM */}
      {bookToDelete && (
        <DeleteDialog
          title={bookToDelete.title}
          onCancel={() => setBookToDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {/* Toasts */}
      <ToastContainer toasts={toasts} />
    </>
  );
}
