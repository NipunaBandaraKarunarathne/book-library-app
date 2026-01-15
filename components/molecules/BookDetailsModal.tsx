"use client";

import { Book } from "@/types/book";
import { IoClose } from "react-icons/io5";
import RatingStars from "@/components/molecules/RatingStars";

interface Props {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDetailsModal({ book, isOpen, onClose }: Props) {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg relative animate-scale-in">
        {/* Stylish Close Button */}
        <button
          className="
            absolute top-3 right-3
            w-10 h-10 flex items-center justify-center
            rounded-full
            bg-red-100 text-red-600
            hover:bg-red-200 hover:text-red-700
            shadow-md
            transition
            focus:outline-none focus:ring-2 focus:ring-red-400
          "
          onClick={onClose}
          aria-label="Close modal"
        >
          <IoClose size={24} />
        </button>

        <img
          src={book.coverUrl || "https://picsum.photos/200/300?1"}
          alt={book.title}
          className="rounded-md mb-4 w-full h-64 object-cover"
        />
        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-600 mb-1">Author: {book.author}</p>
        <p className="text-gray-600 mb-1">Category: {book.category}</p>
        <span className="text-gray-600 mb-1">
          Rating: <RatingStars value={book.rating} />
        </span>
      </div>
    </div>
  );
}

