# 🚀 Luca Musso — Personal Portfolio

> A modern, animated, and fully responsive personal portfolio built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Designed to showcase projects, skills, and professional journey with smooth scroll animations and a clean dark-mode UI.

🌐 **Live site:** [rg-dev.lat](https://rg-dev.lat)

---

## ✨ Features

- **Animated Hero Section** — Floating tech icons (React, TypeScript, Next.js, Node.js, Git, Tailwind) and a rotating title with smooth fade transitions
- **About** — Personal introduction with animated stat counters (projects, technologies, years of experience)
- **Timeline** — Interactive alternating-card timeline of the developer journey from 2022 to present
- **Projects** — Responsive grid of real-world projects with tech stack badges, live demo and GitHub links
- **Skills** — Categorized skill tags with hover lift effect, grouped by Frontend, Backend, Tools & DevOps, and Design
- **Contact** — Functional contact form with bot honeypot protection, real-time validation, and email delivery via **Resend**
- **Sidebar Navigation** — Fixed side navigation with smooth scroll-to-section behavior
- **Dark Mode** — Full dark theme via `next-themes`
- **SEO Ready** — OpenGraph, Twitter Card, sitemap, robots.txt, and canonical tags configured
- **Scroll Animations** — Custom `useInView` hook powering staggered entrance animations throughout

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui + Radix UI |
| Icons | Lucide React |
| Fonts | Geist & Geist Mono (Google Fonts) |
| Email | Resend |
| Forms | React Hook Form + Zod |
| Animations | CSS keyframes + Intersection Observer |
| Deployment | Vercel |

---

## 📁 Project Structure

```
Portfolio-main/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # Contact form API endpoint (Resend)
│   ├── globals.css             # Global styles and CSS variables
│   ├── layout.tsx              # Root layout with metadata and SEO
│   ├── page.tsx                # Main page — composes all sections
│   ├── robots.ts               # Robots.txt configuration
│   ├── sitemap.ts              # Dynamic sitemap generation
│   └── not-found.tsx           # Custom 404 page
├── components/
│   ├── hero.tsx                # Animated landing section
│   ├── about.tsx               # About me + animated stat counters
│   ├── timeline.tsx            # Developer journey timeline
│   ├── projects.tsx            # Project cards grid
│   ├── skills.tsx              # Skills by category
│   ├── contact.tsx             # Contact form with honeypot + Resend
│   ├── navigation.tsx          # Fixed sidebar navigation
│   ├── footer.tsx              # Footer with social links
│   ├── social-icons.tsx        # Social media icon components
│   ├── theme-provider.tsx      # next-themes wrapper
│   └── ui/                     # shadcn/ui component library
├── hooks/
│   ├── use-in-view.ts          # Intersection Observer hook for animations
│   ├── use-mouse-move.ts       # Mouse tracking hook
│   └── use-mobile.ts           # Responsive breakpoint hook
├── lib/
│   └── utils.ts                # Utility functions (cn helper)
├── public/                     # Static assets (images, icons, OG image)
├── styles/
│   └── globals.css             # Additional global styles
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/Luca-Hub3/Portfolio
cd Portfolio-main

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Resend API key for the contact form
RESEND_API_KEY=your_resend_api_key

# Email address that will receive contact form submissions
CONTACT_EMAIL=your@email.com
```

> Get a free Resend API key at [resend.com](https://resend.com).

### Development

```bash
npm run dev
```

Open [http://localhost:45030](http://localhost:45030) in your browser.

### Production Build

```bash
npm build
npm start
```

---

## 📬 Contact Form

The contact form (`/app/api/contact/route.ts`) uses **Resend** to deliver messages by email. It includes a **honeypot field** to silently reject bot submissions without showing an error — bots fill hidden fields, humans don't.

---

## 🗂️ Projects Showcased

| Project | Stack | Links |
|---|---|---|
| E-Commerce Platform | React, Next.js, TypeScript | [Live](https://e-commerce-platform.rg-dev.lat/) · [GitHub](https://github.com/Luca-Hub3/E-Commerce-Platform) |
| Task Management App | Next.js, TypeScript, Tailwind | [Live](https://to-do-app.rg-dev.lat/) · [GitHub](https://github.com/Luca-Hub3/To-Do-APP) |
| Portfolio Generator | PHP, HTML, CSS | [Live](https://portfolio-generator.rg-dev.lat/) · [GitHub](https://github.com/Luca-Hub3/Portfolio-Generator) |
| AI Chat Interface | Next.js, TypeScript, API | [Live](https://code-mini-ai.rg-dev.lat/) |
| Dev ToolsBox | Next.js, TypeScript, API | [Live](https://dev-toolsbox.rg-dev.lat/) |

---

## 📄 License

This project is personal and not licensed for redistribution. Feel free to use it as inspiration for your own portfolio.

---

## 👤 Author

**Luca Musso** — Full Stack Developer based in Ivrea, Italy
- 🌐 [rg-dev.lat](https://rg-dev.lat)
- 📧 [luca.musso.dev@gmail.com](mailto:luca.musso.dev@gmail.com)
- 🐙 [github.com/Luca-Hub3](https://github.com/Luca-Hub3)
