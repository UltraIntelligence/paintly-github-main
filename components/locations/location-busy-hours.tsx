"use client"

import { useState } from "react"

// Generate random data for the heatmap
const generateHeatmapData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const data = days.flatMap((day) => {
    return hours.map((hour) => {
      // Generate busier times during typical business hours
      let intensity = Math.random()
      if (hour >= 9 && hour <= 20) {
        intensity = Math.random() * 0.6 + 0.4 // 40-100% intensity
        if (hour >= 17 && hour <= 19) {
          intensity = Math.random() * 0.3 + 0.7 // 70-100% intensity (peak hours)
        }
      } else {
        intensity = Math.random() * 0.3 // 0-30% intensity (off hours)
      }

      return {
        day,
        hour,
        intensity,
      }
    })
  })

  return data
}

export function LocationBusyHours() {
  const [data] = useState(generateHeatmapData())

  // Group data by day
  const groupedByDay = data.reduce(
    (acc, item) => {
      if (!acc[item.day]) {
        acc[item.day] = []
      }
      acc[item.day].push(item)
      return acc
    },
    {} as Record<string, typeof data>,
  )

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Peak Hours</h4>
      <div className="flex flex-col space-y-1">
        {Object.entries(groupedByDay).map(([day, hours]) => (
          <div key={day} className="flex items-center">
            <div className="w-8 text-xs text-gray-500">{day}</div>
            <div className="flex flex-1 h-3">
              {hours.map((item) => (
                <div
                  key={`${item.day}-${item.hour}`}
                  className="flex-1 h-full"
                  style={{
                    backgroundColor: `rgba(59, 130, 246, ${item.intensity})`,
                    borderRight: item.hour === 23 ? "none" : "1px solid white",
                  }}
                  title={`${item.day} ${item.hour}:00 - ${item.hour + 1}:00`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 pt-1">
        <span>12am</span>
        <span>6am</span>
        <span>12pm</span>
        <span>6pm</span>
        <span>12am</span>
      </div>
    </div>
  )
}
