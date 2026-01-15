"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import { getBooks } from "@/services/bookService";
import BookCard from "./BookCard";

interface Props {
  view: "grid" | "list";
  search: string;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  deletedBookId?: number | null;
  onUpdate?: (updatedBook: Book) => void; // new callback
}


export default function BookList({
  view,
  search,
  onEdit,
  onDelete,
  deletedBookId,
}: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (deletedBookId) {
      setBooks((prev) => prev.filter((b) => b.id !== deletedBookId));
    }
  }, [deletedBookId]);

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading books...</p>;

  return (
    <section className={`book-list ${view}`}>
      {filtered.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          view={view}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

