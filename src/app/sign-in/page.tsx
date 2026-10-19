"use client"

import { signIn } from "@/lib/auth-client";
import { Description, FieldError, FieldGroup, Fieldset, Form, Input, Label, TextField} from "@heroui/react";


const SignIn = () => {

const onSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data:signInData, error } = await signIn.email({
    email: data.email, 
    password: data.password, 
    rememberMe: true,
    callbackURL: "/",
});

  }

  return (
    <div>
         <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
          <Fieldset>
             <Fieldset.Legend>সাইন ইন করুন</Fieldset.Legend>
       <Description>বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</Description>
          <FieldGroup>

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

          </FieldGroup>
     <Fieldset.Actions>
     <button type='submit' className="btn btn-neutral bg-green-500 border mt-4">সাইন ইন</button>
             </Fieldset.Actions>
                  </Fieldset>
    </Form>
    </div>
  );
};

export default SignIn;