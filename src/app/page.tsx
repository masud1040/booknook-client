
import { Suspense } from "react";

import Hero from "@/components/home/Hero";
import RecentBooks from "@/components/book/recent-books";
import { BooksSkeleton } from "@/components/book/books-skeleton";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import LibraryCTA from "@/components/home/LibraryCTA";


export default function HomePage() {
  return (
    <main>
      <Hero />

      <Suspense fallback={<BooksSkeleton />}>
        <RecentBooks />
      </Suspense>

      <Testimonials />
      <LibraryCTA />
      <FAQ />

    </main>
  );
}
