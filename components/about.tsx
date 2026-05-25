"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return count
}

const stats = [
  { target: 10, suffix: "+", label: "Completed Projects" },
  { target: 8, suffix: "+", label: "Technologies" },
  { target: 3, suffix: "+", label: "Years of Experience" },
  { target: 100, suffix: "+", label: "Coding Session" },
]

function StatCard({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
  const count = useCountUp(stat.target, 1800, started)
  return (
    <div>
      <p className="text-3xl md:text-4xl font-bold text-accent">
        {count}{stat.suffix}
      </p>
      <p className="text-muted-foreground text-xs md:text-sm">{stat.label}</p>
    </div>
  )
}

export default function About() {
  const [started, setStarted] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { ref: sectionRef, inView } = useInView(0.1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="min-h-screen flex items-center px-4 md:px-8 py-20 bg-background">
      <div className="max-w-4xl mx-auto w-full" ref={sectionRef}>
        <div
          className="mb-12 md:mb-16"
          style={inView ? { animation: "stagger-in 0.6s cubic-bezier(0.34,1.56,0.64,1) 0ms both" } : { opacity: 0 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">Who I am</h2>
          <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-accent to-transparent rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div
            className="space-y-4 md:space-y-6"
            style={inView ? { animation: "stagger-in 0.6s cubic-bezier(0.34,1.56,0.64,1) 120ms both" } : { opacity: 0 }}
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              I'm a <span className="text-accent font-semibold">Full Stack Developer</span> passionate about crafting outstanding web experiences. With over 3 years of hands-on development, I specialize in building scalable, high-performance, and user-friendly applications.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              My passion is solving complex problems through elegant code. I love working with the latest
              technologies and always keep myself updated on industry news.
            </p>

            <div className="space-y-3 pt-4 md:pt-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent flex-shrink-0"></div>
                <p className="text-foreground text-sm md:text-base">Experience with React and Next.js</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent flex-shrink-0"></div>
                <p className="text-foreground text-sm md:text-base">Backend API</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent flex-shrink-0"></div>
                <p className="text-foreground text-sm md:text-base">UI/UX Design and Responsive Web</p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div
            className="relative"
            ref={cardRef}
            style={inView ? { animation: "stagger-in 0.6s cubic-bezier(0.34,1.56,0.64,1) 240ms both" } : { opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/50 rounded-2xl blur-2xl opacity-20"></div>
            <div className="relative bg-card border border-accent/30 rounded-2xl p-6 md:p-8 space-y-4 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-accent">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {stats.map((stat) => (
                  <StatCard key={stat.label} stat={stat} started={started} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}