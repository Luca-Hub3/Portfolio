import { GitHubIcon, InstagramIcon, DiscordIcon } from "./social-icons"
import { Code2 } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/30 px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo + copyright */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-accent rounded-lg blur opacity-50"></div>
            <Code2 className="relative text-accent-foreground p-1.5 h-8 w-8 bg-accent rounded-lg" />
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} <span className="text-foreground font-semibold">Luca Musso</span>. All rights reserved.
          </p>
        </div>

        {/* Social */}
        <div className="flex gap-3">
          <a
            href="https://github.com/Luca-Hub3"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-200"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.instagram.com/_lucamm_/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-200"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://discord.com/users/927923698927804466"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-200"
            aria-label="Discord"
          >
            <DiscordIcon />
          </a>
        </div>

      </div>
    </footer>
  )
}