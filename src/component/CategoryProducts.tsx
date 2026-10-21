"use client";

import { useState } from "react";
import ProductPriceCard from "./ProductPriceCard";

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

interface CategoryProductsProps {
  products: Product[];
  initialSort?: "default" | "low" | "high";
}

const CategoryProducts = ({ products, initialSort = "default" }: CategoryProductsProps) => {
  const [sort, setSort] = useState<"default" | "low" | "high">(initialSort);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") {
      return a.today - b.today;
    }
    if (sort === "high") {
      return b.today - a.today;
    }
    return 0;
  });

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "default" | "low" | "high")}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 shadow-sm"
        >
          <option value="default">সাজান: ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product: Product) => (
          <ProductPriceCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;

