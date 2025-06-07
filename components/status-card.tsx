import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatusCardProps {
  icon: LucideIcon
  iconColor: string
  title: string
  value: string
  subtitle: string
}

export function StatusCard({ icon: Icon, iconColor, title, value, subtitle }: StatusCardProps) {
  return (
    <Card className="neu-card neu-hover border-0 bg-background/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-3">
          <h3 className="tracking-tight text-sm font-medium text-foreground/80">{title}</h3>
          <div className="neu-flat p-2 rounded-xl">
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  )
}
