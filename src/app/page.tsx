import AllProduct from "@/component/AllProduct";
import ProduectPriceRose from "@/component/section/sectionA/page";
import ProducetPriceDown from "@/component/section/sectionB/page";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="border-gray-200 bg-[#f5f8f5] px-4 py-2 mt-3 sm:px-5 md:px-6">
      <section className="flex flex-col justify-between mx-auto max-w-[1400px] items-center overflow-hidden rounded-3xl border border-gray-200 bg-[#fbfdfb] px-5 py-5 sm:px-8 sm:py-7 md:flex-row md:px-10 lg:px-12 ">
        
        <div className="w-full md:w-[65%] lg:w-[60%]">

         
          <div className="mb-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 sm:text-sm">
            সোমবার, ২০ অক্টোবর, ২০২৬
          </div>

          
          <h1 className=" max-w-2xl text-3xl font-extrabold leading-tight text-gray-900 sm:text-2xl md:text-2xl lg:text-3xl ">
            আজকের বাজারের দাম এক নজরে
          </h1>

          
          <p className=" mt-4 max-w-2xl text-[14px] leading-6 text-gray-500 sm:text-[14px] sm:leading-7 ">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন- <br/>সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="mt-6">
            <Link href="#সব-পণ্য" className=" inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg sm:px-6 sm:py-3 ">
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        <div className=" mt-6 flex w-full justify-end md:mt-0 md:w-[35%] lg:w-[40%]" >
          <Image
            src="/bazar-hero.png"
            alt="BazarDor market basket"
            width={300}
            height={300}
            priority
            className=" h-auto w-48 sm:w-56 md:w-60 lg:w-72"/>
        </div>
      </section>
      <ProduectPriceRose />

        <ProducetPriceDown />
        <AllProduct/>
    </main>
  );
}
