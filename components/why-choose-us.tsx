"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Brain, Zap, Award, Bot, DollarSign, Clock, Check, ArrowRight } from "lucide-react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  keyPoints: string[]
  index: number
}

const FeatureCard = ({ icon, title, description, keyPoints, index }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (isHovered) {
      controls.start("hover")
    } else {
      controls.start("rest")
    }
  }, [isHovered, controls])

  // Staggered animation for initial reveal
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
    rest: {
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  // Icon animation variants
  const iconVariants = {
    rest: { rotate: 0 },
    hover: {
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 1.2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-xl border border-purple-500/10 bg-black/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
    >
      {/* Enhanced glowing background effect on hover */}
      <div className="absolute -inset-px -z-10 rounded-xl bg-gradient-to-r from-purple-600/0 via-blue-600/0 to-purple-600/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-purple-600/20 group-hover:via-blue-600/20 group-hover:to-purple-600/20 group-hover:opacity-100"></div>

      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 h-10 w-10 overflow-hidden">
        <div className="absolute h-[2px] w-5 bg-purple-500/0 transition-all duration-300 group-hover:bg-purple-500/80"></div>
        <div className="absolute h-5 w-[2px] bg-purple-500/0 transition-all duration-300 group-hover:bg-purple-500/80"></div>
      </div>
      <div className="absolute top-0 right-0 h-10 w-10 overflow-hidden">
        <div className="absolute right-0 h-[2px] w-5 bg-purple-500/0 transition-all duration-300 group-hover:bg-purple-500/80"></div>
        <div className="absolute right-0 h-5 w-[2px] bg-purple-500/0 transition-all duration-300 group-hover:bg-purple-500/80"></div>
      </div>
      <div className="absolute bottom-0 left-0 h-10 w-10 overflow-hidden">
        <div className="absolute bottom-0 h-[2px] w-5 bg-purple-500/0 transition-all duration-300 group-hover:bg-purple-500/80"></div>
        <div className="absolute bottom-0 h-5 w-[2px] bg-purple-500/0 transition-all duration-300 group-hover:bg-purple-500/80"></div>
      </div>
      <div className="absolute bottom-0 right-0 h-10 w-10 overflow-hidden">
        <div className="absolute bottom-0 right-0 h-[2px] w-5 bg-purple-500/0 transition-all duration-300 group-hover:bg-purple-500/80"></div>
        <div className="absolute bottom-0 right-0 h-5 w-[2px] bg-purple-500/0 transition-all duration-300 group-hover:bg-purple-500/80"></div>
      </div>

      {/* Enhanced icon with animation */}
      <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 text-purple-400">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"></div>
        <motion.div className="relative z-10" variants={iconVariants} animate={controls}>
          {icon}
        </motion.div>

        {/* Pulsing ring effect */}
        <div className="absolute -inset-1 rounded-full border border-purple-500/0 transition-all duration-500 group-hover:border-purple-500/40 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]"></div>
        <div className="absolute -inset-4 rounded-full border border-purple-500/0 opacity-0 transition-all duration-700 group-hover:border-purple-500/20 group-hover:opacity-100"></div>
      </div>

      {/* Enhanced title with gradient text */}
      <h3 className="mb-3 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-2xl font-bold text-transparent transition-all duration-300 group-hover:from-purple-300 group-hover:to-blue-200">
        {title}
      </h3>

      {/* Description with improved styling */}
      <p className="mb-4 text-gray-300 transition-all duration-300 group-hover:text-white">{description}</p>

      {/* Key points with animated reveal */}
      <ul className="space-y-2">
        {keyPoints.map((point, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0.7, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="flex items-start text-sm"
          >
            <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-900/30 text-green-400 transition-all duration-300 group-hover:bg-green-900/50">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span className="text-gray-400 transition-all duration-300 group-hover:text-gray-200">{point}</span>
          </motion.li>
        ))}
      </ul>

      {/* Learn more link that appears on hover */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.3 }}
        className="mt-4 flex items-center text-sm font-medium text-purple-400"
      >
        <span>Learn more</span>
        <ArrowRight className="ml-1 h-4 w-4" />
      </motion.div>
    </motion.div>
  )
}

export function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState("features")
  const sectionRef = useRef<HTMLDivElement>(null)

  // Particle animation for the background
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  const features = [
    {
      icon: <Brain className="h-7 w-7" />,
      title: "Human-like AI",
      description: "Understands complex queries with human-like comprehension",
      keyPoints: [
        "Context-aware, adaptive responses",
        "95% accuracy in intent recognition",
        "Natural conversation flow",
      ],
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: "Ultra-Fast Response",
      description: "Millisecond response times for seamless interactions",
      keyPoints: ["Processes queries in under 100ms", "60% faster than industry average", "Zero perceptible latency"],
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Industry-Specific",
      description: "Custom-trained for your specific industry needs",
      keyPoints: ["Specialized for 20+ industries", "Domain-specific terminology", "Regulatory compliance built-in"],
    },
    {
      icon: <Bot className="h-7 w-7" />,
      title: "End-to-End Automation",
      description: "Complete automation from first contact to final action",
      keyPoints: ["Automated lead qualification", "Seamless appointment booking", "90% reduction in manual tasks"],
    },
    {
      icon: <DollarSign className="h-7 w-7" />,
      title: "Cost-Effective",
      description: "Reduce operational costs while scaling your business",
      keyPoints: ["70%+ operational cost reduction", "Replace multiple human agents", "Predictable pricing model"],
    },
    {
      icon: <Clock className="h-7 w-7" />,
      title: "24/7 Availability",
      description: "Always-on service without downtime or delays",
      keyPoints: [
        "Round-the-clock customer service",
        "Consistent quality at all times",
        "No staffing concerns for off-hours",
      ],
    },
  ]

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24">
      {/* Dynamic background with particles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Enhanced animated gradient orbs */}
        <div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]"
          style={{ animation: "pulse-glow 8s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]"
          style={{ animation: "pulse-glow 10s ease-in-out infinite" }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Enhanced section header with glow effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="relative inline-block">
            <h2 className="relative z-10 mb-4 text-5xl font-bold text-white md:text-6xl">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">NovaAI</span>
              ?
            </h2>
            {/* Glow effect behind the text */}
            <div className="absolute -inset-1 -z-10 blur-xl">
              <div className="absolute inset-0 rounded-full bg-purple-500/20"></div>
            </div>
            {/* Animated underline */}
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
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Discover the competitive advantages that make NovaAI the leading choice for business automation
          </p>
        </motion.div>

        {/* Tab navigation for features/comparison */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex rounded-full bg-black/30 p-1 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("features")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === "features"
                  ? "bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Key Benefits
            </button>
            <button
              onClick={() => setActiveTab("comparison")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === "comparison"
                  ? "bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Comparison
            </button>
          </div>
        </div>

        {/* Features grid with enhanced cards */}
        <AnimatePresence mode="wait">
          {activeTab === "features" && (
            <motion.div
              key="features"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    index={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    keyPoints={feature.keyPoints}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Comparison table with enhanced styling */}
          {activeTab === "comparison" && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-xl border border-purple-500/20 bg-black/40 backdrop-blur-sm"
            >
              <div className="p-8">
                <h3 className="mb-8 text-center text-2xl font-bold text-white">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    NovaAI
                  </span>{" "}
                  vs. Competitors
                </h3>

                <div className="overflow-hidden rounded-lg border border-purple-500/20">
                  {/* Table header */}
                  <div className="grid grid-cols-3 bg-purple-900/20 p-4">
                    <div className="font-medium text-gray-200">Feature</div>
                    <div className="text-center font-medium text-purple-400">NovaAI</div>
                    <div className="text-center font-medium text-gray-400">Competitors</div>
                  </div>

                  {/* Table body */}
                  <div className="divide-y divide-gray-800/50">
                    {[
                      { feature: "Human-like conversation", novaAI: true, competitors: false },
                      { feature: "Sub-100ms response time", novaAI: true, competitors: false },
                      { feature: "Industry-specific training", novaAI: true, competitors: false },
                      { feature: "End-to-end automation", novaAI: true, competitors: true },
                      { feature: "24/7 availability", novaAI: true, competitors: true },
                      { feature: "Custom integration", novaAI: true, competitors: false },
                      { feature: "No training required", novaAI: true, competitors: false },
                      { feature: "Predictable pricing", novaAI: true, competitors: false },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="grid grid-cols-3 p-4 hover:bg-purple-900/10"
                      >
                        <div className="text-gray-300">{item.feature}</div>
                        <div className="flex justify-center">
                          {item.novaAI ? (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-900/30 text-green-400">
                              <Check className="h-4 w-4" />
                            </span>
                          ) : (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-900/20 text-red-400">
                              <span className="h-3 w-3 rounded-full bg-red-500/50"></span>
                            </span>
                          )}
                        </div>
                        <div className="flex justify-center">
                          {item.competitors ? (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-900/30 text-green-400">
                              <Check className="h-4 w-4" />
                            </span>
                          ) : (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-900/20 text-red-400">
                              <span className="h-3 w-3 rounded-full bg-red-500/50"></span>
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="relative inline-block">
            {/* Animated glow effect */}
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur-md transition-all duration-300 group-hover:opacity-100"></div>

            {/* Button with gradient border */}
            <div className="relative rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-[1px]">
              <button className="group relative flex items-center rounded-full bg-black px-8 py-4 text-white transition-all duration-300 hover:bg-black/80">
                <span className="mr-2 text-lg font-medium">Experience NovaAI Today</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600/30 transition-all duration-300 group-hover:bg-purple-600/50">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </section>
  )
}

