"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Scale,
  ShoppingBag,
  LineChart,
  Building2,
  ArrowRight,
  X,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

interface Industry {
  id: string
  name: string
  icon: React.ElementType
  description: string
  benefits: string[]
  cta: string
  solutions: string[]
  caseStudy: {
    company: string
    challenge: string
    solution: string
    results: string[]
  }
  howLUNAHelps: string[]
}

const industries: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Stethoscope,
    description: "Streamline patient scheduling and support with AI-powered voice assistance",
    benefits: [
      "Reduce no-shows by 60% with automated appointment reminders",
      "Free up staff time with AI-powered patient intake",
      "Provide 24/7 support for common patient questions",
    ],
    solutions: [
      "Automated patient scheduling to reduce wait times",
      "AI-powered virtual receptionists for 24/7 support",
      "Appointment reminders & rescheduling via voice AI",
      "Automated insurance verification & claim updates",
      "Voice-driven prescription refill requests",
    ],
    cta: "Improve Patient Experience",
    caseStudy: {
      company: "MedCare Hospital",
      challenge: "High no-show rates and overwhelmed staff handling appointment scheduling",
      solution: "Implemented L.U.N.A. for automated appointment reminders and scheduling",
      results: [
        "Reduced no-show rates by 45%",
        "Saved 20 hours per week in staff time",
        "Increased patient satisfaction scores by 30%",
      ],
    },
    howLUNAHelps: [
      "24/7 appointment scheduling and reminders",
      "Automated patient intake and triage",
      "Instant answers to common health queries",
      "Seamless integration with existing EMR systems",
    ],
  },
  {
    id: "legal",
    name: "Legal",
    icon: Scale,
    description: "Never miss a client call with 24/7 virtual receptionist and case management",
    benefits: [
      "Capture potential clients even after hours",
      "Qualify leads before routing to attorneys",
      "Schedule consultations without human intervention",
    ],
    solutions: [
      "24/7 AI virtual receptionist to handle client inquiries",
      "Automated case intake & client qualification",
      "AI voice follow-ups for case updates & scheduling",
      "Call transcription & documentation for legal cases",
      "Automated billing & invoice reminders",
    ],
    cta: "Maximize Client Acquisition",
    caseStudy: {
      company: "Smith & Partners Law Firm",
      challenge: "Missed potential clients due to after-hours calls and inefficient lead qualification",
      solution: "Deployed L.U.N.A. as a 24/7 virtual receptionist with lead qualification capabilities",
      results: [
        "Increased client acquisition by 35%",
        "Reduced response time to potential clients by 80%",
        "Improved attorney productivity by 25% through better lead qualification",
      ],
    },
    howLUNAHelps: [
      "24/7 call handling and appointment scheduling",
      "Intelligent lead qualification and routing",
      "Automated case intake and document preparation",
      "Integration with legal practice management software",
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    icon: ShoppingBag,
    description: "Enhance customer satisfaction with AI-driven order tracking and support",
    benefits: [
      "Handle order status inquiries automatically",
      "Reduce support ticket volume by 40%",
      "Increase customer satisfaction with instant responses",
    ],
    solutions: [
      "AI-powered order tracking & status updates",
      "Automated customer support for FAQs & refunds",
      "Voice AI for personalized shopping assistance",
      "Cart abandonment recovery calls & reminders",
      "Automated fraud detection & verification",
    ],
    cta: "Boost Customer Satisfaction",
    caseStudy: {
      company: "GlobalShop Online Marketplace",
      challenge: "High volume of customer service inquiries leading to long wait times and dissatisfaction",
      solution: "Implemented L.U.N.A. for automated order tracking and first-line customer support",
      results: [
        "Reduced customer service wait times by 70%",
        "Decreased support ticket volume by 50%",
        "Increased customer satisfaction ratings by 40%",
      ],
    },
    howLUNAHelps: [
      "Automated order tracking and status updates",
      "Intelligent product recommendations",
      "24/7 customer support for common inquiries",
      "Seamless integration with e-commerce platforms",
    ],
  },
  {
    id: "finance",
    name: "Finance",
    icon: LineChart,
    description: "Improve collections and prevent fraud with automated verification",
    benefits: [
      "Increase debt recovery rates with personalized outreach",
      "Detect suspicious activity with AI pattern recognition",
      "Streamline customer verification processes",
    ],
    solutions: [
      "Automated payment reminders & collections",
      "Fraud prevention through voice authentication",
      "AI-powered client onboarding & verification",
      "Voice-driven account balance & transaction updates",
      "Debt collection voice agent for compliance-friendly reminders",
    ],
    cta: "Enhance Financial Operations",
    caseStudy: {
      company: "SecureBank Financial Services",
      challenge: "Increasing fraud attempts and inefficient debt collection processes",
      solution: "Deployed L.U.N.A. for automated fraud detection and personalized debt collection outreach",
      results: [
        "Reduced fraud incidents by 60%",
        "Improved debt recovery rates by 40%",
        "Decreased operational costs by 30% through automation",
      ],
    },
    howLUNAHelps: [
      "AI-powered fraud detection and prevention",
      "Automated and personalized debt collection calls",
      "24/7 customer support for banking queries",
      "Seamless integration with financial management systems",
    ],
  },
  {
    id: "realestate",
    name: "Real Estate",
    icon: Building2,
    description: "Qualify leads and automate follow-ups to close more deals",
    benefits: [
      "Never miss a potential buyer inquiry",
      "Automatically schedule property viewings",
      "Maintain consistent follow-up with prospects",
    ],
    solutions: [
      "AI-powered property inquiries & lead qualification",
      "Automated appointment scheduling for showings",
      "Voice follow-ups with potential buyers & tenants",
      "24/7 virtual assistant for listings & mortgage info",
      "Automated tenant rent payment reminders",
    ],
    cta: "Close More Deals",
    caseStudy: {
      company: "Prime Properties Realty",
      challenge: "Missed leads due to delayed responses and inconsistent follow-ups",
      solution: "Implemented L.U.N.A. for lead qualification, automated scheduling, and follow-up management",
      results: [
        "Increased lead conversion rate by 50%",
        "Reduced response time to inquiries by 90%",
        "Improved agent productivity by 35% through automated tasks",
      ],
    },
    howLUNAHelps: [
      "24/7 lead capture and qualification",
      "Automated property viewing scheduling",
      "Consistent follow-up communication with prospects",
      "Integration with CRM and property management systems",
    ],
  },
]

export default function IndustrySolutionsSlider() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollability()
    window.addEventListener("resize", checkScrollability)
    return () => window.removeEventListener("resize", checkScrollability)
  }, [sliderRef])

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const handleExpand = (id: string) => {
    setExpandedIndustry(expandedIndustry === id ? null : id)
  }

  return (
    <div className="w-full py-4">
      <div className="relative">
        <div className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-10 w-10 rounded-full border border-slate-800 bg-slate-950/80 text-slate-400 backdrop-blur transition-all duration-300 hover:border-purple-500/50 hover:text-white hover:shadow-sm hover:shadow-purple-500/20",
              !canScrollLeft && "opacity-50 cursor-not-allowed",
            )}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Scroll left</span>
          </Button>
        </div>
        <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-10 w-10 rounded-full border border-slate-800 bg-slate-950/80 text-slate-400 backdrop-blur transition-all duration-300 hover:border-purple-500/50 hover:text-white hover:shadow-sm hover:shadow-purple-500/20",
              !canScrollRight && "opacity-50 cursor-not-allowed",
            )}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
        <div
          ref={sliderRef}
          className="flex space-x-6 overflow-x-auto pb-6 pt-2 scrollbar-hide"
          onScroll={checkScrollability}
        >
          {industries.map((industry) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              isActive={activeIndustry === industry.id}
              isExpanded={expandedIndustry === industry.id}
              onMouseEnter={() => setActiveIndustry(industry.id)}
              onMouseLeave={() => setActiveIndustry(null)}
              onExpand={() => handleExpand(industry.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function IndustryCard({
  industry,
  isActive,
  isExpanded,
  onMouseEnter,
  onMouseLeave,
  onExpand,
}: {
  industry: Industry
  isActive: boolean
  isExpanded: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onExpand: () => void
}) {
  const Icon = industry.icon
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
        transition: { duration: 0.5 },
      }}
      className={cn(
        "relative flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300",
        isExpanded
          ? "w-full md:w-[600px] h-auto border-none bg-slate-900/40 backdrop-blur-xl shadow-lg shadow-purple-500/10"
          : "w-[320px] h-[380px] border-none bg-slate-900/30 backdrop-blur-xl hover:shadow-lg hover:shadow-purple-500/10",
        // Enhanced glassmorphic effect
        "before:absolute before:inset-0 before:rounded-xl before:border before:border-slate-700/30 before:bg-gradient-to-b before:from-slate-800/50 before:to-slate-900/50 before:backdrop-blur-md",
        // Glowing effect on hover/active
        isActive &&
          !isExpanded &&
          "ring-1 ring-purple-500/40 shadow-md shadow-purple-500/15 before:border-purple-500/30",
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={
        !isExpanded
          ? {
              boxShadow: "0 0 20px 0 rgba(168, 85, 247, 0.15)",
            }
          : undefined
      }
    >
      <div className={cn("relative h-full p-7 md:p-8 transition-all duration-300 z-10")}>
        <div className="flex flex-col h-full">
          <motion.div
            layout="position"
            className="flex items-center gap-4 mb-6"
            whileHover={{ scale: isExpanded ? 1 : 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Enhanced icon with neon glow */}
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300",
                "bg-gradient-to-br from-purple-600/20 to-slate-800/80",
                "shadow-md shadow-purple-500/10",
                isActive || isExpanded ? "shadow-lg shadow-purple-500/20" : "",
                // Added subtle glow effect
                "before:absolute before:inset-0 before:rounded-full before:bg-purple-500/5 before:blur-md before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
              )}
            >
              <Icon
                className={cn(
                  "h-7 w-7 transition-all duration-300",
                  isActive || isExpanded
                    ? "text-purple-400 filter drop-shadow-[0_0_3px_rgba(168,85,247,0.5)]"
                    : "text-purple-500",
                )}
              />
            </div>
            {/* Enhanced title typography */}
            <h3
              className={cn(
                "text-2xl font-bold transition-colors duration-300",
                isActive || isExpanded ? "text-white" : "text-slate-200",
                "tracking-tight",
              )}
            >
              {industry.name}
            </h3>
          </motion.div>

          {/* Divider after title */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-5"></div>

          <motion.p
            layout="position"
            className={cn(
              "text-base transition-colors duration-300 mb-6 leading-relaxed",
              isActive || isExpanded ? "text-slate-300" : "text-slate-400",
            )}
          >
            {industry.description}
          </motion.p>

          {/* Added What We Do section to non-expanded card with enhanced styling */}
          {!isExpanded && (
            <motion.div layout="position" className="mt-auto mb-6">
              <h4 className="text-sm font-semibold text-purple-400 mb-3 relative inline-block">
                What We Do
                {/* Gradient underline effect */}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0"></span>
              </h4>
              <ul className="space-y-2.5">
                {industry.solutions.slice(0, 3).map((solution, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    {/* Enhanced checkmark */}
                    <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5 flex-shrink-0 shadow-sm shadow-purple-500/10">
                      <Check className="h-3 w-3 text-purple-400 filter drop-shadow-[0_0_2px_rgba(168,85,247,0.5)]" />
                    </div>
                    <span className="text-sm text-slate-300 leading-tight">{solution}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.div layout="position" className="mt-auto">
            <Button
              variant="ghost"
              className={cn(
                "group w-full justify-between transition-all duration-300",
                "border rounded-lg py-2.5 px-5",
                isExpanded
                  ? "bg-slate-800/80 border-slate-700/50 text-white hover:bg-slate-700/80 hover:border-purple-500/30"
                  : "bg-slate-800/50 border-slate-700/30 text-slate-300 hover:bg-purple-600/20 hover:text-white hover:border-purple-500/30 hover:shadow-sm hover:shadow-purple-500/10",
                // Enhanced glow effect on hover
                "hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]",
              )}
              onClick={onExpand}
            >
              <span className="font-medium">{isExpanded ? "Close" : "Learn More"}</span>
              {isExpanded ? (
                <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              ) : (
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </Button>
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-8 pt-6 border-t border-slate-700/30 overflow-hidden"
            >
              <div className="space-y-8">
                {/* Enhanced solutions section with improved styling */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-4 relative inline-block">
                    L.U.N.A. Solutions
                    {/* Gradient underline effect */}
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0"></span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {industry.solutions.map((solution, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/40 border border-slate-700/30 backdrop-blur-sm hover:border-purple-500/20 transition-all duration-300 hover:shadow-sm hover:shadow-purple-500/5"
                      >
                        <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5 flex-shrink-0 shadow-sm shadow-purple-500/10">
                          <Check className="h-3 w-3 text-purple-400 filter drop-shadow-[0_0_2px_rgba(168,85,247,0.5)]" />
                        </div>
                        <span className="text-sm text-slate-300">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-4 relative inline-block">
                    Case Study: {industry.caseStudy.company}
                    {/* Gradient underline effect */}
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0"></span>
                  </h4>
                  <div className="space-y-4 text-slate-300">
                    <div className="p-5 rounded-lg bg-slate-800/40 border border-slate-700/30 backdrop-blur-sm hover:border-purple-500/20 transition-all duration-300">
                      <span className="font-semibold text-white block mb-2">Challenge:</span>
                      <p className="leading-relaxed">{industry.caseStudy.challenge}</p>
                    </div>
                    <div className="p-5 rounded-lg bg-slate-800/40 border border-slate-700/30 backdrop-blur-sm hover:border-purple-500/20 transition-all duration-300">
                      <span className="font-semibold text-white block mb-2">Solution:</span>
                      <p className="leading-relaxed">{industry.caseStudy.solution}</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <span className="font-semibold text-white block mb-3">Results:</span>
                    <ul className="space-y-3">
                      {industry.caseStudy.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5 flex-shrink-0 shadow-sm shadow-purple-500/10">
                            <Check className="h-3 w-3 text-purple-400 filter drop-shadow-[0_0_2px_rgba(168,85,247,0.5)]" />
                          </div>
                          <span className="leading-tight">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-4 relative inline-block">
                    How L.U.N.A. Helps
                    {/* Gradient underline effect */}
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0"></span>
                  </h4>
                  <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {industry.howLUNAHelps.map((help, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/40 border border-slate-700/30 backdrop-blur-sm hover:border-purple-500/20 transition-all duration-300"
                      >
                        <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5 flex-shrink-0 shadow-sm shadow-purple-500/10">
                          <Check className="h-3 w-3 text-purple-400 filter drop-shadow-[0_0_2px_rgba(168,85,247,0.5)]" />
                        </div>
                        <span className="text-sm text-slate-300 leading-tight">{help}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced gradient overlay effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none z-0",
          (isActive || isExpanded) && "opacity-100",
        )}
      />

      {/* Subtle glow effect on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl bg-purple-500/0 opacity-0 transition-all duration-500 pointer-events-none blur-xl z-0",
          isActive && !isExpanded && "bg-purple-500/5 opacity-100",
        )}
      />
    </motion.div>
  )
}

