"use client"
import { motion } from "framer-motion"

interface PricingToggleProps {
  showPriceType: string
  setShowPriceType: (type: string) => void
}

export function PricingToggle({ showPriceType, setShowPriceType }: PricingToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <div className="flex items-center justify-center space-x-2 bg-slate-900/50 p-2 rounded-xl border border-slate-800/50 backdrop-blur-sm">
        <button
          onClick={() => setShowPriceType("setup")}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            showPriceType === "setup"
              ? "bg-[#6A00FF] text-white shadow-[0_0_10px_rgba(106,0,255,0.3)]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Setup Fee
        </button>
        <button
          onClick={() => setShowPriceType("monthly")}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            showPriceType === "monthly"
              ? "bg-[#6A00FF] text-white shadow-[0_0_10px_rgba(106,0,255,0.3)]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Monthly Retainer
        </button>
      </div>
      <p className="text-sm text-slate-400">
        {showPriceType === "setup"
          ? "One-time implementation and setup costs"
          : "Ongoing monthly service and maintenance fees"}
      </p>
    </motion.div>
  )
}

