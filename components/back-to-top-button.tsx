"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface BackToTopButtonProps {
  showAfterPixels?: number
  className?: string
}

export function BackToTopButton({ showAfterPixels = 300, className }: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterPixels)
    }

    // Initial check
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showAfterPixels])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full",
            "bg-[#6A00FF] text-white shadow-[0_0_15px_rgba(106,0,255,0.4)]",
            "transition-all duration-300 hover:bg-[#7C1AFF] hover:shadow-[0_0_20px_rgba(106,0,255,0.6)]",
            className,
          )}
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

