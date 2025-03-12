"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart, CartesianGrid } from "recharts"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const callData = [
  { month: "Jan", calls: 2400, responseTime: 15, satisfaction: 92 },
  { month: "Feb", calls: 3600, responseTime: 12, satisfaction: 94 },
  { month: "Mar", calls: 4200, responseTime: 10, satisfaction: 95 },
  { month: "Apr", calls: 5100, responseTime: 8, satisfaction: 96 },
  { month: "May", calls: 4800, responseTime: 7, satisfaction: 97 },
  { month: "Jun", calls: 5600, responseTime: 6, satisfaction: 98 },
]

const learningData = [
  { week: "W1", accuracy: 85, confidence: 80 },
  { week: "W2", accuracy: 87, confidence: 83 },
  { week: "W3", accuracy: 89, confidence: 86 },
  { week: "W4", accuracy: 91, confidence: 88 },
  { week: "W5", accuracy: 93, confidence: 91 },
  { week: "W6", accuracy: 95, confidence: 94 },
]

const CustomTooltip = ({ active, payload, label, prefix = "", suffix = "" }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/90 p-3 shadow-xl backdrop-blur">
        <p className="text-sm font-medium text-slate-200 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm text-slate-400">
            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
            {entry.name}: {prefix}
            {entry.value}
            {suffix}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const CustomizedDot = (props: any) => {
  const { cx, cy } = props
  if (typeof cx !== "number" || typeof cy !== "number") return null
  return (
    <svg x={cx - 5} y={cy - 5} width="10" height="10" fill="rgb(139, 92, 246)">
      <circle r="4" cx="5" cy="5" className="animate-pulse" />
    </svg>
  )
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn("h-6 w-6", star <= rating ? "text-yellow-500 fill-yellow-500" : "text-slate-600")}
        />
      ))}
    </div>
  )
}

export default function MetricsDashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const dashboardRef = useRef(null)

  const [chartData, setChartData] = useState({
    calls: callData.map((d) => ({ ...d, calls: 0, responseTime: 0, satisfaction: 0 })),
    learning: learningData.map((d) => ({ ...d, accuracy: 0, confidence: 0 })),
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
      },
    )

    if (dashboardRef.current) {
      observer.observe(dashboardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      setChartData({
        calls: callData,
        learning: learningData,
      })
    }
  }, [isVisible])

  return (
    <div
      ref={dashboardRef}
      className={cn(
        "grid gap-6 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="relative overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-slate-200">Call Performance</CardTitle>
            <CardDescription className="text-slate-400">Track call volume and response times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.calls}>
                  <defs>
                    <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(139, 92, 246)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="rgb(139, 92, 246)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey={(data) => data?.calls ?? 0}
                    stroke="rgb(139, 92, 246)"
                    strokeWidth={2}
                    fill="url(#colorCalls)"
                    dot={<CustomizedDot />}
                    connectNulls
                    isAnimationActive={true}
                    animationDuration={2000}
                    animationBegin={0}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Average Response Time</span>
                <span className="font-semibold text-purple-400">6s</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Total Calls Handled</span>
                <span className="font-semibold text-purple-400">25,700</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-slate-200">AI Learning Progress</CardTitle>
            <CardDescription className="text-slate-400">Performance improvements over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.learning}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="week" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip suffix="%" />} />
                  <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="0" y2="1">
                      <stop stopColor="#8B5CF6" stopOpacity={1} />
                      <stop offset="1" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey={(data) => data?.accuracy ?? 0}
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={<CustomizedDot />}
                    connectNulls
                    isAnimationActive={true}
                    animationDuration={2000}
                    animationBegin={500}
                    className="filter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                  />
                  <Line
                    type="monotone"
                    dataKey={(data) => data?.confidence ?? 0}
                    stroke="#22C55E"
                    strokeWidth={2}
                    dot={<CustomizedDot />}
                    connectNulls
                    isAnimationActive={true}
                    animationDuration={2000}
                    animationBegin={1000}
                    className="filter drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Current Accuracy</span>
                <span className="font-semibold text-purple-400">95%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Confidence Score</span>
                <span className="font-semibold text-green-400">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="relative overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-slate-200">Sentiment Analysis</CardTitle>
          <CardDescription className="text-slate-400">Customer interaction sentiment breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm text-slate-400">Positive Interactions</div>
              <div className="text-4xl font-bold text-purple-400">65%</div>
              <div className="text-sm text-slate-400">of all customer interactions are rated positively</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-slate-400">Customer Satisfaction Score</div>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-purple-400">4.5</span>
                <span className="text-2xl text-slate-400">/5</span>
              </div>
              <StarRating rating={4.5} />
              <div className="text-sm text-slate-400">based on customer feedback</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

