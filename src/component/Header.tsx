import Image from "next/image";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Header = () => {

  const date = new Date().toLocaleDateString("bn-BD",{
  dateStyle:"full"
});

  return (
     <header className="border-b border-gray-100 bg-white">
      <div className=" mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-5 lg:px-6 lg:py-4 ">
    
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo-icon.png"
            alt="BazarDor Logo"
            width={20}
            height={20}
            priority
            className="bg-green-600 p-1 rounded-lg sm:h-10 sm:w-10"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
              বাজার দর
            </span>

            <span className="text-[9px] text-gray-500 sm:text-[10px] lg:text-xs">
             {date}
            </span>
          </div>
        </Link>

        
        <UserInfo/>
      </div>
    </header>
  );
};

export default Header;