"use client";

import { useEffect, useState } from "react";
import { addBook, updateBook } from "@/services/bookService";
import { Book } from "@/types/book";
import RatingStars from "@/components/molecules/RatingStars";

interface Props {
  book?: Book;
  onSuccess: (book: Book) => void;
  onClose: () => void;
}

export default function BookForm({ book, onSuccess, onClose }: Props) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    coverUrl: "",
  });

  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        category: book.category,
        coverUrl: book.coverUrl,
      });
      setRating(book.rating);
    } else {
      setForm({
        title: "",
        author: "",
        category: "",
        coverUrl: "",
      });
      setRating(1);
    }
  }, [book]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title || !form.author) {
      setError("Title and Author are required");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    try {
      setLoading(true);

      const payload = { ...form, rating };

      const savedBook = book
        ? await updateBook({ ...book, ...payload })
        : await addBook(payload);

      onSuccess(savedBook);
      onClose();
    } catch {
      setError("Failed to save book");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        {/* Header */}
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          {book ? "Edit Book" : "Add New Book"}
        </h2>

        {/* Error */}
        {error && (
          <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Title */}
        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
           // placeholder="Book title"
            className="w-full  text-black rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Author */}
        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            //placeholder="Author name"
            className="w-full text-black rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Rating
          </label>
          <RatingStars value={rating} editable onChange={setRating} />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
          //  placeholder="Category"
            className="w-full text-black rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Cover URL */}
        <div className="mb-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Cover Image URL
          </label>
          <input
            name="coverUrl"
            value={form.coverUrl}
            onChange={handleChange}
            placeholder="https://example.com/cover.jpg"
            className="w-full text-black rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
