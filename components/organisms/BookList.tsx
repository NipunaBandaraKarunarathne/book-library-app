"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import { getBooks } from "@/services/bookService";
import BookCard from "./BookCard";

interface Props {
  view: "grid" | "list";
  search: string;
  onEdit: (book: Book) => void;
  updatedBook?: Book | null;
}

export default function BookList({
  view,
  search,
  onEdit,
  updatedBook,
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
    if (updatedBook) {
      setBooks((prev) =>
        prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
      );
    }
  }, [updatedBook]);

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
        />
      ))}
    </section>
  );
}

