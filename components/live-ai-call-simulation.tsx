"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Phone, X, Mic, MicOff } from "lucide-react"

export function LiveAICallSimulation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (isCallActive && audioRef.current) {
      audioRef.current.play()
    } else if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [isCallActive])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isCallActive) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isCallActive])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleStartCall = () => {
    setIsCallActive(true)
  }

  const handleEndCall = () => {
    setIsCallActive(false)
    setCurrentTime(0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Try a Live AI Call</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border border-slate-800">
        <div className="flex flex-col items-center space-y-4 p-6">
          <div className="text-2xl font-bold text-white mb-4">Live AI Call Simulation</div>
          <div className="relative w-32 h-32 rounded-full bg-purple-600 flex items-center justify-center mb-4">
            <Phone className="w-16 h-16 text-white" />
            {isCallActive && <div className="absolute inset-0 rounded-full border-4 border-white animate-ping" />}
          </div>
          <div className="text-xl font-semibold text-white mb-2">
            {isCallActive ? "Call in progress" : "Ready to start"}
          </div>
          <div className="text-lg text-slate-400 mb-4">{isCallActive ? formatTime(currentTime) : "Click to begin"}</div>
          <WaveformAnimation isActive={isCallActive} />
          <div className="flex space-x-4 mt-4">
            {!isCallActive ? (
              <Button onClick={handleStartCall} className="bg-green-600 hover:bg-green-700 text-white">
                Start Call
              </Button>
            ) : (
              <>
                <Button onClick={handleEndCall} className="bg-red-600 hover:bg-red-700 text-white">
                  End Call
                </Button>
                <Button onClick={toggleMute} variant="outline" className="border-slate-700 text-slate-300">
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
              </>
            )}
          </div>
        </div>
        <audio ref={audioRef} src="/audio/ai-call-simulation.mp3" loop />
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </DialogContent>
    </Dialog>
  )
}

function WaveformAnimation({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center justify-center space-x-1 h-16">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-purple-500"
          initial={{ height: 4 }}
          animate={isActive ? { height: [4, 32, 4] } : { height: 4 }}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

