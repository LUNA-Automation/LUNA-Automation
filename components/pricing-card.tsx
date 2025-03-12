"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, Phone, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FeatureGrid, type Feature } from "@/components/feature-grid"

interface Solution {
  title: string
  icon: React.ElementType
  setupPrice: string
  monthlyPrice: string
  description: string
  features: string[]
  cta: string
  ctaLink: string
  highlight?: boolean
  badge?: string
}

interface PricingCardProps {
  solution: Solution
  quickFeatures: Feature[]
  planType: "smb" | "midmarket" | "enterprise"
  priceType: string
  onSchedule?: () => void
}

export function PricingCard({ solution, quickFeatures, planType, priceType, onSchedule }: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-slate-900/50 backdrop-blur-sm transition-all duration-300",
        solution.highlight
          ? "border-purple-500/50 shadow-xl shadow-purple-500/20 scale-[1.02] z-10"
          : "border-slate-800/50 hover:border-slate-700/50",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {solution.badge && (
        <div className="absolute top-0 left-0 z-10">
          <Badge className="m-4 bg-purple-600 text-white border-none shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-pulse-slow">
            {solution.badge}
          </Badge>
        </div>
      )}

      <Card
        className={cn(
          "h-full bg-transparent border-none",
          solution.highlight && "bg-gradient-to-b from-purple-900/10 via-transparent to-transparent",
        )}
      >
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "p-2 rounded-full transition-colors duration-300",
                  solution.highlight ? "bg-purple-500/20" : isHovered ? "bg-slate-700/70" : "bg-slate-800/70",
                )}
              >
                <solution.icon
                  className={cn(
                    "h-6 w-6 transition-colors duration-300",
                    solution.highlight ? "text-purple-400" : isHovered ? "text-white" : "text-slate-400",
                  )}
                />
              </div>
              <h3 className="text-xl font-bold text-white">{solution.title}</h3>
            </div>

            <div className="pt-4 space-y-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={priceType}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {priceType === "setup" ? (
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-white">{solution.setupPrice}</span>
                      <span className="ml-1 text-sm text-slate-400">setup</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-white">{solution.monthlyPrice}</span>
                      <span className="ml-1 text-sm text-slate-400">/month</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="text-sm text-slate-400">
                {priceType === "setup" ? "Plus monthly retainer" : "After initial setup"}
              </div>
            </div>
          </div>

          <p className="text-slate-400">{solution.description}</p>

          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : "0px", opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 pt-2">
              {solution.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex items-start"
                >
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 -mt-2"
          >
            {isExpanded ? "Show Less" : "Show More Features"}
          </Button>

          {/* Quick Features Grid */}
          <FeatureGrid features={quickFeatures} planType={planType} />

          <div className="pt-4">
            <Button
              className={cn(
                "w-full group transition-all duration-300 rounded-xl font-medium relative overflow-hidden",
                solution.highlight
                  ? "bg-[#6A00FF] hover:bg-[#7C1AFF] text-white shadow-[0_0_10px_rgba(106,0,255,0.3)] hover:shadow-[0_0_15px_rgba(106,0,255,0.5)] hover:scale-[1.03] transform transition-all duration-300"
                  : "bg-[#6A00FF] hover:bg-[#7C1AFF] text-white shadow-[0_0_5px_rgba(106,0,255,0.2)] hover:shadow-[0_0_10px_rgba(106,0,255,0.4)] hover:scale-[1.03] transform transition-all duration-300",
              )}
              onClick={solution.title.includes("Enterprise") ? onSchedule : undefined}
            >
              {solution.title.includes("Enterprise") ? (
                <>
                  <Phone className="h-4 w-4 mr-2" /> Talk to Sales | <CalendarIcon className="h-4 w-4 mx-2" /> Schedule
                  Call
                </>
              ) : (
                <>
                  {solution.cta}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

