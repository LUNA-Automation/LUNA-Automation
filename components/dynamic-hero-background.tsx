"use client"

import { useCallback, useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import type { Container, ISourceOptions } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"

interface DynamicHeroBackgroundProps {
  className?: string
  callsHandled?: number
}

export function DynamicHeroBackground({ className, callsHandled = 0 }: DynamicHeroBackgroundProps) {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = useCallback(async (container?: Container) => {
    await console.log(container)
  }, [])

  const options: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#EAEAEA", // Soft white color for particles
      },
      links: {
        color: "#EAEAEA", // Soft white color for links
        distance: 150,
        enable: true,
        opacity: 0.3, // Reduced opacity for subtlety
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1.5, // Slightly reduced speed for smoother movement
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 60, // Reduced number of particles for less clutter
      },
      opacity: {
        value: 0.3, // Reduced opacity for particles
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 }, // Slightly smaller particles
      },
    },
    detectRetina: true,
  }

  if (!init) {
    return null
  }

  return (
    <>
      <Particles id="tsparticles" className={className} particlesLoaded={particlesLoaded} options={options} />
      <div className="absolute bottom-4 right-4 text-white text-sm font-medium bg-slate-800/50 px-2 py-1 rounded">
        Calls Handled Today: {callsHandled.toLocaleString()}
      </div>
    </>
  )
}

