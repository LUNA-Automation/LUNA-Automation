"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Phone, Calendar, Wrench, Ear, MessageSquare, ArrowRight } from "lucide-react"
import AudioPlayer from "./audio-player"
import TestimonialCarousel from "./testimonial-carousel"
import IndustrySolutionsSlider from "./components/industry-solutions-slider"
import { LiveAICallSimulation } from "./components/live-ai-call-simulation"
import { SmartLeadForm } from "./components/smart-lead-form"
import { WhyNovaAI } from "@/components/why-nova-ai"
import { DynamicCTA } from "./components/dynamic-cta"
import { ExitIntentPopup } from "./components/exit-intent-popup"
import { DynamicHeroBackground } from "./components/dynamic-hero-background"
import { StickyMobileCTA } from "./components/sticky-mobile-cta"
import { WhatLUNACanDo } from "./components/what-luna-can-do"
import { HowLUNAWorks } from "./components/how-luna-works"
import { FutureAISection } from "./components/future-ai-section"

export default function LandingPage() {
  const audioClips = [
    {
      title: "Natural Customer Service",
      description: "Listen to L.U.N.A. handle a complex customer inquiry with human-like understanding",
      url: "/audio/customer-service.mp3",
      icon: Phone,
    },
    {
      title: "Smart Appointment Booking",
      description: "Experience how L.U.N.A. manages scheduling while adapting to customer preferences",
      url: "/audio/appointment.mp3",
      icon: Calendar,
    },
    {
      title: "Technical Support Resolution",
      description: "Hear L.U.N.A. diagnose and solve technical issues with precision",
      url: "/audio/tech-support.mp3",
      icon: Wrench,
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechFlow Solutions",
      logo: "/placeholder.svg?height=32&width=120",
      content:
        "L.U.N.A. transformed how we handle customer support. Our response times have improved by 80%, and our customers love the natural conversations. It's like having a professional support team available 24/7.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Operations Director",
      company: "InnovateCorp",
      logo: "/placeholder.svg?height=32&width=120",
      content:
        "The AI voice agents handle our appointment scheduling flawlessly. We've reduced no-shows by 60% and saved countless hours on administrative tasks. L.U.N.A. has been a game-changer for our business.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Rodriguez",
      role: "CTO",
      company: "Digital Health Plus",
      logo: "/placeholder.svg?height=32&width=120",
      content:
        "Integration was seamless, and the results were immediate. Our patient scheduling system now runs autonomously, and the AI handles complex conversations with remarkable accuracy. Highly recommended!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const steps = [
    {
      title: "AI Listens",
      description: "Advanced voice recognition understands context, tone, and intent in real-time conversations.",
      icon: Ear,
    },
    {
      title: "Processes Data",
      description: "Neural networks analyze requests and determine the most appropriate response or action.",
      icon: Brain,
    },
    {
      title: "Responds",
      description: "Delivers natural, context-aware responses while executing necessary business actions.",
      icon: MessageSquare,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
              L.U.N.A.
            </span>
          </Link>
          <nav className="flex items-center space-x-4">
            <DynamicCTA
              initialText="Book a Demo"
              alternateText="See L.U.N.A. in Action"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            />
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-purple-600 text-white hover:bg-purple-700 h-10 py-2 px-4 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
            >
              Get Pricing
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-48 xl:py-56 relative overflow-hidden">
          <DynamicHeroBackground className="absolute inset-0" callsHandled={10000} />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 animate-fade-in">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  Your AI Voice Assistant for Business Automation – L.U.N.A.
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl">
                  Supercharge your business with intelligent voice AI agents. Handle calls, customer inquiries,
                  scheduling, and more with seamless automation.
                </p>
              </div>
              <div className="flex space-x-4">
                <DynamicCTA
                  initialText="Book a Demo"
                  alternateText="Try L.U.N.A. for Free"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 h-12 animate-fade-in-up"
                />
                <LiveAICallSimulation />
              </div>
            </div>
          </div>
        </section>

        {/* Why NovaAI Section */}
        <WhyNovaAI />

        {/* Features Section - Replaced with WhatLUNACanDo */}
        <WhatLUNACanDo />

        {/* How L.U.N.A. Works Section */}
        <HowLUNAWorks steps={steps} />

        {/* Industry Solutions Section */}
        <section id="industries" className="w-full py-16 md:py-24 lg:py-36 border-t border-slate-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Industry-Specific Solutions by L.U.N.A.
                </h2>
                <p className="mx-auto max-w-[900px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover how L.U.N.A. is transforming businesses across different sectors with tailored AI voice
                  solutions
                </p>
              </div>
            </div>
            <div className="mt-12">
              <IndustrySolutionsSlider />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative w-full py-16 md:py-24 lg:py-36 border-t border-slate-800 bg-gradient-to-b from-slate-900/50 to-slate-950 overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 text-center mb-12">
              <div className="space-y-2 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  What Our Clients Say
                </h2>
                <p className="mx-auto max-w-[900px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from businesses that have transformed their operations with L.U.N.A.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <TestimonialCarousel testimonials={testimonials} />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-purple-950/10 to-transparent pointer-events-none" />
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-16 md:py-24 lg:py-36 bg-slate-900/50 border-t border-slate-800">
          <FutureAISection />
        </section>

        {/* Hear L.U.N.A. in Action Section */}
        <section className="relative w-full py-16 md:py-24 lg:py-36 border-t border-slate-800 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 text-center mb-12">
              <div className="space-y-2 max-w-3xl mx-auto animate-fade-in">
                <div className="space-y-2 max-w-3xl mx-auto animate-fade-in relative group">
                  {/* Subtle background glow effect */}

                  {/* Enhanced title with animations */}
                  <h2 className="relative text-3xl font-extrabold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 animate-title-reveal">
                    <span
                      className="inline-block overflow-hidden title-glitch-effect animate-zoom-float bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-blue-600"
                      data-text="Hear L.U.N.A. in Action"
                    >
                      Hear L.U.N.A. in Action
                    </span>
                  </h2>

                  {/* Add this style block at the end of the component, before the closing return statement */}
                  <style jsx global>{`
                    /* Title reveal animation */
                    @keyframes title-reveal {
                      0% { opacity: 0; transform: translateY(10px); }
                      100% { opacity: 1; transform: translateY(0); }
                    }
                    
                    .animate-title-reveal {
                      animation: title-reveal 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                    }
                    
                    /* Slow pulse animation for the glow */
                    @keyframes pulse-slow {
                      0%, 100% { opacity: 0.5; }
                      50% { opacity: 0.8; }
                    }
                    
                    .animate-pulse-slow {
                      animation: pulse-slow 3s ease-in-out infinite;
                    }
                    
                    /* Floating animation */
                    @keyframes float {
                      0% { transform: translateY(0px); }
                      50% { transform: translateY(-8px); }
                      100% { transform: translateY(0px); }
                    }
                    
                    /* Zoom-in animation */
                    @keyframes zoom-in {
                      0% { transform: scale(0.85); opacity: 0.8; }
                      100% { transform: scale(1); opacity: 1; }
                    }
                    
                    /* Combined zoom-in and float animation */
                    @keyframes zoom-float {
                      0% { transform: scale(0.85); opacity: 0.8; }
                      20% { transform: scale(1); opacity: 1; }
                      30% { transform: scale(1) translateY(0px); }
                      50% { transform: scale(1) translateY(-8px); }
                      70% { transform: scale(1) translateY(0px); }
                      80% { transform: scale(1) translateY(-4px); }
                      100% { transform: scale(1) translateY(0px); }
                    }
                    
                    .animate-zoom-float {
                      animation: zoom-float 6s ease-in-out infinite;
                    }
                    
                    /* Glitch effect - remove all lighting effects */
                    .title-glitch-effect {
                      position: relative;
                      display: inline-block;
                      /* Remove text-shadow */
                    }

                    /* Remove these pseudo-elements that create lighting effects */
                    .title-glitch-effect::before,
                    .title-glitch-effect::after {
                      display: none; /* Hide these elements completely */
                    }
                  `}</style>
                </div>
                <p className="text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience the future of AI voice technology. Listen to real interactions showcasing our natural,
                  human-like conversations.
                </p>
              </div>
            </div>
            <div className="mt-12 relative">
              <AudioPlayer clips={audioClips} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Book a Demo Section */}
        <section id="booking" className="w-full py-16 md:py-24 lg:py-36 border-t border-slate-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Experience L.U.N.A. in Action
                </h2>
                <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Schedule a personalized demo and see how our AI Voice Agents can transform your business.
                </p>
              </div>
              <SmartLeadForm />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-16 md:py-24 lg:py-36 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Don't Miss Out – Let L.U.N.A. Transform Your Business
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join the AI revolution and stay ahead of your competition. Book your demo now and see the future of
                business communication.
              </p>
              <Button
                className="mt-8 bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full animate-pulse"
                onClick={() => {
                  // Implement smooth scroll to booking section
                  const bookingSection = document.getElementById("booking")
                  if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                Book Your Free Demo Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky CTA for mobile */}
      <StickyMobileCTA />

      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </div>
  )
}

