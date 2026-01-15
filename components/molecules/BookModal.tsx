"use client";

import { Modal } from "flowbite-react";
import { Book } from "@/types/book";
import BookForm from "@/components/organisms/BookForm";


interface Props {
  open: boolean;
  onClose: () => void;
  book?: Book;
  onSuccess: (book: Book) => void;
}

export default function BookModal({ open, onClose, book, onSuccess }: Props) {
  return (
    <Modal show={open} onClose={onClose}>
      <div className="book-modal">
        <h2>{book ? "Edit Book" : "Add New Book"}</h2>

        <BookForm
          book={book}
          onSuccess={(savedBook) => {
            onSuccess(savedBook);
            onClose();
          }}
            onClose={onClose}
        />

        <div className="actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
