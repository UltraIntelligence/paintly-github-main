"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ChevronRight } from "lucide-react"

// Mock data for instructors
const instructors = [
  {
    id: "akira",
    name: "Akira Tanaka",
    image: "/diverse-person-portrait.png",
    rating: 4.8,
    specialties: ["Landscapes", "Watercolor"],
    availability: true,
  },
  {
    id: "yuki",
    name: "Yuki Sato",
    image: "/diverse-person-portrait.png",
    rating: 4.9,
    specialties: ["Abstract", "Acrylic"],
    availability: true,
  },
  {
    id: "mei",
    name: "Mei Yamamoto",
    image: "/diverse-person-portrait.png",
    rating: 4.7,
    specialties: ["Portrait", "Oil"],
    availability: false,
  },
]

// Mock data for event templates
const eventTemplates = [
  {
    id: "event1",
    title: "Sunset Beach Painting",
    image: "linear-gradient(to bottom right, #60a5fa, #7c3aed)",
    popularity: "High",
    difficulty: "Beginner",
    duration: "2 hours",
    price: "¥4,500",
  },
  {
    id: "event2",
    title: "Kids Watercolor Adventure",
    image: "linear-gradient(to bottom right, #34d399, #3b82f6)",
    popularity: "Medium",
    difficulty: "Beginner",
    duration: "1.5 hours",
    price: "¥3,200",
  },
  {
    id: "event3",
    title: "Abstract Acrylic Workshop",
    image: "linear-gradient(to bottom right, #f87171, #ec4899)",
    popularity: "High",
    difficulty: "Intermediate",
    duration: "2 hours",
    price: "¥4,800",
  },
]

interface ScheduleNewEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedSlot: { day: number; time: number; location: string } | null
}

export function ScheduleNewEventDialog({ open, onOpenChange, selectedSlot }: ScheduleNewEventDialogProps) {
  const [step, setStep] = useState("location")
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isRecurring, setIsRecurring] = useState("no")

  const handleNext = () => {
    if (step === "location") setStep("instructor")
    else if (step === "instructor") setStep("event")
    else if (step === "event") setStep("details")
    else if (step === "details") setStep("preview")
  }

  const handleBack = () => {
    if (step === "instructor") setStep("location")
    else if (step === "event") setStep("instructor")
    else if (step === "details") setStep("event")
    else if (step === "preview") setStep("details")
  }

  const handleFinish = () => {
    // Here you would save the event
    onOpenChange(false)
    setStep("location") // Reset for next time
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Schedule New Event</DialogTitle>
          <DialogDescription>Create a new event on your calendar. Fill in the details below.</DialogDescription>
        </DialogHeader>

        <Tabs value={step} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="location" disabled>
              Location & Time
            </TabsTrigger>
            <TabsTrigger value="instructor" disabled>
              Instructor
            </TabsTrigger>
            <TabsTrigger value="event" disabled>
              Event
            </TabsTrigger>
            <TabsTrigger value="details" disabled>
              Details
            </TabsTrigger>
            <TabsTrigger value="preview" disabled>
              Preview
            </TabsTrigger>
          </TabsList>

          {/* Step 1: Location and Time */}
          <TabsContent value="location" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Select defaultValue={selectedSlot?.location || "shibuya"}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shibuya">Shibuya Studio</SelectItem>
                    <SelectItem value="roppongi">Roppongi Studio</SelectItem>
                    <SelectItem value="shinjuku">Shinjuku Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <div className="mt-1">
                  <Calendar mode="single" className="rounded-md border" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Select defaultValue={selectedSlot?.time?.toString() || "18"}>
                  <SelectTrigger id="start-time">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 13 }, (_, i) => i + 9).map((hour) => (
                      <SelectItem key={hour} value={hour.toString()}>
                        {hour % 12 === 0 ? 12 : hour % 12}:00 {hour >= 12 ? "PM" : "AM"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">Includes 1 hour setup time</p>
              </div>

              <div>
                <Label htmlFor="duration">Duration</Label>
                <Select defaultValue="2">
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.5">1.5 hours</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="2.5">2.5 hours</SelectItem>
                    <SelectItem value="3">3 hours</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">Class duration (excluding setup)</p>
              </div>
            </div>
          </TabsContent>

          {/* Step 2: Instructor Selection */}
          <TabsContent value="instructor" className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              {instructors.map((instructor) => (
                <Card
                  key={instructor.id}
                  className={`cursor-pointer transition-all ${
                    selectedInstructor === instructor.id ? "border-primary ring-2 ring-primary ring-opacity-50" : ""
                  } ${!instructor.availability ? "opacity-50" : ""}`}
                  onClick={() => instructor.availability && setSelectedInstructor(instructor.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative">
                        <img
                          src={instructor.image || "/placeholder.svg"}
                          alt={instructor.name}
                          className="w-16 h-16 rounded-full object-cover mb-2"
                        />
                        {selectedInstructor === instructor.id && (
                          <div className="absolute -right-1 -bottom-1 bg-primary text-white rounded-full p-0.5">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-sm">{instructor.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-xs ml-1">{instructor.rating}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap justify-center gap-1">
                        {instructor.specialties.map((specialty) => (
                          <span key={specialty} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                      {!instructor.availability && <span className="text-xs text-red-500 mt-2">Unavailable</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Step 3: Event Selection */}
          <TabsContent value="event" className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              {eventTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all ${
                    selectedTemplate === template.id ? "border-primary ring-2 ring-primary ring-opacity-50" : ""
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <div className="w-full h-24 rounded-md mb-3" style={{ background: template.image }} />
                      <h3 className="font-medium text-sm">{template.title}</h3>
                      <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                        <div>
                          <span className="text-gray-500">Popularity:</span>
                          <span className="ml-1">{template.popularity}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Level:</span>
                          <span className="ml-1">{template.difficulty}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <span className="ml-1">{template.duration}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Price:</span>
                          <span className="ml-1">{template.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Step 4: Finalize Details */}
          <TabsContent value="details" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" defaultValue="20" />
              </div>
              <div>
                <Label htmlFor="price">Price (¥)</Label>
                <Input id="price" type="number" defaultValue="4500" />
              </div>
            </div>

            <div>
              <Label>Recurring Event</Label>
              <RadioGroup value={isRecurring} onValueChange={setIsRecurring} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no-recurring" />
                  <Label htmlFor="no-recurring" className="cursor-pointer">
                    No, one-time event
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes-recurring" />
                  <Label htmlFor="yes-recurring" className="cursor-pointer">
                    Yes, recurring event
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {isRecurring === "yes" && (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="repeat-frequency">Repeat Frequency</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger id="repeat-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
            )}
          </TabsContent>

          {/* Step 5: Preview and Confirm */}
          <TabsContent value="preview" className="space-y-4 py-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-4">Event Summary</h3>

              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-gray-500">Event:</div>
                <div>Sunset Beach Painting</div>

                <div className="text-gray-500">Location:</div>
                <div>Shibuya Studio</div>

                <div className="text-gray-500">Date:</div>
                <div>May 16, 2025</div>

                <div className="text-gray-500">Time:</div>
                <div>6:00 PM - 8:00 PM (Setup: 5:00 PM)</div>

                <div className="text-gray-500">Instructor:</div>
                <div>Akira Tanaka</div>

                <div className="text-gray-500">Capacity:</div>
                <div>20 participants</div>

                <div className="text-gray-500">Price:</div>
                <div>¥4,500</div>

                <div className="text-gray-500">Recurring:</div>
                <div>{isRecurring === "yes" ? "Yes, weekly until June 30, 2025" : "No"}</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          {step !== "location" && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}

          {step !== "preview" ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleFinish}>Schedule Event</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
