
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    name: "James Stevenson",
    role: "PhD Candidate, Physics",
    initials: "JS",
    rating: 5,
    review:
      "BookNook has completely transformed my reading experience. Finding books for my research and personal interests has never been easier. The collection is truly impressive.",
  },
  {
    name: "Anita Meyers",
    role: "Undergraduate, IT / CSE",
    initials: "AM",
    rating: 4,
    review:
      "The book discovery experience is incredibly intuitive. I can easily explore different categories and find useful books for my programming assignments. Truly convenient!",
  },
  {
    name: "Robert Karim",
    role: "Senior Reader, Bangladesh",
    initials: "RK",
    rating: 5,
    review:
      "The borrowing system works perfectly. I can discover books, borrow my favorites, and manage my reading list without any hassle. A wonderful platform for book lovers.",
  },
];

export default function Testimonials() {
  return (
    <section className="border-y border-slate-200 bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[2px] text-blue-700">
            Verified Readers Feedback
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            What Our Readers Say
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            Discover how BookNook makes reading, discovering, and
            sharing books a better experience.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card
              key={item.initials}
              className="rounded-2xl border border-slate-200 bg-slate-50 shadow-none transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <CardContent className="p-7">

                {/* Rating and Badge */}
                <div className="mb-5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={
                          index < item.rating
                            ? "fill-amber-500 text-amber-500"
                            : "fill-none text-slate-300"
                        }
                      />
                    ))}
                  </div>

                  <Badge
                    variant="outline"
                    className="rounded-full border-blue-100 bg-blue-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-blue-700"
                  >
                    <CheckCircle2 size={11} className="mr-1" />
                    Verified Reader
                  </Badge>
                </div>

                {/* Review */}
                <p className="min-h-[115px] text-sm italic leading-6 text-slate-600">
                  {item.review}
                </p>

                {/* Divider */}
                <div className="my-5 border-t border-slate-300" />

                {/* User Information */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-bold text-white shadow-sm">
                    {item.initials}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.name}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {item.role}
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
