"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface DynamicCTAProps {
  initialText: string
  alternateText: string
  className?: string
}

export function DynamicCTA({ initialText, alternateText, className }: DynamicCTAProps) {
  const [ctaText, setCtaText] = useState(initialText)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight

      // Change CTA text if user has scrolled more than 50% of the page
      if (scrollPosition > pageHeight * 0.5) {
        setCtaText(alternateText === "Book a Demo" ? "How It Works" : alternateText)
      } else {
        setCtaText(initialText === "Book a Demo" ? "How It Works" : initialText)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [initialText, alternateText])

  return <Button className={className}>{ctaText}</Button>
}

