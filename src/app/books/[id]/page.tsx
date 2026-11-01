import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Library,
  UserRound,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import type { IBook } from "@/lib/types/book";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BorrowBookButton } from "@/components/book/borrow-book-button";

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const book: IBook = await res.json();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">

        {/* Back Navigation */}
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="size-4" />
          Back to Books
        </Link>

        {/* Main Details */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="grid lg:grid-cols-[360px_1fr]">

            {/* Book Cover */}
            <div className="flex items-center justify-center bg-slate-100 p-8 sm:p-12">
              <div className="relative aspect-[3/4] w-full max-w-[270px] overflow-hidden rounded-xl bg-white shadow-xl">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 270px"
                  className="object-contain p-3"
                />
              </div>
            </div>

            {/* Book Information */}
            <div className="flex flex-col justify-center p-6 sm:p-10">

              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                  {book.category}
                </Badge>

                <Badge
                  variant="outline"
                  className={
                    book.availableCopies > 0
                      ? "border-emerald-200 text-emerald-600"
                      : "border-red-200 text-red-600"
                  }
                >
                  {book.availableCopies > 0
                    ? "Available"
                    : "Not Available"}
                </Badge>
              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                {book.title}
              </h1>

              <p className="mt-3 text-lg text-slate-500">
                By{" "}
                <span className="font-semibold text-slate-700">
                  {book.author}
                </span>
              </p>

              {/* Availability Information */}
              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Library className="size-4" />
                    Total Copies
                  </div>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {book.totalCopies}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <CheckCircle2 className="size-4" />
                    Available
                  </div>

                  <p className="mt-2 text-2xl font-bold text-emerald-600">
                    {book.availableCopies}
                  </p>
                </div>
              </div>

              {/* Borrow Action */}
              <div className="mt-7">
                <BorrowBookButton
                  bookId={book._id}
                  bookTitle={book.title}
                  bookImage={book.image}
                  availableCopies={book.availableCopies}
                  userEmail={session.user.email}
                />
              </div>

              <p className="mt-3 text-xs text-slate-400">
                You can borrow each book only once at a time.
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-slate-200 p-6 sm:p-10">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <BookOpen className="size-5 text-blue-600" />
              About This Book
            </h2>

            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
              {book.description}
            </p>

            {/* Added By */}
            <div className="mt-8 rounded-xl bg-slate-50 p-5">
              <h3 className="mb-4 text-sm font-semibold text-slate-800">
                Book Added By
              </h3>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <UserRound className="size-5" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Added By</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {book.userName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <CalendarDays className="size-5" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Date Added</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {new Date(book.dateAdded).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default BookDetailsPage;