"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Brain, Zap, Clock, BarChart, ArrowRight } from "lucide-react"
import { SectionDivider } from "@/components/section-divider"

export function FutureAISection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const stats = [
    {
      value: "70%",
      label: "Reduction in operational costs with AI automation",
      icon: BarChart,
    },
    {
      value: "24/7",
      label: "Continuous AI-powered customer service availability",
      icon: Clock,
    },
    {
      value: "85%",
      label: "Of customers prefer AI for quick issue resolution",
      icon: Zap,
    },
    {
      value: "3x",
      label: "Faster response times compared to human agents",
      icon: Brain,
    },
  ]

  return (
    <div ref={ref} className="section-alt w-full relative">
      {/* Add section divider at the top */}
      <div className="absolute top-0 left-0 right-0">
        <SectionDivider variant="glow" />
      </div>

      <div className="container px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - AI Illustration */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Animated Brain Illustration with enhanced glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-4/5 h-4/5">
                  {/* Enhanced outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-purple-500/15 animate-pulse-slow"></div>

                  {/* Enhanced middle ring */}
                  <div className="absolute inset-[10%] rounded-full border border-purple-500/40 animate-spin-slow"></div>

                  {/* Enhanced inner circle with brain */}
                  <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-purple-500/30 flex items-center justify-center shadow-lg shadow-purple-500/15">
                    <Brain className="w-1/2 h-1/2 text-purple-300 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                  </div>

                  {/* Orbiting elements with enhanced glow */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center"
                      style={{
                        top: `${50 + 40 * Math.sin((2 * Math.PI * i) / 3)}%`,
                        left: `${50 + 40 * Math.cos((2 * Math.PI * i) / 3)}%`,
                        transform: "translate(-50%, -50%)",
                        animation: `orbit ${8 + i * 2}s linear infinite`,
                      }}
                    >
                      {i === 0 && <Zap className="w-4 h-4 text-purple-300" />}
                      {i === 1 && <BarChart className="w-4 h-4 text-blue-300" />}
                      {i === 2 && <Clock className="w-4 h-4 text-cyan-300" />}
                    </div>
                  ))}

                  {/* Enhanced connection lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{ transform: "rotate(0deg)" }}>
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="rgba(168, 85, 247, 0.15)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      className="animate-spin-slow-reverse"
                    />
                  </svg>
                </div>
              </div>

              {/* Enhanced radial gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent rounded-full blur-2xl"></div>
            </div>
          </motion.div>

          {/* Right side - Text Content with enhanced contrast */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
              },
            }}
            className="flex flex-col items-start text-left"
          >
            <h2 className="heading-highlight text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl text-white mb-6">
              The Future of{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
                AI-Powered
              </span>{" "}
              Business Automation
            </h2>

            <p className="text-slate-200 md:text-lg leading-relaxed mb-8">
              At L.U.N.A., we specialize in cutting-edge Voice AI technology that transforms how businesses interact
              with customers. Our mission is to provide seamless, AI-driven communication that enhances efficiency and
              engagement. Whether it's handling inbound calls, scheduling, or automated customer support, L.U.N.A.
              delivers a human-like AI voice experience that adapts to your needs.
            </p>

            {/* Enhanced CTA Button with better glow effect */}
            <Button className="btn-glow group relative overflow-hidden px-8 py-6 text-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02]">
              <span className="relative z-10 flex items-center">
                Discover How AI Can Transform Your Business
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </motion.div>
        </div>

        {/* Stats Section with enhanced card contrast */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.3)" }}
                className="card-highlight relative overflow-hidden rounded-xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/15 text-purple-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <p className="text-sm text-slate-300">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Add section divider at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <SectionDivider variant="curve" flip={true} />
      </div>

      <style jsx global>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 30s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.95); }
          50% { opacity: 0.6; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

