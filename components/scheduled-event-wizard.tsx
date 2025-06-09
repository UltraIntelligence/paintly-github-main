"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, ClockIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { UnifiedTemplate, UnifiedInstructor, UnifiedLocation } from "@/lib/unified-types"

// Mock data for templates
const templates = [
  {
    id: "1",
    title: "Picasso Self-Portrait",
    titleJp: "ピカソ自画像",
    description: "Cubist portrait techniques",
    duration: 2,
    materials: ['Canvas (16" x 20")', "Acrylic Paint Set", "Brushes & Palette", "Apron & Easel"],
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "2",
    title: "Monet Water Lilies",
    titleJp: "モネの睡蓮",
    description: "Impressionist watercolor techniques",
    duration: 2.5,
    materials: ["Watercolor Paper", "Watercolor Paint Set", "Brushes", "Palette"],
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "3",
    title: "Van Gogh Starry Night",
    titleJp: "ゴッホの星月夜",
    description: "Post-impressionist oil painting",
    duration: 3,
    materials: ['Canvas (18" x 24")', "Oil Paint Set", "Brushes & Palette", "Apron & Easel"],
    image: "/placeholder.svg?height=64&width=64",
  },
]

// Mock data for instructors
const instructors = [
  {
    id: "naomi",
    name: "Naomi",
    avatar: "/images/cathy-avatar.png",
    specialty: "Watercolor & Impressionism",
    experience: "5 years",
    availability: ["morning", "afternoon"],
  },
  {
    id: "momo",
    name: "Momo",
    avatar: "/images/cathy-avatar.png",
    specialty: "Abstract & Contemporary",
    experience: "7 years",
    availability: ["afternoon", "evening"],
  },
  {
    id: "yuki",
    name: "Yuki Tanaka",
    avatar: "/images/cathy-avatar.png",
    specialty: "Traditional Japanese & Watercolor",
    experience: "10 years",
    availability: ["morning", "evening"],
  },
]

// Mock data for locations
const locations = [
  {
    id: "daikanyama",
    name: "Daikanyama",
    address: "1-2-3 Daikanyama, Shibuya-ku, Tokyo",
    capacity: 16,
    availableSlots: 12,
  },
  {
    id: "catstreet",
    name: "Cat Street",
    address: "4-5-6 Cat Street, Shibuya-ku, Tokyo",
    capacity: 12,
    availableSlots: 8,
  },
  {
    id: "ginza",
    name: "Ginza",
    address: "7-8-9 Ginza, Chuo-ku, Tokyo",
    capacity: 20,
    availableSlots: 15,
  },
]

// Helper function to format time
const formatTime = (hour: number) => {
  const ampm = hour >= 12 ? "PM" : "AM"
  const formattedHour = hour % 12 || 12
  return `${formattedHour}:00 ${ampm}`
}

type WizardMode = "instructor-first" | "template-first" | "blank"

interface PrefilledData {
  instructor?: UnifiedInstructor
  template?: UnifiedTemplate
  timeSlot?: number
  location?: UnifiedLocation
}

interface ScheduledEventWizardProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  mode?: WizardMode
  prefilled?: PrefilledData
  selectedDate?: Date
  selectedTime?: number
  availableTemplates?: UnifiedTemplate[]
  availableInstructors?: UnifiedInstructor[]
  availableLocations?: UnifiedLocation[]
  onSchedule?: (eventData: any) => void
}

export function ScheduledEventWizard({
  isOpen,
  onOpenChange,
  mode = "blank",
  prefilled,
  selectedDate = new Date(),
  selectedTime = 10,
  availableTemplates = templates,
  availableInstructors = instructors,
  availableLocations = locations,
  onSchedule,
}: ScheduledEventWizardProps) {
  // Initialize state based on prefilled data
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    prefilled?.template?.id || availableTemplates[0]?.id || "",
  )
  const [selectedInstructor, setSelectedInstructor] = useState<string>(
    prefilled?.instructor?.id || availableInstructors[0]?.id || "",
  )
  const [selectedLocation, setSelectedLocation] = useState<string>(
    prefilled?.location?.id || availableLocations[0]?.id || "",
  )

  // Get the selected template, instructor and location objects
  const template = templates.find((t) => t.id === selectedTemplate) || templates[0]
  const instructor = instructors.find((i) => i.id === selectedInstructor) || instructors[0]
  const location = locations.find((l) => l.id === selectedLocation) || locations[0]

  // Calculate end time based on template duration
  const endTime = selectedTime + (template?.duration || 2)

  // Get display components based on mode
  const getWizardLayout = () => {
    switch (mode) {
      case "instructor-first":
        return {
          showInstructorCard: true,
          showTemplateSelection: true,
          showLocationSelection: true,
          focusStep: "template",
        }
      case "template-first":
        return {
          showTemplateCard: true,
          showInstructorSelection: true,
          showLocationSelection: true,
          focusStep: "instructor",
        }
      default: // 'blank'
        return {
          showTemplateSelection: true,
          showInstructorSelection: true,
          showLocationSelection: true,
          focusStep: "template",
        }
    }
  }

  const layout = getWizardLayout()

  const handleSchedule = () => {
    if (onSchedule) {
      onSchedule({
        template,
        instructor,
        location,
        date: selectedDate,
        startTime: selectedTime,
        endTime,
      })
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] font-sans p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">
                {mode === "instructor-first" && "Schedule with Instructor"}
                {mode === "template-first" && "Schedule Template"}
                {mode === "blank" && "Schedule Event"}
              </DialogTitle>
              <DialogDescription className="text-base mt-1">
                {mode === "instructor-first" && `Create a workshop with ${prefilled?.instructor?.name}`}
                {mode === "template-first" && `Schedule "${prefilled?.template?.title}" workshop`}
                {mode === "blank" && "Create a new painting workshop"}
              </DialogDescription>
            </div>
          </div>

          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span className="font-medium">{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
            <span className="mx-2">•</span>
            <ClockIcon className="w-4 h-4 mr-2" />
            <span>
              {formatTime(prefilled?.timeSlot || selectedTime)} - {formatTime(endTime)}
            </span>
            <span className="mx-2">•</span>
            <span>{template?.duration} hours</span>
          </div>
        </DialogHeader>

        {/* Prefilled Data Cards */}
        {(layout.showInstructorCard || layout.showTemplateCard) && (
          <div className="px-6 py-4 bg-blue-50 border-b">
            {layout.showInstructorCard && prefilled?.instructor && (
              <Card className="border-blue-200 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={prefilled.instructor.avatar || "/placeholder.svg"}
                        alt={prefilled.instructor.name}
                      />
                      <AvatarFallback>{prefilled.instructor.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-blue-900">{prefilled.instructor.name}</p>
                      <p className="text-sm text-blue-700">{prefilled.instructor.specialty}</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      Selected Instructor
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {layout.showTemplateCard && prefilled?.template && (
              <Card className="border-blue-200 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-blue-100 flex items-center justify-center">
                      <img
                        src={prefilled.template.image || "/placeholder.svg"}
                        alt={prefilled.template.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900">{prefilled.template.title}</h3>
                      <p className="text-sm text-blue-700">{prefilled.template.titleJp}</p>
                      <div className="flex items-center mt-1 text-xs text-blue-600">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        <span>{prefilled.template.duration} hours</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      Selected Template
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <div className="px-6 py-4 grid gap-6">
          {/* Template Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Select Template</h3>
            <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate} className="grid gap-3">
              {templates.map((tmpl) => (
                <div key={tmpl.id} className="flex items-start space-x-3">
                  <RadioGroupItem value={tmpl.id} id={`template-${tmpl.id}`} className="mt-1" />
                  <Label htmlFor={`template-${tmpl.id}`} className="flex-1 cursor-pointer">
                    <Card className={`border ${selectedTemplate === tmpl.id ? "border-blue-500 bg-blue-50" : ""}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-md bg-blue-100 flex items-center justify-center">
                            <img
                              src={tmpl.image || "/placeholder.svg"}
                              alt={tmpl.title}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{tmpl.title}</h3>
                            <p className="text-sm text-muted-foreground">{tmpl.titleJp}</p>
                            <div className="flex items-center mt-1 text-xs text-muted-foreground">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              <span>{tmpl.duration} hours</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Instructor Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Select Instructor</h3>
            <RadioGroup value={selectedInstructor} onValueChange={setSelectedInstructor} className="grid gap-3">
              {instructors.map((inst) => (
                <div key={inst.id} className="flex items-start space-x-3">
                  <RadioGroupItem value={inst.id} id={`instructor-${inst.id}`} className="mt-1" />
                  <Label htmlFor={`instructor-${inst.id}`} className="flex-1 cursor-pointer">
                    <Card className={`border ${selectedInstructor === inst.id ? "border-blue-500 bg-blue-50" : ""}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={inst.avatar || "/placeholder.svg"} alt={inst.name} />
                            <AvatarFallback>{inst.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{inst.name}</p>
                            <p className="text-sm text-muted-foreground">{inst.specialty}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Location Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Select Location</h3>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.id} value={loc.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{loc.name}</span>
                      <Badge variant="outline" className="ml-2">
                        {loc.availableSlots}/{loc.capacity} slots
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Details */}
            {location && (
              <Card className="mt-3">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{location.name}</p>
                      <p className="text-sm text-muted-foreground">{location.address}</p>
                    </div>
                    <Badge variant="outline">
                      {location.availableSlots}/{location.capacity} slots
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSchedule}>Schedule Event</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
