
import type { IBook } from "@/lib/types/book";
import { MyBookCard } from "./my-book-card";

interface MyBooksGridProps {
  books: IBook[];
}

export function MyBooksGrid({ books }: MyBooksGridProps) {
  if (books.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">
          No Books Added Yet
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Start building your collection by adding your first book.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {books.length} {books.length === 1 ? "Book" : "Books"} Added
        </p>

        <p className="text-xs text-slate-400">
          Manage your collection
        </p>
      </div>

      {books.map((book) => (
        <MyBookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
