"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Brain, ArrowRight, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SectionDivider } from "@/components/section-divider"

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  // Handle audio playback
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Track mouse position for the interactive glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-black py-20 md:py-28 lg:min-h-[90vh] lg:flex lg:items-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

        {/* Enhanced gradient orbs with better contrast */}
        <div className="absolute top-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-[100px]"></div>

        {/* Interactive glow that follows mouse with enhanced visibility */}
        <div
          className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[80px] opacity-0 lg:opacity-100 transition-opacity duration-300"
          style={{
            left: `${mousePosition.x - 150}px`,
            top: `${mousePosition.y - 150}px`,
            transition: "opacity 0.3s ease",
          }}
        ></div>

        {/* Animated particles with enhanced visibility */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-purple-300"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.4 + 0.1,
                animation: `float ${5 + Math.random() * 15}s linear infinite`,
              }}
            />
          ))}
        </div>

        {/* Digital circuit lines with enhanced visibility */}
        <svg className="absolute inset-0 h-full w-full opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 L100,50" stroke="rgba(139, 92, 246, 0.6)" strokeWidth="0.1" />
          <path d="M50,0 L50,100" stroke="rgba(139, 92, 246, 0.6)" strokeWidth="0.1" />
          <path d="M25,0 L25,100" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.05" />
          <path d="M75,0 L75,100" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.05" />
          <path d="M0,25 L100,25" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.05" />
          <path d="M0,75 L100,75" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.05" />
        </svg>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            {/* Animated Logo with enhanced glow */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30"
            >
              <Brain className="h-8 w-8 text-purple-300" />
            </motion.div>

            {/* Main Headline with enhanced typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block text-white">Automate Your Business</span>
              <span className="mt-2 block bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                With AI-Powered Intelligence
              </span>
            </motion.h1>

            {/* Subheading with better contrast */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 md:text-xl"
            >
              L.U.N.A. streamlines your operations with intelligent automation, handling calls, customer inquiries, and
              scheduling with human-like precision—all while cutting operational costs by up to 70%.
            </motion.p>

            {/* CTA Buttons with enhanced contrast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            >
              {/* Primary CTA Button with enhanced glow */}
              <Button className="btn-glow group relative h-14 w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 text-lg font-medium text-white shadow-lg shadow-purple-600/30 sm:w-auto">
                <span className="relative z-10 flex items-center justify-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Button>

              {/* Voice Demo Button with enhanced contrast */}
              <div className="relative">
                <Button
                  onClick={toggleAudio}
                  variant="outline"
                  className={cn(
                    "btn-glow group relative h-14 w-full overflow-hidden rounded-xl border-purple-500/40 bg-black/60 px-8 text-lg font-medium backdrop-blur-sm sm:w-auto",
                    isPlaying ? "text-purple-300" : "text-white",
                  )}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isPlaying ? (
                      <>
                        <Pause className="mr-2 h-5 w-5" />
                        Stop Demo
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-5 w-5" />
                        Hear L.U.N.A.
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 z-0 bg-purple-600/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </Button>

                {/* Enhanced animated ring when playing */}
                {isPlaying && (
                  <div className="absolute -inset-1 rounded-xl border border-purple-500/60 animate-pulse"></div>
                )}
              </div>
            </motion.div>

            {/* Stats Section with enhanced contrast */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
            >
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "70%", label: "Cost Reduction" },
                { value: "24/7", label: "Availability" },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Trusted By Section with enhanced contrast */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16"
            >
              <p className="mb-4 text-sm text-slate-400">TRUSTED BY INNOVATIVE COMPANIES</p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 w-24 rounded bg-slate-800/60"></div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src="/audio/ai-call-simulation.mp3" onEnded={() => setIsPlaying(false)} />

      {/* Floating AI Assistant Button with enhanced glow */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-glow flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/40"
        >
          <Wand2 className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Add section divider at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <SectionDivider variant="wave" />
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(-40px) translateX(0);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}

