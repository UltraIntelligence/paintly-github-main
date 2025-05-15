"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"

interface Variation {
  id: string
  name: string
  description: string
}

interface SeasonalSettings {
  isActive: boolean
  startDate: string
  endDate: string
  repeatAnnually: boolean
}

interface EventTemplateSettingsProps {
  isTemplate: boolean
  variations: Variation[]
  seasonal: SeasonalSettings
}

export function EventTemplateSettings({ isTemplate, variations, seasonal }: EventTemplateSettingsProps) {
  const [isTemplateEnabled, setIsTemplateEnabled] = useState(isTemplate)
  const [isSeasonalActive, setIsSeasonalActive] = useState(seasonal.isActive)
  const [startDate, setStartDate] = useState<Date | undefined>(
    seasonal.startDate ? new Date(seasonal.startDate) : undefined,
  )
  const [endDate, setEndDate] = useState<Date | undefined>(seasonal.endDate ? new Date(seasonal.endDate) : undefined)
  const [repeatAnnually, setRepeatAnnually] = useState(seasonal.repeatAnnually)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="template-toggle" className="font-medium">
            Use as Template
          </Label>
          <Switch id="template-toggle" checked={isTemplateEnabled} onCheckedChange={setIsTemplateEnabled} />
        </div>

        {isTemplateEnabled && (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Variations</h4>
                <Button size="sm" variant="outline" className="h-8">
                  <Plus className="h-4 w-4 mr-1" />
                  Create Variation
                </Button>
              </div>

              {variations.length > 0 ? (
                <div className="space-y-2">
                  {variations.map((variation) => (
                    <div key={variation.id} className="p-3 border rounded-md">
                      <p className="font-medium">{variation.name}</p>
                      <p className="text-sm text-gray-500">{variation.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No variations created yet.</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Seasonal Scheduling</h4>
                <Switch id="seasonal-toggle" checked={isSeasonalActive} onCheckedChange={setIsSeasonalActive} />
              </div>

              {isSeasonalActive && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            id="start-date"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            id="end-date"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="repeat-annually"
                      checked={repeatAnnually}
                      onCheckedChange={(checked) => setRepeatAnnually(checked === true)}
                    />
                    <Label htmlFor="repeat-annually" className="cursor-pointer">
                      Repeat annually
                    </Label>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
