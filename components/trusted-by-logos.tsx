"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"

const logos = [
  { src: "/logos/logo1.svg" },
  { src: "/logos/logo2.svg" },
  { src: "/logos/logo3.svg" },
  { src: "/logos/logo4.svg" },
  { src: "/logos/logo5.svg" },
  { src: "/logos/logo6.svg" },
  { src: "/logos/logo7.svg" },
  { src: "/logos/logo8.svg" },
]

export function TrustedByLogos() {
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
    <div className="w-full overflow-hidden bg-slate-900/50 py-8">
      <div ref={scrollRef} className="flex overflow-x-hidden">
        <div className="flex space-x-12 animate-infinite-scroll">
          {logos.concat(logos).map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-32 h-20 transition-all duration-300 ease-in-out hover:scale-110"
            >
              <Image
                src={logo.src || "/placeholder.svg"}
                alt="Company logo"
                width={128}
                height={80}
                className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

