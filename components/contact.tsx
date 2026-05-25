"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Mail, MapPin, Send, Loader2 } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { ref: sectionRef, inView } = useInView(0.1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const rawResponse = await response.text()
        throw new Error(
          `The server returned an invalid response from /api/contact.` +
            (rawResponse ? ` Response: ${rawResponse.slice(0, 160)}` : ""),
        )
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error sending message")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    } catch (err) {
      console.error("Error sending:", err)
      if (err instanceof Error) {
        if (
          err.message.includes("Failed to fetch") ||
          err.message.includes("Load failed") ||
          err.message.includes("NetworkError")
        ) {
          setError("Unable to reach the server. Please try again later.")
        } else {
          setError(err.message)
        }
      } else {
        setError("Unknown error sending message")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = document.createElement("span")
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.style.position = "absolute"
    ripple.style.width = "10px"
    ripple.style.height = "10px"
    ripple.style.background = "var(--accent-foreground)"
    ripple.style.borderRadius = "50%"
    ripple.style.pointerEvents = "none"
    ripple.style.animation = "ripple 0.6s ease-out"

    button.style.position = "relative"
    button.style.overflow = "hidden"
    button.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  }

  return (
    <section id="contact" className="min-h-screen flex items-center px-4 md:px-8 py-20 bg-card/30">
      <div className="max-w-4xl mx-auto w-full" ref={sectionRef}>
        {/* Header */}
        <div
          className="mb-12 md:mb-16 text-center"
          style={inView ? { animation: "stagger-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0ms both" } : { opacity: 0 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">Let's get in touch</h2>
          <p className="text-muted-foreground text-base md:text-lg px-4">
          Do you have an interesting project or do you want to collaborate? I will be delighted to hear from you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-16 max-w-lg mx-auto">
          {/* Contact Info Cards */}
          {[
            { icon: Mail, label: "Email", value: "luca.musso.dev@gmail.com", href: "mailto:luca.musso.dev@gmail.com" },
            { icon: MapPin, label: "Location", value: "Ivrea, Italy", href: "https://maps.google.com/?q=Ivrea,Italy" },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <a
                key={index}
                href={item.href}
                className="p-4 md:p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:bg-card/80 transition-all duration-300 group text-center"
                style={inView ? {
                  animation: `stagger-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${(index + 1) * 100}ms both`,
                } : { opacity: 0 }}
              >
                <div className="flex justify-center mb-3 md:mb-4">
                  <Icon
                    className="text-accent group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(171,65,255,0.5)] transition-all"
                    size={24}
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">{item.label}</h3>
                <p className="text-muted-foreground text-xs md:text-sm break-words">{item.value}</p>
              </a>
            )
          })}
        </div>

        {/* Contact Form */}
        <div
          className="max-w-2xl mx-auto"
          style={{ animation: "stagger-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 400ms both" }}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6 p-6 md:p-8 rounded-xl border border-accent/30 bg-background"
          >
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 md:py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none transition-all duration-200 input-focus-effect text-sm md:text-base"
                style={{
                  boxShadow:
                    focusedField === "name"
                      ? "inset 0 0 0 1px var(--accent), 0 0 20px rgba(171, 65, 255, 0.2)"
                      : "none",
                }}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="Your email"
                className="w-full px-4 py-2.5 md:py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none transition-all duration-200 input-focus-effect text-sm md:text-base"
                style={{
                  boxShadow:
                    focusedField === "email"
                      ? "inset 0 0 0 1px var(--accent), 0 0 20px rgba(171, 65, 255, 0.2)"
                      : "none",
                }}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder="Your message..."
                rows={5}
                className="w-full px-4 py-2.5 md:py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none transition-all duration-200 resize-none input-focus-effect text-sm md:text-base"
                style={{
                  boxShadow:
                    focusedField === "message"
                      ? "inset 0 0 0 1px var(--accent), 0 0 20px rgba(171, 65, 255, 0.2)"
                      : "none",
                }}
                required
                disabled={isLoading}
              ></textarea>
            </div>

            <button
              ref={buttonRef}
              type="submit"
              onClick={handleButtonClick}
              disabled={isLoading}
              className="w-full px-6 py-2.5 md:py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-200 flex items-center justify-center gap-2 group relative overflow-hidden text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="md:w-5 md:h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </>
              )}
            </button>

            {error && (
              <div
                className="p-3 md:p-4 rounded-lg bg-destructive/20 border border-destructive text-destructive text-center text-sm md:text-base"
                style={{ animation: "stagger-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                ✗ {error}
              </div>
            )}

            {submitted && (
              <div
                className="p-3 md:p-4 rounded-lg bg-accent/20 border border-accent text-accent text-center text-sm md:text-base"
                style={{ animation: "stagger-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                ✓ Message sent successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}