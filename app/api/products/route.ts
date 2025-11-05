import { NextResponse } from 'next/server';
import { fetchAllProducts } from '@/lib/scraper';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pages = Number(searchParams.get('pages') ?? '3') || 3;
  try {
    const products = await fetchAllProducts({ maxPages: pages });
    return NextResponse.json({ products, count: products.length });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
