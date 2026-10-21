"use client";

import { authClient, signIn } from "@/lib/auth-client";
import {
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const SignIn = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);

  useEffect(() => {
    if (session?.user) {
      router.replace("/");
    }
  }, [session?.user, router]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString()?.trim() || "";
    const password = formData.get("password")?.toString() || "";

    if (!email || !password) {
      toast.error("অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন");
      return;
    }

    try {
      setLoading(true);

      const { data: signInData, error } = await signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      console.log(signInData);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Sign in error:", err);
      toast.error("সাইন ইন করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setSocialLoading("google");
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি");
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে!");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setSocialLoading("github");
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি");
      }
    } catch (error) {
      console.error("GitHub sign in error:", error);
      toast.error("GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে!");
    } finally {
      setSocialLoading(null);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-gray-100 px-4 py-8 sm:py-10 flex items-center justify-center">
        <div className="w-full max-w-100 animate-pulse">
          <div className="mb-5 text-center space-y-2">
            <div className="h-6 w-36 mx-auto rounded bg-gray-300" />
            <div className="h-4 w-64 mx-auto rounded bg-gray-300" />
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <div className="space-y-1.5">
              <div className="h-3 w-16 rounded bg-gray-200" />
              <div className="h-10 w-full rounded-lg bg-gray-200" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-20 rounded bg-gray-200" />
              <div className="h-10 w-full rounded-lg bg-gray-200" />
            </div>
            <div className="h-10 w-full rounded-lg bg-gray-200 mt-2" />
            <div className="h-px w-full bg-gray-200 my-4" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-9 rounded-lg bg-gray-200" />
              <div className="h-9 rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:py-10 flex items-center justify-center">
      <div className="w-full max-w-100">
        <div className="mb-5 text-center">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            সাইন ইন করুন
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <Form
          onSubmit={onSubmit}
          className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <Fieldset className="w-full">
            <FieldGroup className="gap-4">
              <TextField isRequired name="email" type="email">
                <Label className="text-xs font-medium text-gray-800">
                  ইমেইল
                </Label>

                <Input
                  className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-green-500"
                  placeholder="you@example.com"
                  disabled={loading || Boolean(socialLoading)}
                />

                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="password"
                type="password"
                validate={(value) => {
                  if (value.length < 8) {
                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                  }
                  return null;
                }}
              >
                <Label className="text-xs font-medium text-gray-800">
                  পাসওয়ার্ড
                </Label>

                <Input
                  className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-green-500"
                  placeholder="আপনার পাসওয়ার্ড"
                  disabled={loading || Boolean(socialLoading)}
                />

                <FieldError />
              </TextField>
            </FieldGroup>

            <button
              type="submit"
              disabled={loading || Boolean(socialLoading)}
              className="mt-4 h-10 w-full cursor-pointer rounded-lg bg-green-600 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>

            <div className="my-4 flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">অথবা</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid w-full grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading || Boolean(socialLoading)}
                className="flex h-9 items-center justify-center gap-1.5 cursor-pointer rounded-lg border border-gray-200 text-xs font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span><FaGoogle className="text-red-500" /></span>
                <span>{socialLoading === "google" ? "লোড হচ্ছে..." : "Google দিয়ে চালিয়ে যান"}</span>
              </button>

              <button
                type="button"
                onClick={handleGithubSignIn}
                disabled={loading || Boolean(socialLoading)}
                className="flex h-9 items-center justify-center gap-1.5 cursor-pointer rounded-lg border border-gray-200 text-xs font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span><FaGithub className="text-gray-900" /></span>
                <span>{socialLoading === "github" ? "লোড হচ্ছে..." : "GitHub দিয়ে চালিয়ে যান"}</span>
              </button>
            </div>

            <p className="mt-4 w-full text-center text-xs text-gray-600">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-green-600 hover:underline"
              >
                সাইন আপ করুন
              </Link>
            </p>
          </Fieldset>
        </Form>

        <Link
          href="/"
          className="mt-5 block text-center text-xs text-gray-400 transition hover:text-green-600"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default SignIn;
