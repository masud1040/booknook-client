
import { ArrowLeft } from "lucide-react";

export default function BookDetailsLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">

        {/* Back Button Skeleton */}
        <div className="h-5 w-36 animate-pulse rounded bg-slate-200" />

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[360px_1fr]">

            {/* Book Image Skeleton */}
            <div className="flex items-center justify-center bg-slate-100 p-8 sm:p-12">
              <div className="aspect-[3/4] w-full max-w-[270px] animate-pulse rounded-xl bg-slate-200" />
            </div>

            {/* Book Info Skeleton */}
            <div className="space-y-5 p-6 sm:p-10">
              <div className="flex gap-2">
                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
                <div className="h-6 w-28 animate-pulse rounded-full bg-slate-200" />
              </div>

              <div className="h-10 w-4/5 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-5 w-2/5 animate-pulse rounded bg-slate-200" />

              {/* Copies Skeleton */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
                <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
              </div>

              {/* Borrow Button Skeleton */}
              <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="space-y-5 border-t border-slate-200 p-6 sm:p-10">
            <div className="h-7 w-48 animate-pulse rounded bg-slate-200" />

            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-3/5 animate-pulse rounded bg-slate-100" />
            </div>

            {/* Added By Skeleton */}
            <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      </div>
    </main>
  );
}
