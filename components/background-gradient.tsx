"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface BackgroundGradientProps {
  className?: string
  children?: React.ReactNode
}

export function BackgroundGradient({ className, children }: BackgroundGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let mouseX = 0
    let mouseY = 0
    let width = window.innerWidth
    let height = window.innerHeight

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const circles = Array.from({ length: 5 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 200 + 100,
      vx: Math.random() * 0.2 - 0.1,
      vy: Math.random() * 0.2 - 0.1,
      color: `rgba(236, 72, 153, ${Math.random() * 0.1 + 0.05})`,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Update circle positions
      circles.forEach((circle) => {
        circle.x += circle.vx + (mouseX - width / 2) * 0.001
        circle.y += circle.vy + (mouseY - height / 2) * 0.001

        // Bounce off edges
        if (circle.x < -circle.radius) circle.x = width + circle.radius
        if (circle.x > width + circle.radius) circle.x = -circle.radius
        if (circle.y < -circle.radius) circle.y = height + circle.radius
        if (circle.y > height + circle.radius) circle.y = -circle.radius

        // Draw circle
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius)
        gradient.addColorStop(0, circle.color)
        gradient.addColorStop(1, "rgba(236, 72, 153, 0)")
        ctx.fillStyle = gradient
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className || ""}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />
      {children}
    </div>
  )
}

