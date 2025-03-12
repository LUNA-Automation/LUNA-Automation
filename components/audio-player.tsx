"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Phone, Calendar, Wrench } from "lucide-react"

const clips = [
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

const AudioPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = clips[currentTrackIndex]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0)
      })

      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current?.currentTime || 0)
      })

      audioRef.current.addEventListener("ended", () => {
        handleNextTrack()
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadedmetadata", () => {})
        audioRef.current.removeEventListener("timeupdate", () => {})
        audioRef.current.removeEventListener("ended", () => {})
      }
    }
  }, [currentTrackIndex])

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % clips.length)
    setIsPlaying(true)
    audioRef.current?.load()
    audioRef.current?.play()
  }

  const handlePreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + clips.length) % clips.length)
    setIsPlaying(true)
    audioRef.current?.load()
    audioRef.current?.play()
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number.parseFloat(e.target.value)
    audioRef.current!.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">{currentTrack.title}</h2>
      <p className="text-gray-600 mb-4">{currentTrack.description}</p>
      <audio ref={audioRef} src={currentTrack.url} preload="metadata" />
      <div className="flex items-center justify-between">
        <button onClick={handlePreviousTrack} className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button onClick={handlePlayPause} className="text-gray-500">
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
              />
            </svg>
          )}
        </button>
        <button onClick={handleNextTrack} className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      <div className="mt-4">
        <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} className="w-full" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer

