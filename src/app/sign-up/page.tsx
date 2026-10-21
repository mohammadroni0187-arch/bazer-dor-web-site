"use client";

import { authClient, signUp } from "@/lib/auth-client";
import {
  Description,
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

const SignUp = () => {
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
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString().trim();
    });

    if (!data.name || !data.email || !data.password) {
      toast.error("অনুগ্রহ করে সব তথ্য পূরণ করুন");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("পাসওয়ার্ড নিশ্চিতকরণের সাথে মিলছে না");
      return;
    }

    try {
      setLoading(true);

      const { data: signUpData, error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image || undefined,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে সাইন ইন করুন।");
      console.log(signUpData);
      router.push("/sign-in");
    } catch (err) {
      console.error("Sign up error:", err);
      toast.error("অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setSocialLoading("google");
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google দিয়ে সাইন আপ করা যায়নি");
      }
    } catch (err) {
      console.error("Google sign up error:", err);
      toast.error("Google দিয়ে সাইন আপ করতে সমস্যা হয়েছে!");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleGithubSignUp = async () => {
    try {
      setSocialLoading("github");
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "GitHub দিয়ে সাইন আপ করা যায়নি");
      }
    } catch (err) {
      console.error("GitHub sign up error:", err);
      toast.error("GitHub দিয়ে সাইন আপ করতে সমস্যা হয়েছে!");
    } finally {
      setSocialLoading(null);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-gray-100 px-4 py-8 sm:py-10 flex items-center justify-center">
        <div className="w-full max-w-[450px] animate-pulse">
          <div className="mb-5 text-center space-y-2">
            <div className="h-6 w-44 mx-auto rounded bg-gray-300" />
            <div className="h-4 w-64 mx-auto rounded bg-gray-300" />
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-3.5">
            <div className="space-y-1.5">
              <div className="h-3 w-14 rounded bg-gray-200" />
              <div className="h-9 w-full rounded-lg bg-gray-200" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-16 rounded bg-gray-200" />
              <div className="h-9 w-full rounded-lg bg-gray-200" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-20 rounded bg-gray-200" />
              <div className="h-9 w-full rounded-lg bg-gray-200" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-28 rounded bg-gray-200" />
              <div className="h-9 w-full rounded-lg bg-gray-200" />
            </div>
            <div className="h-10 w-full rounded-lg bg-gray-200 mt-2" />
            <div className="h-px w-full bg-gray-200 my-3" />
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
      <div className="w-full max-w-[450px]">
        <div className="mb-5 text-center">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <Form
          onSubmit={onSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <Fieldset className="w-full">
            <FieldGroup className="gap-3">
              <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.length < 3) {
                    return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                  }
                  return null;
                }}
              >
                <Label className="text-xs font-medium text-gray-800">
                  নাম
                </Label>

                <Input
                  className="mt-1 h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-green-500"
                  placeholder="যেমন: রাকিব উদ্দিন"
                  disabled={loading || Boolean(socialLoading)}
                />
                <FieldError />
              </TextField>

              <TextField isRequired name="email" type="email">
                <Label className="text-xs font-medium text-gray-800">
                  ইমেইল
                </Label>

                <Input
                  className="mt-1 h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-green-500"
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
                  if (!/[A-Z]/.test(value)) {
                    return "পাসওয়ার্ডে কমপক্ষে ১টি Capital letter থাকতে হবে";
                  }
                  if (!/[a-z]/.test(value)) {
                    return "পাসওয়ার্ডে কমপক্ষে ১টি Small letter থাকতে হবে";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "কমপক্ষে ১টি সংখ্যা দিন";
                  }
                  if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(value)) {
                    return "কমপক্ষে ১টি Special character দিন";
                  }
                  return null;
                }}
              >
                <Label className="text-xs font-medium text-gray-800">
                  পাসওয়ার্ড
                </Label>

                <Input
                  className="mt-1 h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-green-500"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  disabled={loading || Boolean(socialLoading)}
                />

                <Description className="text-[10px] text-gray-500">
                  কমপক্ষে ৮ অক্ষর (বড় ও ছোট হাতের অক্ষর, সংখ্যা ও স্পেশাল ক্যারেক্টার)।
                </Description>
                <FieldError />
              </TextField>

              <TextField isRequired name="confirmPassword">
                <Label className="text-xs font-medium text-gray-800">
                  পাসওয়ার্ড নিশ্চিত করুন
                </Label>

                <Input
                  type="password"
                  className="mt-1 h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-green-500"
                  placeholder="আবার লিখুন"
                  disabled={loading || Boolean(socialLoading)}
                />

                <FieldError />
              </TextField>
            </FieldGroup>

            <button
              type="submit"
              disabled={loading || Boolean(socialLoading)}
              className="mt-4 h-9 w-full cursor-pointer rounded-lg bg-green-600 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>

            <div className="my-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">অথবা</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={loading || Boolean(socialLoading)}
                className="flex h-9 items-center justify-center gap-1.5 cursor-pointer rounded-lg border border-gray-200 text-xs font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span><FaGoogle className="text-red-500" /></span>
                <span>{socialLoading === "google" ? "লোড হচ্ছে..." : "Google দিয়ে চালিয়ে যান"}</span>
              </button>

              <button
                type="button"
                onClick={handleGithubSignUp}
                disabled={loading || Boolean(socialLoading)}
                className="flex h-9 items-center justify-center gap-1.5 cursor-pointer rounded-lg border border-gray-200 text-xs font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span><FaGithub className="text-gray-900" /></span>
                <span>{socialLoading === "github" ? "লোড হচ্ছে..." : "GitHub দিয়ে চালিয়ে যান"}</span>
              </button>
            </div>

            <p className="mt-4 w-full text-center text-xs text-gray-600">
              অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-green-600 hover:underline"
              >
                সাইন ইন করুন
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

export default SignUp;
