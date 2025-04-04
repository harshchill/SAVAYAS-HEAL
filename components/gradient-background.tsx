"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface GradientBackgroundProps {
  className?: string
  children?: React.ReactNode
}

export function GradientBackground({ className, children }: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    // Set canvas dimensions
    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      drawGradient()
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Draw the gradient
    function drawGradient() {
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "#FFC0CB")
      gradient.addColorStop(0.5, "#FFB6C1")
      gradient.addColorStop(1, "#F8E0E0")

      // Fill with gradient
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className={`fixed inset-0 -z-10 ${className || ""}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
      {children}
    </div>
  )
}

