"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import {
  type Phone,
  type Calendar,
  type Wrench,
  Play,
  Pause,
  Volume2,
  VolumeX,
  AudioWaveformIcon as Waveform,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AudioPlayerProps {
  clips: {
    title: string
    description: string
    url: string
    icon: typeof Phone | typeof Calendar | typeof Wrench
  }[]
}

export default function AudioPlayer({ clips }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [activeClip, setActiveClip] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const waveformRef = useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingClipIndex, setLoadingClipIndex] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Add waveform animation keyframes
    const waveformAnimationId = "waveform-animation"
    if (!document.getElementById(waveformAnimationId)) {
      const style = document.createElement("style")
      style.id = waveformAnimationId
      style.innerHTML = `
      @keyframes waveform {
        0%, 100% { height: 4px; }
        50% { height: 16px; }
      }
    `
      document.head.appendChild(style)
    }

    return () => {
      // Clean up on unmount
      const styleElement = document.getElementById(waveformAnimationId)
      if (styleElement) {
        styleElement.remove()
      }
    }
  }, []) // Empty dependency array ensures this only runs once

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate)
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)
      audioRef.current.addEventListener("ended", () => setIsPlaying(false))

      // Add error event listener here
      const handleError = () => {
        setError("Error loading audio. Please try again.")
        setIsLoading(false)
        setIsPlaying(false)
        setLoadingClipIndex(null)
      }

      audioRef.current.addEventListener("error", handleError)

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("timeupdate", handleTimeUpdate)
          audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
          audioRef.current.removeEventListener("ended", () => setIsPlaying(false))
          audioRef.current.removeEventListener("error", handleError)
          // Remove any other listeners
          audioRef.current.removeEventListener("canplaythrough", () => {})
        }
      }
    }
  }, [])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const newVolume = value[0]
      audioRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const playClip = (index: number) => {
    // If already playing this clip, pause it
    if (activeClip === index && isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause()
        setIsPlaying(false)
      }
      return
    }

    setError(null)
    setIsTransitioning(true)
    setLoadingClipIndex(index)
    setIsLoading(true)
    setActiveClip(index)
    setCurrentTime(0)

    if (audioRef.current) {
      // Pause any currently playing audio first
      if (isPlaying) {
        audioRef.current.pause()
      }

      // Set new source and attempt to play
      audioRef.current.src = clips[index].url

      // Use the load() method to ensure the audio is properly loaded before playing
      audioRef.current.load()

      // Wait for canplaythrough event before playing
      const canPlayHandler = () => {
        audioRef.current
          ?.play()
          .then(() => {
            setIsPlaying(true)
            setIsLoading(false)
            setLoadingClipIndex(null)
            setTimeout(() => setIsTransitioning(false), 300)
          })
          .catch((err) => {
            console.error("Error playing audio:", err)
            setError("Unable to play audio. Please try again.")
            setIsPlaying(false)
            setIsLoading(false)
            setLoadingClipIndex(null)
            setIsTransitioning(false)
          })

        // Remove the event listener after it fires once
        audioRef.current?.removeEventListener("canplaythrough", canPlayHandler)
      }

      audioRef.current.addEventListener("canplaythrough", canPlayHandler)

      // Add error handling for loading failures
      const errorHandler = () => {
        setError("Failed to load audio file. Please try again.")
        setIsLoading(false)
        setLoadingClipIndex(null)
        setIsTransitioning(false)
        audioRef.current?.removeEventListener("error", errorHandler)
      }

      audioRef.current.addEventListener("error", errorHandler)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clips.map((clip, index) => {
          const Icon = clip.icon
          return (
            <Card
              key={index}
              className={cn(
                "group relative overflow-hidden transition-all duration-500",
                "bg-slate-900/50 border-slate-800 hover:bg-slate-800/50",
                "cursor-pointer hover:scale-105",
                "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300",
                "hover:before:opacity-100 hover:shadow-lg hover:shadow-purple-500/10",
                activeClip === index && "ring-2 ring-purple-500",
                activeClip === index && isPlaying && "shadow-md shadow-purple-500/20",
              )}
              onClick={() => playClip(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <Icon className="h-8 w-8 text-purple-500 transition-transform duration-300 group-hover:scale-110" />
                    {activeClip === index && isPlaying && (
                      <div className="absolute -inset-1 bg-purple-500/20 rounded-full animate-ping" />
                    )}
                  </div>
                  <div className="relative">
                    <Button
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "h-8 w-8 rounded-full play",
                        "bg-purple-500/20 text-purple-500",
                        "hover:bg-purple-500/30 hover:text-purple-400",
                        "transition-all duration-300",
                        "transform hover:scale-110",
                        "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50",
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        playClip(index)
                      }}
                      disabled={isLoading && loadingClipIndex !== index}
                    >
                      {isLoading && loadingClipIndex === index ? (
                        <div className="h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                      ) : activeClip === index && isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4 ml-0.5" />
                      )}
                    </Button>
                    {activeClip === index && isPlaying && (
                      <Waveform className="absolute -inset-1 text-purple-500/30 animate-pulse" />
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                    {clip.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 transition-opacity duration-300">
                    {error && activeClip === index ? (
                      <span className="text-red-400">{error}</span>
                    ) : hoveredCard === index ? (
                      "Click to play"
                    ) : (
                      clip.description
                    )}
                  </p>
                </div>
                {activeClip === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500/20">
                    <div
                      className="h-full bg-purple-500 transition-all duration-300"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      <div
        className={cn(
          "relative p-6 rounded-lg border border-slate-800",
          "bg-slate-900/50 backdrop-blur-sm",
          "transition-opacity duration-300",
          isTransitioning ? "opacity-50" : "opacity-100",
        )}
      >
        <audio ref={audioRef} className="hidden" />

        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "h-10 w-10 rounded-full play",
              "bg-purple-500/20 text-purple-500",
              "hover:bg-purple-500/30 hover:text-purple-400",
              "transition-all duration-300",
              "transform hover:scale-110",
            )}
            onClick={togglePlay}
            disabled={isLoading || !clips[activeClip]}
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>

          <div className="flex-1 space-y-2">
            <Slider
              value={[currentTime]}
              max={duration || 1}
              step={0.1}
              onValueChange={handleSliderChange}
              className="w-full"
              disabled={isLoading || !duration}
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 min-w-[140px]">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-slate-400 hover:text-white transition-colors"
              onClick={toggleMute}
              disabled={isLoading}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              className="w-24"
              disabled={isLoading}
            />
          </div>
        </div>

        {error && <div className="mt-2 text-center text-red-400 text-sm">{error}</div>}

        {isPlaying && !error && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 overflow-hidden">
            <div className="flex space-x-1" ref={waveformRef}>
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-purple-500"
                  style={{
                    height: "16px",
                    animation: `waveform 1s ease-in-out infinite ${i * 0.04}s`,
                    opacity: 0.2 + Math.random() * 0.8,
                    filter: "drop-shadow(0 0 2px rgba(168, 85, 247, 0.5))",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

