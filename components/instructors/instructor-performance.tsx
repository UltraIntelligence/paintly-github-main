"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Instructor } from "./instructor-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Sample performance data
const performanceData = {
  totalClasses: 248,
  averageClassSize: 14,
  studentRating: 4.9,
  topPaintings: [
    { name: "Starry Night Recreation", count: 32 },
    { name: "Cherry Blossoms by the River", count: 28 },
    { name: "Abstract Ocean Waves", count: 24 },
  ],
  monthlyClasses: [
    { month: "Jan", classes: 18 },
    { month: "Feb", classes: 16 },
    { month: "Mar", classes: 22 },
    { month: "Apr", classes: 20 },
    { month: "May", classes: 24 },
    { month: "Jun", classes: 18 },
    { month: "Jul", classes: 16 },
    { month: "Aug", classes: 14 },
    { month: "Sep", classes: 20 },
    { month: "Oct", classes: 22 },
    { month: "Nov", classes: 26 },
    { month: "Dec", classes: 18 },
  ],
  revenue: {
    total: 1248000,
    average: 5032,
    trend: "+12%",
  },
}

export function InstructorPerformance({ instructor }: { instructor: Instructor }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>Statistics and metrics for this instructor</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Key Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Total Classes</div>
                <div className="text-2xl font-bold">{performanceData.totalClasses}</div>
                <div className="text-xs text-muted-foreground">All time</div>
              </div>
              <div className="space-y-1 rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Average Class Size</div>
                <div className="text-2xl font-bold">{performanceData.averageClassSize}</div>
                <div className="text-xs text-muted-foreground">Students per class</div>
              </div>
              <div className="space-y-1 rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Student Rating</div>
                <div className="text-2xl font-bold">{performanceData.studentRating}</div>
                <div className="text-xs text-muted-foreground">Out of 5.0</div>
              </div>
              <div className="space-y-1 rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Revenue Generated</div>
                <div className="text-2xl font-bold">¥{(performanceData.revenue.total / 1000).toFixed(0)}K</div>
                <div className="text-xs text-green-600">{performanceData.revenue.trend} vs last year</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Most Popular Paintings</h3>
              <div className="space-y-3 rounded-lg border p-4">
                {performanceData.topPaintings.map((painting, index) => (
                  <div key={painting.name}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {index + 1}
                        </div>
                        <span className="font-medium">{painting.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{painting.count} classes</span>
                    </div>
                    {index < performanceData.topPaintings.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-3">
            <h3 className="font-medium">Monthly Classes (Past Year)</h3>
            <div className="rounded-lg border p-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData.monthlyClasses} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value} classes`, "Classes Taught"]}
                      contentStyle={{ borderRadius: "8px" }}
                    />
                    <Bar dataKey="classes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Revenue Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Average Per Class</div>
                  <div className="text-xl font-bold">¥{performanceData.revenue.average.toLocaleString()}</div>
                </div>
                <div className="space-y-1 rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Highest Month</div>
                  <div className="text-xl font-bold">¥168,000</div>
                  <div className="text-xs text-muted-foreground">November</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
