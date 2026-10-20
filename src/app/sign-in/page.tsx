"use client";

import { signIn } from "@/lib/auth-client";
import {FieldError, FieldGroup, Fieldset, Form, Input, Label, TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const SignIn = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data: signInData, error } = await signIn.email({
      email: data.email,
      password: data.password,
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
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি");
      }
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি");
      }
    } catch (error) {
      console.error(error);
      toast.error("GitHub login failed");
    }
  };

  return (
    <main className="min-h-screen bg-gray-200 px-4 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[400px]">
        <div className="mb-5 text-center">
          <h1 className="text-xl font-bold text-gray-900 sm:text-xl">
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
              <TextField
                isRequired
                name="email"
                type="email"
              >
                <Label className="text-xs font-medium text-gray-800">
                  ইমেইল
                </Label>

                <Input
                  className="mt-1 h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-green-500"
                  placeholder="you@example.com"
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
                  className="mt-1 h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-green-500"
                  placeholder="আপনার পাসওয়ার্ড"
                />

                <FieldError />
              </TextField>

            </FieldGroup>

            <button
              type="submit"
              className="mt-4 h-10 w-full cursor-pointer rounded-lg bg-green-600 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              সাইন ইন
            </button>

            <div className="my-4 flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs text-gray-500">
                অথবা
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid w-full grid-cols-2 gap-2">

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex h-9 items-center justify-center gap-1.5 cursor-pointer rounded-lg border border-gray-200 text-xs font-medium transition hover:bg-gray-50"
              >
                <span><FaGoogle /></span>
                Google দিয়ে চালিয়ে যান
              </button>

              <button
                type="button"
                onClick={handleGithubSignIn}
                className="flex h-9 items-center justify-center gap-1.5 cursor-pointer rounded-lg border border-gray-200 text-xs font-medium transition hover:bg-gray-50"
              >
                <span><FaGithub /></span>
                GitHub দিয়ে চালিয়ে যান
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