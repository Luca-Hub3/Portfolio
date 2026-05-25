"use client"

import { useEffect, useRef, useState } from "react"

const floatingItems = [
  // Simboli codice
  { type: "text", content: "{ }", x: 8, y: 15, size: 22, delay: 0, duration: 7 },
  { type: "text", content: "</>", x: 85, y: 20, size: 20, delay: 1.5, duration: 9 },
  { type: "text", content: "=>", x: 15, y: 70, size: 18, delay: 3, duration: 8 },
  { type: "text", content: "const", x: 78, y: 65, size: 16, delay: 0.8, duration: 10 },
  { type: "text", content: "[ ]", x: 50, y: 88, size: 20, delay: 2, duration: 7.5 },
  { type: "text", content: "//", x: 30, y: 10, size: 24, delay: 4, duration: 9 },
  { type: "text", content: "===", x: 65, y: 82, size: 16, delay: 1, duration: 8.5 },
  { type: "text", content: "async", x: 5, y: 45, size: 15, delay: 2.5, duration: 11 },
  { type: "text", content: "npm", x: 90, y: 45, size: 16, delay: 3.5, duration: 8 },
  { type: "text", content: "( )", x: 42, y: 5, size: 18, delay: 0.5, duration: 9.5 },
  // Loghi tecnologie come SVG
  { type: "react", x: 22, y: 30, size: 32, delay: 1.2, duration: 10 },
  { type: "ts", x: 70, y: 12, size: 28, delay: 2.8, duration: 8 },
  { type: "next", x: 88, y: 75, size: 30, delay: 0.3, duration: 9 },
  { type: "node", x: 12, y: 85, size: 28, delay: 4.5, duration: 11 },
  { type: "git", x: 58, y: 25, size: 28, delay: 1.8, duration: 7 },
  { type: "tailwind", x: 35, y: 78, size: 26, delay: 3.2, duration: 10 },
]

function FloatingIcon({ item }: { item: typeof floatingItems[0] }) {
  const style: React.CSSProperties = {
    position: "absolute",
    left: `${item.x}%`,
    top: `${item.y}%`,
    animation: `heroFloat ${item.duration}s ease-in-out ${item.delay}s infinite`,
    opacity: 0,
    pointerEvents: "none",
    userSelect: "none",
  }

  if (item.type === "text") {
    return (
      <span
        style={{
          ...style,
          fontSize: item.size,
          fontFamily: "monospace",
          color: "var(--accent)",
          fontWeight: 600,
        }}
      >
        {item.content}
      </span>
    )
  }

  const svgStyle = { width: item.size, height: item.size }

  if (item.type === "react") {
    return (
      <svg style={{ ...style, ...svgStyle }} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB" opacity="0.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" opacity="0.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" opacity="0.6" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" opacity="0.6" transform="rotate(120 12 12)" />
      </svg>
    )
  }

  if (item.type === "ts") {
    return (
      <svg style={{ ...style, ...svgStyle }} viewBox="0 0 24 24">
        <rect width="24" height="24" rx="3" fill="#3178C6" opacity="0.6" />
        <text x="3" y="17" fontSize="11" fontWeight="bold" fill="#fff" opacity="0.7" fontFamily="monospace">TS</text>
      </svg>
    )
  }

  if (item.type === "next") {
    return (
      <svg style={{ ...style, ...svgStyle }} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="0.5" />
        <text x="4" y="16" fontSize="9" fontWeight="bold" fill="currentColor" opacity="0.6" fontFamily="monospace">NEXT</text>
      </svg>
    )
  }

  if (item.type === "node") {
    return (
      <svg style={{ ...style, ...svgStyle }} viewBox="0 0 24 24">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#539E43" opacity="0.55" stroke="#539E43" strokeWidth="0.5" />
        <text x="5.5" y="14" fontSize="5.5" fontWeight="bold" fill="#fff" opacity="0.7" fontFamily="monospace">NODE</text>
      </svg>
    )
  }

  if (item.type === "git") {
    return (
      <svg style={{ ...style, ...svgStyle }} viewBox="0 0 24 24">
        <path d="M15 3H9L3 9v6l6 6h6l6-6V9l-6-6z" fill="#F05032" opacity="0.55" stroke="#F05032" strokeWidth="0.5" />
        <text x="6.5" y="15" fontSize="7" fontWeight="bold" fill="#fff" opacity="0.7" fontFamily="monospace">git</text>
      </svg>
    )
  }

  if (item.type === "tailwind") {
    return (
      <svg style={{ ...style, ...svgStyle }} viewBox="0 0 24 24">
        <path d="M6 9c1-4 3.5-6 7.5-5C15 7.5 13 10.5 9 10.5c-2.5 0-4.5 1.5-5 4.5 1-4 3.5-6 7.5-5 1.5 3.5-.5 6.5-4.5 6.5-2.5 0-4.5 1.5-5 4.5" stroke="#38BDF8" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
      </svg>
    )
  }

  return null
}

const titles = [
  "<FullStack /> Developer",
  "<React /> Enthusiast",
  "<Next.js /> Builder",
  "<TypeScript /> Lover",
]

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setTitleIndex((i) => (i + 1) % titles.length)
        setVisible(true)
      }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden bg-background"
    >
      <style>{`
        @keyframes heroFloat {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.35; }
          25% { opacity: 0.45; }
          50% { transform: translateY(-18px) rotate(3deg); opacity: 0.5; }
          75% { opacity: 0.42; }
          100% { transform: translateY(0px) rotate(0deg); opacity: 0.35; }
        }
      `}</style>

      {/* Floating background elements */}
      {floatingItems.map((item, i) => (
        <FloatingIcon key={i} item={item} />
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl text-center space-y-6 md:space-y-8 pt-16 md:pt-0">
        <div className="space-y-4">
          <div className="inline-block px-3 py-2 md:px-4 rounded-full bg-accent/10 border border-accent/30 mb-4 md:mb-6">
            <p className="text-accent text-xs md:text-sm font-semibold">Welcome to my digital universe</p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground via-accent to-foreground leading-tight px-4">
            I Turn Ideas Into Code
          </h1>

          <div className="h-16 md:h-20 font-mono text-accent text-base sm:text-lg md:text-xl lg:text-2xl bg-card/30 rounded-lg p-3 md:p-4 flex items-center justify-center border border-accent/20 mx-4">
            <span style={{ transition: "opacity 0.4s ease", opacity: visible ? 1 : 0 }}>
              {titles[titleIndex]}
            </span>
          </div>
        </div>

        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed px-4">
          I create modern, interactive web experiences with React, Next.js, and TypeScript. Passionate about design and performance
          and clean code.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-6 md:pt-8 px-4">
          <a
            href="#projects"
            className="px-6 md:px-8 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:shadow-lg hover:shadow-accent/40 hover:scale-105 transition-all duration-300 ease-out text-center"
          >
            See my works
          </a>
          <a
            href="#contact"
            className="px-6 md:px-8 py-3 rounded-lg border-2 border-accent text-accent hover:bg-accent/10 font-semibold transition-all duration-300 ease-out text-center"
          >
            Contact me
          </a>
        </div>
      </div>
    </section>
  )
}