"use client";

import { authClient, signUp } from "@/lib/auth-client";
import {Description,FieldError,FieldGroup,Fieldset,Form,Input,Label,TextField,} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";


const SignUp = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    if (data.password !== data.confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না");
      return;
    }

    const { data: signUpData, error } =
      await signUp.email({
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

    toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

    console.log(signUpData);

    router.push("/signIn");
  };

  const handleGoogleSignUp = async () => {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
};
  const handleGithubSignUp = async () => {
  const { data, error } = await authClient.signIn.social({
    provider: "github",
    callbackURL: "/",
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
};

  return (
    <main className="min-h-screen bg-gray-300 px-4 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[450px]">

        <div className="mb-5 text-center">
          <h1 className="text-xl font-bold text-gray-900 sm:text-xl">
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
                  className="mt-1 h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-green-500"
                  placeholder="যেমন: রাকিব উদ্দিন"
                />
                <FieldError />
              </TextField>
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
                  className="mt-1 h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-green-500"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                />

                <Description className="text-[10px] text-gray-500">
                  কমপক্ষে ৮ অক্ষর দিতে হবে।
                </Description>
                <FieldError />
              </TextField>
            
              <TextField
                isRequired
                name="confirmPassword"
              >
                <Label className="text-xs font-medium text-gray-800">
                  পাসওয়ার্ড নিশ্চিত করুন
                </Label>

                <Input
                  type="password"
                  className="mt-1 h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-green-500"
                  placeholder="আবার লিখুন"
                />

                <FieldError />
              </TextField>

            </FieldGroup>
            <button
              type="submit"
              className="mt-4 h-9 w-full rounded-lg bg-green-600 text-sm font-semibold text-white cursor-pointer shadow-sm transition hover:bg-green-700"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
            <div className="my-2 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs text-gray-500">
                অথবা
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 gap-2">

              <button onClick={handleGoogleSignUp}
                type="button"
                className="flex h-9 p-1.5 items-center justify-center gap-1.5 cursor-pointer rounded-lg border border-gray-200 text-xs font-medium transition hover:bg-gray-50"
              >
                <span><FaGoogle /></span>
                Google দিয়ে চালিয়ে যান
              </button>

              <button onClick={handleGithubSignUp}
                type="button"
                className="flex h-9 p-1.5 items-center justify-center gap-1.5 cursor-pointer rounded-lg border border-gray-200 text-xs font-medium transition hover:bg-gray-50"
              >
                <span><FaGithub /></span>
                GitHub দিয়ে চালিয়ে যান
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
          className="mt-5 block text-center text-xs text-gray-400 hover:text-green-600"
        >
          ← হোম পেজে ফিরে যান
        </Link>

      </div>
    </main>
  );
};

export default SignUp;