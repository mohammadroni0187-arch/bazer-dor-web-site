

import Link from "next/link";
import React from "react";

const Navber = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  const data = await res.json();

  return (
    <nav className="border-b border-gray-100 bg-white">
      <div
        className="flex mx-auto max-w-7xl gap-1 overflow-x-auto px-2 py-2 scrollbar-hide sm:gap-3 sm:justify-center sm:overflow-x-visible lg:gap-2">
        {data.map((nav: any) => (
          <Link
            key={nav.id}
            href={`/category/${nav.id}`}
            className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600 sm:px-3 sm:py-2 sm:text-sm lg:px-4 lg:py-2 lg:text-sm ">
            <span className="text-base sm:text-lg">
              {nav.icon}
            </span>

            <span>{nav.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navber;