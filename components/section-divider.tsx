"use client"

import { cn } from "@/lib/utils"

interface SectionDividerProps {
  className?: string
  variant?: "wave" | "angle" | "curve" | "glow"
  flip?: boolean
  invert?: boolean
}

export function SectionDivider({ className, variant = "wave", flip = false, invert = false }: SectionDividerProps) {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      {variant === "wave" && (
        <svg
          className={cn(
            "w-full h-16 md:h-24 fill-current text-background",
            flip && "rotate-180",
            invert && "text-slate-950",
          )}
          viewBox="0 0 1440 74"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,37 C240,74 480,74 720,37 C960,0 1200,0 1440,37 L1440,74 L0,74 Z"
            className={cn("fill-current", invert ? "text-slate-950" : "text-background")}
          />
          <path
            d="M0,37 C240,74 480,74 720,37 C960,0 1200,0 1440,37"
            fill="none"
            stroke="rgba(168, 85, 247, 0.2)"
            strokeWidth="1"
            className="animate-pulse-slow"
          />
        </svg>
      )}

      {variant === "angle" && (
        <svg
          className={cn("w-full h-16 md:h-24 fill-current", flip && "rotate-180", invert && "text-slate-950")}
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="0,48 1440,0 1440,48"
            className={cn("fill-current", invert ? "text-slate-950" : "text-background")}
          />
          <line
            x1="0"
            y1="48"
            x2="1440"
            y2="0"
            stroke="rgba(168, 85, 247, 0.2)"
            strokeWidth="1"
            className="animate-pulse-slow"
          />
        </svg>
      )}

      {variant === "curve" && (
        <svg
          className={cn("w-full h-16 md:h-24 fill-current", flip && "rotate-180", invert && "text-slate-950")}
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,48 L1440,48 L1440,0 C1080,32 720,48 360,32 C180,24 90,16 0,0 Z"
            className={cn("fill-current", invert ? "text-slate-950" : "text-background")}
          />
          <path
            d="M0,0 C90,16 180,24 360,32 C720,48 1080,32 1440,0"
            fill="none"
            stroke="rgba(168, 85, 247, 0.2)"
            strokeWidth="1"
            className="animate-pulse-slow"
          />
        </svg>
      )}

      {variant === "glow" && (
        <div
          className={cn(
            "h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50",
            "relative",
          )}
        >
          <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50 animate-pulse-slow"></div>
        </div>
      )}
    </div>
  )
}

