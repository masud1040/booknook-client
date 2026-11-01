
import Image from "next/image";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

import type { IBook } from "@/lib/types/book";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditBookDialog } from "./edit-book-dialog";
import { DeleteBookDialog } from "./delete-book-dialog";

// import { EditBookDialog } from "./edit-book-dialog";
// import { DeleteBookDialog } from "./delete-book-dialog";

interface MyBookCardProps {
  book: IBook;
}

export function MyBookCard({ book }: MyBookCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center">

      {/* Book Image */}
      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-slate-50 sm:h-28 sm:w-24">
        <Image
          src={book.image}
          alt={book.title}
          fill
          sizes="96px"
          className="object-contain p-2"
        />
      </div>

      {/* Book Information */}
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">
            {book.category}
          </Badge>

          <Badge
            variant="outline"
            className={
              book.availableCopies > 0
                ? "border-emerald-200 text-emerald-600"
                : "border-red-200 text-red-500"
            }
          >
            {book.availableCopies > 0 ? "Available" : "Unavailable"}
          </Badge>
        </div>

        <h2 className="truncate text-lg font-bold text-slate-900">
          {book.title}
        </h2>

        <p className="text-sm text-slate-500">
          By {book.author}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          <span>Total: {book.totalCopies} copies</span>
          <span>Available: {book.availableCopies} copies</span>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex shrink-0 items-center justify-end gap-2 border-t border-slate-100 pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">

        {/* View */}
        <Button
          asChild
          variant="outline"
          size="icon"
          className="size-10 rounded-xl text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          title="View Book"
        >
          <Link href={`/books/${book._id}`}>
            <Eye className="size-4" />
          </Link>
        </Button>

        {/* Edit */}
        <EditBookDialog book={book} />

        {/* Delete */}
        <DeleteBookDialog
          bookId={book._id}
          bookTitle={book.title}
        />

      </div>
    </div>
  );
}
