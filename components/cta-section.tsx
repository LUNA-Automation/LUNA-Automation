"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { scrollToSection } from "@/lib/scroll-utils"

interface CTASectionProps {
  title: string
  description: string
}

const CTASection: React.FC<CTASectionProps> = ({ title, description }) => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-700 mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button variant="default" size="lg" onClick={() => scrollToSection("hear-me-in-action")}>
            How It Works
          </Button>
          <Button variant="secondary" size="lg">
            Try a Live AI Call
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CTASection

