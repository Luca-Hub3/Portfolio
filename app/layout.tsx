import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Luca Musso | Full Stack Developer",
  description:
    "Portfolio of Luca Musso, Full Stack Developer specialized in React, Next.js and TypeScript. Explore my projects and get in touch for collaborations.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Developer",
    "Frontend",
    "Backend",
    "Portfolio",
    "Luca Musso",
  ],
  authors: [{ name: "Luca Musso", url: "https://rg-dev.lat" }],
  creator: "Luca Musso",
  metadataBase: new URL("https://rg-dev.lat"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://rg-dev.lat",
    title: "Luca Musso | Full Stack Developer",
    description:
      "Full Stack Developer specialized in React, Next.js and TypeScript. Explore my projects and get in touch for collaborations.",
    siteName: "Luca Musso Portfolio",
    images: [
      {
        url: "/rg.png",
        width: 1200,
        height: 630,
        alt: "Luca Musso - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luca Musso | Full Stack Developer",
    description:
      "Full Stack Developer specialized in React, Next.js and TypeScript. Explore my projects and get in touch for collaborations.",
    images: ["/rg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      {
        url: "/rg.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/rg.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/rg.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/rg.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <div className="dark">{children}</div>
      </body>
    </html>
  )
}