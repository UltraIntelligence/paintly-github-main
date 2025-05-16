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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Key statistics and metrics for this instructor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Total Classes</div>
                <div className="text-2xl font-bold mt-1">{performanceData.totalClasses}</div>
                <div className="text-xs text-muted-foreground mt-1">All time</div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Average Class Size</div>
                <div className="text-2xl font-bold mt-1">{performanceData.averageClassSize}</div>
                <div className="text-xs text-muted-foreground mt-1">Students per class</div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Student Rating</div>
                <div className="text-2xl font-bold mt-1">{performanceData.studentRating}</div>
                <div className="text-xs text-muted-foreground mt-1">Out of 5.0</div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Revenue Generated</div>
                <div className="text-2xl font-bold mt-1">¥{(performanceData.revenue.total / 1000).toFixed(0)}K</div>
                <div className="text-xs text-green-600 mt-1">{performanceData.revenue.trend} vs last year</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Popular Paintings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Classes (Past Year)</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Revenue Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Average Per Class</div>
                <div className="text-xl font-bold mt-1">¥{performanceData.revenue.average.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Highest Month</div>
                <div className="text-xl font-bold mt-1">¥168,000</div>
                <div className="text-xs text-muted-foreground mt-1">November</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
