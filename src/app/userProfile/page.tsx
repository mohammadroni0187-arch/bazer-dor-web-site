"use client";

import { authClient, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");

  if (isPending) {
    return <div className="p-8">লোড হচ্ছে...</div>;
  }

  if (!session?.user) {
    return (
      <main className="mx-auto max-w-xl p-8 text-center">
        <h1 className="text-xl font-bold">আপনি সাইন ইন করেননি</h1>

        <button
          onClick={() => router.replace("/sign-in")}
          className="mt-4 cursor-pointer rounded-lg bg-green-600 px-4 py-2 text-white"
        >
          সাইন ইন
        </button>
      </main>
    );
  }

  const user = session.user;

  const currentName = name || user.name || "";

  const initial =
    user.name?.charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    "U";

  const handleSignOut = async () => {
    setLoading(true);
     toast.success("সফলভাবে সাইন আউট হয়েছে!");
    try {
      await signOut();

      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
       toast.error("সাইন আউট করতে সমস্যা হয়েছে!");
      setLoading(false);
    }
  };

  const handleUpdateName = async () => {
    if (!currentName.trim()) {
      alert("নাম লিখুন");
      return;
    }

    try {
      setSaving(true);

      await authClient.updateUser({
        name: currentName.trim(),
      });

      toast.success("নাম সফলভাবে আপডেট হয়েছে!");

    
      router.refresh();
    } catch (error) {
      console.error("Name update failed:", error);
      toast.error("নাম আপডেট করা যায়নি!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-2xl rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              আমার প্রোফাইল
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              আপনার অ্যাকাউন্টের তথ্য
            </p>
          </div>

          <button
            onClick={handleSignOut}
            disabled={loading}
            className="shrink-0 cursor-pointer rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </div>

        <div className="mt-8 flex items-center gap-4">

          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "Profile"}
              className="h-20 w-20 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">
              {initial}
            </div>
          )}

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold">
              {user.name || "নাম দেওয়া হয়নি"}
            </h2>

            <p className="break-all text-sm text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <label className="mb-2 block text-sm font-medium text-gray-600">
            নাম
          </label>

          <input
            type="text"
            value={currentName}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নাম লিখুন"
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </div>

        
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-gray-600">
            ইমেইল
          </label>

          <input
            type="email"
            value={user.email}
            disabled
            className="w-full rounded-lg border bg-gray-100 px-4 py-3 text-gray-500"
          />
        </div>

        <button
          onClick={handleUpdateName}
          disabled={saving}
          className="mt-6 w-full cursor-pointer rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
        </button>

      </section>
    </main>
  );
};

export default UserProfile;