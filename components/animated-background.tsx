"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedBackgroundProps {
  intensity?: "low" | "medium" | "high"
  color?: "purple" | "blue" | "cyan"
  className?: string
}

export function AnimatedBackground({
  intensity = "medium",
  color = "purple",
  className = "",
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)

  // Set color based on prop
  const getColor = () => {
    switch (color) {
      case "blue":
        return { primary: "rgba(59, 130, 246, 0.8)", secondary: "rgba(37, 99, 235, 0.5)" }
      case "cyan":
        return { primary: "rgba(6, 182, 212, 0.8)", secondary: "rgba(8, 145, 178, 0.5)" }
      default:
        return { primary: "rgba(139, 92, 246, 0.8)", secondary: "rgba(124, 58, 237, 0.5)" }
    }
  }

  // Set particle count based on intensity
  const getParticleCount = () => {
    switch (intensity) {
      case "low":
        return 50
      case "high":
        return 150
      default:
        return 100
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Handle resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
      }
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Initialize
    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      originalX: number
      originalY: number
      density: number

      constructor(x: number, y: number, color: string) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = color
        this.density = Math.random() * 30 + 1
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }

      update() {
        // Natural movement
        this.x += this.speedX
        this.y += this.speedY

        // Boundary check
        if (this.x > dimensions.width || this.x < 0) {
          this.speedX *= -1
        }
        if (this.y > dimensions.height || this.y < 0) {
          this.speedY *= -1
        }

        // Mouse interaction
        const dx = mousePosition.x - this.x
        const dy = mousePosition.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 100

        if (distance < maxDistance) {
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (maxDistance - distance) / maxDistance
          const directionX = forceDirectionX * force * this.density
          const directionY = forceDirectionY * force * this.density

          this.x -= directionX
          this.y -= directionY
        } else {
          // Return to original position
          if (Math.abs(this.x - this.originalX) > 0.1 || Math.abs(this.y - this.originalY) > 0.1) {
            this.x += (this.originalX - this.x) * 0.01
            this.y += (this.originalY - this.y) * 0.01
          }
        }
      }
    }

    // Line class for neural network effect
    class Line {
      startParticle: Particle
      endParticle: Particle
      color: string

      constructor(startParticle: Particle, endParticle: Particle, color: string) {
        this.startParticle = startParticle
        this.endParticle = endParticle
        this.color = color
      }

      draw() {
        if (!ctx) return
        const dx = this.endParticle.x - this.startParticle.x
        const dy = this.endParticle.y - this.startParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.beginPath()
          ctx.strokeStyle = this.color
          ctx.lineWidth = 0.2
          ctx.globalAlpha = 1 - distance / 150
          ctx.moveTo(this.startParticle.x, this.startParticle.y)
          ctx.lineTo(this.endParticle.x, this.endParticle.y)
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      }
    }

    // Create particles
    const colors = getColor()
    const particleCount = getParticleCount()
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * dimensions.width
      const y = Math.random() * dimensions.height
      const color =
        Math.random() > 0.5
          ? `rgba(${Number.parseInt(colors.primary.split(",")[0].slice(5))}, ${Number.parseInt(colors.primary.split(",")[1])}, ${Number.parseInt(colors.primary.split(",")[2])}, ${Math.random() * 0.5 + 0.1})`
          : `rgba(${Number.parseInt(colors.secondary.split(",")[0].slice(5))}, ${Number.parseInt(colors.secondary.split(",")[1])}, ${Number.parseInt(colors.secondary.split(",")[2])}, ${Math.random() * 0.5 + 0.1})`
      particles.push(new Particle(x, y, color))
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw flowing lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const line = new Line(
            particles[i],
            particles[j],
            `rgba(${Number.parseInt(colors.primary.split(",")[0].slice(5))}, ${Number.parseInt(colors.primary.split(",")[1])}, ${Number.parseInt(colors.primary.split(",")[2])}, 0.05)`,
          )
          line.draw()
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw abstract AI lines
      ctx.beginPath()
      ctx.strokeStyle = `rgba(${Number.parseInt(colors.primary.split(",")[0].slice(5))}, ${Number.parseInt(colors.primary.split(",")[1])}, ${Number.parseInt(colors.primary.split(",")[2])}, 0.1)`
      ctx.lineWidth = 1

      // Horizontal lines
      for (let i = 0; i < dimensions.height; i += 50) {
        const amplitude = 5
        const frequency = 0.01
        const speed = Date.now() * 0.001

        ctx.beginPath()
        ctx.moveTo(0, i)

        for (let x = 0; x < dimensions.width; x += 5) {
          const y = i + Math.sin(x * frequency + speed) * amplitude
          ctx.lineTo(x, y)
        }

        ctx.stroke()
      }

      // Vertical lines
      for (let i = 0; i < dimensions.width; i += 100) {
        const amplitude = 5
        const frequency = 0.02
        const speed = Date.now() * 0.0015

        ctx.beginPath()
        ctx.moveTo(i, 0)

        for (let y = 0; y < dimensions.height; y += 5) {
          const x = i + Math.sin(y * frequency + speed) * amplitude
          ctx.lineTo(x, y)
        }

        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [intensity, color, dimensions])

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black"></div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 rounded-full bg-purple-600/10 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{ width: "40vw", height: "40vw" }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 rounded-full bg-blue-600/10 blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
        style={{ width: "30vw", height: "30vw" }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

      {/* Canvas for dynamic elements */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none"></div>
    </div>
  )
}

