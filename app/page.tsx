

// "use client";

// import { useState } from "react";
//  import NavBar from "@/components/templates/NavBar";
//  import BookList from "@/components/organisms/BookList";
// import BookForm from "@/components/organisms/BookForm";
// import { Book } from "@/types/book";
// import { IoAddCircle } from "react-icons/io5";

// export default function HomePage() {
//   const [view, setView] = useState<"grid" | "list">("grid");
//   const [search, setSearch] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [newBook, setNewBook] = useState<Book | null>(null);

//   return (
//     <>
//       <NavBar
//         view={view}
//         onToggleView={() => setView(view === "grid" ? "list" : "grid")}
//         onSearch={setSearch}
//       />

//       <main style={{ padding: "1rem" }}>
//         <button onClick={() => setShowForm(true)}><IoAddCircle />Add</button>

//         <BookList view={view} search={search} newBook={newBook} />
//       </main>

//       {showForm && (
//         <BookForm
//           onClose={() => setShowForm(false)}
//           onSuccess={(book) => setNewBook(book)}
//         />
//       )}
//     </>
//   );
// }

"use client";

import { useState } from "react";
 import NavBar from "@/components/templates/NavBar";
 import BookList from "@/components/organisms/BookList";
import BookForm from "@/components/organisms/BookForm";
import { Book } from "@/types/book";
import { IoAddCircle } from "react-icons/io5";

export default function HomePage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [updatedBook, setUpdatedBook] = useState<Book | null>(null);

  return (
    <>
      <NavBar
        view={view}
        onToggleView={() => setView(view === "grid" ? "list" : "grid")}
        onSearch={setSearch}
      />

      <main style={{ padding: "1rem" }}>
        <BookList
          view={view}
          search={search}
          onEdit={(book) => setEditingBook(book)}
          updatedBook={updatedBook}
        />
      </main>

      {editingBook && (
        <BookForm
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSuccess={(book) => setUpdatedBook(book)}
        />
      )}
    </>
  );
}
