import { Book } from "@/types/book";

interface Props {
  book: Book;
  view: "grid" | "list";
  onEdit: (book: Book) => void;
}

export default function BookCard({ book, view, onEdit }: Props) {
  return (
    <article className={`book-card ${view}`}>
      <img src={book.coverUrl} alt={book.title} />

      <div className="details">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>⭐ {book.rating}</p>
        <span>{book.category}</span>

        <button onClick={() => onEdit(book)}>✏️ Edit</button>
      </div>
    </article>
  );
}
