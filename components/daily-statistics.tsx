import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown, DollarSign, ShoppingCart, Eye, Calendar } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  const isPositive = change >= 0

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <ArrowUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-rose-500" />
              )}
              <span className={`text-sm font-medium ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
                {Math.abs(change)}% from last week
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-full items-end gap-1">
              {/* Simplified vertical chart visualization */}
              <div className="w-1.5 h-8 bg-primary/10 rounded-full"></div>
              <div className="w-1.5 h-12 bg-primary/20 rounded-full"></div>
              <div className="w-1.5 h-10 bg-primary/15 rounded-full"></div>
              <div className="w-1.5 h-16 bg-primary/30 rounded-full"></div>
              <div className="w-1.5 h-14 bg-primary/25 rounded-full"></div>
              <div className="w-1.5 h-20 bg-primary rounded-full"></div>
            </div>
            <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DailyStatistics() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Daily Statistics</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Sales Value" value="$3,560.00" change={5.65} icon={<DollarSign className="h-5 w-5" />} />
        <StatCard title="Number of Orders" value="423" change={2.59} icon={<ShoppingCart className="h-5 w-5" />} />
        <StatCard title="Storefront Views" value="4,224" change={-0.35} icon={<Eye className="h-5 w-5" />} />
        <StatCard title="Booking Views" value="1,245" change={1.78} icon={<Calendar className="h-5 w-5" />} />
      </div>
    </div>
  )
}
