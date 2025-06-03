"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckIcon, Calendar, Clock, Users, MapPin } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  templateId: z.string({ required_error: "Please select a template." }),
  date: z.string({ required_error: "Please select a date." }),
  time: z.string({ required_error: "Please select a time." }),
  instructorId: z.string({ required_error: "Please select an instructor." }),
  locationId: z.string({ required_error: "Please select a location." }),
  maxParticipants: z.number().min(1).max(50),
  specialNotes: z.string().optional(),
})

interface ScheduledEventWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Sample templates data
const templates = [
  {
    id: "monet",
    japaneseTitle: "モネ 睡蓮",
    englishTitle: "Monet Water Lilies",
    duration: 2,
    canvas: "F6",
    difficulty: "Beginner",
    category: "Master Artists",
    specialization: ["master", "general"],
    image: "/placeholder.svg?height=80&width=80&text=Monet",
    price: 2800,
  },
  {
    id: "vangogh",
    japaneseTitle: "ゴッホ 星月夜",
    englishTitle: "Van Gogh Starry Night",
    duration: 2.5,
    canvas: "F10",
    difficulty: "Advanced",
    category: "Master Artists",
    specialization: ["master"],
    image: "/placeholder.svg?height=80&width=80&text=VanGogh",
    price: 3200,
  },
  {
    id: "pouring",
    japaneseTitle: "F6 たらし込みポーリングアート",
    englishTitle: "Paint Pouring",
    duration: 2,
    canvas: "30cm Round",
    difficulty: "Beginner",
    category: "Paint Pouring",
    specialization: ["pouring"],
    image: "/placeholder.svg?height=80&width=80&text=Pouring",
    price: 2200,
  },
  {
    id: "kids-chameleon",
    japaneseTitle: "キッズ カメレオン",
    englishTitle: "Kids Chameleon",
    duration: 1.5,
    canvas: "25cm Round",
    difficulty: "Kids",
    category: "Kids Only",
    specialization: ["kids"],
    image: "/placeholder.svg?height=80&width=80&text=Kids",
    price: 1800,
  },
]

// Sample instructors data
const instructors = [
  {
    id: "yuki",
    name: "Yuki Tanaka",
    initials: "YT",
    specialty: "kids",
    specialtyColor: "#3b82f6",
    avatar: "/placeholder.svg?height=32&width=32&text=YT",
  },
  {
    id: "naomi",
    name: "Naomi",
    initials: "N",
    specialty: "master",
    specialtyColor: "#8b5cf6",
    avatar: "/placeholder.svg?height=32&width=32&text=N",
  },
  {
    id: "luci",
    name: "Luci",
    initials: "L",
    specialty: "pouring",
    specialtyColor: "#10b981",
    avatar: "/placeholder.svg?height=32&width=32&text=L",
  },
  {
    id: "daria",
    name: "Daria",
    initials: "D",
    specialty: "evening",
    specialtyColor: "#f59e0b",
    avatar: "/placeholder.svg?height=32&width=32&text=D",
  },
]

// Sample locations data
const locations = [
  { id: "daikanyama", name: "Daikanyama", address: "Shibuya City, Tokyo" },
  { id: "ginza", name: "Ginza", address: "Chuo City, Tokyo" },
  { id: "catstreet", name: "Cat Street", address: "Shibuya City, Tokyo" },
  { id: "yokohama", name: "Yokohama", address: "Yokohama, Kanagawa" },
  { id: "osaka", name: "Osaka", address: "Osaka City, Osaka" },
  { id: "okinawa", name: "Okinawa", address: "Naha, Okinawa" },
  { id: "fukuoka", name: "Fukuoka", address: "Fukuoka City, Fukuoka" },
]

export function ScheduledEventWizard({ open, onOpenChange }: ScheduledEventWizardProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      templateId: "",
      date: "",
      time: "",
      instructorId: "",
      locationId: "",
      maxParticipants: 20,
      specialNotes: "",
    },
  })

  const steps = [
    { number: 1, title: "Choose Template", completed: step > 1 },
    { number: 2, title: "Date & Time", completed: step > 2 },
    { number: 3, title: "Assign Instructor", completed: step > 3 },
    { number: 4, title: "Publish", completed: false },
  ]

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log("Scheduling event:", values)

    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      setStep(1)
      form.reset()
    }, 1500)
  }

  const nextStep = () => {
    const fieldsToValidate = {
      1: ["templateId"],
      2: ["date", "time", "locationId", "maxParticipants"],
      3: ["instructorId"],
    }[step]

    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) setStep((prev) => Math.min(prev + 1, 4))
    })
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleCancel = () => {
    setStep(1)
    form.reset()
    onOpenChange(false)
  }

  const selectedTemplate = templates.find((t) => t.id === form.watch("templateId"))
  const selectedInstructor = instructors.find((i) => i.id === form.watch("instructorId"))
  const selectedLocation = locations.find((l) => l.id === form.watch("locationId"))

  // Filter instructors based on selected template specialization
  const getAvailableInstructors = () => {
    if (!selectedTemplate) return instructors
    return instructors.filter(
      (instructor) =>
        selectedTemplate.specialization.includes(instructor.specialty) ||
        selectedTemplate.specialization.includes("general"),
    )
  }

  // Generate time slots
  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Schedule Event</DialogTitle>
          <DialogDescription>
            Add an existing template to your event calendar with specific date, time, and instructor assignment.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    step >= stepItem.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {step > stepItem.number ? <CheckIcon className="h-4 w-4" /> : stepItem.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn("h-1 w-10", step > stepItem.number ? "bg-primary" : "bg-muted")} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="border-2 border-gray-200 bg-white min-h-[500px] h-[500px]">
              <CardContent className="p-6 h-full overflow-y-auto">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose from Templates</h3>
                      <p className="text-sm text-gray-600">Select an existing template to schedule</p>
                    </div>

                    <FormField
                      control={form.control}
                      name="templateId"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 gap-4 max-h-[350px] overflow-y-auto">
                            {templates.map((template) => (
                              <div
                                key={template.id}
                                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                                  field.value === template.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                                onClick={() => field.onChange(template.id)}
                              >
                                <div className="flex items-center gap-4">
                                  <img
                                    src={template.image || "/placeholder.svg"}
                                    alt={template.englishTitle}
                                    className="w-16 h-16 rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-medium text-gray-900">{template.japaneseTitle}</h4>
                                      <Badge variant="outline" className="text-xs">
                                        {template.category}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{template.englishTitle}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                      <span>{template.duration}h</span>
                                      <span>{template.canvas}</span>
                                      <span>{template.difficulty}</span>
                                      <span className="font-medium text-green-600">
                                        ¥{template.price.toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Date and Time</h3>
                      <p className="text-sm text-gray-600">Choose when to schedule this event</p>
                    </div>

                    {/* Selected Template Preview */}
                    {selectedTemplate && (
                      <div className="border rounded-lg p-4 bg-gray-50 mb-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={selectedTemplate.image || "/placeholder.svg"}
                            alt={selectedTemplate.englishTitle}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{selectedTemplate.japaneseTitle}</h4>
                            <p className="text-sm text-gray-600">{selectedTemplate.englishTitle}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} min={new Date().toISOString().split("T")[0]} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select start time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="locationId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {locations.map((location) => (
                                  <SelectItem key={location.id} value={location.id}>
                                    <div className="flex flex-col">
                                      <span className="font-medium">{location.name}</span>
                                      <span className="text-xs text-gray-500">{location.address}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxParticipants"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Participants</FormLabel>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <Input
                                  type="number"
                                  min={1}
                                  max={50}
                                  {...field}
                                  onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                />
                              </FormControl>
                              <Users className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Assign Instructor</h3>
                      <p className="text-sm text-gray-600">Choose an instructor for this event</p>
                    </div>

                    <FormField
                      control={form.control}
                      name="instructorId"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 gap-4 max-h-[350px] overflow-y-auto">
                            {getAvailableInstructors().map((instructor) => (
                              <div
                                key={instructor.id}
                                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                                  field.value === instructor.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                                onClick={() => field.onChange(instructor.id)}
                              >
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={instructor.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-sm bg-blue-100 text-blue-700">
                                      {instructor.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-medium text-gray-900">{instructor.name}</h4>
                                      <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: instructor.specialtyColor }}
                                      />
                                    </div>
                                    <p className="text-sm text-gray-600 capitalize">
                                      {instructor.specialty} specialist
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Publish and Go Live</h3>
                      <p className="text-sm text-gray-600">Review your event details and publish</p>
                    </div>

                    {/* Event Summary */}
                    <div className="border rounded-lg p-6 bg-gray-50 space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-4">Event Summary</h4>

                      {selectedTemplate && (
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src={selectedTemplate.image || "/placeholder.svg"}
                            alt={selectedTemplate.englishTitle}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h5 className="font-medium text-gray-900">{selectedTemplate.japaneseTitle}</h5>
                            <p className="text-sm text-gray-600">{selectedTemplate.englishTitle}</p>
                            <p className="text-sm text-green-600 font-medium">
                              ¥{selectedTemplate.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{form.watch("date") || "Not set"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{form.watch("time") || "Not set"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{selectedLocation?.name || "Not set"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>Max {form.watch("maxParticipants")} participants</span>
                        </div>
                      </div>

                      {selectedInstructor && (
                        <div className="flex items-center gap-3 pt-4 border-t">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={selectedInstructor.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-sm bg-blue-100 text-blue-700">
                              {selectedInstructor.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{selectedInstructor.name}</p>
                            <p className="text-sm text-gray-600 capitalize">
                              {selectedInstructor.specialty} specialist
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="specialNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Notes (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Any special instructions or notes for this event..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="text-center py-4">
                      <div className="text-green-600 font-medium">Ready to publish!</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Your event will be live and available for bookings immediately
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <DialogFooter className="flex justify-between">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              <Button variant="outline" onClick={handleCancel} className="px-6">
                Cancel
              </Button>
              {step < 4 ? (
                <Button type="button" onClick={nextStep}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Publishing..." : "Publish Event"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
