"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  DiscIcon as Discord,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showChatTooltip, setShowChatTooltip] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 5000)
    }
  }

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current
    const footer = footerRef.current
    if (!canvas || !footer) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = footer.offsetWidth
      canvas.height = footer.offsetHeight
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
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
          Math.random() * 100 + 155,
        )}, 255, ${Math.random() * 0.4 + 0.1})`,
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
      particles.forEach((particle, i) => {
        // Move particles
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect particles
        particle.connections = []
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              particle.connections.push(j)
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(100, 100, 255, ${0.1 * (1 - distance / 100)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        })
      })
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <footer ref={footerRef} className="relative w-full bg-black border-t border-gray-800 overflow-hidden">
      {/* Particle background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />

      {/* Main footer content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-pulse-glow" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    N
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                L.U.N.A.
              </h2>
            </div>
            <p className="text-gray-400 text-sm">
              Revolutionizing business communication with next-generation AI voice technology.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-blue-200 border border-blue-800">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-1.5 animate-pulse"></span>
                Built with AI
              </span>
            </div>
          </div>

          {/* Quick navigation links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "About", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Pricing", href: "/pricing" },
                { name: "Case Studies", href: "#case-studies" },
                { name: "Blog", href: "#blog" },
                { name: "Careers", href: "#careers" },
                { name: "Contact Us", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 h-0.5 bg-blue-500"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter signup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Stay Ahead with AI Insights</h3>
            <p className="text-gray-400 text-sm">Subscribe to our newsletter for the latest AI trends and updates.</p>
            <form onSubmit={handleSubscribe} className="mt-2 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-200 placeholder-gray-500"
                required
              />
              <Button
                type="submit"
                size="sm"
                className={cn(
                  "absolute right-1 top-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white",
                  "transition-all duration-200 rounded-md px-3 py-1",
                )}
              >
                {isSubscribed ? <CheckCircle className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
            {isSubscribed && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-xs"
              >
                Thank you for subscribing!
              </motion.p>
            )}
          </div>

          {/* Connect with us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: <Linkedin size={18} />, href: "#linkedin", label: "LinkedIn" },
                { icon: <Twitter size={18} />, href: "#twitter", label: "Twitter" },
                { icon: <Youtube size={18} />, href: "#youtube", label: "YouTube" },
                { icon: <Instagram size={18} />, href: "#instagram", label: "Instagram" },
                { icon: <Discord size={18} />, href: "#discord", label: "Discord" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200 group relative"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all duration-300"></span>
                  <span className="relative z-10">{social.icon}</span>
                </a>
              ))}
            </div>

            {/* AI Support Chat Button */}
            <div className="mt-6 relative">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                onMouseEnter={() => setShowChatTooltip(true)}
                onMouseLeave={() => setShowChatTooltip(false)}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                AI Support Chat
              </Button>
              {showChatTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-0 right-0 bg-gray-800 text-xs text-gray-200 p-2 rounded shadow-lg"
                >
                  24/7 AI-powered support available
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom section with legal links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-xs mb-4 md:mb-0">
              © {new Date().getFullYear()} L.U.N.A. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <a href="#privacy" className="hover:text-gray-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-gray-300 transition-colors">
                Terms of Service
              </a>
              <a href="#ethics" className="hover:text-gray-300 transition-colors">
                AI Ethics Statement
              </a>
              <span>Made with ❤️ by the L.U.N.A. Team</span>
            </div>
          </div>
        </div>
      </div>

      {/* Glowing orbs for visual effect */}
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </footer>
  )
}

