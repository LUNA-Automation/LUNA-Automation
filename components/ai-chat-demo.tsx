"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import dynamic from "next/dynamic"

const ElevenLabsWidget = dynamic(() => import("@elevenlabs/elevenlabs-widget").then((mod) => mod.ElevenLabsWidget), {
  ssr: false,
})

export function AIChatDemo() {
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://api.elevenlabs.io/v1/widget.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      if (widgetRef.current) {
        new ElevenLabsWidget({
          apiKey: "YOUR_API_KEY_HERE",
          containerId: "elevenlabs-widget",
          voiceId: "21m00Tcm4TlvDq8ikWAM", // You can change this to your preferred voice ID
          backgroundColor: "#0f172a", // Tailwind's slate-900
          accentColor: "#8b5cf6", // Tailwind's purple-500
        })
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Card className="w-full max-w-2xl mx-auto bg-slate-900/50 border border-slate-800 shadow-lg p-6">
      <div ref={widgetRef} id="elevenlabs-widget" className="w-full h-[600px]"></div>
    </Card>
  )
}

