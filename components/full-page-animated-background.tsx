"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface FullPageAnimatedBackgroundProps {
  className?: string
}

export function FullPageAnimatedBackground({ className = "" }: FullPageAnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Handle window resize and mouse movement
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Initialize
    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Particle class for neural network effect
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * dimensions.width
        this.y = Math.random() * dimensions.height
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.color = `rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1})`
      }

      update() {
        // Move particles
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = dimensions.width
        if (this.x > dimensions.width) this.x = 0
        if (this.y < 0) this.y = dimensions.height
        if (this.y > dimensions.height) this.y = 0

        // Subtle mouse interaction
        const dx = mousePosition.x - this.x
        const dy = mousePosition.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          this.x -= Math.cos(angle) * 0.5
          this.y -= Math.sin(angle) * 0.5
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create particles
    const particleCount = 80 // Keeping count low for performance
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas with slight fade effect for trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections (neural network effect)
      ctx.strokeStyle = "rgba(139, 92, 246, 0.03)"
      ctx.lineWidth = 0.3

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw flowing abstract AI lines
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)"
      ctx.lineWidth = 0.5

      // Horizontal flowing lines
      for (let y = 0; y < dimensions.height; y += 100) {
        ctx.beginPath()
        ctx.moveTo(0, y)

        for (let x = 0; x < dimensions.width; x += 10) {
          const time = Date.now() * 0.001
          const offset = Math.sin(x * 0.01 + time) * 10
          ctx.lineTo(x, y + offset)
        }

        ctx.stroke()
      }

      // Vertical flowing lines
      for (let x = 0; x < dimensions.width; x += 150) {
        ctx.beginPath()
        ctx.moveTo(x, 0)

        for (let y = 0; y < dimensions.height; y += 10) {
          const time = Date.now() * 0.001
          const offset = Math.sin(y * 0.01 + time) * 10
          ctx.lineTo(x + offset, y)
        }

        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions, mousePosition])

  return (
    <div className={`fixed inset-0 -z-10 pointer-events-none ${className}`}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 rounded-full bg-purple-600/10 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
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
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
        style={{ width: "30vw", height: "30vw" }}
      />

      {/* Canvas for dynamic elements */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Digital circuit lines */}
      <svg className="absolute inset-0 h-full w-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,50 L100,50" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="0.1" />
        <path d="M50,0 L50,100" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="0.1" />
        <path d="M25,0 L25,100" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.05" />
        <path d="M75,0 L75,100" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.05" />
        <path d="M0,25 L100,25" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.05" />
        <path d="M0,75 L100,75" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.05" />
      </svg>

      {/* Overlay gradient for better content readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/40 pointer-events-none"></div>
    </div>
  )
}

