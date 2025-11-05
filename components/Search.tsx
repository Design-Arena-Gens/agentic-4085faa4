"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Search({ initialQuery }: { initialQuery: string }) {
  const [value, setValue] = useState(initialQuery);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => { setValue(initialQuery); }, [initialQuery]);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); const c = params.get('c') ?? ''; router.push(`/?q=${encodeURIComponent(value)}&c=${encodeURIComponent(c)}`); }}
      className="flex items-center gap-3 rounded-full bg-white/95 p-2 pr-3 ring-1 ring-white/20 backdrop-blur transition focus-within:ring-white"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar productos..."
        className="w-64 bg-transparent px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
      />
      <button type="submit" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm">Buscar</button>
    </form>
  );
}
