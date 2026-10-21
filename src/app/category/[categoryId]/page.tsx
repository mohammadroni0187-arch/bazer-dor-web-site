import CategoryProducts from '@/component/CategoryProducts';
import Link from 'next/link';
import React from 'react';

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

interface PageProps {
  params: Promise<{
    categoryId: string;
  }>;
  searchParams?: Promise<{
    sort?: string;
  }>;
}

export const instant = false;

const ProductCategory = async ({ params, searchParams }: PageProps) => {
  const { categoryId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialSort = (resolvedSearchParams?.sort as "default" | "low" | "high") || "default";

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`,
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!res.ok) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Category পাওয়া যায়নি</h1>

        <Link
          href="/"
          className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-2 text-white"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const data = await res.json();

  const products: Product[] = Array.isArray(data)
    ? data
    : data.data || [];

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="text-6xl">😕</div>

        <h1 className="mt-4 text-2xl font-bold">
          এই category-তে কোনো পণ্য নেই
        </h1>

        <p className="mt-2 text-gray-500">
          অন্য category চেষ্টা করুন।
        </p>

        <Link
          href="/"
          className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-2 text-white"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const categoryName = products[0]?.categoryNameBn || categoryId;
  const categoryIcon = products[0]?.categoryIcon || "🛒";

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
          {categoryIcon}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {categoryName}
          </h1>

          <p className="text-sm text-gray-500">
            {categoryName} এর আজকের বাজারদর
          </p>
        </div>
      </div>

      <CategoryProducts products={products} initialSort={initialSort} />
    </main>
  );
};

export default ProductCategory;