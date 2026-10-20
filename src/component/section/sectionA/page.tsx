import ProductPriceCard from '@/component/ProductPriceCard';

interface Product  {
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
};

const ProduectPriceRose =async () => {
  const res= await fetch('https://openapi.programming-hero.com/api/bazardor/products',{
      next: {
        revalidate: 300,
      },
    }
  );
   if (!res.ok) {
    return null;
  }
  const data = await res.json()
    const products = Array.isArray(data)
    ? data
    : data.data || [];

  const risingProducts = products
    .filter(
      (product:Product) => product.change?.dir === "up"
    )
    .sort(
      (a: Product, b: Product) =>
        b.change.pct - a.change.pct
    )
    .slice(0, 6);
  return (
    <div className='max-w-7xl mx-auto'>
       <section className="mt-8">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
        <span className="text-red-500">▲</span>
        আজ দাম বেড়েছে
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {risingProducts.map((product: Product) => (
          <ProductPriceCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
    </div>
  );
};

export default ProduectPriceRose;