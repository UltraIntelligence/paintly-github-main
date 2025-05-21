import { CalendarPlus, ShoppingCart, ClipboardList, Settings, Star, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"

export function QuickActionButtons() {
  return (
    <div className="grid grid-cols-6 gap-2 sm:gap-4">
      {[
        { icon: CalendarPlus, label: "Add Event", subtext: "Create" },
        { icon: ShoppingCart, label: "Quick Order", subtext: "Checkout" },
        { icon: ClipboardList, label: "Order List", subtext: "Manage" },
        { icon: Settings, label: "Settings", subtext: "Configure" },
        { icon: Star, label: "Reviews", subtext: "Feedback" },
        { icon: Plus, label: "", subtext: "" },
      ].map((item, index) => (
        <Card
          key={index}
          className={`flex flex-col items-center justify-center p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer ${index === 5 ? "bg-gray-50" : "bg-white"}`}
        >
          <div className={`rounded-full p-2 ${index === 5 ? "bg-gray-100" : "bg-gray-100"} mb-2`}>
            <item.icon className="h-5 w-5 text-gray-700" />
          </div>
          {item.label && <span className="text-xs font-medium text-gray-900">{item.label}</span>}
          {item.subtext && <span className="text-xs text-gray-500">{item.subtext}</span>}
        </Card>
      ))}
    </div>
  )
}
