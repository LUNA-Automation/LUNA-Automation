"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2 } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { JSX } from "react"

interface AudioSample {
  id: string
  title: string
  description: string
  audioSrc: string
  icon: JSX.Element
  color: string
}

const audioSamples: AudioSample[] = [
  {
    id: "customer-service",
    title: "Customer Service",
    description: "Handle customer inquiries with human-like responses",
    audioSrc: "/audio/customer-service-sample.mp3",
    icon: <Volume2 className="h-6 w-6" />,
    color: "from-purple-500 to-blue-500",
  },
  {
    id: "appointment-scheduling",
    title: "Appointment Scheduling",
    description: "Effortlessly book and manage appointments",
    audioSrc: "/audio/appointment-scheduling-sample.mp3",
    icon: <Volume2 className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "sales-outreach",
    title: "Sales Outreach",
    description: "Engage potential customers with personalized calls",
    audioSrc: "/audio/sales-outreach-sample.mp3",
    icon: <Volume2 className="h-6 w-6" />,
    color: "from-emerald-500 to-teal-500",
  },
]

export function HearNovaInAction() {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({})

  const toggleAudio = (id: string) => {
    const audioElement = audioRefs.current[id]

    if (!audioElement) return

    if (playingId === id) {
      // Pause the current audio
      audioElement.pause()
      setPlayingId(null)
    } else {
      // Pause any currently playing audio
      if (playingId && audioRefs.current[playingId]) {
        audioRefs.current[playingId]?.pause()
      }

      // Play the new audio
      audioElement.currentTime = 0
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error)
      })
      setPlayingId(id)
    }
  }

  // Handle audio end event
  const handleAudioEnd = (id: string) => {
    if (playingId === id) {
      setPlayingId(null)
    }
  }

  return (
    <section id="hear-me-in-action" className="py-20 bg-slate-950">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            <span
              className="inline-block overflow-hidden title-glitch-effect animate-zoom-float bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-blue-600"
              data-text="Hear NovaAI in Action"
            ></span>
          </h2>
          <p className="mt-4 text-xl text-slate-400 max-w-3xl mx-auto">
            Listen to real examples of NovaAI handling different scenarios with natural, human-like conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {audioSamples.map((sample) => (
            <Card
              key={sample.id}
              className="bg-slate-900/50 border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`rounded-full p-3 bg-gradient-to-br ${sample.color} bg-opacity-10`}>
                    {sample.icon}
                  </div>
                  <button
                    onClick={() => toggleAudio(sample.id)}
                    className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-full transition-all",
                      playingId === sample.id
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
                    )}
                    aria-label={playingId === sample.id ? "Pause" : "Play"}
                  >
                    {playingId === sample.id ? (
                      <Pause className="h-5 w-5 text-white" />
                    ) : (
                      <Play className="h-5 w-5 text-white ml-1" />
                    )}
                  </button>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{sample.title}</h3>
                <p className="text-slate-400">{sample.description}</p>

                {/* Audio Waveform Animation */}
                <div className="mt-4 h-12 flex items-center justify-center">
                  {playingId === sample.id && (
                    <div className="flex items-center space-x-1">
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`w-1 bg-gradient-to-t ${sample.color}`}
                          initial={{ height: 4 }}
                          animate={{ height: [4, 20, 4] }}
                          transition={{
                            duration: 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Hidden audio element */}
                <audio
                  ref={(el) => (audioRefs.current[sample.id] = el)}
                  src={sample.audioSrc}
                  onEnded={() => handleAudioEnd(sample.id)}
                  className="hidden"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

