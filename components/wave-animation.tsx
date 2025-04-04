"use client"

import { useEffect, useRef } from "react"

interface WaveAnimationProps {
  className?: string
}

export function WaveAnimation({ className }: WaveAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let animationFrameId: number

    // Set canvas dimensions
    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Wave parameters
    const waves = [
      { y: height * 0.3, length: 0.5, amplitude: 25, speed: 0.003, color: "rgba(255, 192, 203, 0.2)" },
      { y: height * 0.4, length: 0.7, amplitude: 20, speed: 0.004, color: "rgba(255, 182, 193, 0.2)" },
      { y: height * 0.5, length: 0.9, amplitude: 30, speed: 0.002, color: "rgba(248, 224, 224, 0.2)" },
      { y: height * 0.6, length: 0.6, amplitude: 15, speed: 0.005, color: "rgba(255, 192, 203, 0.15)" },
    ]

    let time = 0

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw each wave
      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, wave.y)

        // Draw wave path
        for (let x = 0; x < width; x++) {
          const dx = x * wave.length * 0.01
          const y = wave.y + Math.sin(dx + time * wave.speed * Math.PI * 2) * wave.amplitude
          ctx.lineTo(x, y)
        }

        // Complete the wave path
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()

        // Fill the wave
        ctx.fillStyle = wave.color
        ctx.fill()
      })

      time += 0.05
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className || ""}`}
      style={{ pointerEvents: "none" }}
    />
  )
}

