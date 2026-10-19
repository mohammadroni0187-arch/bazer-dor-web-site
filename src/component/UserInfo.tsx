"use client";

import { authClient, signOut } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // Session loading
  if (isPending) {
    return (
      <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-200" />
    );
  }

  // Logged in
  if (session?.user) {
    const user = session.user;

    return (
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        {/* User Profile */}
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-lg p-1 transition hover:bg-gray-100"
        >
          {/* Profile Image */}
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={40}
              height={40}
              className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9 lg:h-10 lg:w-10"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white sm:h-9 sm:w-9 lg:h-10 lg:w-10">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Name */}
          <span className="hidden max-w-20 truncate text-xs font-semibold text-gray-800 sm:block sm:max-w-28 lg:max-w-40 lg:text-sm">
            {user.name}
          </span>
        </Link>

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="rounded-lg bg-red-500 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600 sm:px-3 sm:py-2 lg:px-4 lg:text-sm"
        >
          সাইন আউট
        </button>
      </div>
    );
  }

  // Logged out
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