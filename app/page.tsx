import { fetchAllProducts } from '@/lib/scraper';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Product } from '@/lib/types';
import Search from '@/components/Search';
import CategoryChips from '@/components/CategoryChips';

async function ProductsGrid({ query, category }: { query: string; category: string }) {
  const products = await fetchAllProducts({ maxPages: 5 });
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = products.filter((p) => {
    const matchesQuery = normalizedQuery
      ? (p.title + ' ' + (p.category ?? '')).toLowerCase().includes(normalizedQuery)
      : true;
    const matchesCategory = category ? (p.category ?? '').toLowerCase() === category.toLowerCase() : true;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filtered.map((p) => (
        <article key={p.url} className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-lg">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
            {p.image && (
              <Image src={p.image} alt={p.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-70" />
          </div>
          <div className="p-5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-wide text-neutral-500">{p.category ?? 'Producto'}</span>
              {p.price && <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">{p.price}</span>}
            </div>
            <h3 className="line-clamp-2 text-lg font-semibold leading-snug">
              <Link href={p.url} target="_blank" className="after:absolute after:inset-0">
                {p.title}
              </Link>
            </h3>
          </div>
        </article>
      ))}
    </div>
  );
}

export default async function Page({ searchParams }: { searchParams: { q?: string; c?: string } }) {
  const q = searchParams.q ?? '';
  const c = searchParams.c ?? '';

  const products = await fetchAllProducts({ maxPages: 2 });
  const categories = Array.from(new Set(products.map((p) => (p.category ?? '').trim()).filter(Boolean)));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-10">
        <div className="relative overflow-hidden rounded-3xl bg-black text-white">
          <div className="relative z-10 grid gap-6 p-10 sm:p-14 lg:grid-cols-2 lg:items-end">
            <div>
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Cat?logo Editorial Pro</h1>
              <p className="max-w-2xl text-neutral-300">Selecci?n viva de productos de PromeChi. B?squeda, categor?as y dise?o editorial contempor?neo.</p>
            </div>
            <div className="lg:justify-self-end">
              <Search initialQuery={q} />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(255,255,255,0.08),transparent_60%)]" />
        </div>
      </section>

      <section className="mb-8">
        <CategoryChips categories={categories} active={c} />
      </section>

      <Suspense>
        {/* @ts-expect-error Async Server Component */}
        <ProductsGrid query={q} category={c} />
      </Suspense>

      <footer className="mt-16 text-center text-sm text-neutral-500">
        Fuentes: <a className="underline decoration-dotted" href="https://www.promechi.com/tienda" target="_blank">promechi.com/tienda</a>
      </footer>
    </main>
  );
}
