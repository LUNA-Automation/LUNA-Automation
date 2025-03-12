"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        timeout = setTimeout(() => {
          setIsVisible(true)
        }, 500)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(timeout)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Submitted email for strategy call:", email)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-lg shadow-lg p-6">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-semibold text-white mb-4">Don't Miss Out on AI-Powered Growth!</h3>
            <p className="text-slate-300 mb-4">
              Book a free AI strategy call and discover how NovaAI can transform your business operations.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border-slate-700 text-white placeholder-slate-400"
                required
              />
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                <PhoneCall className="mr-2 h-4 w-4" />
                Book My Free Strategy Call
              </Button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

