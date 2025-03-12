"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { scrollToSection } from "@/lib/scroll-utils"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold">
        AI Assistant
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/features">Features</Link>
        <Link href="/pricing">Pricing</Link>
        <Button variant="default" size="sm" onClick={() => scrollToSection("hear-me-in-action")}>
          How It Works
        </Button>
      </div>
    </nav>
  )
}

export default Navbar

