"use client"

import { useState, useEffect, useRef } from "react"

const skillCategories = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "SQL", "Python", "Java", "C++", "C", "PHP"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "Vercel", "GitHub Actions", "CI/CD"],
  },
  {
    category: "Design",
    skills: ["UI/UX Design", "Responsive Design", "Accessibility", "Animation", "Web Performance"],
  },
]

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="min-h-screen flex items-center px-4 md:px-8 py-20 bg-background">
      <div className="max-w-6xl mx-auto w-full" ref={sectionRef}>
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">My Skills</h2>
          <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-accent to-transparent rounded-full"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {skillCategories.map((cat, catIndex) => (
            <div
              key={catIndex}
              className="group p-6 md:p-8 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-accent/50 transition-all duration-300"
              style={
                visible
                  ? { animation: `stagger-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${catIndex * 120}ms both` }
                  : { opacity: 0 }
              }
            >
              <h3 className="text-xl md:text-2xl font-bold text-accent mb-4 md:mb-6 group-hover:drop-shadow-[0_0_8px_rgba(171,65,255,0.5)] transition-all">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {cat.skills.map((skill) => (
                  <div
                    key={skill}
                    className="relative"
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <span
                      className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-background border border-border text-foreground text-xs md:text-sm font-medium transition-all duration-200 relative inline-block cursor-pointer hover:border-accent/50"
                      style={{
                        transform: hoveredSkill === skill ? "translateY(-4px)" : "translateY(0)",
                        boxShadow: hoveredSkill === skill ? "0 8px 20px rgba(171, 65, 255, 0.3)" : "none",
                      }}
                    >
                      {skill}
                      {hoveredSkill === skill && (
                        <span className="absolute inset-0 rounded-lg border border-accent/50 animate-pulse"></span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div
          className="mt-12 md:mt-16 p-6 md:p-8 rounded-xl bg-gradient-to-r from-accent/10 to-transparent border border-accent/30 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20"
          style={
            visible
              ? { animation: `stagger-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 480ms both` }
              : { opacity: 0 }
          }
        >
          <p className="text-base md:text-lg text-foreground">
            I am always evolving, learning new technologies and keeping up to date with trends
            sector. My philosophy is to write clean, efficient, maintainable code that creates real value.
          </p>
        </div>
      </div>
    </section>
  )
}