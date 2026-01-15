import { Book } from "@/types/book";
import RatingStars from "@/components/molecules/RatingStars";

interface Props {
  book: Book;
  view: "grid" | "list";
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export default function BookCard({ book, view, onEdit, onDelete }: Props) {
  console.log("Rendering BookCard for:", book);
  return (
    <article className={`book-card ${view}`}>
      <img src={book.coverUrl} alt={book.title} />

      <div className="details">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <RatingStars value={book.rating} /> 
        <span>{book.category}</span>

         <div className="actions">
          <button onClick={() => onEdit(book)}>Edit</button>
          <button onClick={() => onDelete(book)}>Delete</button>
        </div>
      </div>
    </article>
  );
}
