# 🧠 AI-Gen - Full-Stack AI Content Generator

A modern Full-Stack SaaS application that leverages **Google Gemini AI** to generate creative content (blog posts, social media captions, etc.) based on user prompts. Built with **Next.js 15**, **TypeScript**, **Prisma**, and **Clerk Authentication**, it features full data persistence with a **Neon PostgreSQL** database.

🔗 **Live Demo:** [https://ai-gen-beta.vercel.app](https://ai-gen-beta.vercel.app)

---

## ✨ Key Features

- **🤖 AI Integration:** Powered by **Google Gemini 1.5 Flash** for high-quality and high-speed text generation.
- **💾 Data Persistence:** All generated content is saved and managed using **Prisma ORM** and **Neon DB**.
- **🔐 Secure Authentication:** Seamless login/signup and user management using **Clerk**.
- **📊 Personalized Dashboard:** A dedicated space for users to view and manage their **Recent Generations**.
- **🛡️ Protected Routes:** Middleware and server-side checks to ensure only authenticated users access the dashboard.
- **⚡ Server Actions:** Efficient data handling (create/delete) using Next.js **Server Actions**.
- **🔗 Dynamic Routing:** Individual blog posts are accessible via unique, SEO-friendly dynamic routes.
- **🎨 Modern UI:** Clean and responsive interface built with **shadcn/ui** and **Tailwind CSS**.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router with Async Request APIs)
- **Language:** TypeScript
- **AI Model:** Google Gemini 1.5 Flash
- **Database:** Neon DB (Serverless PostgreSQL)
- **ORM:** Prisma
- **Authentication:** Clerk
- **Styling:** Tailwind CSS, shadcn/ui
- **Deployment:** Vercel

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/iratnayak/ai-gen.git](https://github.com/iratnayak/ai-gen.git)
cd ai-gen

## Install dependencies
npm install

## Set up Environment Variables (.env.local)
DATABASE_URL="your_neon_db_connection_string"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
GEMINI_API_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

## Synchronize Database
npx prisma generate
npx prisma db push

## Run the app
npm run dev

## Developed by Isuru Rathnayake
