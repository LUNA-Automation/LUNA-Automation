"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Scale,
  ShoppingBag,
  LineChart,
  Building2,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Industry {
  id: string
  name: string
  icon: React.ElementType
  description: string
  benefits: string[]
  cta: string
  link: string
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
    cta: "Improve Patient Experience",
    link: "#healthcare",
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
    cta: "Maximize Client Acquisition",
    link: "#legal",
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
    cta: "Boost Customer Satisfaction",
    link: "#ecommerce",
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
    cta: "Enhance Financial Operations",
    link: "#finance",
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
    cta: "Close More Deals",
    link: "#realestate",
  },
]

export default function IndustrySolutionsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const checkScrollability = () => {
    const slider = sliderRef.current
    if (slider) {
      const { scrollLeft, scrollWidth, clientWidth } = slider
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

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

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      const handleScroll = () => checkScrollability()
      slider.addEventListener("scroll", handleScroll)
      checkScrollability()

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        },
        { threshold: 0.1 },
      )

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }

      return () => {
        slider.removeEventListener("scroll", handleScroll)
        observer.disconnect()
      }
    }
  }, [sliderRef]) // Added sliderRef to dependencies

  // Handle window resize
  useEffect(() => {
    const handleResize = () => checkScrollability()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("w-full transition-opacity duration-1000", isVisible ? "opacity-100" : "opacity-0")}
    >
      <div className="relative">
        {/* Navigation buttons */}
        <div className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-10 w-10 rounded-full border border-slate-800 bg-slate-900/80 text-slate-400 backdrop-blur transition-all hover:border-slate-700 hover:text-white",
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
              "h-10 w-10 rounded-full border border-slate-800 bg-slate-900/80 text-slate-400 backdrop-blur transition-all hover:border-slate-700 hover:text-white",
              !canScrollRight && "opacity-50 cursor-not-allowed",
            )}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex w-full space-x-4 overflow-x-auto pb-6 pt-2 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={checkScrollability}
        >
          {industries.map((industry) => {
            const Icon = industry.icon
            const isActive = activeIndustry === industry.id

            return (
              <div key={industry.id} className="snap-start snap-always">
                <Card
                  className={cn(
                    "relative w-[280px] md:w-[320px] h-[320px] overflow-hidden border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300",
                    "hover:border-purple-800/50 hover:shadow-lg hover:shadow-purple-500/10",
                    isActive && "border-purple-600/50 shadow-lg shadow-purple-500/20",
                  )}
                  onMouseEnter={() => setActiveIndustry(industry.id)}
                  onMouseLeave={() => setActiveIndustry(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                            <Icon className="h-5 w-5 text-purple-500" />
                          </div>
                          <h3 className="text-xl font-bold text-white">{industry.name}</h3>
                        </div>
                      </div>

                      <p className="mt-4 text-slate-400">{industry.description}</p>
                    </div>

                    <div className="mt-2 flex-grow">
                      <div
                        className={cn(
                          "space-y-2 transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      >
                        {industry.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-500" />
                            <p className="text-sm text-slate-300">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-4">
                      <Button
                        variant="ghost"
                        className="group w-full justify-between border border-slate-800 bg-slate-800/50 text-slate-200 hover:bg-purple-600 hover:text-white"
                        asChild
                      >
                        <a href={industry.link}>
                          <span>{industry.cta}</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Mobile scroll indicators */}
        <div className="mt-4 flex justify-center gap-1.5 md:hidden">
          {industries.map((industry, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 rounded-full bg-slate-700 transition-all",
                activeIndustry === industry.id ? "w-6 bg-purple-500" : "w-1.5",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

