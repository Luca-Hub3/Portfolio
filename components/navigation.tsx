"use client"

import { useState, useEffect } from "react"
import { Code2, Menu, X } from "lucide-react"
import { GitHubIcon, InstagramIcon, DiscordIcon } from "./social-icons"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const sections = [
    { name: "Home", id: "hero" },
    { name: "Who I am", id: "about" },
    { name: "Journey", id: "timeline" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contacts", id: "contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3

      let current = "hero"
      sections.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) {
          current = id
        }
      })
      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-accent text-accent-foreground p-2.5 rounded-lg shadow-lg hover:shadow-accent/50 transition-all"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-6 md:p-8 flex flex-col justify-between transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40`}
      >
        {/* Logo */}
        <div>
          <div className="flex items-center gap-3 mb-8 md:mb-12 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-accent rounded-lg blur opacity-75 group-hover:opacity-100 transition"></div>
              <Code2 className="relative text-accent-foreground p-2 h-10 w-10 bg-accent rounded-lg animate-pulse-glow" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Luca's</h1>
              <p className="text-xs text-muted-foreground">Portfolio</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1 md:space-y-2">
            {sections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-accent bg-accent/10 border border-accent/30"
                      : "text-muted-foreground hover:text-accent hover:bg-accent/10 border border-transparent"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 ${
                      isActive ? "bg-accent shadow-[0_0_6px_rgba(171,65,255,0.8)]" : "bg-border"
                    }`}
                  />
                  {section.name}
                </a>
              )
            })}
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <div className="text-xs text-muted-foreground font-semibold mb-4">FOLLOW ME</div>
          <div className="flex gap-3">
            <a
              href="https://github.com/Luca-Hub3"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-200"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.instagram.com/_lucamm_/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-200"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://discord.com/users/927923698927804466"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-200"
              aria-label="Discord"
            >
              <DiscordIcon />
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}