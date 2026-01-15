import { Book } from "@/types/book";

const API_URL = "http://localhost:4000/books";

export async function getBooks(): Promise<Book[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
}

export async function addBook(book: Omit<Book, "id">): Promise<Book> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  if (!res.ok) throw new Error("Failed to add book");
  return res.json();
}

export async function updateBook(book: Book): Promise<Book> {
  const res = await fetch(`${API_URL}/${book.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  if (!res.ok) {
    throw new Error("Failed to update book");
  }

  return res.json();
}

export async function deleteBook(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete book");
  }
}