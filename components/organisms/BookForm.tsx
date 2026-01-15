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
  // Form fields
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    coverUrl: "",
  });

  // Rating state (separate)
  const [rating, setRating] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Sync form & rating when editing or adding
  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        category: book.category,
        coverUrl: book.coverUrl,
      });
      setRating(book.rating); // important for edit
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

        <label>Rating</label>
        <RatingStars value={rating} editable onChange={setRating} />

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
