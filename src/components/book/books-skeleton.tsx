
export function BooksSkeleton() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 space-y-3">
          <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
          <div className="h-10 w-72 max-w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border bg-white p-5"
            >
              <div className="aspect-[4/3] rounded-xl bg-slate-200" />
              <div className="mt-5 h-4 w-24 rounded bg-slate-200" />
              <div className="mt-3 h-6 w-3/4 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-slate-200" />
              <div className="mt-6 h-11 rounded-xl bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
