
import { BooksGrid } from "./books-grid";
import type { IBook } from "@/lib/types/book";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

async function RecentBooks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recent books");
  }

  const books: IBook[] = await res.json();

  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Discover Your Next Read
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Fresh From The Shelf
            </h2>

            <p className="mt-3 max-w-xl text-slate-500">
              Explore the latest additions to our library
              and find your next favorite book.
            </p>
          </div>

          <Button
          
            variant="outline"
            className="w-fit rounded-xl border-slate-300"
          >
            <Link href="/books">
              Explore All Books
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        {/* Books */}
        <BooksGrid books={books} />
      </div>
    </section>
  );
}

export default RecentBooks;
