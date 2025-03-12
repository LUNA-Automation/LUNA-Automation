"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function MouseFollowGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [isVisible])

  if (typeof window === "undefined") return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition duration-300"
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <motion.div
        className="absolute h-[300px] w-[300px] rounded-full bg-[#6A00FF] opacity-[0.15] blur-[100px]"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
      />
    </motion.div>
  )
}

