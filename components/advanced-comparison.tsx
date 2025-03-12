"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Zap, Brain, RefreshCw, BarChartIcon as ChartBar, Shield, Mic } from "lucide-react"

const features = [
  {
    name: "Natural Language Understanding",
    icon: Brain,
    description: "Our AI understands context and nuance like a human, far surpassing basic keyword recognition.",
    novaAIRating: 98,
    othersRating: 60,
  },
  {
    name: "Real-time Voice Synthesis",
    icon: Mic,
    description: "NovaAI generates human-like speech in real-time, creating natural conversations.",
    novaAIRating: 95,
    othersRating: 70,
  },
  {
    name: "Advanced Analytics",
    icon: ChartBar,
    description: "Gain deep, actionable insights from every interaction with our AI-powered analytics.",
    novaAIRating: 97,
    othersRating: 65,
  },
  {
    name: "Multi-language Support",
    icon: Zap,
    description: "Seamlessly communicate in multiple languages with native-like fluency.",
    novaAIRating: 99,
    othersRating: 55,
  },
  {
    name: "24/7 Availability",
    icon: RefreshCw,
    description: "Our AI never sleeps, providing round-the-clock support without human intervention.",
    novaAIRating: 100,
    othersRating: 80,
  },
  {
    name: "Enterprise-grade Security",
    icon: Shield,
    description: "Bank-level encryption and compliance with all major security standards.",
    novaAIRating: 99,
    othersRating: 75,
  },
]

const FeatureCard = ({ feature, isNovaAI }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className={`relative w-full h-48 cursor-pointer perspective-1000`}
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="w-full h-full relative transition-all duration-500 transform-style-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-xl p-6 ${isNovaAI ? "bg-purple-900/50" : "bg-gray-800/50"} border ${isNovaAI ? "border-purple-500/50" : "border-gray-700"}`}
        >
          <div className="flex items-center space-x-4 mb-4">
            <feature.icon className={`h-8 w-8 ${isNovaAI ? "text-purple-400" : "text-gray-400"}`} />
            <h3 className={`text-xl font-bold ${isNovaAI ? "text-purple-100" : "text-gray-300"}`}>{feature.name}</h3>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
            <motion.div
              className={`h-2.5 rounded-full ${isNovaAI ? "bg-purple-600" : "bg-gray-500"}`}
              initial={{ width: 0 }}
              animate={{ width: `${isNovaAI ? feature.novaAIRating : feature.othersRating}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <p className={`text-sm ${isNovaAI ? "text-purple-200" : "text-gray-400"}`}>
            Rating: {isNovaAI ? feature.novaAIRating : feature.othersRating}%
          </p>
        </div>
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-xl p-6 ${isNovaAI ? "bg-purple-800/90" : "bg-gray-700/90"} border ${isNovaAI ? "border-purple-400" : "border-gray-600"} transform rotate-y-180`}
        >
          <p className={`text-sm ${isNovaAI ? "text-purple-100" : "text-gray-300"}`}>{feature.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export const AdvancedComparison = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null)

  return (
    <div className="relative w-full py-20 overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-[url('/ai-grid.svg')] opacity-10" />
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">NovaAI vs Others</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-purple-400 mb-6">NovaAI</h3>
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} isNovaAI={true} />
            ))}
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-400 mb-6">Others</h3>
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} isNovaAI={false} />
            ))}
          </div>
        </div>
        <div className="mt-16 text-center">
          <motion.button
            className="px-8 py-4 bg-purple-600 text-white rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upgrade to AI-Powered Success 🚀
          </motion.button>
        </div>
      </div>
    </div>
  )
}

