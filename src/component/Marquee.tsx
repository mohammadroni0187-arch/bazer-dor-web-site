import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";


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


const getUnit = (unit: string) => {
  switch (unit) {
    case "kg":
      return "কেজি";

    case "liter":
    case "litre":
    case "l":
      return "লিটার";

    case "dozen":
      return "ডজন";

    case "piece":
    case "pcs":
    case "pc":
      return "পিস";

    default:
      return unit;
  }
};

const Marquee = async () => {
  const res = await fetch(API_URL, {
    next: {
      revalidate: 300,
    },
  });

  if (!res.ok) {
    return null;
  }

  const result = await res.json();

  
  const products = Array.isArray(result)
    ? result
    : result.data || [];

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
      <MarqueeText
        direction="right"
        duration={25}
        className="flex items-center"
      >
        {products.map((product: any) => {
          const direction = product.change?.dir;
          const percentage = product.change?.pct ?? 0;

          const isUp = direction === "up";
          const isDown = direction === "down";

          return (
            <div
              key={product.id}
              className="flex shrink-0 items-center border-r border-gray-200 px-5 py-2 text-sm"
            >
        
              <span className="font-medium text-gray-800">
                 {product.nameBn}
              </span>

              <span className="ml-2 text-gray-700">
                {toBanglaNumber(product.today)} টাকা/
                {getUnit(product.unit)}
              </span>

              <span
                className={`ml-2 font-semibold ${
                  isUp
                    ? "text-red-500"
                    : isDown
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {toBanglaNumber(percentage)}%
              </span>
            </div>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;