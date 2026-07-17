# 🚀 BizCatalyst - The Ultimate Digital Business OS

**BizCatalyst** is an AI-powered, fully autonomous Enterprise CRM and Marketing platform designed to replace 5+ separate SaaS tools (CRM, Email Marketing, Social Media Scheduling, Analytics, and Ad Management). 

Built on a bleeding-edge **Next.js 14 App Router** and **Supabase (PostgreSQL)** stack, this platform allows business owners to manage their entire digital presence through an **Autonomous AI Chief Marketing Officer (CMO) interface.**

---

## 🏗️ Production Architecture

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, shadcn/ui components, Lucide Icons.
- **Backend/API:** Next.js Server Actions & Route Handlers.
- **Database & Auth:** Supabase (PostgreSQL) with strict Row-Level Security (RLS).
- **AI Integration:** Ready for HuggingFace / OpenAI API integration via Server-Side Proxy.
- **Testing:** Vitest + React Testing Library + JSDOM.
- **DevOps:** Fully Dockerized with multi-stage builds and Nginx reverse proxy support.

---

## 🌟 Hackathon "WOW" Factor
Instead of manually navigating through complex CRM menus to find leads, write emails, and generate social media images, users can enter the **AI Co-Pilot (Autonomous Mode)**.

> *Example Prompt: "Create a Black Friday promo for my new product, generate beach images for Instagram, and email it to my 'warm' leads."*

BizCatalyst automatically parses this prompt, generates the assets via API, writes the copy, queries the CRM for 'warm' leads, and schedules the distribution—acting as an autonomous Chief Marketing Officer.

---

## 🔒 Security & Environment Setup

This project uses enterprise-grade security. All database interactions are protected via Supabase RLS, meaning a user can *never* query another tenant's data. 

**API Keys and environment variables are strictly handled via `.env.local`**. 

### 1. Local Setup
Clone the repo and install dependencies:
```bash
npm install
```

### 2. Environment Variables (.env.local)
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: AI Integrations
HUGGINGFACE_API_KEY=your_huggingface_key
```

### 3. Database Migration
Run the SQL scripts located in `supabase/migrations/20260717000000_initial_schema.sql` inside your Supabase SQL editor.
Optional: Run `supabase/seed.sql` to populate dummy test data.

### 4. Start Development Server
```bash
npm run dev
```

---

## 🐳 Docker Deployment

The application is fully containerized and optimized for production using `standalone` output mode.

```bash
# Build and run the entire stack (Next.js + Nginx Proxy)
docker-compose up -d --build
```
Access the application at `http://localhost`.

---

## 🧪 Testing
The testing suite runs in blazing fast execution times using **Vitest**.
```bash
npm run test
```

---

## 🎨 UI/UX & Accessibility
The theme utilizes a scientifically proven accessible **High-Contrast Trustworthy Blue** (`hsl(221, 83%, 53%)`). The entire layout is structured with `shadcn` principles to guarantee that users of any technical skill level can easily understand and navigate the CRM, Analytics, and Campaign tools.
