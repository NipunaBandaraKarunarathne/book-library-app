import { Book } from "@/types/book";
import RatingStars from "@/components/molecules/RatingStars";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface Props {
  book: Book;
  view: "grid" | "list";
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export default function BookCard({ book, view, onEdit, onDelete }: Props) {
  return (
    <article
      className={`relative rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg ${
        view === "grid"
          ? "flex flex-col"
          : "flex items-start gap-4"
      }`}
    >
      {/* Actions */}
      <div className="absolute right-3 top-3 flex gap-2">
        <button
          onClick={() => onEdit(book)}
          className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100"
        >
           <FiEdit size={16} />
        </button>
        <button
          onClick={() => onDelete(book)}
          className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
        >
          <FiTrash2 size={16} />
        </button>
      </div>

      {/* Cover */}
      <img
         src={book.coverUrl || "https://picsum.photos/200/300?1"}
        alt={book.title}
        className={`rounded-md object-cover ${
          view === "grid"
            ? "mb-3 h-48 w-full"
            : "h-32 w-24 flex-shrink-0"
        }`}
      />

      {/* Details */}
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-gray-800">
          {book.title}
        </h3>

        <p className="text-sm text-gray-600">{book.author}</p>

        <RatingStars value={book.rating} />

        <span className="mt-1 inline-block w-fit rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
          {book.category}
        </span>
      </div>
    </article>
  );
}

