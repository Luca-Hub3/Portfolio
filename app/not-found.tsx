"use client"

import { useEffect, useState } from "react"
import { Code2 } from "lucide-react"

const errorMessages = [
  "You broke something. Congrats.",
  "This page went to production... then disappeared.",
  "git blame: nobody knows what happened here.",
  "npm install missing-page — package not found.",
  "Stack overflow: page not found at level 404.",
  "undefined is not a webpage.",
  "404: even the dev has no idea where this went.",
]

const codeSnippets = [
  { sym: "{ }", x: 5, y: 12, size: 22, dur: 8 },
  { sym: "</>", x: 82, y: 8, size: 20, dur: 10 },
  { sym: "=>", x: 15, y: 72, size: 18, dur: 7 },
  { sym: "null", x: 75, y: 68, size: 16, dur: 9 },
  { sym: "undefined", x: 40, y: 85, size: 14, dur: 11 },
  { sym: "NaN", x: 88, y: 40, size: 18, dur: 8 },
  { sym: "[ ]", x: 25, y: 20, size: 20, dur: 9 },
  { sym: "catch(e)", x: 60, y: 15, size: 15, dur: 10 },
  { sym: "return 404", x: 3, y: 45, size: 13, dur: 12 },
  { sym: "🐛", x: 70, y: 88, size: 24, dur: 7 },
]

export default function NotFound() {
  const [glitch, setGlitch] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)
  const [typing, setTyping] = useState("")
  const [typed, setTyped] = useState(false)

  // Glitch periodico
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 250)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // Effetto typewriter sul messaggio
  useEffect(() => {
    const msg = errorMessages[msgIndex]
    setTyping("")
    setTyped(false)
    let i = 0
    const interval = setInterval(() => {
      setTyping(msg.slice(0, i + 1))
      i++
      if (i >= msg.length) {
        clearInterval(interval)
        setTyped(true)
        setTimeout(() => {
          setMsgIndex((prev) => (prev + 1) % errorMessages.length)
        }, 2500)
      }
    }, 35)
    return () => clearInterval(interval)
  }, [msgIndex])

  return (
    <div className="dark">
      <div className="min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden relative font-mono">

        <style>{`
          @keyframes floatSym {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.12; }
            50% { transform: translateY(-18px) rotate(4deg); opacity: 0.22; }
          }
          @keyframes glitch1 {
            0% { clip-path: inset(5% 0 80% 0); transform: translate(-6px, 2px); color: #ab41ff; }
            50% { clip-path: inset(40% 0 30% 0); transform: translate(6px, -2px); color: #c97cff; }
            100% { clip-path: inset(70% 0 10% 0); transform: translate(-3px, 0px); color: #7c2dbf; }
          }
          @keyframes glitch2 {
            0% { clip-path: inset(60% 0 15% 0); transform: translate(5px, 0); color: #7c2dbf; }
            50% { clip-path: inset(20% 0 60% 0); transform: translate(-5px, 3px); color: #ab41ff; }
            100% { clip-path: inset(85% 0 5% 0); transform: translate(3px, -1px); color: #c97cff; }
          }
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>

        {/* Scanline effect */}
        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-5"
          style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(171,65,255,0.3) 2px, rgba(171,65,255,0.3) 4px)" }}
        />
        <div
          className="absolute left-0 right-0 h-20 pointer-events-none z-0"
          style={{ background: "linear-gradient(transparent, rgba(171,65,255,0.06), transparent)", animation: "scanline 4s linear infinite" }}
        />

        {/* Floating code symbols */}
        {codeSnippets.map((s, i) => (
          <span
            key={i}
            className="absolute text-accent font-mono font-bold select-none pointer-events-none"
            style={{
              fontSize: s.size,
              left: `${s.x}%`,
              top: `${s.y}%`,
              animation: `floatSym ${s.dur}s ease-in-out ${i * 0.6}s infinite`,
            }}
          >
            {s.sym}
          </span>
        ))}

        <div className="relative z-10 text-center max-w-lg w-full">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-accent rounded-xl blur-xl opacity-70 animate-pulse"></div>
              <div className="relative bg-accent rounded-xl p-3">
                <Code2 className="text-white w-8 h-8" />
              </div>
            </div>
          </div>

          {/* 404 glitch */}
          <div className="relative inline-block mb-4">
            <h1 className="text-9xl md:text-[10rem] font-bold text-foreground tracking-tighter leading-none select-none">
              404
            </h1>
            {glitch && (
              <>
                <h1
                  className="absolute inset-0 text-9xl md:text-[10rem] font-bold tracking-tighter leading-none select-none"
                  style={{ animation: "glitch1 0.25s steps(3) forwards" }}
                >
                  404
                </h1>
                <h1
                  className="absolute inset-0 text-9xl md:text-[10rem] font-bold tracking-tighter leading-none select-none"
                  style={{ animation: "glitch2 0.25s steps(3) forwards" }}
                >
                  404
                </h1>
              </>
            )}
          </div>

          {/* Typewriter error message */}
          <div className="bg-card border border-accent/30 rounded-lg px-5 py-3 mb-6 min-h-[48px] flex items-center justify-center">
            <p className="text-accent text-sm text-left w-full">
              <span className="text-muted-foreground mr-2">//</span>
              {typing}
              <span
                className="inline-block w-0.5 h-4 bg-accent ml-0.5 align-middle"
                style={{ animation: typed ? "blink 1s step-end infinite" : "none" }}
              />
            </p>
          </div>

          {/* Terminal block */}
          <div className="bg-card border border-border rounded-lg p-4 mb-8 text-left text-xs text-muted-foreground">
            <p><span className="text-accent">$</span> curl https://rg-dev.lat<span className="text-accent/60">/this-page</span></p>
            <p className="mt-1"><span className="text-accent/80">Error 404:</span> Cannot GET /this-page</p>
            <p className="mt-1"><span className="text-accent">$</span> <span className="animate-pulse">▋</span></p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:shadow-lg hover:shadow-accent/40 hover:scale-105 transition-all duration-300"
            >
              ← Back to Home
            </a>
            <a
              href="/#contact"
              className="px-6 py-3 rounded-lg border-2 border-accent/40 text-accent hover:bg-accent/10 font-semibold transition-all duration-300"
            >
              Report the bug 🐛
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}