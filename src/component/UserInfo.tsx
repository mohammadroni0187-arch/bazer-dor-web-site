"use client";

import { authClient, signOut } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import UserProfile from "@/app/userProfile/page";


const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession()
  const [open, setOpen]=useState(false)

  const handleSignOut = async () => {
    try {
      await signOut();
      setOpen(false)
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  if (isPending) {
    return (
      <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-200" />
    );
  }

  if (session?.user) {
    const user = session.user;

     const initials =
      user.name?.charAt(0).toUpperCase() ||
      user.email?.charAt(0).toUpperCase() ||
      "U";

    return (
       <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full border cursor-pointer border-gray-200 bg-white p-1 transition hover:bg-gray-50"
        >
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white sm:h-9 sm:w-9">
              {initials}
            </div>
          )}

          <span className="hidden max-w-32 truncate text-sm font-semibold text-gray-800 sm:block">
            {user.name}
          </span>

          <span className="hidden text-gray-500 sm:block">
            {open ? "⌃" : "⌄"}
          </span>
        </button>
        {open && (
          <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-xl sm:top-14">
              <h2 className="truncate text-sm font-bold">
              {user.name}
            </h2>

            <p className="break-all text-[10px] text-gray-500">
              {user.email}
            </p>
            <Link
              href="/userProfile"
              onClick={() => setOpen(false)}
              className="mt-2 block cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              👤 আমার প্রোফাইল
            </Link>

            <button
              onClick={handleSignOut}
              className="mt-1 cursor-pointer w-full rounded-lg bg-red-50 px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              🚪 সাইন আউট
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
      <Link
        href="/sign-in"
        className="text-xs font-bold text-gray-800 transition hover:text-green-600 sm:text-sm"
      >
        সাইন ইন
      </Link>

      <Link
        href="/sign-up"
        className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white shadow-md transition hover:bg-green-700 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 lg:text-sm"
      >
        সাইন আপ
      </Link>
    </div>
  );
};

export default UserInfo;