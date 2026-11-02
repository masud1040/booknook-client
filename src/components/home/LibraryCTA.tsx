
import Link from "next/link";

export default function LibraryCTA() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#173D32] px-6 py-14 sm:px-12 sm:py-20">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-8 -top-12 h-52 w-52 rounded-full border border-white/10" />

        <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
          {/* Content */}
          <div className="max-w-xl">
            <span className="mb-5 inline-block rounded-full border border-[#D8B878]/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#E5C98F]">
              Welcome to BookNook
            </span>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Every Book Opens
              <span className="block text-[#E5C98F]">
                A New World.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
              Find your next favorite story, explore timeless classics,
              and discover books that inspire your imagination.
              Your next reading adventure starts here.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 rounded-full bg-[#E5C98F] px-7 py-3.5 text-sm font-semibold text-[#173D32] transition hover:bg-white"
              >
                Explore Books
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/sign-up"
                className="inline-flex items-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#173D32]"
              >
                Join BookNook
              </Link>
            </div>
          </div>

          {/* Book Illustration */}
          <div className="relative mx-auto flex h-64 w-full max-w-md items-center justify-center">
            <div className="absolute h-56 w-56 rounded-full bg-[#E5C98F]/10 blur-2xl" />

            <div className="relative flex items-end gap-2">
              <div className="flex h-40 w-24 -rotate-6 items-center justify-center rounded-l-md border-l-4 border-[#B78C54] bg-[#D8B878] shadow-xl">
                <span className="px-2 text-center text-sm font-bold leading-5 text-[#173D32]">
                  THE ART
                  <br />
                  OF
                  <br />
                  READING
                </span>
              </div>

              <div className="z-10 flex h-52 w-32 items-center justify-center rounded-r-md border-l-4 border-[#A66F4B] bg-[#F0E2C5] shadow-2xl">
                <div className="px-3 text-center">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#967044]">
                    BookNook
                  </span>
                  <div className="my-3 h-px bg-[#B78C54]" />
                  <span className="text-xl font-bold leading-6 text-[#173D32]">
                    Stories
                    <br />
                    Worth
                    <br />
                    Sharing
                  </span>
                  <div className="mt-3 text-2xl text-[#B78C54]">✦</div>
                </div>
              </div>

              <div className="flex h-36 w-20 rotate-6 items-center justify-center rounded-r-md bg-[#B76E4B] shadow-xl">
                <span className="rotate-90 whitespace-nowrap text-xs font-bold tracking-widest text-white">
                  DISCOVER MORE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
