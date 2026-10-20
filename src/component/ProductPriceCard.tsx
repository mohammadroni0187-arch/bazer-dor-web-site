import Link from 'next/link';
import React from 'react';
interface Product{
  id:number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const getUnit = (unit: string) => {
  switch (unit) {
    case "kg":
      return "প্রতি কেজি";
    case "liter":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
      return "প্রতি পিস";
    default:
      return `প্রতি ${unit}`;
  }
};

const toBanglaNumber = (value: number | string) => {
  return value
    .toString()
    .replace(/0/g, "০")
    .replace(/1/g, "১")
    .replace(/2/g, "২")
    .replace(/3/g, "৩")
    .replace(/4/g, "৪")
    .replace(/5/g, "৫")
    .replace(/6/g, "৬")
    .replace(/7/g, "৭")
    .replace(/8/g, "৮")
    .replace(/9/g, "৯");
};


const ProductPriceCard = ({product}:{product:Product}) => {
  const isUp = product.change.dir==='up';
  return (
    <Link href={`/product/${product.slug}`}>
    <div  className="rounded-xl border border-gray-200 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md sm:p-4">
      <div className="flex items-center gap-3">
        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-2xl'>
      {product.image}
      </div>
      <div className='min-w-0'>
        <h3 className='truncate text-sm font-semibold text-gray-800 sm:text-base'>{product.nameBn}</h3>

        <p className='text-[10px] text-gray-500 sm:text-xs'>{getUnit(product.unit)}</p>
      </div>
    </div>
       <div className="mt-4 flex items-end justify-between">

          <div>
            <p className="text-[10px] text-gray-500">
              আজকের দাম
            </p>

            <p className="text-sm font-bold text-gray-900 sm:text-base">
              {toBanglaNumber(product.today)} টাকা
            </p>
          </div>
          <span
            className={`rounded-full px-2 py-1 text-[9px] font-semibold sm:text-[10px] ${
              isUp
                ? "bg-red-50 text-red-500"
                : "bg-green-50 text-green-600"
            }`}
          >
            {isUp ? "▲" : "▼"}{" "}
            {toBanglaNumber(product.change.pct)}%
          </span>
        </div>
      </div>

      </Link>
  );
};

export default ProductPriceCard;