"use client";


import { authClient } from "@/lib/auth-client";
import {Description,FieldError,FieldGroup,Fieldset,Form,Input,Label,TextField,} from "@heroui/react";


const SignUp = () => {

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    alert("Form submitted successfully!");

const { data: signUpData, error } = await authClient.signUp.email({
    name: data.name,
    email: data.email,
    password: data.password,
    callbackURL: "/",
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log(signUpData);

  };

  return (
    <div className="flex justify-center">
       <Form className="max-w-7xl mx-auto" onSubmit={onSubmit}>
      <Fieldset>
        <Fieldset.Legend>অ্যাকাউন্ট তৈরি করুন</Fieldset.Legend>
        <Description>বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</Description>
        <FieldGroup>
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>নাম</Label>
            <Input  placeholder="নাম" />
            <FieldError />
          </TextField>
          <TextField isRequired name="email" type="email">
            <Label>ইমেইল</Label>
            <Input placeholder="you@example.com" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="password"
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
            <Label>পাসওয়ার্ড</Label>
            <Input placeholder="কমপক্ষে ৮ অক্ষর" />
            <Description>কমপক্ষে ৮ অক্ষর দিতে হবে।</Description>
            <FieldError />
          </TextField>
               <TextField
            isRequired
            name="confirmPassword"
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
            <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input placeholder="আবার লিখুন" />
            <FieldError />
          </TextField>

        </FieldGroup>
        <Fieldset.Actions>
          <button type='submit' className="btn btn-neutral bg-green-500 border mt-4">অ্যাকাউন্ট তৈরি করুন</button>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
    </div>
  );
};

export default SignUp;