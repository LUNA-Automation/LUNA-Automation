"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Show the CTA when the user has scrolled 25% of the page
      setIsVisible(scrollPosition > documentHeight * 0.25)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur z-50 md:hidden"
        >
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Transform Your Business Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

