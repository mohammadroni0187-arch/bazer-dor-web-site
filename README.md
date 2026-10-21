# 🛒 বাজার দর (BazarDor) - Daily Market Price Tracker

> নিত্যপ্রয়োজনীয় পণ্যের সঠিক, নির্ভরযোগ্য ও হালনাগাদ বাজারদর পর্যবেক্ষণ প্ল্যাটফর্ম।

BazarDor is a modern, responsive, full-stack web application designed to track and compare daily commodity market prices in Bangladesh. Users can explore everyday essential goods, track price fluctuations (today vs. yesterday, last week, and last month), sort products by price, view divisional market price ranges, and manage their personal profile.

---

## 📌 Project Overview / Description

বাংলাদেশে নিত্যপ্রয়োজনীয় দ্রব্যমূল্যের ওঠানামা সাধারণ মানুষের দৈনন্দিন জীবনের একটি অত্যন্ত গুরুত্বপূর্ণ বিষয়। **বাজার দর (BazarDor)** ওয়েবসাইটের মাধ্যমে ব্যবহারকারীরা চাল, ডাল, তেল, শাকসবজি, মাছ, মাংসসহ দৈনন্দিন বাজারের সব পণ্যের আজকের দাম, গতকালের দাম এবং গত সপ্তাহ ও মাসের তুলনায় দামের পরিবর্তন (শতাংশে বৃদ্ধি বা হ্রাস) খুব সহজেই দেখতে ও তুলনা করতে পারেন। এছাড়াও প্ল্যাটফর্মটিতে ক্যাটাগরি অনুযায়ী ফিল্টারিং, দাম অনুযায়ী সর্টিং এবং বিশ্বস্ত অথেনটিকেশন ব্যবস্থার মাধ্যমে ইউজার প্রোফাইল সংরক্ষণের সুবিধা রয়েছে।

---

## ✨ 5 Key Features of the Project

1. **📊 Real-time Daily Commodity Prices & Trends (দৈনিক বাজারদর ও মূল্য পর্যবেক্ষণ):**
   - ট্র্যাক করুন প্রতিটি পণ্যের আজকের দাম, গতকালের দাম, গত সপ্তাহ ও গত মাসের মূল্য।
   - দামের ওঠানামার ভিজ্যুয়াল নির্দেশক (সবুজ ডাউনারো নির্দেশ করে দাম কমেছে, লাল আপঅ্যারো নির্দেশ করে দাম বৃদ্ধি পেয়েছে)।
   - বিভিন্ন বিভাগের বাজার অনুযায়ী সর্বনিম্ন ও সর্বোচ্চ মূল্যের ব্যবধান দেখার সুবিধা।

2. **🏷️ Category-wise Browsing & Dynamic Sorting (ক্যাটাগরি ব্রাউজিং ও মূল্য অনুযায়ী সর্টিং):**
   - শাকসবজি, মাছ, মাংস, চাল-ডাল ইত্যাদি আলাদা ক্যাটাগরি অনুযায়ী এক ক্লিকে পণ্য ফিল্টারিং।
   - ড্রপডাউনের মাধ্যমে তাৎক্ষণিকভাবে পণ্যের দাম অনুযায়ী **"কম থেকে বেশি"** অথবা **"বেশি থেকে কম"** সর্ট করার সুবিধা (কোনো পেজ রিলোড ছাড়াই)।

3. **🔐 Secure Authentication & Social Login (নিরাপদ অথেনটিকেশন ও সোশ্যাল লগইন):**
   - **Better-Auth** এবং **MongoDB** এর সমন্বয়ে বিশ্বস্ত অথেনটিকেশন সিস্টেম।
   - সাধারণ ইমেইল-পাসওয়ার্ড দিয়ে সাইন-আপ ও সাইন-ইন সুবিধা (কমপক্ষে ৮ অক্ষরের স্ট্রং পাসওয়ার্ড ভ্যালিডেশন সহ)।
   - এক ক্লিকে **Google** এবং **GitHub** অ্যাকাউন্ট দিয়ে নিরাপদ সোশ্যাল লগইন।

4. **👤 Personalized User Profile & Avatar Customization (প্রোফাইল ও ছবি কাস্টমাইজেশন):**
   - জিমেইল দিয়ে লগইন করলে ব্যবহারকারীর নিজস্ব জিমেইল প্রোফাইল ছবি স্বয়ংক্রিয়ভাবে প্রদর্শন।
   - ডিভাইস থেকে ছবি আপলোড, যেকোনো ওয়েব ছবির লিঙ্ক বসানো এবং কিউট ইমোজি/অবতার প্রিসেট সিলেক্ট করার সুবিধা।
   - প্রোফাইলের নাম ও ছবি পরিবর্তন করে ডাটাবেজে সংরক্ষণ করা।

5. **⚡ Interactive UI, Live Marquee & Bengali Date Display (ইন্টারেক্টিভ ইউআই ও লাইভ মারকুই):**
   - ওয়েবসাইটের শীর্ষে চলমান জরুরি পণ্য ও দামের ট্রেন্ড স্ক্রলিং বার (Live Ticker / Marquee)।
   - আজকের বাংলা তারিখ ও বার প্রদর্শন (যেমন: ৭ কার্তিক, ১৪৩১)।
   - সম্পূর্ণ রেসপনসিভ মোবাইল-ফার্স্ট ডিজাইন এবং দ্রুত গতির সার্ভার-সাইড ক্যাশিং (`revalidate: 300`)।

---

## 🛠️ Technologies Used

### **Frontend:**
- **Next.js 16 (App Router)** - React Framework with Server Components & SSR
- **React 19** - Modern UI Library
- **TypeScript** - Strongly Typed JavaScript
- **Tailwind CSS 4** - Utility-first CSS Framework
- **HeroUI & DaisyUI** - Clean & Accessible UI Components
- **React Icons** - Comprehensive Icon Library (Feather & FontAwesome)
- **React-Toastify** - Interactive Toast Notifications
- **React-Marquee-Text** - Smooth Scrolling Market Ticker

### **Backend & Authentication:**
- **Next.js API Routes** - Serverless backend handlers
- **Better-Auth** - Complete TypeScript-first Authentication Framework
- **OAuth Providers** - Google & GitHub Social Logins
- **MongoDB & @better-auth/mongo-adapter** - NoSQL Cloud Database & Adapter

---

## 🚀 Getting Started & Local Installation

প্রকল্পটি আপনার লোকাল মেশিনে চালাতে নিচের ধাপগুলো অনুসরণ করুন:

### ১. ক্লোন করুন (Clone the Repository)
```bash
git clone https://github.com/your-username/bazer-dor-web-site.git
cd bazer-dor-web-site
```

### ২. ডিপেন্ডেন্সি ইন্সটল করুন (Install Dependencies)
```bash
npm install
```

### ৩. এনভায়রনমেন্ট ভেরিয়েবল সেটআপ করুন (Configure Environment Variables)


### ৪. ডেভেলপমেন্ট সার্ভার চালু করুন (Run Development Server)
```bash
npm run dev
```

ব্রাউজারে [http://localhost:3000](http://localhost:3000) ওপেন করে ওয়েবসাইটটি দেখুন।

---

## 📁 Project Structure

```text
bazer-dor-web-site/
├── public/                 # Static assets (images, logos, icons)
├── src/
│   ├── app/                # Next.js App Router Pages
│   │   ├── api/auth/       # Better-Auth API Handlers
│   │   ├── category/       # Category Dynamic Routes & Sorting
│   │   ├── product/        # Product Details & Market Comparison
│   │   ├── sign-in/        # Sign In Page (Email & Social)
│   │   ├── sign-up/        # Sign Up Page
│   │   ├── userProfile/    # User Profile & Avatar Settings
│   │   ├── layout.tsx      # Root Layout with Header & Marquee
│   │   └── page.tsx        # Home Page (Hero, Sections, All Products)
│   ├── component/          # Reusable Components (Cards, Navbars, Header, UserInfo)
│   └── lib/                # Auth Config (Better-Auth Server & Client)
├── next.config.ts          # Next.js Configuration
├── package.json            # Project Dependencies & Scripts
└── README.md               # Project Documentation
```

---

## 📡 API Reference

প্রকল্পে ব্যবহৃত প্রধান ডাটা সোর্স:
- **সব ক্যাটাগরি:** `https://openapi.programming-hero.com/api/bazardor/categories`
- **সব পণ্য:** `https://openapi.programming-hero.com/api/bazardor/products`
- **ক্যাটাগরি অনুযায়ী পণ্য:** `https://openapi.programming-hero.com/api/bazardor/products?category={categoryId}`
- **পণ্যের বিস্তারিত:** `https://openapi.programming-hero.com/api/bazardor/product/{slug}`

---

## 👨‍💻 Author

- **BazarDor Team / Programming Hero Assignment**
- Crafted with ❤️ using Next.js & TypeScript.
