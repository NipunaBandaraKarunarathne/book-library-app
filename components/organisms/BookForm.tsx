"use client";

import { useState } from "react";
import { addBook, updateBook } from "@/services/bookService";
import { Book } from "@/types/book";

interface Props {
  book?: Book; 
  onSuccess: (book: Book) => void;
  onClose: () => void;
}

export default function BookForm({ book, onSuccess, onClose }: Props) {
  const [form, setForm] = useState({
    title: book?.title || "",
    author: book?.author || "",
    rating: book?.rating || 1,
    category: book?.category || "",
    coverUrl: book?.coverUrl || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title || !form.author) {
      setError("Title and Author are required");
      return;
    }

    try {
      setLoading(true);

      const savedBook = book
        ? await updateBook({ ...book, ...form, rating: Number(form.rating) })
        : await addBook({ ...form, rating: Number(form.rating) });

      onSuccess(savedBook);
      onClose();
    } catch {
      setError("Failed to save book");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal">
      <form className="form" onSubmit={handleSubmit}>
        <h2>{book ? "Edit Book" : "Add Book"}</h2>

        {error && <p className="error">{error}</p>}

        <input
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          name="author"
          value={form.author}
          placeholder="Author"
          onChange={handleChange}
        />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleChange}
        />
        <input
          name="category"
          value={form.category}
          placeholder="Category"
          onChange={handleChange}
        />
        <input
          name="coverUrl"
          value={form.coverUrl}
          placeholder="Cover Image URL"
          onChange={handleChange}
        />

        <div className="actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
