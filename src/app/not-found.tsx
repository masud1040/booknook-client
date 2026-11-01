
import Link from "next/link";
import { BookOpen, Home, Search, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F4F7FB] px-4 py-16">
      <div className="w-full max-w-xl text-center">

        {/* Icon */}
        <div className="mx-auto mb-8 flex size-24 items-center justify-center rounded-3xl bg-blue-100 text-blue-600">
          <BookOpen className="size-12" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-extrabold tracking-tight text-blue-600 sm:text-9xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
          The page you are looking for might have been removed,
          had its name changed, or is temporarily unavailable.
          Let's get you back to your reading journey.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="h-12 rounded-xl bg-blue-600 px-6 hover:bg-blue-700"
          >
            <Link href="/">
              <Home className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-12 rounded-xl border-slate-300 px-6"
          >
            <Link href="/books">
              <Search className="mr-2 size-4" />
              Explore Books
            </Link>
          </Button>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="size-4" />
          Return to homepage
        </Link>

        <p className="mt-12 text-xs font-medium tracking-widest text-slate-400">
          BOOKNOOK · YOUR LITTLE CORNER OF BOOKS
        </p>
      </div>
    </main>
  );
}
