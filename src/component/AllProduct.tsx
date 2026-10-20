
import ProductPriceCard from './ProductPriceCard';

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

const AllProduct =async () => {


  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: { revalidate: 300 },
    }
  );

  const data = await res.json();

  const products = Array.isArray(data)
    ? data
    : data.data || [];
  return (
    <div className='max-w-7xl mx-auto'>
      <section id="সব-পণ্য" className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">
        সব পণ্য
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product: Product) => (
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

export default AllProduct;