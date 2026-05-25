"use client"

import { useEffect, useRef, useState } from "react"

interface MousePosition {
  x: number
  y: number
}

export function useMouseMove() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const container = containerRef.current
    container?.addEventListener("mousemove", handleMouseMove)

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return { mousePosition, containerRef }
}
