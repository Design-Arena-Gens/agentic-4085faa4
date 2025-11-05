"use client";
import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryChips({ categories, active }: { categories: string[]; active: string }) {
  const router = useRouter();
  const params = useSearchParams();

  const q = params.get('q') ?? '';

  const setCat = (c: string) => {
    router.push(`/?q=${encodeURIComponent(q)}&c=${encodeURIComponent(c)}`);
  };

  const clear = () => router.push(`/?q=${encodeURIComponent(q)}`);

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={clear} className={`rounded-full border px-3 py-1 text-sm ${!active ? 'border-black bg-black text-white' : 'border-neutral-300 text-neutral-700 hover:border-neutral-400'}`}>Todas</button>
      {categories.map((c) => (
        <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-3 py-1 text-sm ${active === c ? 'border-black bg-black text-white' : 'border-neutral-300 text-neutral-700 hover:border-neutral-400'}`}>{c}</button>
      ))}
    </div>
  );
}
