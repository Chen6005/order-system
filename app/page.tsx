import { menuItems } from "@/lib/mock-data";

const availableMenuItems = menuItems.filter((item) => item.available);

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10 text-stone-950 sm:px-10 lg:px-16">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
            Order System
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">
            Today&apos;s Menu
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-600">
            Browse the available dishes and choose what you would like to order.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableMenuItems.map((item) => (
            <article
              className="flex min-h-48 flex-col justify-between rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
              key={item.id}
            >
              <div>
                <h2 className="text-xl font-semibold text-stone-950">
                  {item.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-lg font-semibold text-emerald-700">
                  NT${item.price}
                </p>
                <button
                  className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
                  type="button"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
