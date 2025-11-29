# 🧠 AI-Gen - AI Powered Content Generator

A modern SaaS application that leverages **Google Gemini AI** to generate creative content (blog posts, social media captions, etc.) based on user prompts. Built with **Next.js 14**, **TypeScript**, and **Clerk Authentication**.

🔗 **Live Demo:** [https://ai-gen-your-link.vercel.app](https://ai-gen-your-link.vercel.app)

## ✨ Key Features

- **🤖 AI Integration:** Powered by **Google Gemini API** for high-quality text generation.
- **🔐 Secure Authentication:** Seamless login/signup using **Clerk** (Google & Email).
- **🛡️ Protected Routes:** Middleware protection to ensure only authenticated users access the dashboard.
- **⚡ Real-time Generation:** Instant content creation with loading states and error handling.
- **🎨 Modern UI:** Clean and responsive interface built with **shadcn/ui** and **Tailwind CSS**.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **AI Model:** Google Gemini 1.5 Flash / Pro
- **Authentication:** Clerk
- **Styling:** Tailwind CSS, shadcn/ui
- **Deployment:** Vercel

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/iratnayak/ai-gen.git](https://github.com/iratnayak/ai-gen.git)
    cd ai-gen
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables (.env.local):**
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
    CLERK_SECRET_KEY=...
    GEMINI_API_KEY=...
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
    ```

4.  **Run the app:**
    ```bash
    npm run dev
    ```

---
Developed by **Isuru Rathnayake**