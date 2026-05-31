"use client"

import { useRef, useEffect, useState } from "react"
import { useInView } from "@/hooks/use-in-view"

const events = [
  {
    year: "2022",
    title: "First Line of Code",
    description:
      "Discovered programming through a YouTube tutorial on HTML & CSS. Built my first static webpage — a simple fan page — and immediately felt the spark.",
    tech: ["HTML", "CSS"],
    side: "left",
  },
  {
    year: "2022",
    title: "Into JavaScript & Backend",
    description:
        "Dove deep into JavaScript, using it not only for frontend interactions but also for building Discord bots and automations. Started exploring SQL and databases, learning how to manage and structure data for dynamic applications. Launched my first dynamic blog project and deployed it on a live server for the first time.",
    tech: ["JavaScript", "PHP", "SQL"],
    side: "right",
  },
  {
    year: "2023",
    title: "React & the Modern Stack",
    description:
      "Discovered React and it changed everything. Started learning the modern frontend ecosystem: TypeScript, Tailwind CSS, and component-based architecture. Built my first portfolio and began contributing to open-source.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    side: "left",
  },
  {
    year: "2024",
    title: "Full Stack with Next.js",
    description:
      "Went all-in on Next.js and full-stack development. Built real-world apps — an e-commerce platform, a task management tool, and a dev toolbox. Started focusing on performance, accessibility, and clean architecture.",
    tech: ["Next.js", "TypeScript", "Vercel", "Git", "CI/CD"],
    side: "right",
  },
  {
    year: "2025",
    title: "Leveling Up",
    description:
      "Sharpening skills across the whole stack: deeper into API design, animations, and UI/UX craft. Always building, always learning — the journey is just getting started.",
    tech: ["Next.js", "AI APIs", "GitHub Actions", "UI/UX Design"],
    side: "left",
  },
]

function TimelineCard({
  event,
  index,
}: {
  event: (typeof events)[0]
  index: number
}) {
  const { ref, inView } = useInView(0.3)
  const isLeft = event.side === "left"

  return (
    <div
      ref={ref}
      className={`relative flex w-full items-center justify-center mb-12 md:mb-16 ${
        isLeft ? "md:justify-start" : "md:justify-end"
      }`}
      style={
        inView
          ? {
              animation: `stagger-in 0.65s cubic-bezier(0.34,1.56,0.64,1) ${index * 100}ms both`,
            }
          : { opacity: 0 }
      }
    >
      {/* Dot on the center line (desktop) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-accent border-2 border-background shadow-[0_0_14px_4px] shadow-accent/40" />
      </div>

      {/* Card */}
      <div
        className={`w-full md:w-[46%] group relative rounded-xl border border-border bg-card/60 backdrop-blur p-5 md:p-7
          hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300
          ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
      >
        {/* Connector line (desktop) */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 hidden md:block w-[4%] h-px bg-border
            ${isLeft ? "-right-[4%]" : "-left-[4%]"}`}
        />

        {/* Year badge */}
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-accent/15 text-accent border border-accent/30 mb-3">
          {event.year}
        </span>

        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-200">
          {event.title}
        </h3>

        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
          {event.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {event.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-background border border-border text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Timeline() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2)

  return (
    <section
      id="timeline"
      className="min-h-screen flex items-center px-4 md:px-8 py-20 bg-card/30"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-16 md:mb-20"
          style={
            headerInView
              ? { animation: "stagger-in 0.6s cubic-bezier(0.34,1.56,0.64,1) 0ms both" }
              : { opacity: 0 }
          }
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            My Journey
          </h2>
          <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-accent to-transparent rounded-full" />
          <p className="text-muted-foreground text-base md:text-lg mt-4 max-w-xl">
            How I went from curious beginner to full-stack developer — one project at a time.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line (desktop only) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-border to-transparent hidden md:block" />

          {events.map((event, i) => (
            <TimelineCard key={event.year} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}