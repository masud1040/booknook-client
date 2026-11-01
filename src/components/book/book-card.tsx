
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Library } from "lucide-react";

import type { IBook } from "@/lib/types/book";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface BookCardProps {
  book: IBook;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      {/* Book Image */}
      <Link
        href={`/books/${book._id}`}
        className="relative block bg-slate-50 p-4"
      >
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white">
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <Badge className="absolute left-7 top-7 rounded-full bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">
          NEW ARRIVAL
        </Badge>
      </Link>

      {/* Book Information */}
      <CardContent className="space-y-4 p-5">
        <div className="space-y-2">
          <Badge
            variant="secondary"
            className="bg-blue-50 text-xs font-semibold uppercase tracking-wider text-blue-700"
          >
            {book.category}
          </Badge>

          <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700">
            {book.title}
          </h3>

          <p className="line-clamp-1 text-sm text-slate-500">
            By {book.author}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Library className="size-4 text-blue-600" />
            <span>Available</span>
          </div>

          <span
            className={`text-sm font-semibold ${
              book.availableCopies > 0
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >
            {book.availableCopies > 0
              ? `${book.availableCopies} Copies`
              : "Unavailable"}
          </span>
        </div>

        <Button
          asChild
          className="w-full rounded-xl bg-slate-900 font-semibold text-white hover:bg-blue-700"
        >
          <Link href={`/books/${book._id}`}>
            <BookOpen className="mr-2 size-4" />
            View Details
            <ArrowUpRight className="ml-auto size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
