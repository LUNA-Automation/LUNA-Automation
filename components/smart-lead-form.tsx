"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, CheckCircle2, ChevronRight } from "lucide-react"

const useCases = [
  { value: "call-answering", label: "Call Answering" },
  { value: "lead-generation", label: "Lead Generation" },
  { value: "appointment-scheduling", label: "Appointment Scheduling" },
  { value: "customer-support", label: "Customer Support" },
  { value: "other", label: "Other" },
]

const suggestedTimes = [
  { date: "2025-03-05", time: "10:00 AM" },
  { date: "2025-03-05", time: "2:00 PM" },
  { date: "2025-03-06", time: "11:00 AM" },
  { date: "2025-03-06", time: "3:00 PM" },
]

export function SmartLeadForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    useCase: "",
    selectedTime: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const validateField = (name: string, value: string) => {
    let error = ""
    if (value.trim() === "") {
      error = "This field is required"
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Please enter a valid email address"
    }
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const isStepValid = () => {
    switch (step) {
      case 0:
        return formData.name.trim() !== "" && formData.email.trim() !== "" && /\S+@\S+\.\S+/.test(formData.email)
      case 1:
        return formData.company.trim() !== "" && formData.useCase !== ""
      case 2:
        return formData.selectedTime !== ""
      default:
        return true
    }
  }

  const handleNext = () => {
    if (isStepValid()) {
      setStep((prev) => prev + 1)
    } else {
      // Validate all fields in the current step
      Object.keys(formData).forEach((key) => validateField(key, formData[key as keyof typeof formData]))
    }
  }

  const handleSubmit = () => {
    if (isStepValid()) {
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData)
      setStep((prev) => prev + 1)
    }
  }

  const steps = [
    {
      title: "Let's get to know you",
      fields: (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">What's your name?</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">What's your email address?</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        </>
      ),
    },
    {
      title: "Tell us about your business",
      fields: (
        <>
          <div className="space-y-2">
            <Label htmlFor="company">What's your company name?</Label>
            <Input
              id="company"
              name="company"
              placeholder="Acme Inc."
              value={formData.company}
              onChange={handleInputChange}
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
            />
            {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="useCase">What are you looking for?</Label>
            <Select name="useCase" onValueChange={(value) => handleSelectChange("useCase", value)}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Select a use case" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                {useCases.map((useCase) => (
                  <SelectItem key={useCase.value} value={useCase.value}>
                    {useCase.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.useCase && <p className="text-red-500 text-sm">{errors.useCase}</p>}
          </div>
        </>
      ),
    },
    {
      title: "Choose a time for your demo",
      fields: (
        <div className="space-y-4">
          <p className="text-slate-300">Select a convenient time for your demo:</p>
          <div className="grid grid-cols-2 gap-4">
            {suggestedTimes.map((slot, index) => (
              <Button
                key={index}
                variant={formData.selectedTime === `${slot.date} ${slot.time}` ? "default" : "outline"}
                className={`flex items-center justify-start space-x-2 ${
                  formData.selectedTime === `${slot.date} ${slot.time}`
                    ? "bg-purple-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
                onClick={() => handleSelectChange("selectedTime", `${slot.date} ${slot.time}`)}
              >
                <CalendarIcon className="w-4 h-4" />
                <span>{`${slot.date} ${slot.time}`}</span>
              </Button>
            ))}
          </div>
          {errors.selectedTime && <p className="text-red-500 text-sm">{errors.selectedTime}</p>}
        </div>
      ),
    },
  ]

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 rounded-lg shadow-lg p-6 space-y-6">
      <AnimatePresence mode="wait">
        {step < steps.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">{steps[step].title}</h2>
            <form className="space-y-4">
              {steps[step].fields}
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={step === steps.length - 1 ? handleSubmit : handleNext}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {step === steps.length - 1 ? "How It Works" : "Next"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Demo Booked!</h2>
            <p className="text-slate-300">
              We've sent a confirmation email to {formData.email}. Looking forward to showing you NovaAI in action!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

