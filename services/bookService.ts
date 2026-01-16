import { Book } from "@/types/book";
import { API_URLS } from "@/constents/config";


const PAGE_SIZE = 6;

export async function getBooksPaginated(
  page: number,
  pageSize = 6,
  search?: string
) {
  try {
    const params = new URLSearchParams({
      _page: page.toString(),
      _limit: pageSize.toString(),
      _sort: "createdAt",
      _order: "desc", // newest first
    });

       // Add search query if provided
    if (search) {
      params.append("q", search); // JSON Server supports `q` for full-text search
    }

   // const res = await fetch(`http://localhost:4000/books?${params.toString()}`);
    const res = await fetch(`${API_URLS.BOOKS}?${params.toString()}`);
    if (!res.ok) throw new Error(`Failed to fetch books: ${res.statusText}`);

    const data = await res.json();
    const total = parseInt(res.headers.get("X-Total-Count") || "0");

    return { books: data, total };
  } catch (error: any) {
    console.error("getBooksPaginated error:", error);
    throw new Error(error.message || "Failed to fetch books");
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
