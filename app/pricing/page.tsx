"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import {
  Brain,
  ArrowRight,
  Zap,
  Shield,
  Building,
  Users,
  BarChart,
  Phone,
  CalendarIcon,
  MessageSquare,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  Rocket,
  Lock,
  Globe,
  Database,
  FileText,
  Headphones,
  Cpu,
  RefreshCw,
  Layers,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { BackToTopButton } from "@/components/back-to-top-button"

// Enterprise Scheduler Modal Component
const EnterpriseScheduler = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    employees: "",
    needs: "",
  })

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg bg-slate-900/90 border border-purple-500/30 rounded-xl shadow-[0_0_25px_rgba(139,92,246,0.3)] backdrop-blur-md overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-600/20 blur-[100px]"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-600/20 blur-[100px]"></div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8 relative z-10">
          <div className="mb-6 text-center">
            <div className="inline-flex mb-4 h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30">
              <Rocket className="h-8 w-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Enterprise AI Strategy Session</h2>
            <p className="text-slate-300">Let's build your custom AI solution together</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500/50"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="Business Email"
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500/50"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500/50"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="relative">
              <select
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500/50 appearance-none"
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
              >
                <option value="" disabled selected>
                  Company Size
                </option>
                <option value="1-50">1-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <textarea
                placeholder="Tell us about your AI automation needs..."
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500/50 min-h-[100px]"
                value={formData.needs}
                onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-shadow"
            >
              Schedule Your Strategy Session
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Feature Card Component
const FeatureCard = ({ feature, included }) => {
  const iconMap = {
    clock: <Clock className="h-4 w-4" />,
    database: <Database className="h-4 w-4" />,
    bot: <Brain className="h-4 w-4" />,
    phone: <Phone className="h-4 w-4" />,
    chart: <BarChart className="h-4 w-4" />,
    message: <MessageSquare className="h-4 w-4" />,
    file: <FileText className="h-4 w-4" />,
    globe: <Globe className="h-4 w-4" />,
    settings: <Cpu className="h-4 w-4" />,
    headphones: <Headphones className="h-4 w-4" />,
    cpu: <Cpu className="h-4 w-4" />,
    shield: <Shield className="h-4 w-4" />,
    check: <Check className="h-4 w-4" />,
    refresh: <RefreshCw className="h-4 w-4" />,
    layers: <Layers className="h-4 w-4" />,
    lock: <Lock className="h-4 w-4" />,
    lineChart: <BarChart className="h-4 w-4" />,
  }

  return (
    <div className={`flex items-center gap-2 ${included ? "text-slate-200" : "text-slate-500 line-through"}`}>
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full ${included ? "bg-purple-900/50 text-purple-400" : "bg-slate-800/50 text-slate-600"}`}
      >
        {included ? <Check className="h-3 w-3" /> : <div className="h-1 w-1 rounded-full bg-slate-600"></div>}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-sm">{feature.name}</span>
        {iconMap[feature.icon] && (
          <span className={`${included ? "text-purple-400" : "text-slate-600"}`}>{iconMap[feature.icon]}</span>
        )}
      </div>
    </div>
  )
}

// Pricing Card Component
const PricingCard = ({ solution, features, planType, onSchedule }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`group relative overflow-hidden rounded-xl border ${planType === "enterprise" ? "border-blue-500/30" : planType === "midmarket" ? "border-cyan-500/30" : "border-purple-500/30"} bg-slate-900/50 backdrop-blur-sm transition-all duration-300`}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className={`absolute inset-0 ${planType === "enterprise" ? "bg-blue-600/5" : planType === "midmarket" ? "bg-cyan-600/5" : "bg-purple-600/5"}`}
        ></div>
        <div
          className={`absolute -top-20 -right-20 h-40 w-40 rounded-full ${planType === "enterprise" ? "bg-blue-600/20" : planType === "midmarket" ? "bg-cyan-600/20" : "bg-purple-600/20"} blur-[50px]`}
        ></div>
        <div
          className={`absolute -bottom-20 -left-20 h-40 w-40 rounded-full ${planType === "enterprise" ? "bg-blue-600/20" : planType === "midmarket" ? "bg-cyan-600/20" : "bg-purple-600/20"} blur-[50px]`}
        ></div>
      </div>

      {/* Highlight badge */}
      {solution.highlight && (
        <div className="absolute -top-1 -right-1 z-10">
          <div
            className={`px-3 py-1 text-xs font-medium ${planType === "enterprise" ? "bg-blue-600" : planType === "midmarket" ? "bg-cyan-600" : "bg-purple-600"} text-white rounded-bl-lg rounded-tr-lg shadow-lg`}
          >
            {solution.badge || "Popular"}
          </div>
        </div>
      )}

      <div className="p-6 relative z-10">
        {/* Icon and title */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div
              className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg ${planType === "enterprise" ? "bg-blue-900/20 text-blue-400" : planType === "midmarket" ? "bg-cyan-900/20 text-cyan-400" : "bg-purple-900/20 text-purple-400"}`}
            >
              <solution.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">{solution.title}</h3>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          {planType === "enterprise" ? (
            <div className="flex items-center">
              <div className="text-2xl font-bold text-white">Custom Pricing</div>
            </div>
          ) : (
            <div>
              <div className="flex items-baseline">
                <div className="text-2xl font-bold text-white">{solution.setupPrice}</div>
                <div className="ml-1 text-sm text-slate-400">setup</div>
              </div>
              <div className="flex items-baseline mt-1">
                <div className="text-lg font-medium text-slate-300">{solution.monthlyPrice}</div>
                <div className="ml-1 text-sm text-slate-400">/month</div>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="mb-4 text-slate-300 text-sm">{solution.description}</p>

        {/* Features */}
        <div className="mb-6">
          {planType === "midmarket" ? (
            <div>
              <div className="space-y-2 mb-2">
                {features.slice(0, 4).map((feature, idx) => (
                  <FeatureCard key={idx} feature={feature} included={feature.included} />
                ))}
              </div>

              {features.length > 4 && (
                <div>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`flex items-center gap-1 text-sm ${planType === "midmarket" ? "text-cyan-400" : "text-purple-400"} mt-2`}
                  >
                    {isExpanded ? (
                      <>
                        <span>Show less</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>Show more</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 mt-2"
                    >
                      {features.slice(4).map((feature, idx) => (
                        <FeatureCard key={idx + 4} feature={feature} included={feature.included} />
                      ))}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {features.slice(0, 5).map((feature, idx) => (
                <FeatureCard key={idx} feature={feature} included={feature.included} />
              ))}
            </div>
          )}
        </div>

        {/* CTA Button */}
        {planType === "enterprise" ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSchedule}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-shadow"
          >
            {solution.cta}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-2.5 px-4 ${planType === "midmarket" ? "bg-gradient-to-r from-cyan-600 to-cyan-500 shadow-[0_0_15px_rgba(8,145,178,0.5)] hover:shadow-[0_0_20px_rgba(8,145,178,0.7)]" : "bg-gradient-to-r from-purple-600 to-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_20px_rgba(139,92,246,0.7)]"} text-white rounded-lg font-medium transition-shadow`}
          >
            {solution.cta}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Floating Particles Background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-purple-500/30"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `floatingParticle ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  )
}

// Main Pricing Page Component
export default function PricingPage() {
  const [activeSection, setActiveSection] = useState("smb")
  const [showSticky, setShowSticky] = useState(false)
  const [showScheduler, setShowScheduler] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98])

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  const scrollToSection = (section) => {
    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 overflow-hidden">
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes floatingParticle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0% {
            opacity: 0.5;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0.5;
            transform: scale(0.95);
          }
        }
        
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              NovaAI
            </span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-white transition-colors">
              Pricing
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-shadow"
              onClick={() => setShowScheduler(true)}
            >
              Book a Demo
            </motion.button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 relative overflow-hidden">
          {/* Animated background */}
          <FloatingParticles />

          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
            <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[120px]"></div>
            <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="space-y-4"
              >
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-blue-300">
                  🚀 Custom AI-Powered Solutions for Every Business Size
                </h1>
                <p className="mx-auto max-w-[800px] text-slate-300 md:text-xl">
                  From small business automation to enterprise AI transformation—NovaAI offers solutions built to scale.
                  Choose the plan that fits your business needs or request a custom AI deployment.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4 mt-8"
              >
                <Button
                  onClick={() => scrollToSection("smb")}
                  variant={activeSection === "smb" ? "default" : "outline"}
                  className={cn(
                    "rounded-lg px-6 transition-all duration-300 font-medium",
                    activeSection === "smb"
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                      : "border-slate-700 text-slate-300 hover:border-purple-500 hover:text-white",
                  )}
                >
                  Small Business
                </Button>
                <Button
                  onClick={() => scrollToSection("midmarket")}
                  variant={activeSection === "midmarket" ? "default" : "outline"}
                  className={cn(
                    "rounded-lg px-6 transition-all duration-300 font-medium",
                    activeSection === "midmarket"
                      ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.3)] hover:shadow-[0_0_20px_rgba(8,145,178,0.5)]"
                      : "border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-white",
                  )}
                >
                  Mid-Market
                </Button>
                <Button
                  onClick={() => scrollToSection("enterprise")}
                  variant={activeSection === "enterprise" ? "default" : "outline"}
                  className={cn(
                    "rounded-lg px-6 transition-all duration-300 font-medium",
                    activeSection === "enterprise"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                      : "border-slate-700 text-slate-300 hover:border-blue-500 hover:text-white",
                  )}
                >
                  Enterprise
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-800/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 rounded-lg px-6 py-2.5 group transition-all duration-300 flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-cyan-400 group-hover:animate-pulse" />
                  <span>Find Your Perfect AI Solution</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Small Business AI Solutions */}
        <section
          id="smb"
          className="w-full py-16 md:py-24 border-t border-slate-800/50 bg-gradient-to-b from-slate-900/50 to-slate-900/30 relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent opacity-40" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-start space-y-4 mb-12">
              <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/20 mb-2">
                Small Business AI Solutions ($5K-$150K)
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                AI Solutions for Growing Businesses
              </h2>
              <p className="text-slate-400 md:text-lg max-w-[800px]">
                Perfect for law firms, healthcare providers, real estate agencies, auto dealerships, e-commerce stores,
                and home services. Automate customer service, sales, and operations with our AI voice agents.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {smbSolutions.map((solution, index) => (
                <PricingCard key={index} solution={solution} features={smbQuickFeatures} planType="smb" />
              ))}
            </div>
          </div>
        </section>

        {/* Mid-Market AI Solutions */}
        <section id="midmarket" className="w-full py-16 md:py-24 border-t border-slate-800/50 bg-slate-900/80 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent opacity-30" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-start space-y-4 mb-12">
              <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-500/20 mb-2">
                Mid-Market AI Solutions ($100K-$500K)
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                Advanced AI for Mid-Market Companies
              </h2>
              <p className="text-slate-400 md:text-lg max-w-[800px]">
                Designed for insurance, finance, healthcare, e-commerce, SaaS, and logistics companies. AI-driven
                automation for high-volume customer interactions and business processes.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {midMarketSolutions.map((solution, index) => (
                <PricingCard key={index} solution={solution} features={midMarketQuickFeatures} planType="midmarket" />
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise AI Solutions */}
        <section id="enterprise" className="w-full py-16 md:py-24 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-blue-500/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-30" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-start space-y-4 mb-12">
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/20 mb-2">
                Enterprise AI Automation ($1M-$20M Contracts)
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                Enterprise-Scale AI Transformation
              </h2>
              <p className="text-slate-400 md:text-lg max-w-[800px]">
                Built for Fortune 500 companies, banks, telecom providers, airlines, large e-commerce platforms, and
                government agencies. Enterprise-wide AI automation for massive-scale operations.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {enterpriseSolutions.map((solution, index) => (
                <PricingCard
                  key={index}
                  solution={solution}
                  features={enterpriseQuickFeatures}
                  planType="enterprise"
                  onSchedule={() => setShowScheduler(true)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-16 md:py-24 border-t border-slate-800/50 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent opacity-30" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10" />
          </motion.div>

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-blue-300">
                Need a Custom AI Solution? Let's Build It Together.
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-300 md:text-xl">
                Our AI experts will work with you to design a solution that perfectly fits your business needs and
                goals.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8">
                <button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg px-8 py-3 rounded-lg group relative overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300"
                  onClick={() => setShowScheduler(true)}
                >
                  <span className="relative z-10 flex items-center">
                    Talk to Sales 📞 | Schedule a Strategy Call
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Sticky CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800/50 py-4 z-40"
          >
            <div className="container px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white font-medium">Ready to transform your business with AI?</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-full sm:w-auto relative overflow-hidden group rounded-lg px-6 py-2 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300"
                  onClick={() => setShowScheduler(true)}
                >
                  <span className="relative z-10">Talk to Sales 📞 | Schedule a Strategy Call</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/50 py-6 bg-slate-950">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row md:py-0">
          <p className="text-center text-sm leading-loose text-slate-400 md:text-left">
            © 2025 NovaAI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium text-slate-400 hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm font-medium text-slate-400 hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Chat Assistant Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
        className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)] hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(8,145,178,0.7)] transition-all duration-300"
        aria-label="Chat with AI Assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Enterprise Scheduler Modal */}
      <EnterpriseScheduler isOpen={showScheduler} onClose={() => setShowScheduler(false)} />

      {/* Data for pricing cards */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          // This would normally be defined in your component, but for this example
          // we're including it here to make the code complete
          const smbSolutions = ${JSON.stringify(smbSolutions)};
          const midMarketSolutions = ${JSON.stringify(midMarketSolutions)};
          const enterpriseSolutions = ${JSON.stringify(enterpriseSolutions)};
          const smbQuickFeatures = ${JSON.stringify(smbQuickFeatures)};
          const midMarketQuickFeatures = ${JSON.stringify(midMarketQuickFeatures)};
          const enterpriseQuickFeatures = ${JSON.stringify(enterpriseQuickFeatures)};
        `,
        }}
      />
    </div>
  )
}

// Data definitions for the pricing cards
const smbSolutions = [
  {
    title: "AI Call Answering & Virtual Receptionist",
    icon: Phone,
    setupPrice: "$5K-$15K",
    monthlyPrice: "$500-$1K",
    description: "Never miss a call with our AI virtual receptionist that handles business calls 24/7.",
    features: [
      "Handles business calls, FAQs, and appointment bookings",
      "Integrates with CRMs, Google Calendar, and VoIP systems",
      "Natural voice conversations with customers",
      "Call routing to appropriate staff when needed",
    ],
    cta: "Get Started Now",
    ctaLink: "/demo",
    highlight: true,
    badge: "Most Popular",
  },
  {
    title: "AI Appointment Booking & Reminders",
    icon: CalendarIcon,
    setupPrice: "$3K-$8K",
    monthlyPrice: "$300-$700",
    description: "Automate your scheduling process and reduce no-shows with AI-powered reminders.",
    features: [
      "Automates scheduling & reduces no-shows with reminders",
      "Works with Calendly, Google Calendar, and Salesforce",
      "Sends confirmation and reminder messages",
      "Handles rescheduling and cancellations",
    ],
    cta: "Start Free Trial",
    ctaLink: "/get-started",
  },
  {
    title: "AI Customer Support & FAQ Handling",
    icon: Users,
    setupPrice: "$8K-$25K",
    monthlyPrice: "$500-$1.5K",
    description: "Let AI handle common customer questions and support requests to save your team time.",
    features: [
      "Answers common questions, routes calls, and saves agents' time",
      "Integrates with Zendesk, Intercom, and Freshdesk",
      "24/7 availability for customer inquiries",
      "Escalates complex issues to human agents",
    ],
    cta: "Talk to an Expert",
    ctaLink: "/contact",
  },
  {
    title: "AI Sales & Lead Qualification Agent",
    icon: BarChart,
    setupPrice: "$10K-$50K",
    monthlyPrice: "$1K-$5K",
    description: "Convert more leads with AI agents that qualify prospects and book meetings for your sales team.",
    features: [
      "Calls inbound leads, qualifies them, and books meetings",
      "Works with HubSpot, Salesforce, Zoho CRM",
      "Follows up with leads at optimal times",
      "Provides detailed lead qualification reports",
    ],
    cta: "Request a Demo",
    ctaLink: "/demo",
  },
  {
    title: "AI Debt Collection & Payment Reminder Agent",
    icon: Zap,
    setupPrice: "$10K-$30K",
    monthlyPrice: "$1K-$10K",
    description: "Improve cash flow with automated payment reminders and collection calls.",
    features: [
      "Automates overdue payment reminders & collections",
      "Securely processes payments & negotiates settlements",
      "Integrates with payment processors and accounting software",
      "Complies with debt collection regulations",
    ],
    cta: "Get a Quote",
    ctaLink: "/quote",
  },
]

const midMarketSolutions = [
  {
    title: "AI Call Center Agent",
    icon: Phone,
    setupPrice: "$30K-$150K",
    monthlyPrice: "$5K-$25K",
    description: "Handle thousands of customer calls daily with AI agents that deliver consistent service quality.",
    features: [
      "Manages thousands of customer calls per day",
      "Works with VoIP systems like Twilio & RingCentral",
      "Reduces call center costs by up to 60%",
      "Maintains consistent service quality 24/7",
    ],
    cta: "Schedule a Demo",
    ctaLink: "/sales",
    highlight: true,
  },
  {
    title: "AI Legal & Compliance Agent",
    icon: Shield,
    setupPrice: "$100K-$500K",
    monthlyPrice: "$10K-$50K",
    description: "Automate legal document review and compliance tracking to reduce legal workload.",
    features: [
      "Automates compliance tracking & document analysis",
      "Reduces legal workload by up to 70%",
      "Ensures regulatory compliance across operations",
      "Integrates with legal document management systems",
    ],
    cta: "Book Consultation",
    ctaLink: "/consultation",
  },
  {
    title: "AI Finance & Collections Agent",
    icon: BarChart,
    setupPrice: "$100K-$500K",
    monthlyPrice: "$25K-$100K",
    description: "Optimize financial operations with AI-powered debt recovery and risk assessment.",
    features: [
      "Handles debt recovery, payment reminders, & risk assessments",
      "Works with banking & fintech platforms",
      "Improves collection rates by up to 40%",
      "Reduces financial operation costs",
    ],
    cta: "Request a Demo",
    ctaLink: "/demo",
  },
  {
    title: "AI HR & Employee Onboarding Agent",
    icon: Users,
    setupPrice: "$100K-$500K",
    monthlyPrice: "$25K-$100K",
    description: "Streamline HR processes and employee onboarding with intelligent automation.",
    features: [
      "Automates employee onboarding & HR inquiries",
      "Reduces HR workload by over 50%",
      "Improves employee satisfaction with quick responses",
      "Integrates with HRIS and payroll systems",
    ],
    cta: "Talk to an Expert",
    ctaLink: "/strategy",
  },
  {
    title: "AI Logistics & Supply Chain Agent",
    icon: Building,
    setupPrice: "$100K-$500K",
    monthlyPrice: "$50K-$200K",
    description: "Optimize your supply chain and logistics operations with AI-powered management.",
    features: [
      "Manages inventory, supplier coordination, & real-time tracking",
      "Optimizes logistics for massive cost savings",
      "Reduces shipping delays and inventory issues",
      "Provides predictive analytics for supply chain optimization",
    ],
    cta: "Get Started Now",
    ctaLink: "/contact",
  },
]

const enterpriseSolutions = [
  {
    title: "Enterprise AI Call Center Agent",
    icon: Phone,
    setupPrice: "$1M-$10M",
    monthlyPrice: "$50K-$500K",
    description: "Transform your enterprise call center with AI agents that handle millions of interactions.",
    features: [
      "Handles millions of customer interactions 24/7",
      "Reduces call center labor by over 70%",
      "Maintains consistent brand voice across all interactions",
      "Integrates with enterprise communication systems",
    ],
    cta: "Request Enterprise Quote",
    ctaLink: "/enterprise-quote",
    highlight: true,
  },
  {
    title: "Enterprise AI Legal & Compliance Automation",
    icon: Shield,
    setupPrice: "$2M+",
    monthlyPrice: "$100K+",
    description: "Comprehensive legal compliance automation for global enterprise operations.",
    features: [
      "Automates legal compliance for global enterprises",
      "Works with regulatory bodies & corporate legal teams",
      "Reduces legal costs by millions annually",
      "Minimizes compliance risks across jurisdictions",
    ],
    cta: "Book Consultation",
    ctaLink: "/enterprise-consultation",
  },
  {
    title: "Enterprise AI Debt Collection & Finance Automation",
    icon: BarChart,
    setupPrice: "$2M-$5M",
    monthlyPrice: "$250K+",
    description: "Enterprise-scale financial operations and debt recovery automation.",
    features: [
      "Automates financial operations, debt recovery & risk mitigation",
      "Processes billions in transactions securely",
      "Improves cash flow and reduces bad debt",
      "Complies with global financial regulations",
    ],
    cta: "Talk to an Expert",
    ctaLink: "/sales",
  },
  {
    title: "Enterprise AI HR & Employee AI Agent",
    icon: Users,
    setupPrice: "$5M",
    monthlyPrice: "$500K+",
    description: "Complete HR automation for large enterprises with global workforces.",
    features: [
      "Manages HR, payroll, benefits & workforce compliance",
      "Reduces HR department workload by 60%+",
      "Supports employees across multiple languages and time zones",
      "Integrates with enterprise HR systems",
    ],
    cta: "Request a Demo",
    ctaLink: "/contact",
  },
  {
    title: "Enterprise AI Supply Chain & Logistics Automation",
    icon: Building,
    setupPrice: "$5M-$20M",
    monthlyPrice: "$1M+",
    description: "Transform global supply chain operations with comprehensive AI automation.",
    features: [
      "Optimizes global supply chains for large corporations",
      "Saves millions in logistics inefficiencies",
      "Provides real-time visibility across the entire supply network",
      "Adapts to disruptions with predictive intelligence",
    ],
    cta: "Schedule Consultation",
    ctaLink: "/enterprise",
  },
]

// Quick Features for Small Business Plans
const smbQuickFeatures = [
  { name: "24/7 AI Support", icon: "clock", included: true },
  { name: "CRM Integration", icon: "database", included: true },
  { name: "Voice Recognition", icon: "bot", included: true },
  { name: "Call Routing", icon: "phone", included: true },
  { name: "Basic Analytics", icon: "chart", included: true },
  { name: "Email Notifications", icon: "message", included: false },
  { name: "Custom Scripts", icon: "file", included: false },
  { name: "Multi-language", icon: "globe", included: false },
]

// Quick Features for Mid-Market Plans
const midMarketQuickFeatures = [
  { name: "24/7 AI Support", icon: "clock", included: true },
  { name: "CRM Integration", icon: "database", included: true },
  { name: "Voice Recognition", icon: "bot", included: true },
  { name: "Call Routing", icon: "phone", included: true },
  { name: "Advanced Analytics", icon: "chart", included: true },
  { name: "Email Notifications", icon: "message", included: true },
  { name: "Custom Scripts", icon: "file", included: true },
  { name: "Multi-language", icon: "globe", included: true },
  { name: "API Access", icon: "settings", included: true },
  { name: "Dedicated Support", icon: "headphones", included: false },
  { name: "Custom AI Training", icon: "cpu", included: false },
  { name: "Enterprise Security", icon: "shield", included: false },
]

// Quick Features for Enterprise Plans
const enterpriseQuickFeatures = [
  { name: "24/7 AI Support", icon: "clock", included: true },
  { name: "CRM Integration", icon: "database", included: true },
  { name: "Voice Recognition", icon: "bot", included: true },
  { name: "Call Routing", icon: "phone", included: true },
  { name: "Enterprise Analytics", icon: "lineChart", included: true },
  { name: "Email Notifications", icon: "message", included: true },
  { name: "Custom Scripts", icon: "file", included: true },
  { name: "Multi-language", icon: "globe", included: true },
  { name: "API Access", icon: "settings", included: true },
  { name: "Dedicated Support", icon: "headphones", included: true },
  { name: "Custom AI Training", icon: "cpu", included: true },
  { name: "Enterprise Security", icon: "shield", included: true },
  { name: "SLA Guarantee", icon: "check", included: true },
  { name: "High Availability", icon: "refresh", included: true },
  { name: "Multi-region", icon: "layers", included: true },
  { name: "SOC2 Compliance", icon: "lock", included: true },
]

