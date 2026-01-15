"use client";

import { useState } from "react";
import NavBar from "@/components/templates/NavBar";
import BookList from "@/components/organisms/BookList";
import BookForm from "@/components/organisms/BookForm";
import { Book } from "@/types/book";
import DeleteDialog from "@/components/molecules/DeleteDialog";
import { deleteBook } from "@/services/bookService";

export default function HomePage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [addingBook, setAddingBook] = useState(false);

  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [deletedBookId, setDeletedBookId] = useState<number | null>(null);

  async function handleDeleteConfirm() {
    if (!bookToDelete) return;

    await deleteBook(bookToDelete.id);
    setDeletedBookId(bookToDelete.id);
    setBookToDelete(null);
  }

  return (
    <>
      <NavBar
        view={view}
        onToggleView={() => setView(view === "grid" ? "list" : "grid")}
        onSearch={setSearch}
        onAdd={() => setAddingBook(true)}
      />

      <main style={{ padding: "1rem" }}>
        <BookList
          view={view}
          search={search}
          onEdit={(book) => setEditingBook(book)}
          onDelete={(book) => setBookToDelete(book)}
          deletedBookId={deletedBookId}
        />
      </main>

      {/* ADD BOOK */}
      {addingBook && (
        <BookForm
          onClose={() => setAddingBook(false)}
          onSuccess={() => setAddingBook(false)}
        />
      )}

      {/* EDIT BOOK */}
      {editingBook && (
        <BookForm
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSuccess={() => setEditingBook(null)}
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
    </>
  );
}
