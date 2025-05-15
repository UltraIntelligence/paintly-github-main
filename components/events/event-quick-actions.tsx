"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Copy, Plus, Trash2 } from "lucide-react"

interface EventQuickActionsProps {
  isTemplate: boolean
}

export function EventQuickActions({ isTemplate }: EventQuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full justify-start" effect="gooeyLeft">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule This Event
        </Button>

        <Button variant="outline" className="w-full justify-start" effect="gooeyLeft">
          <Copy className="mr-2 h-4 w-4" />
          Duplicate as Template
        </Button>

        {isTemplate && (
          <Button variant="outline" className="w-full justify-start" effect="gooeyLeft">
            <Plus className="mr-2 h-4 w-4" />
            Create Variation
          </Button>
        )}

        <Button variant="destructive" className="w-full justify-start" effect="gooeyLeft">
          <Trash2 className="mr-2 h-4 w-4" />
          Archive Event
        </Button>
      </CardContent>
    </Card>
  )
}
