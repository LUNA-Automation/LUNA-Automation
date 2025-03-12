"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Brain, Cpu, BarChart3, MessageSquare, Clock, Zap, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Voice Agents",
    description:
      "Handle calls and assist customers with natural voice interactions that understand context and intent.",
  },
  {
    icon: Clock,
    title: "24/7 Virtual Support",
    description: "Never miss a call with round-the-clock AI assistance that scales during peak periods.",
  },
  {
    icon: Zap,
    title: "Smart Integration",
    description: "Seamlessly connect with your existing CRM systems, scheduling tools, and business software.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Gain deep insights into customer interactions with real-time metrics and trend forecasting.",
  },
  {
    icon: Cpu,
    title: "Automated Workflows",
    description: "Streamline operations with intelligent automation that handles routine tasks efficiently.",
  },
  {
    icon: MessageSquare,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance with industry standards to keep your data safe.",
  },
]

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjAzMDRhIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-500/20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const FeatureCard = ({ feature, index }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
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
    >
      <div className="relative h-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 p-6 transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800 text-purple-400 transition-all duration-300 group-hover:text-purple-300 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]">
            <feature.icon className="h-6 w-6" />
          </div>

          <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>

          <p className="text-slate-300 flex-grow">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function WhatLUNACanDo() {
  return (
    <section id="features" className="relative py-20 overflow-hidden bg-slate-950 border-t border-slate-800">
      <ParticleBackground />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold sm:text-5xl text-white relative inline-block"
          >
            What Can{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">L.U.N.A.</span>{" "}
            Do?
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-70"></div>
            <div className="absolute -inset-1 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-slate-400"
          >
            Our AI voice agents handle business tasks efficiently, improving customer experience and automating
            operations.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Button className="group relative overflow-hidden bg-slate-900 border border-slate-700 hover:border-purple-500 text-white px-6 py-2 rounded-lg transition-all duration-300">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              Explore More AI Features
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatLUNACanDo

