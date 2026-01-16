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

  // Fetch books on page change
  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  /** Fetch paginated books with newest first */
 async function fetchBooks(pageNo = page) {
  try {
    const { books: fetchedBooks, total } = await getBooksPaginated(pageNo);
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

      // Refresh first page if current page is affected
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

  /** Add new book with optimistic update */
  function handleAddSuccess(newBook: Book) {
  addToast("Book added successfully!", "success");

  setPage(1);       // switch to first page
  fetchBooks(1);    // fetch newest books

  setAddingBook(false);
  }

  /** Edit book */
  function handleEditSuccess(updatedBook: Book) {
    setBooks((prev) =>
      prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );
    addToast("Book updated successfully!", "success");
    refresh();
    setEditingBook(null);
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
