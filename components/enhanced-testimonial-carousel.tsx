"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
  image: string
  logo?: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export function EnhancedTestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const [carouselRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  // Calculate how many testimonials to show based on screen size
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle autoplay
  useEffect(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }

    if (autoplay && inView) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.max(1, testimonials.length - visibleCount + 1))
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, testimonials.length, inView, visibleCount])

  const handlePrev = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, testimonials.length - visibleCount) : prevIndex - 1))
  }

  const handleNext = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex >= testimonials.length - visibleCount ? 0 : prevIndex + 1))
  }

  // Calculate visible testimonials
  const visibleTestimonials = testimonials.slice(
    currentIndex,
    Math.min(currentIndex + visibleCount, testimonials.length),
  )

  // If we don't have enough testimonials to fill the view, add from the beginning
  if (visibleTestimonials.length < visibleCount && testimonials.length > visibleCount) {
    const neededFromStart = visibleCount - visibleTestimonials.length
    visibleTestimonials.push(...testimonials.slice(0, neededFromStart))
  }

  return (
    <div ref={carouselRef} className="w-full">
      <div className="relative">
        {/* Navigation buttons */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 sm:-ml-6">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80 text-white backdrop-blur-sm transition-all hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 sm:-mr-6">
          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80 text-white backdrop-blur-sm transition-all hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Testimonial cards */}
        <div className="overflow-hidden px-4">
          <div
            className={cn(
              "grid gap-6 transition-all duration-500 ease-in-out",
              visibleCount === 1
                ? "grid-cols-1"
                : visibleCount === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            )}
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <AnimatePresence key={index} mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: inView ? 1 : 0,
                    y: inView ? 0 : 20,
                    transition: {
                      delay: index * 0.1,
                      duration: 0.5,
                    },
                  }}
                  className="relative h-full"
                >
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-purple-500/10">
                    {/* Quote icon */}
                    <div className="absolute -right-2 -top-2 text-purple-500/10 transition-all duration-300 group-hover:text-purple-500/20">
                      <Quote className="h-16 w-16" />
                    </div>

                    {/* Content */}
                    <div className="flex h-full flex-col justify-between">
                      <div className="mb-6">
                        {/* Rating */}
                        <div className="mb-4 flex">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{
                                opacity: inView ? 1 : 0,
                                scale: inView ? 1 : 0.5,
                                transition: {
                                  delay: index * 0.1 + i * 0.1,
                                  duration: 0.3,
                                },
                              }}
                            >
                              <Star
                                className={cn(
                                  "mr-1 h-5 w-5",
                                  i < testimonial.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-slate-700 text-slate-700",
                                )}
                              />
                            </motion.div>
                          ))}
                        </div>

                        {/* Testimonial text */}
                        <p className="text-lg leading-relaxed text-slate-300">"{testimonial.content}"</p>
                      </div>

                      <div className="mt-auto flex items-center">
                        {/* Client image */}
                        <div className="relative mr-4 h-14 w-14 overflow-hidden rounded-full border-2 border-purple-500/30 p-0.5">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="h-full w-full rounded-full object-cover"
                          />
                        </div>

                        <div>
                          {/* Client name and role */}
                          <h4 className="font-medium text-white">{testimonial.name}</h4>
                          <p className="text-sm text-slate-400">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>

                        {/* Company logo if available */}
                        {testimonial.logo && (
                          <div className="ml-auto">
                            <img
                              src={testimonial.logo || "/placeholder.svg"}
                              alt={`${testimonial.company} logo`}
                              className="h-8 max-w-[100px] object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="mt-8 flex justify-center space-x-2">
        {Array.from({ length: Math.max(1, testimonials.length - visibleCount + 1) }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setAutoplay(false)
              setCurrentIndex(index)
            }}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              currentIndex === index ? "bg-purple-500 w-6" : "bg-slate-700 hover:bg-slate-600",
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

