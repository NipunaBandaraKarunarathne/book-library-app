"use client";

import { Book } from "@/types/book";
import BookCard from "./BookCard";
import { IoMdAdd } from "react-icons/io";

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
  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Book count */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex-1 min-w-[120px]">
          Books <span className="text-blue-600">{filtered.length}</span>
        </h2>

        {/* Add button */}
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-3 sm:px-4 py-2 text-white text-sm sm:text-base font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
      <IoMdAdd />
          Add Book
        </button>
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
