export function MenuLoadingSkeleton() {
  return (
    <section className="flex flex-col gap-4" aria-label="菜單載入中">
      <div className="flex items-center gap-3">
        <div className="h-8 w-28 animate-pulse rounded-md bg-[#eadfca]" />
        <div className="h-px flex-1 bg-[#e5d6bb]" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <article
            className="flex min-h-96 flex-col justify-between overflow-hidden rounded-lg border border-[#ddc9a5] bg-[#fffaf2] shadow-sm"
            key={index}
          >
            <div>
              <div className="relative aspect-[4/3] border-b border-[#ead8b8] bg-[#efe4d0]">
                <div className="h-full w-full animate-pulse bg-gradient-to-r from-[#f4e8d0] via-[#fbf4e6] to-[#f4e8d0]" />
              </div>
              <div className="space-y-3 p-5">
                <div className="h-2 w-12 rounded-full bg-[#dcc6a0]" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-[#efe3cb]" />
                <div className="h-7 w-2/3 animate-pulse rounded-md bg-[#eadfca]" />
                <div className="h-4 w-full animate-pulse rounded-md bg-[#f0e6d2]" />
                <div className="h-4 w-5/6 animate-pulse rounded-md bg-[#f0e6d2]" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 px-5 pb-5">
              <div className="h-7 w-20 animate-pulse rounded-md bg-[#e4d2b3]" />
              <div className="h-11 w-28 animate-pulse rounded-full bg-[#d9c7a8]" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
