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
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center">
          <Icon className={`h-5 w-5 ${iconColor} mr-2`} />
          <h4 className="font-medium">{title}</h4>
        </div>
        <p className="text-2xl font-bold mt-2">{value}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  )
}
