"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Building, Users, ArrowRight, Bot, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PricingSelectorProps {
  isOpen: boolean
  onClose: () => void
}

export function PricingSelector({ isOpen, onClose }: PricingSelectorProps) {
  const [step, setStep] = useState(1)
  const [businessSize, setBusinessSize] = useState("")
  const [industry, setIndustry] = useState("")
  const [callVolume, setCallVolume] = useState<number[]>([50])
  const [aiNeeds, setAiNeeds] = useState<string[]>([])
  const [recommendation, setRecommendation] = useState<string | null>(null)

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      // Generate recommendation
      let rec = ""

      if (businessSize === "small") {
        if (callVolume[0] < 30) {
          rec = "AI Call Answering & Virtual Receptionist"
        } else if (aiNeeds.includes("sales")) {
          rec = "AI Sales & Lead Qualification Agent"
        } else {
          rec = "AI Customer Support & FAQ Handling"
        }
      } else if (businessSize === "midmarket") {
        if (industry === "finance" || industry === "insurance") {
          rec = "AI Finance & Collections Agent"
        } else if (industry === "legal") {
          rec = "AI Legal & Compliance Agent"
        } else {
          rec = "AI Call Center Agent"
        }
      } else {
        if (industry === "finance") {
          rec = "Enterprise AI Debt Collection & Finance Automation"
        } else if (industry === "legal") {
          rec = "Enterprise AI Legal & Compliance Automation"
        } else {
          rec = "Enterprise AI Call Center Agent"
        }
      }

      setRecommendation(rec)
      setStep(5)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleReset = () => {
    setStep(1)
    setBusinessSize("")
    setIndustry("")
    setCallVolume([50])
    setAiNeeds([])
    setRecommendation(null)
  }

  const toggleAiNeed = (need: string) => {
    if (aiNeeds.includes(need)) {
      setAiNeeds(aiNeeds.filter((n) => n !== need))
    } else {
      setAiNeeds([...aiNeeds, need])
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-xl border border-slate-800/50 bg-slate-900/95 p-6 shadow-xl backdrop-blur-xl"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 h-8 w-8 rounded-full text-slate-400 hover:text-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="mb-6 flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6A00FF]/20">
                <Sparkles className="h-5 w-5 text-[#6A00FF]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">AI Solution Finder</h2>
                <p className="text-sm text-slate-400">Find the perfect AI solution for your business</p>
              </div>
            </div>

            <div className="mb-6 flex justify-between">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`flex h-2 w-full ${s === 5 ? "" : "mr-1"} rounded-full ${
                    s <= step ? "bg-[#6A00FF]" : "bg-slate-800"
                  } transition-colors duration-300`}
                />
              ))}
            </div>

            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="mb-4 text-lg font-medium text-white">What's your business size?</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        className={`flex h-auto flex-col items-center justify-center p-4 ${
                          businessSize === "small"
                            ? "border-[#6A00FF] bg-[#6A00FF]/10 text-white"
                            : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                        }`}
                        onClick={() => setBusinessSize("small")}
                      >
                        <Users className="mb-2 h-6 w-6" />
                        <span>Small Business</span>
                        <span className="mt-1 text-xs opacity-70">1-50 employees</span>
                      </Button>
                      <Button
                        variant="outline"
                        className={`flex h-auto flex-col items-center justify-center p-4 ${
                          businessSize === "midmarket"
                            ? "border-[#6A00FF] bg-[#6A00FF]/10 text-white"
                            : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                        }`}
                        onClick={() => setBusinessSize("midmarket")}
                      >
                        <Building className="mb-2 h-6 w-6" />
                        <span>Mid-Market</span>
                        <span className="mt-1 text-xs opacity-70">51-500 employees</span>
                      </Button>
                      <Button
                        variant="outline"
                        className={`flex h-auto flex-col items-center justify-center p-4 ${
                          businessSize === "enterprise"
                            ? "border-[#6A00FF] bg-[#6A00FF]/10 text-white"
                            : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                        }`}
                        onClick={() => setBusinessSize("enterprise")}
                      >
                        <Building className="mb-2 h-6 w-6" />
                        <span>Enterprise</span>
                        <span className="mt-1 text-xs opacity-70">500+ employees</span>
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="mb-4 text-lg font-medium text-white">What industry are you in?</h3>
                    <div className="space-y-2">
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger className="border-slate-700 bg-slate-800/50 text-white">
                          <SelectValue placeholder="Select an industry" />
                        </SelectTrigger>
                        <SelectContent className="border-slate-700 bg-slate-800 text-white">
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance & Banking</SelectItem>
                          <SelectItem value="legal">Legal</SelectItem>
                          <SelectItem value="retail">Retail & E-commerce</SelectItem>
                          <SelectItem value="tech">Technology & SaaS</SelectItem>
                          <SelectItem value="insurance">Insurance</SelectItem>
                          <SelectItem value="realestate">Real Estate</SelectItem>
                          <SelectItem value="logistics">Logistics & Supply Chain</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="mb-4 text-lg font-medium text-white">What's your daily call volume?</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-slate-400">
                          <span>Low (10 calls)</span>
                          <span>High (1000+ calls)</span>
                        </div>
                        <Slider value={callVolume} onValueChange={setCallVolume} max={100} step={1} className="py-4" />
                      </div>
                      <div className="rounded-lg border border-[#6A00FF]/30 bg-[#6A00FF]/5 p-4">
                        <p className="text-center text-white">
                          {callVolume[0] < 30
                            ? "10-30 calls per day"
                            : callVolume[0] < 60
                              ? "30-100 calls per day"
                              : callVolume[0] < 80
                                ? "100-500 calls per day"
                                : "500+ calls per day"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="mb-4 text-lg font-medium text-white">What are your AI needs?</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {["customer-service", "sales", "appointments", "collections", "compliance"].map((need) => (
                        <Button
                          key={need}
                          variant="outline"
                          className={`justify-start ${
                            aiNeeds.includes(need)
                              ? "border-[#6A00FF] bg-[#6A00FF]/10 text-white"
                              : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                          }`}
                          onClick={() => toggleAiNeed(need)}
                        >
                          {aiNeeds.includes(need) ? (
                            <Check className="mr-2 h-4 w-4 text-[#6A00FF]" />
                          ) : (
                            <div className="mr-2 h-4 w-4 rounded-full border border-slate-600" />
                          )}
                          <span>
                            {need === "customer-service"
                              ? "Customer Service"
                              : need === "sales"
                                ? "Sales & Lead Gen"
                                : need === "appointments"
                                  ? "Appointment Booking"
                                  : need === "collections"
                                    ? "Debt Collection"
                                    : "Legal & Compliance"}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 5 && recommendation && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#6A00FF]/20">
                      <Bot className="h-8 w-8 text-[#6A00FF]" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">Your Recommended Solution</h3>
                    <div className="mb-6 rounded-lg border border-[#6A00FF]/30 bg-[#6A00FF]/5 p-4">
                      <p className="text-lg font-medium text-white">{recommendation}</p>
                    </div>
                    <p className="mb-6 text-sm text-slate-400">
                      Based on your business size, industry, and needs, we recommend this solution. Would you like to
                      learn more or schedule a demo?
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button
                        variant="outline"
                        className="border-slate-700 text-slate-300 hover:border-slate-600 hover:text-white"
                        onClick={handleReset}
                      >
                        Start Over
                      </Button>
                      <Button className="bg-[#6A00FF] hover:bg-[#7C1AFF] text-white" onClick={onClose}>
                        Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {step < 5 && (
              <div className="mt-6 flex justify-between">
                <Button
                  variant="ghost"
                  className="text-slate-400 hover:text-white"
                  onClick={step === 1 ? onClose : handleBack}
                >
                  {step === 1 ? "Cancel" : "Back"}
                </Button>
                <Button
                  className="bg-[#6A00FF] hover:bg-[#7C1AFF] text-white"
                  onClick={handleNext}
                  disabled={(step === 1 && !businessSize) || (step === 2 && !industry)}
                >
                  {step === 4 ? "Get Recommendation" : "Next"}
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

