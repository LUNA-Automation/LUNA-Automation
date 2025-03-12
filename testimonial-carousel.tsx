"use client"

import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Testimonial {
  name: string
  role: string
  company: string
  logo: string
  content: string
  rating: number
  image: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList())
      emblaApi.on("select", () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()
  const scrollTo = (index: number) => emblaApi && emblaApi.scrollTo(index)

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative px-4 sm:px-6 md:px-8 py-4">
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 group">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/20"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-slate-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <img
                      src={testimonial.logo || "/placeholder.svg"}
                      alt={testimonial.company}
                      className="h-8 opacity-70 grayscale hover:grayscale-0 transition-all"
                    />
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-600",
                        )}
                      />
                    ))}
                  </div>

                  <blockquote className="text-slate-300 text-lg md:text-xl leading-relaxed">
                    {testimonial.content}
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 rounded-full transition-all",
                index === selectedIndex ? "w-8 bg-purple-500" : "w-2 bg-slate-700 hover:bg-slate-600",
              )}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
          onClick={scrollNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

