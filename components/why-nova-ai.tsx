"use client"

import type React from "react"

import { motion, useAnimation } from "framer-motion"
import { Brain, Zap, Trophy, RefreshCw, PiggyBank, Check, ArrowRight, Shield } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { SectionDivider } from "@/components/section-divider"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  keyPoints?: string[]
  stat?: number
  index: number
}

// Enhanced FeatureCard component
const FeatureCard = ({ icon, title, description, keyPoints, stat, index }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut",
          },
        },
      }}
      className="group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-highlight relative h-full overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]">
        {/* Enhanced gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        {/* Subtle top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Enhanced icon container with stronger glow */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600/30 to-blue-600/30 text-purple-400 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"></div>
            <motion.div
              animate={isHovered ? { scale: [1, 1.1, 1], rotate: [0, 5, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
              className="relative z-10"
            >
              {icon}
            </motion.div>
          </div>

          {/* Title with improved styling and highlight effect */}
          <h3 className="heading-highlight mb-3 text-xl">{title}</h3>

          {/* Description with better contrast */}
          <p className="text-slate-200 mb-4">{description}</p>

          {/* Stat bar with improved design and contrast */}
          {stat && (
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">Rating</span>
                <span className="text-sm font-bold text-purple-300">{stat}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800/80 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                />
              </div>
            </div>
          )}

          {/* Key points with improved visibility and contrast */}
          {keyPoints && keyPoints.length > 0 && (
            <ul className="mt-4 space-y-2">
              {keyPoints.map((point, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isHovered ? 1 : 0.8, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="flex items-start text-sm"
                >
                  <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-900/40 text-green-400 transition-all duration-300 group-hover:bg-green-900/60">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-slate-300 transition-all duration-300 group-hover:text-slate-200">{point}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Enhanced WhyNovaAI component
export function WhyNovaAI() {
  const [activeTab, setActiveTab] = useState("features")
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Keep the existing background animation code intact
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth
        canvas.height = canvas.parentElement.offsetHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle properties
    const particleCount = 50
    const particles: {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
      connections: number[]
    }[] = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.2 + 0.1})`,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        connections: [],
      })
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move particles
        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Find connections
        p.connections = []
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            p.connections.push(j)

            // Draw connection
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(147, 51, 234, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  const differentiators = [
    {
      icon: <Brain className="h-7 w-7" />,
      title: "Human-like AI",
      description: "Understands complex customer queries with contextual awareness",
      stat: 95,
      keyPoints: [
        "Context-aware, adaptive responses",
        "95% accuracy in intent recognition",
        "Natural conversation flow",
      ],
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: "Faster Response Time",
      description: "Handles calls in milliseconds, unlike competitors",
      stat: 98,
      keyPoints: ["Processes queries in under 100ms", "60% faster than industry average", "Zero perceptible latency"],
    },
    {
      icon: <Trophy className="h-7 w-7" />,
      title: "Industry-Specific Training",
      description: "Tailored for Healthcare, Legal, E-Commerce, and more",
      stat: 92,
      keyPoints: ["Specialized for 20+ industries", "Domain-specific terminology", "Regulatory compliance built-in"],
    },
    {
      icon: <RefreshCw className="h-7 w-7" />,
      title: "End-to-End Automation",
      description: "From lead qualification to appointment booking",
      stat: 90,
      keyPoints: ["Automated lead qualification", "Seamless appointment booking", "90% reduction in manual tasks"],
    },
    {
      icon: <PiggyBank className="h-7 w-7" />,
      title: "Cost-Effective Scaling",
      description: "Reduce operational costs significantly",
      stat: 70,
      keyPoints: ["70%+ operational cost reduction", "Replace multiple human agents", "Predictable pricing model"],
    },
    {
      icon: <Shield className="h-7 w-7" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with all major security standards",
      stat: 99,
      keyPoints: ["End-to-end encryption", "SOC 2 Type II compliance", "Regular security audits"],
    },
  ]

  return (
    <section ref={sectionRef} className="section-alt relative overflow-hidden py-20">
      {/* Add section divider at the top */}
      <div className="absolute top-0 left-0 right-0">
        <SectionDivider variant="curve" invert={true} />
      </div>

      {/* Keep the existing background elements intact */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Enhanced animated gradient orbs with better contrast */}
        <div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-purple-600/15 blur-[120px]"
          style={{ animation: "pulse-glow 8s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-blue-600/15 blur-[120px]"
          style={{ animation: "pulse-glow 10s ease-in-out infinite" }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Enhanced section header with stronger glow effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="relative inline-block">
            <h2 className="relative z-10 mb-4 text-4xl font-extrabold text-white md:text-5xl">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                L.U.N.A.
              </span>
              ?
            </h2>
            {/* Enhanced glow effect behind the text */}
            <div className="absolute -inset-1 -z-10 blur-xl">
              <div className="absolute inset-0 rounded-full bg-purple-500/30"></div>
            </div>
            {/* Animated underline with better visibility */}
            <div className="absolute -bottom-2 left-0 h-1 w-full overflow-hidden">
              <div
                className="h-full w-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 3s infinite linear",
                }}
              ></div>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-200">
            Discover the competitive advantages that make L.U.N.A. the leading choice for business automation
          </p>
        </motion.div>

        {/* Enhanced grid layout with better spacing and contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <FeatureCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              keyPoints={item.keyPoints}
              stat={item.stat}
              index={index}
            />
          ))}
        </div>

        {/* Enhanced CTA with stronger glow effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="relative inline-block">
            {/* Enhanced animated glow effect */}
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur-md transition-all duration-300 group-hover:opacity-100"></div>

            {/* Button with enhanced gradient border */}
            <div className="relative rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-[1px]">
              <button className="btn-glow group relative flex items-center rounded-full bg-black px-8 py-4 text-white transition-all duration-300 hover:bg-black/80">
                <span className="mr-2 text-lg font-medium">Experience L.U.N.A. Today</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600/40 transition-all duration-300 group-hover:bg-purple-600/60">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add section divider at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <SectionDivider variant="wave" />
      </div>

      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </section>
  )
}

