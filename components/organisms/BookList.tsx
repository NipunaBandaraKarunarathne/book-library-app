"use client";

import { Book } from "@/types/book";
import BookCard from "./BookCard";
import { IoGrid, IoList } from "react-icons/io5";
import BookDetailsModal from "@/components/molecules/BookDetailsModal";

import { useState } from "react";

interface Props {
  books: Book[];
  view: "grid" | "list";
  search: string;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onAdd: () => void;
  onToggleView: () => void;
}

export default function BookList({
  books,
  view,
  search,
  onEdit,
  onDelete,
  onAdd,
  onToggleView,
}: Props) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="space-y-6">
      {/* Top bar: Book count + Add + View toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Book count */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex-1 min-w-[120px]">
          Books <span className="text-blue-600">{filtered.length}</span>
        </h2>

        {/* Buttons group */}
        <div className="flex gap-2">
          {/* Add button */}
          <button
            onClick={onAdd}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Book
          </button>

          {/* Grid/List toggle */}
          <button
            onClick={onToggleView}
            className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Toggle view"
          >
            {view === "grid" ? <IoList size={20} /> : <IoGrid size={20} />}
          </button>
        </div>
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
            onSelect={setSelectedBook} 
          />
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-500 text-center py-4">No books found.</p>
        )}
      </div>

         {/* Modal */}
      <BookDetailsModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </section>
  );
}
