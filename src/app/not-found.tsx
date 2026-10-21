import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">
          পেজটি পাওয়া যায়নি
        </h2>

        <p className="mt-2 text-gray-500">
          আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
        </p>

        <Link href="/" className="btn btn-primary mt-6">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default NotFound;