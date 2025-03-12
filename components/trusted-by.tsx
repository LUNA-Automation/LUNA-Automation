"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Logo {
  src: string
  alt: string
}

const logos: Logo[] = [
  { src: "/logos/logo1.svg", alt: "Company 1" },
  { src: "/logos/logo2.svg", alt: "Company 2" },
  { src: "/logos/logo3.svg", alt: "Company 3" },
  { src: "/logos/logo4.svg", alt: "Company 4" },
  { src: "/logos/logo5.svg", alt: "Company 5" },
  { src: "/logos/logo6.svg", alt: "Company 6" },
  { src: "/logos/logo7.svg", alt: "Company 7" },
  { src: "/logos/logo8.svg", alt: "Company 8" },
]

export function TrustedBy() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      scrollContainer.scrollLeft = (progress * 0.05) % scrollContainer.scrollWidth

      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        startTime = timestamp
        scrollContainer.scrollLeft = 0
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div className="w-full bg-slate-900/50 backdrop-blur-sm py-8 overflow-hidden">
      <div className="container px-4 md:px-6">
        <h3 className="text-xl font-semibold text-center text-slate-200 mb-8">Trusted By</h3>
        <div ref={scrollRef} className="flex overflow-x-hidden">
          <div className="flex space-x-12 animate-infinite-scroll">
            {logos.concat(logos).map((logo, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-center w-32 h-20",
                  "transition-all duration-300 ease-in-out",
                  "hover:scale-110 hover:brightness-125",
                )}
              >
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  width={128}
                  height={80}
                  className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

