import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "NovaAI - AI Voice Assistant for Business",
  description:
    "Supercharge your business with intelligent voice AI agents. Handle calls, customer inquiries, scheduling, and more with seamless automation.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}



import './globals.css'