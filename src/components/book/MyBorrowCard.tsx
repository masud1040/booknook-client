
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

import type { IBorrow } from "@/lib/types/borrow";
import { ReturnBookButton } from "./return-book-button";


interface MyBorrowCardProps {
  borrow: IBorrow;
}

const MyBorrowCard = ({ borrow }: MyBorrowCardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center">

      {/* Book Image */}
      <Link
        href={`/books/${borrow.bookId}`}
        className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-slate-100"
      >
        <Image
          src={borrow.bookImage}
          alt={borrow.bookTitle}
          fill
          sizes="96px"
          className="object-contain p-2"
        />
      </Link>

      {/* Book Information */}
      <div className="min-w-0 flex-1">
        <Link
          href={`/books/${borrow.bookId}`}
          className="line-clamp-2 text-lg font-semibold text-slate-900 hover:text-blue-600"
        >
          {borrow.bookTitle}
        </Link>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">

          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            Borrowed:{" "}
            {new Date(borrow.borrowDate).toLocaleDateString("en-GB")}
          </span>

          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            Return:{" "}
            {new Date(borrow.returnDate).toLocaleDateString("en-GB")}
          </span>

        </div>
      </div>

      {/* Return Button */}
      <ReturnBookButton borrowId={borrow._id} />

    </div>
  );
};

export default MyBorrowCard;
