
import type { IBook } from "@/lib/types/book";
import { BookCard } from "./book-card";

interface BooksGridProps {
  books: IBook[];
}

export function BooksGrid({ books }: BooksGridProps) {
  if (books.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
        <p className="text-lg font-semibold text-slate-700">
          No books found
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Books will appear here when they are added.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
