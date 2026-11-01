
import { Suspense } from "react";

import { BooksGrid } from "@/components/book/books-grid";
import { BooksSkeleton } from "@/components/book/books-skeleton";
import type { IBook } from "@/lib/types/book";

async function AllBooks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const books: IBook[] = await res.json();

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
            Explore Our Collection
          </p>

          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            All Books
          </h1>

          <p className="mt-3 text-slate-500">
            Browse our complete collection of books.
          </p>
        </div>

        <BooksGrid books={books} />
      </div>
    </section>
  );
}

export default function AllBooksPage() {
  return (
    <main>
      <Suspense fallback={<BooksSkeleton />}>
        <AllBooks />
      </Suspense>
    </main>
  );
}
