
"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    badge: "WELCOME TO BOOKNOOK",
    title: "Discover Stories That Stay With You.",
    description:
      "Explore a growing collection of books, discover new perspectives, and find your next favorite read.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=85",
  },
  {
    badge: "EXPLORE OUR COLLECTION",
    title: "A Good Book Opens a New World.",
    description:
      "From fascinating science to timeless fiction, explore books that inspire curiosity and imagination.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2000&q=85",
  },
  {
    badge: "READ. BORROW. RETURN.",
    title: "Great Books Are Meant to Be Shared.",
    description:
      "Find something interesting, borrow your favorite book, and share the joy of reading with others.",
    image:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=2000&q=85",
  },
];

export default function Hero() {
  return (
    <section className="bg-[#f4f7fb] px-4 pb-8 pt-7 md:px-8 md:pt-8">
      <div className="relative mx-auto max-w-[1280px]">

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".booknook-prev",
            nextEl: ".booknook-next",
          }}
          pagination={{
            clickable: true,
            el: ".booknook-pagination",
          }}
          className="booknook-hero overflow-hidden rounded-[22px] shadow-lg md:rounded-[24px]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div
                className="relative flex min-h-[410px] items-center justify-center bg-cover bg-center px-7 py-16 sm:min-h-[450px] md:min-h-[490px] md:px-20"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                }}
              >
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-[#0f172a]/65" />

                {/* Content */}
                <div className="relative z-10 mx-auto max-w-[760px] text-center text-white">

                  {/* Badge */}
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <BookOpen size={15} className="text-blue-300" />
                    <span className="text-[10px] font-bold tracking-[1.7px] text-white">
                      {slide.badge}
                    </span>
                  </div>

                  {/* Heading */}
                  <h2 className="text-[34px] font-extrabold leading-[1.2] tracking-tight sm:text-[43px] md:text-[56px]">
                    {slide.title}
                  </h2>

                  {/* Description */}
                  <p className="mx-auto mt-5 max-w-[650px] text-[13px] leading-7 text-slate-200 sm:text-[15px]">
                    {slide.description}
                  </p>

                  {/* Search Bar */}
                  <div className="mx-auto mt-8 flex max-w-[650px] items-center gap-2 rounded-xl bg-white p-1.5 shadow-xl sm:p-2">
                    <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                      <Search
                        size={19}
                        className="shrink-0 text-slate-400"
                      />
                      <input
                        type="text"
                        placeholder="Search books, authors or categories..."
                        className="w-full min-w-0 bg-transparent py-2 text-xs text-slate-700 outline-none placeholder:text-slate-400 sm:text-sm"
                      />
                    </div>

                    <Link
                      href="/books"
                      className="flex shrink-0 items-center gap-2 rounded-lg bg-[#1d4ed8] px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-[#1e40af] sm:px-6 sm:text-xs"
                    >
                      Browse Books
                      <ArrowRight size={15} />
                    </Link>
                  </div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Previous Button */}
        <button
          type="button"
          aria-label="Previous slide"
          className="booknook-prev absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white hover:text-blue-700 md:left-6 md:h-11 md:w-11"
        >
          <ChevronLeft size={23} />
        </button>

        {/* Next Button */}
        <button
          type="button"
          aria-label="Next slide"
          className="booknook-next absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white hover:text-blue-700 md:right-6 md:h-11 md:w-11"
        >
          <ChevronRight size={23} />
        </button>

        {/* Pagination */}
        <div className="booknook-pagination absolute bottom-5 left-0 z-20 flex w-full justify-center gap-1.5" />

      </div>
    </section>
  );
}
