"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatAssistantProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatAssistant({ isOpen, onClose }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm NovaAI's assistant. How can I help you with our AI solutions today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "I'd be happy to tell you more about our AI solutions. What specific industry are you in?",
        "Our AI voice agents can handle thousands of calls simultaneously. Would you like to know more about our call center solutions?",
        "The setup process typically takes 2-4 weeks depending on the complexity of your needs. Our team will guide you through every step.",
        "Yes, our AI solutions integrate with most popular CRM systems including Salesforce, HubSpot, and Zoho.",
        "Our pricing is based on your specific needs. Would you like to schedule a call with our sales team to discuss a custom quote?",
      ]

      const botMessage: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 left-6 z-40 w-[350px] max-w-[calc(100vw-48px)] rounded-xl border border-slate-800/50 bg-slate-900/95 shadow-xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-slate-800/50 p-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6A00FF]/20">
                <Bot className="h-4 w-4 text-[#6A00FF]" />
              </div>
              <div>
                <h3 className="font-medium text-white">NovaAI Assistant</h3>
                <p className="text-xs text-slate-400">Ask about our AI solutions</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-slate-400 hover:text-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-[350px] overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-xl p-3 ${
                      message.sender === "user" ? "bg-[#6A00FF] text-white" : "bg-slate-800/50 text-slate-200"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="mt-1 text-right text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-xl bg-slate-800/50 p-3 text-slate-200">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t border-slate-800/50 p-4">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus-visible:ring-[#6A00FF]"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-[#6A00FF] hover:bg-[#7C1AFF] text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

