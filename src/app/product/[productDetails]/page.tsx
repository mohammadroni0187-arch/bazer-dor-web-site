import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
export const instant = false;

interface Product  {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  markets: {
  market: string;
  division: string;
  min: number;
  max: number;
}[];
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

interface Props {
  params: Promise<{ productDetails: string }>;
};

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor";

const toBangla = (value: number | string) =>
  Number(value).toLocaleString("bn-BD");

const getUnit = (unit: string) => {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };

  return units[unit] || `প্রতি ${unit}`;
};
const getProduct=async(): Promise<Product[]>=>{
  const res = await fetch(`${API_URL}/products`, {
    next: { revalidate: 300 },
  });

   if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const result = await res.json();

  return Array.isArray(result)
    ? result
    : result.data ?? [];
}

const ProductDetailsPage =async  ({params}:Props) => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const {productDetails} = await params;
 

   const products = await getProduct();

  const product = products.find(
    (item) => item.slug === productDetails);

  if (!product) {
    notFound();
  }
 
const prices = [
    product.today,
    product.yesterday,
    product.lastWeek,
    product.lastMonth,
  ];

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice =
    prices.reduce((sum, price) => sum + price, 0) /
    prices.length;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <div>
      <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="mb-6 inline-flex text-sm font-medium text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-5xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {product.nameBn}
                </h1>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    isUp
                      ? "bg-red-50 text-red-600"
                      : isDown
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {toBangla(product.change?.pct ?? 0)}%
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                {product.nameBn} এর আজকের বাজারদর ও দামের
                সংক্ষিপ্ত বিবরণ।
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700"
                >
                  {product.categoryIcon}{" "}
                  {product.categoryNameBn}
                </Link>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  {getUnit(product.unit)}
                </span>
              </div>
            </div>

          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-green-700 p-6 text-white sm:p-8">
          <p className="text-sm text-green-100">
            আজকের বাজারদর
          </p>

          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <h2 className="text-4xl font-extrabold">
              {toBangla(product.today)}
            </h2>
            <span className="text-lg">টাকা</span>
            <span className="text-sm text-green-100">
              / {getUnit(product.unit).replace("প্রতি ", "")}
            </span>
          </div>

          <p className="mt-3 text-sm text-green-100">
            গতকালের দাম: {toBangla(product.yesterday)} টাকা
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>
              <p className="mt-2 text-2xl font-bold text-green-700">
                {toBangla(minPrice)} টাকা
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">
                সর্বোচ্চ দাম
              </p>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {toBangla(maxPrice)} টাকা
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">
                গড় দাম
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {toBangla(Math.round(avgPrice))} টাকা
              </p>
            </div>
          </div>
        </section>

       <section className="mt-8">
  <h2 className="text-xl font-bold text-gray-900">
    বাজারভিত্তিক আজকের দাম
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    বিভিন্ন বাজারে {product.nameBn} এর দাম
  </p>

  <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
    <table className="w-full min-w-[520px] text-left text-sm">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="px-4 py-3">বাজারের নাম</th>
          <th className="px-4 py-3">বিভাগ</th>
          <th className="px-4 py-3">সর্বনিম্ন দাম</th>
          <th className="px-4 py-3">সর্বোচ্চ দাম</th>
        </tr>
      </thead>

      <tbody>
        {product.markets?.map((market) => (
          <tr
            key={`${market.market}-${market.division}`}
            className="border-t border-gray-100 hover:bg-green-50"
          >
            <td className="px-4 py-3 font-medium text-gray-800">
              📍 {market.market}
            </td>

            <td className="px-4 py-3 text-gray-600">
              {market.division}
            </td>

            <td className="px-4 py-3 font-semibold text-green-700">
              {toBangla(market.min)} টাকা
            </td>

            <td className="px-4 py-3 font-semibold text-red-600">
              {toBangla(market.max)} টাকা
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {!product.markets?.length && (
    <p className="mt-4 rounded-xl bg-white p-5 text-center text-gray-500">
      এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
    </p>
  )}
</section>

      </div>
    </main>
    </div>
  );
};

export default ProductDetailsPage;