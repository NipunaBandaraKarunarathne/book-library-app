"use client";

import { Book } from "@/types/book";
import BookCard from "./BookCard";
import { Button } from "flowbite-react";

interface Props {
  books: Book[];
  view: "grid" | "list";
  search: string;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onAdd: () => void;
}

export default function BookList({
  books,
  view,
  search,
  onEdit,
  onDelete,
  onAdd,
}: Props) {
  // Filter books by search
  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="space-y-4">
      {/* Top bar: Add button + count */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Books ({filtered.length})
        </h2>

    
        <Button outline type="button"  onClick={onAdd}>Add</Button>
      </div>

      {/* Book grid/list */}
      <div
        className={
          view === "grid"
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-3"
        }
      >
        {filtered.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            view={view}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No books found.
          </p>
        )}
      </div>
    </section>
  );
}


