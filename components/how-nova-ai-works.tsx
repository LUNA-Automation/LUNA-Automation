"\"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { SectionDivider } from "@/components/section-divider"

interface Step {
  title: string
  description: string
  icon: React.ElementType
}

interface HowNovaAIWorksProps {
  steps: Step[]
}

export function HowNovaAIWorks({ steps }: HowNovaAIWorksProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section className="section-dark w-full py-16 md:py-24 lg:py-36 border-y border-slate-800/50 relative overflow-hidden">
      {/* Background elements with enhanced contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-950/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />

      {/* Animated gradient orbs with better contrast */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/10 blur-[100px] animate-pulse-slow pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow pointer-events-none"
        style={{ animationDelay: "1s" }}
      />

      <div className="container px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 },
            },
          }}
          className="flex flex-col items-center justify-center space-y-6 md:space-y-8 text-center mb-16"
        >
          <div className="space-y-4">
            <div className="relative inline-block">
              <h2 className="heading-highlight text-3xl font-extrabold tracking-tighter sm:text-5xl text-white">
                How NovaAI Works
              </h2>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/20 via-purple-500/60 to-purple-500/20 animate-shimmer"></div>
            </div>
            <p className="max-w-[900px] text-slate-200 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
              Experience seamless AI-powered communication in three simple steps
            </p>
          </div>
        </motion.div>

        <div className="mt-16 relative">
          {/* Enhanced connecting line with better visibility */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/20 via-purple-500/40 to-purple-500/20 -translate-y-1/2 hidden md:block" />

          <div className="grid gap-8 md:grid-cols-3 relative">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isHovered = hoveredStep === index

              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={controls}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: index * 0.2,
                      },
                    },
                  }}
                  className="relative flex flex-col items-center text-center"
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <motion.div
                    className="relative mb-8"
                    animate={isHovered ? { y: -5 } : { y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Enhanced icon container with better glow effect */}
                    <div
                      className={cn(
                        "w-24 h-24 rounded-full flex items-center justify-center relative z-10 transition-all duration-300",
                        "bg-gradient-to-br from-slate-800/90 to-slate-900/90",
                        isHovered ? "shadow-[0_0_30px_rgba(168,85,247,0.4)]" : "",
                      )}
                    >
                      {/* Enhanced pulsing ring with better visibility */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full border border-purple-500/40 transition-opacity duration-300",
                          isHovered ? "opacity-100 animate-pulse-border" : "opacity-0",
                        )}
                      />

                      {/* Enhanced glow effect with better contrast */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full bg-purple-500/15 blur-md transition-opacity duration-300",
                          isHovered ? "opacity-100" : "opacity-0",
                        )}
                      />

                      {/* Icon with enhanced color */}
                      <Icon
                        className={cn(
                          "h-12 w-12 transition-all duration-300",
                          isHovered ? "text-purple-300 scale-110" : "text-purple-400",
                        )}
                      />
                    </div>

                    {/* Enhanced connecting line to next step */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/40 to-purple-500/20 -translate-y-1/2 hidden md:block" />
                    )}
                  </motion.div>

                  {/* Enhanced step number with better contrast */}
                  <div className="absolute top-[5.5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 border border-purple-500/60 flex items-center justify-center z-20">
                    <span className="text-sm font-bold text-purple-300">{index + 1}</span>
                  </div>

                  {/* Enhanced content with better contrast */}
                  <motion.div
                    animate={isHovered ? { scale: 1.03 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 max-w-xs mx-auto"
                  >
                    <h3
                      className={cn(
                        "text-2xl font-bold transition-colors duration-300",
                        isHovered ? "text-purple-300" : "text-white",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="text-slate-200 text-lg leading-relaxed">{step.description}</p>
                  </motion.div>

                  {/* Enhanced progress bar with better visibility */}
                  <div className="absolute -bottom-8 left-0 right-0 h-1.5 bg-slate-800/90 overflow-hidden rounded-full mx-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={controls}
                      variants={{
                        hidden: { width: 0 },
                        visible: {
                          width: `${((index + 1) / steps.length) * 100}%`,
                          transition: {
                            duration: 1.2,
                            delay: 0.5 + index * 0.2,
                          },
                        },
                      }}
                      className={cn(
                        "h-full rounded-full",
                        isHovered
                          ? "bg-gradient-to-r from-purple-500 to-blue-500"
                          : "bg-gradient-to-r from-purple-600/90 to-blue-600/90",
                      )}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Add section divider at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <SectionDivider variant="angle" />
      </div>
    </section>
  )
}

