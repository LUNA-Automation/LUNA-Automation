"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Check,
  Clock,
  Zap,
  Shield,
  Users,
  BarChart,
  Phone,
  Calendar,
  Globe,
  MessageSquare,
  Bot,
  Headphones,
  Database,
  FileText,
  Settings,
  Layers,
  Lock,
  RefreshCw,
  Cpu,
  LineChart,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface Feature {
  name: string
  icon: keyof typeof iconMap
  included: boolean
}

const iconMap = {
  check: Check,
  clock: Clock,
  zap: Zap,
  shield: Shield,
  users: Users,
  chart: BarChart,
  phone: Phone,
  calendar: Calendar,
  globe: Globe,
  message: MessageSquare,
  bot: Bot,
  headphones: Headphones,
  database: Database,
  file: FileText,
  settings: Settings,
  layers: Layers,
  lock: Lock,
  refresh: RefreshCw,
  cpu: Cpu,
  lineChart: LineChart,
}

interface FeatureGridProps {
  features: Feature[]
  planType: "smb" | "midmarket" | "enterprise"
}

export function FeatureGrid({ features, planType }: FeatureGridProps) {
  const [isVisible, setIsVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getColorsByPlanType = () => {
    switch (planType) {
      case "smb":
        return {
          iconBg: "bg-purple-500/10",
          iconColor: "text-purple-400",
          textColor: "text-purple-100",
        }
      case "midmarket":
        return {
          iconBg: "bg-cyan-500/10",
          iconColor: "text-cyan-400",
          textColor: "text-cyan-100",
        }
      case "enterprise":
        return {
          iconBg: "bg-blue-500/10",
          iconColor: "text-blue-400",
          textColor: "text-blue-100",
        }
    }
  }

  const colors = getColorsByPlanType()

  return (
    <div ref={gridRef} className="mt-6 pt-6 border-t border-slate-700/50">
      <h4 className="text-sm font-medium text-slate-400 mb-4">Quick Features</h4>
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon]

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                "flex items-center gap-2 rounded-lg p-2 transition-colors",
                feature.included ? "bg-slate-800/50" : "bg-slate-800/20 opacity-50",
              )}
            >
              <div className={cn("p-1 rounded-md", feature.included ? colors.iconBg : "bg-slate-700/20")}>
                <Icon className={cn("h-3.5 w-3.5", feature.included ? colors.iconColor : "text-slate-500")} />
              </div>
              <span className={cn("text-xs font-medium", feature.included ? colors.textColor : "text-slate-500")}>
                {feature.name}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

