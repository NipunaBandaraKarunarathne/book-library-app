"use client";

import { useState, useEffect } from "react";
import NavBar from "@/components/templates/NavBar";
import BookList from "@/components/organisms/BookList";
import BookForm from "@/components/organisms/BookForm";
import { Book } from "@/types/book";
import DeleteDialog from "@/components/molecules/DeleteDialog";
import { deleteBook, getBooksPaginated } from "@/services/bookService";
import ToastContainer from "@/components/molecules/ToastContainer";
import { useToast } from "@/hooks/useToast";
import Pagination from "@/components/molecules/Pagination";

const PAGE_SIZE = 6;

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [addingBook, setAddingBook] = useState(false);

  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const { toasts, addToast } = useToast();

  // Pagination
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBooks(page, search); // send search term
  }, [page, search]);

  /** Fetch books for current page */
  async function fetchBooks(pageNo = page, searchTerm = search) {
    try {
      const { books: fetchedBooks, total } = await getBooksPaginated(
        pageNo,
        PAGE_SIZE,
        searchTerm
      );

      setBooks(fetchedBooks);
      setTotal(total);
    } catch (error: any) {
      console.error("fetchBooks error:", error);
      addToast(error.message || "Failed to load books", "error");
    }
  }

  const refresh = () => fetchBooks(page);

  /** Delete book */
  async function handleDeleteConfirm() {
    if (!bookToDelete) return;

    try {
      await deleteBook(bookToDelete.id);
      addToast("Book deleted successfully!", "success");

      if (books.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        refresh();
      }

      setBookToDelete(null);
    } catch (err) {
      console.error(err);
      addToast("Failed to delete book", "error");
    }
  }

  /** Add new book */
  async function handleAddSuccess(newBook: Book) {
    addToast("Book added successfully!", "success");

    if (!newBook.createdAt) {
      newBook.createdAt = new Date().toISOString();
    }

    // add to top of first page
    if (page === 1) {
      setBooks((prev) => [newBook, ...prev.slice(0, PAGE_SIZE - 1)]);
    }

    setTotal((prev) => prev + 1);

    // Fetch first page from backend to sync
    setPage(1);
    fetchBooks(1);

    setAddingBook(false);
  }

  /** Edit book */
  async function handleEditSuccess(updatedBook: Book) {
    addToast("Book updated successfully!", "success");

    // Keep current page and refresh
    fetchBooks(page);

    setEditingBook(null);
  }

  return (
    <>
      <NavBar
        view={view}
        onToggleView={() => setView(view === "grid" ? "list" : "grid")}
        // onSearch={setSearch}
        onSearch={(val) => {
          setSearch(val);
          setPage(1); // reset to first page for new search
        }}
      />

      <main className="p-4">
        <BookList
          books={books}
          total={total}
          view={view}
          search={search}
          onAdd={() => setAddingBook(true)}
          onEdit={(book) => setEditingBook(book)}
          onDelete={(book) => setBookToDelete(book)}
          onToggleView={() => setView(view === "grid" ? "list" : "grid")}
        />

        <Pagination
          page={page}
          total={total}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </main>

      {/* ADD BOOK */}
      {addingBook && (
        <BookForm
          onClose={() => setAddingBook(false)}
          onSuccess={handleAddSuccess}
        />
      )}

      {/* EDIT BOOK */}
      {editingBook && (
        <BookForm
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSuccess={handleEditSuccess}
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
