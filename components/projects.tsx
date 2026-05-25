"use client"

import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Complete e-commerce platform with cart, payments and admin dashboard",
    tech: ["React", "Next.js", "TypeScript"],
    image: "/ecommerce-dashboard.png",
    link: "https://e-commerce-platform.rg-dev.lat/",
    github: "https://github.com/Luca-Hub3/E-Commerce-Platform",
  },
  {
    title: "Task Management App",
    description: "Application for managing tasks with real-time collaboration",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/task-management-concept.png",
    link: "https://to-do-app.rg-dev.lat/",
    github: "https://github.com/Luca-Hub3/To-Do-APP",
  },
  {
    title: "Portfolio-Generator",
    description: "Dynamic portfolio generator with content management, customizable previews, and automatic project integration",
    tech: ["PHP", "HTML", "CSS"],
    image: "/portfolio-generator.png",
    link: "https://portfolio-generator.rg-dev.lat/",
    github: "https://github.com/Luca-Hub3/Portfolio-Generator",
  },
  {
    title: "AI Chat Interface",
    description: "A continuously updated mini Code Assistant with more than 200 snippets to help novice programmers",
    tech: ["Next.js", "TypeScript", "API"],
    image: "/chat-interface-ai.jpg",
    link: "https://code-mini-ai.rg-dev.lat/",
    github: "#",
  },
  {
    title: "Dev ToolsBox",
    description: "Set of tools useful for developers such as JSON formatter, color picker, and code minifier",
    tech: ["Next.js", "TypeScript", "API"],
    image: "/dev-toolsbox.png",
    link: "https://dev-toolsbox.rg-dev.lat/",
    github: "#",
  },
]

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="group relative rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300">
      <div className="relative h-48 md:h-64 overflow-hidden bg-card">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 bg-card/80 backdrop-blur border-t border-border">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 md:mb-4 line-clamp-2">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 md:px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20 group-hover:bg-accent/20 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-2 md:gap-3">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:shadow-lg hover:shadow-accent/50 transition-all text-xs md:text-sm font-semibold group/btn"
          >
            <ExternalLink size={14} className="md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
            View
          </a>
          {project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-all text-xs md:text-sm font-semibold group/btn"
            >
              <Github size={14} className="md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
              Code
            </a>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-accent to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView(0.1)
  return (
    <section id="projects" className="min-h-screen flex items-center px-4 md:px-8 py-20 bg-card/30">
      <div className="max-w-6xl mx-auto w-full" ref={ref}>
        <div
          className="mb-12 md:mb-16"
          style={inView ? { animation: "stagger-in 0.6s cubic-bezier(0.34,1.56,0.64,1) 0ms both" } : { opacity: 0 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">My Projects</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
           Here are some of the projects I've worked on, showcasing my experience in full-stack development and
           innovative design.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={projects.length % 3 === 2 && index === projects.length - 1 ? "sm:col-span-2 lg:col-span-1" : projects.length % 3 === 1 && index === projects.length - 1 ? "sm:col-span-2 lg:col-span-3 lg:max-w-md lg:mx-auto" : ""}
              style={inView ? { animation: `stagger-in 0.6s cubic-bezier(0.34,1.56,0.64,1) ${120 + index * 80}ms both` } : { opacity: 0 }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}