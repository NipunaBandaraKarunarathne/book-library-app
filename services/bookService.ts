import { Book } from "@/types/book";
import { API_URLS } from "@/constents/config";


const PAGE_SIZE = 6;

export async function getBooksPaginated(page: number) {
  try {
    const res = await fetch(
      `${API_URLS.BOOKS}?_page=${page}&_limit=${PAGE_SIZE}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch paginated books");
    }

    const books: Book[] = await res.json();

   
    const total = Number(res.headers.get("X-Total-Count"));

    console.log("TOTAL FROM HEADER:", total);

    return { books, total };
  } catch (error: any) {
    console.error("getBooksPaginated error:", error);
    throw error;
  }
}

export async function getBooks(): Promise<Book[]> {
  try {
    const res = await fetch(API_URLS.BOOKS);

    if (!res.ok) throw new Error(`Failed to fetch books: ${res.statusText}`);

    return res.json();
  } catch (error: any) {
    console.error("getBooks error:", error);
    throw new Error(error.message || "Failed to fetch books");
  }
}

export async function addBook(book: Omit<Book, "id">): Promise<Book> {
  try {
    const res = await fetch(API_URLS.BOOKS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    if (!res.ok) throw new Error(`Failed to add book: ${res.statusText}`);

    return res.json();
  } catch (error: any) {
    console.error("addBook error:", error);
    throw new Error(error.message || "Failed to add book");
  }
}

export async function updateBook(book: Book): Promise<Book> {
  try {
    const res = await fetch(`${API_URLS.BOOKS}/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    if (!res.ok) throw new Error(`Failed to update book: ${res.statusText}`);

    return res.json();
  } catch (error: any) {
    console.error("updateBook error:", error);
    throw new Error(error.message || "Failed to update book");
  }
}

export async function deleteBook(id: number): Promise<void> {
  try {
    const res = await fetch(`${API_URLS.BOOKS}/${id}`, { method: "DELETE" });

    if (!res.ok) throw new Error(`Failed to delete book: ${res.statusText}`);
  } catch (error: any) {
    console.error("deleteBook error:", error);
    throw new Error(error.message || "Failed to delete book");
  }
}
