"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Phone, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface EnterpriseSchedulerProps {
  isOpen: boolean
  onClose: () => void
}

export function EnterpriseScheduler({ isOpen, onClose }: EnterpriseSchedulerProps) {
  const [step, setStep] = useState(1)
  const [contactMethod, setContactMethod] = useState<"call" | "meeting">("call")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    preferredTime: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would send this data to your backend
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  const handleNext = () => {
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const availableTimes = [
    { date: "Tomorrow", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
    { date: "In 2 Days", times: ["9:00 AM", "11:00 AM", "3:00 PM"] },
    { date: "This Week", times: ["1:00 PM", "3:30 PM", "5:00 PM"] },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-slate-900/90 border border-slate-700 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-6 md:p-8">
              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Enterprise AI Strategy Session</h2>
                    <p className="text-slate-300">
                      Connect with our AI experts to discuss your enterprise automation needs
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full flex justify-between">
                      <div
                        className={cn("h-1 bg-[#6A00FF] transition-all duration-500", step === 1 ? "w-1/2" : "w-full")}
                      />
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4">
                      <AnimatePresence mode="wait">
                        {step === 1 ? (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            <div className="space-y-2">
                              <Label htmlFor="name" className="text-white">
                                Your Name
                              </Label>
                              <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="John Smith"
                                required
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-white">
                                Business Email
                              </Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="john@company.com"
                                required
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="company" className="text-white">
                                Company Name
                              </Label>
                              <Input
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder="Acme Corporation"
                                required
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-white">
                                Phone Number
                              </Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+1 (555) 123-4567"
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                              />
                            </div>

                            <div className="pt-4">
                              <Button
                                type="button"
                                onClick={handleNext}
                                className="w-full bg-[#6A00FF] hover:bg-[#7C1AFF] text-white rounded-xl shadow-[0_0_10px_rgba(106,0,255,0.3)] hover:shadow-[0_0_15px_rgba(106,0,255,0.5)] hover:scale-[1.02] transition-all duration-300"
                              >
                                Next Step
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            <div className="space-y-2">
                              <Label className="text-white">How would you like to connect?</Label>
                              <RadioGroup
                                value={contactMethod}
                                onValueChange={(value) => setContactMethod(value as "call" | "meeting")}
                                className="flex space-x-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="call" id="call" className="border-[#6A00FF] text-[#6A00FF]" />
                                  <Label htmlFor="call" className="text-white cursor-pointer">
                                    <Phone className="h-4 w-4 inline mr-1" /> Phone Call
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="meeting"
                                    id="meeting"
                                    className="border-[#6A00FF] text-[#6A00FF]"
                                  />
                                  <Label htmlFor="meeting" className="text-white cursor-pointer">
                                    <Calendar className="h-4 w-4 inline mr-1" /> Video Meeting
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="preferredTime" className="text-white">
                                Preferred Time
                              </Label>
                              <div className="grid grid-cols-3 gap-2">
                                {availableTimes.map((timeSlot, dateIndex) => (
                                  <div key={dateIndex} className="space-y-2">
                                    <p className="text-sm text-slate-300 font-medium">{timeSlot.date}</p>
                                    {timeSlot.times.map((time, timeIndex) => (
                                      <Button
                                        key={timeIndex}
                                        type="button"
                                        variant="outline"
                                        className={cn(
                                          "w-full justify-start text-sm py-1 h-auto",
                                          formData.preferredTime === `${timeSlot.date} ${time}`
                                            ? "bg-[#6A00FF]/20 border-[#6A00FF] text-white"
                                            : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700",
                                        )}
                                        onClick={() =>
                                          setFormData({
                                            ...formData,
                                            preferredTime: `${timeSlot.date} ${time}`,
                                          })
                                        }
                                      >
                                        {time}
                                      </Button>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="message" className="text-white">
                                What would you like to discuss? (Optional)
                              </Label>
                              <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Tell us about your enterprise AI needs..."
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]"
                              />
                            </div>

                            <div className="flex space-x-3 pt-4">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                                className="flex-1 border-slate-700 text-white hover:bg-slate-800"
                              >
                                Back
                              </Button>
                              <Button
                                type="submit"
                                className="flex-1 bg-[#6A00FF] hover:bg-[#7C1AFF] text-white rounded-xl shadow-[0_0_10px_rgba(106,0,255,0.3)] hover:shadow-[0_0_15px_rgba(106,0,255,0.5)] hover:scale-[1.02] transition-all duration-300"
                              >
                                Schedule {contactMethod === "call" ? "Call" : "Meeting"}
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-green-500/10 p-3">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Strategy Session Scheduled!</h2>
                  <p className="text-slate-300 mb-6">
                    We've sent a confirmation to {formData.email}. Our enterprise team will connect with you{" "}
                    {formData.preferredTime ? `at ${formData.preferredTime}` : "soon"}.
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-[#6A00FF] hover:bg-[#7C1AFF] text-white rounded-xl shadow-[0_0_10px_rgba(106,0,255,0.3)] hover:shadow-[0_0_15px_rgba(106,0,255,0.5)] hover:scale-[1.02] transition-all duration-300"
                  >
                    Close
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

