"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  CheckIcon,
  ChevronRightIcon,
  AlertTriangleIcon,
  ClockIcon,
  PaletteIcon,
  BuildingIcon,
  CheckCircleIcon,
  XIcon,
  InfoIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { UnifiedTemplate, UnifiedInstructor, UnifiedLocation, UnifiedEvent } from "@/lib/unified-types"

// Sample data
const sampleTemplates: UnifiedTemplate[] = [
  {
    id: "monet-water-lilies",
    title: "Monet Water Lilies",
    titleJp: "モネの睡蓮",
    duration: 2,
    canvas: "F6 Canvas",
    difficulty: "Beginner",
    category: "Impressionism",
    specialization: ["watercolor", "impressionism"],
    image: "/placeholder.svg?height=80&width=80",
    materials: ["Watercolor paints", "Brushes", "Canvas", "Palette"],
    description: "Learn Monet's impressionist techniques with water lilies",
    descriptionJp: "モネの印象派技法で睡蓮を描きます",
  },
  {
    id: "van-gogh-starry-night",
    title: "Van Gogh Starry Night",
    titleJp: "ゴッホの星月夜",
    duration: 2.5,
    canvas: "F8 Canvas",
    difficulty: "Intermediate",
    category: "Post-Impressionism",
    specialization: ["oil-painting", "post-impressionism"],
    image: "/placeholder.svg?height=80&width=80",
    materials: ["Oil paints", "Canvas", "Brushes", "Palette knife"],
    description: "Master Van Gogh's swirling brushwork and color theory",
    descriptionJp: "ゴッホの渦巻く筆遣いと色彩理論を学びます",
  },
  {
    id: "abstract-pouring",
    title: "Abstract Paint Pouring",
    titleJp: "抽象ペイントポーリング",
    duration: 1.5,
    canvas: "Round Canvas",
    difficulty: "Beginner",
    category: "Abstract",
    specialization: ["abstract", "pouring"],
    image: "/placeholder.svg?height=80&width=80",
    materials: ["Acrylic paints", "Pouring medium", "Round canvas", "Cups"],
    description: "Create stunning abstract art with fluid painting techniques",
    descriptionJp: "流動的な絵画技法で美しい抽象アートを作ります",
  },
]

const sampleInstructors: UnifiedInstructor[] = [
  {
    id: "yuki-tanaka",
    name: "Yuki Tanaka",
    nameJp: "田中雪",
    specialty: "Watercolor & Impressionism",
    avatar: "/images/cathy-avatar.png",
    initials: "YT",
    bio: "Specializes in traditional Japanese watercolor and Western impressionist techniques",
    bioJp: "日本の伝統的な水彩画と西洋印象派技法を専門とします",
    languages: ["Japanese", "English"],
    isActive: true,
  },
  {
    id: "naomi-sato",
    name: "Naomi Sato",
    nameJp: "佐藤直美",
    specialty: "Abstract & Contemporary",
    avatar: "/images/cathy-avatar.png",
    initials: "NS",
    bio: "Contemporary artist focusing on abstract expressionism and mixed media",
    bioJp: "抽象表現主義とミクストメディアに焦点を当てた現代アーティスト",
    languages: ["Japanese", "English"],
    isActive: true,
  },
  {
    id: "luci-martinez",
    name: "Luci Martinez",
    nameJp: "ルシ・マルティネス",
    specialty: "Paint Pouring & Fluid Art",
    avatar: "/images/cathy-avatar.png",
    initials: "LM",
    bio: "Expert in fluid art techniques and paint pouring methods",
    bioJp: "流動アート技法とペイントポーリング手法の専門家",
    languages: ["English", "Spanish", "Japanese"],
    isActive: true,
  },
]

const sampleLocations: UnifiedLocation[] = [
  {
    id: "ginza-studio",
    name: "Artbar Ginza",
    nameJp: "アートバー銀座",
    address: "1-2-3 Ginza, Chuo-ku, Tokyo",
    addressJp: "東京都中央区銀座1-2-3",
    capacity: 20,
    isActive: true,
  },
  {
    id: "daikanyama-studio",
    name: "Artbar Daikanyama",
    nameJp: "アートバー代官山",
    address: "4-5-6 Daikanyama, Shibuya-ku, Tokyo",
    addressJp: "東京都渋谷区代官山4-5-6",
    capacity: 16,
    isActive: true,
  },
  {
    id: "catstreet-studio",
    name: "Artbar Cat Street",
    nameJp: "アートバーキャットストリート",
    address: "7-8-9 Cat Street, Shibuya-ku, Tokyo",
    addressJp: "東京都渋谷区キャットストリート7-8-9",
    capacity: 12,
    isActive: true,
  },
]

type WizardMode = "instructor-first" | "template-first" | "blank"
type WizardStep = "selection" | "schedule" | "details" | "confirmation"

interface CreateEventModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  mode: WizardMode
  prefilled?: {
    instructor?: UnifiedInstructor
    template?: UnifiedTemplate
    timeSlot?: { date: Date; startHour: number; endHour: number }
    location?: UnifiedLocation
  }
  onSchedule: (eventData: UnifiedEvent) => void
}

export function CreateEventModal({ isOpen, onOpenChange, mode, prefilled, onSchedule }: CreateEventModalProps) {
  // State for wizard steps and form data
  const [currentStep, setCurrentStep] = useState<WizardStep>("selection")
  const [selectedTemplate, setSelectedTemplate] = useState<string>(prefilled?.template?.id || "")
  const [selectedInstructor, setSelectedInstructor] = useState<string>(prefilled?.instructor?.id || "")
  const [selectedLocation, setSelectedLocation] = useState<string>(prefilled?.location?.id || "")
  const [eventDate, setEventDate] = useState<Date>(prefilled?.timeSlot?.date || new Date())
  const [startHour, setStartHour] = useState<number>(prefilled?.timeSlot?.startHour || 14)
  const [capacity, setCapacity] = useState<number>(12)
  const [specialNotes, setSpecialNotes] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Animation states
  const [animateIn, setAnimateIn] = useState<boolean>(false)

  // Get selected objects
  const template = sampleTemplates.find((t) => t.id === selectedTemplate)
  const instructor = sampleInstructors.find((i) => i.id === selectedInstructor)
  const location = sampleLocations.find((l) => l.id === selectedLocation)

  // Calculate end hour based on template duration
  const endHour = startHour + (template?.duration || 2)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep("selection")
      setAnimateIn(false)
      setFormErrors({})

      // Trigger animation after modal opens
      const timer = setTimeout(() => {
        setAnimateIn(true)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Reset animation state when step changes
  useEffect(() => {
    setAnimateIn(false)
    const timer = setTimeout(() => {
      setAnimateIn(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [currentStep])

  // Helper functions
  const formatTime = (hour: number) => {
    const ampm = hour >= 12 ? "PM" : "AM"
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:00 ${ampm}`
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case "selection":
        return mode === "instructor-first"
          ? "Select Template"
          : mode === "template-first"
            ? "Select Instructor"
            : "Select Template & Instructor"
      case "schedule":
        return "Schedule & Location"
      case "details":
        return "Workshop Details"
      case "confirmation":
        return "Confirm Workshop"
      default:
        return "Create Workshop"
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case "selection":
        return mode === "instructor-first"
          ? `Choose a template for ${prefilled?.instructor?.name}'s workshop`
          : mode === "template-first"
            ? `Choose an instructor for "${prefilled?.template?.title}"`
            : "Choose the template and instructor for your workshop"
      case "schedule":
        return "Set the date, time, and location for the workshop"
      case "details":
        return "Configure capacity, materials, and special requirements"
      case "confirmation":
        return "Review and confirm all workshop details"
      default:
        return "Create a new painting workshop"
    }
  }

  const validateCurrentStep = () => {
    const errors: Record<string, string> = {}

    switch (currentStep) {
      case "selection":
        if (!selectedTemplate) {
          errors.template = "Please select a template"
        }
        if (!selectedInstructor) {
          errors.instructor = "Please select an instructor"
        }
        break
      case "schedule":
        if (!selectedLocation) {
          errors.location = "Please select a location"
        }
        break
      case "details":
        if (capacity <= 0) {
          errors.capacity = "Capacity must be greater than 0"
        }
        if (capacity > (location?.capacity || 20)) {
          errors.capacity = `Capacity cannot exceed ${location?.capacity || 20}`
        }
        break
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case "selection":
        return selectedTemplate && selectedInstructor
      case "schedule":
        return selectedLocation
      case "details":
        return capacity > 0 && capacity <= (location?.capacity || 20)
      case "confirmation":
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      switch (currentStep) {
        case "selection":
          setCurrentStep("schedule")
          break
        case "schedule":
          setCurrentStep("details")
          break
        case "details":
          setCurrentStep("confirmation")
          break
      }
    }
  }

  const handleBack = () => {
    switch (currentStep) {
      case "schedule":
        setCurrentStep("selection")
        break
      case "details":
        setCurrentStep("schedule")
        break
      case "confirmation":
        setCurrentStep("details")
        break
    }
  }

  const handleSchedule = async () => {
    if (!template || !instructor || !location) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      const eventData: UnifiedEvent = {
        id: `event-${Date.now()}`,
        template,
        instructor,
        location,
        startTime: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), startHour),
        endTime: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), endHour),
        capacity,
        currentParticipants: 0,
        status: "scheduled",
      }

      onSchedule(eventData)
      onOpenChange(false)
    } catch (error) {
      console.error("Error scheduling event:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Step indicator component
  const StepIndicator = () => (
    <div className="relative mb-8">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
      <div className="relative z-10 flex justify-between">
        {[
          { id: "selection", label: "Selection" },
          { id: "schedule", label: "Schedule" },
          { id: "details", label: "Details" },
          { id: "confirmation", label: "Confirm" },
        ].map((step, index) => {
          const stepOrder = ["selection", "schedule", "details", "confirmation"]
          const currentIndex = stepOrder.indexOf(currentStep)
          const stepIndex = stepOrder.indexOf(step.id)

          const isActive = currentStep === step.id
          const isCompleted = currentIndex > stepIndex

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : isCompleted
                        ? "bg-green-600 text-white"
                        : "bg-white text-slate-400 border-2 border-slate-200"
                  }`}
              >
                {isCompleted ? <CheckIcon className="w-5 h-5" /> : <span>{index + 1}</span>}
              </div>
              <span
                className={`mt-2 text-xs font-medium transition-colors duration-300
                  ${isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-slate-400"}`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )

  // Render the selection step (first step)
  const renderSelectionStep = () => (
    <div
      className={`transition-all duration-500 transform ${animateIn ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
    >
      <div className="space-y-6">
        {/* Prefilled Data Summary - Compact and Informative */}
        {(mode === "instructor-first" || mode === "template-first") && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center gap-4">
              {mode === "instructor-first" && prefilled?.instructor && (
                <>
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                    <AvatarImage
                      src={prefilled.instructor.avatar || "/placeholder.svg"}
                      alt={prefilled.instructor.name}
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      {prefilled.instructor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-blue-900">{prefilled.instructor.name}</h3>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                        Instructor
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-700">{prefilled.instructor.specialty}</p>
                  </div>
                </>
              )}

              {mode === "template-first" && prefilled?.template && (
                <>
                  <div className="h-12 w-12 rounded-md overflow-hidden shadow-sm border-2 border-white">
                    <img
                      src={prefilled.template.image || "/placeholder.svg"}
                      alt={prefilled.template.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-blue-900">{prefilled.template.title}</h3>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                        Template
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <span>{prefilled.template.duration}h</span>
                      <span>•</span>
                      <span>{prefilled.template.difficulty}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Template Selection */}
        {(mode === "blank" || mode === "instructor-first") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-slate-900">Select Template</h3>
              {formErrors.template && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertTriangleIcon className="w-4 h-4 mr-1" />
                  {formErrors.template}
                </p>
              )}
            </div>

            <RadioGroup
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
              className="grid gap-4 md:grid-cols-2"
            >
              {sampleTemplates.map((tmpl) => (
                <div key={tmpl.id} className="relative">
                  <RadioGroupItem value={tmpl.id} id={`template-${tmpl.id}`} className="peer sr-only" />
                  <Label
                    htmlFor={`template-${tmpl.id}`}
                    className="flex flex-col h-full cursor-pointer overflow-hidden rounded-xl border-2 bg-white p-0 hover:border-blue-200 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-blue-500 transition-all"
                  >
                    <div className="h-32 w-full overflow-hidden">
                      <img
                        src={tmpl.image || "/placeholder.svg"}
                        alt={tmpl.title}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-slate-900">{tmpl.title}</h4>
                          <p className="text-sm text-slate-500">{tmpl.titleJp}</p>
                        </div>
                        <Badge
                          className={`${tmpl.difficulty === "Beginner" ? "bg-green-100 text-green-800" : tmpl.difficulty === "Intermediate" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
                        >
                          {tmpl.difficulty}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-sm text-slate-600">
                        <div className="flex items-center">
                          <ClockIcon className="w-3.5 h-3.5 mr-1" />
                          <span>{tmpl.duration}h</span>
                        </div>
                        <div className="flex items-center">
                          <PaletteIcon className="w-3.5 h-3.5 mr-1" />
                          <span>{tmpl.category}</span>
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-slate-500 line-clamp-2">{tmpl.description}</p>
                    </div>
                  </Label>
                  {selectedTemplate === tmpl.id && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <CheckIcon className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Instructor Selection */}
        {(mode === "blank" || mode === "template-first") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-slate-900">Select Instructor</h3>
              {formErrors.instructor && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertTriangleIcon className="w-4 h-4 mr-1" />
                  {formErrors.instructor}
                </p>
              )}
            </div>

            <RadioGroup
              value={selectedInstructor}
              onValueChange={setSelectedInstructor}
              className="grid gap-4 md:grid-cols-2"
            >
              {sampleInstructors.map((inst) => (
                <div key={inst.id} className="relative">
                  <RadioGroupItem value={inst.id} id={`instructor-${inst.id}`} className="peer sr-only" />
                  <Label
                    htmlFor={`instructor-${inst.id}`}
                    className="flex h-full cursor-pointer overflow-hidden rounded-xl border-2 bg-white p-4 hover:border-blue-200 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-blue-500 transition-all"
                  >
                    <div className="flex items-start gap-4 w-full">
                      <Avatar className="h-16 w-16 border-2 border-slate-100">
                        <AvatarImage src={inst.avatar || "/placeholder.svg"} alt={inst.name} />
                        <AvatarFallback className="bg-slate-100 text-slate-800">{inst.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">{inst.name}</h4>
                        <p className="text-sm text-slate-500">{inst.nameJp}</p>
                        <p className="mt-1 text-sm font-medium text-slate-700">{inst.specialty}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {inst.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="text-xs bg-slate-50">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Label>
                  {selectedInstructor === inst.id && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <CheckIcon className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      </div>
    </div>
  )

  // Render the schedule step (second step)
  const renderScheduleStep = () => (
    <div
      className={`transition-all duration-500 transform ${animateIn ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
    >
      <div className="space-y-6">
        {/* Selection Summary */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
          <div className="flex flex-wrap gap-4 items-center">
            {template && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md overflow-hidden bg-white border border-slate-200">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{template.title}</p>
                  <p className="text-xs text-slate-500">
                    {template.duration}h • {template.difficulty}
                  </p>
                </div>
              </div>
            )}

            <Separator orientation="vertical" className="h-8 hidden sm:block" />

            {instructor && (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={instructor.avatar || "/placeholder.svg"} alt={instructor.name} />
                  <AvatarFallback>{instructor.initials}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium text-slate-900">{instructor.name}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Date & Time Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-900">Date & Time</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="event-date" className="text-sm text-slate-700">
                  Event Date
                </Label>
                <div className="relative">
                  <Input
                    id="event-date"
                    type="date"
                    value={format(eventDate, "yyyy-MM-dd")}
                    onChange={(e) => setEventDate(new Date(e.target.value))}
                    className="pl-10"
                  />
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="start-time" className="text-sm text-slate-700">
                  Start Time
                </Label>
                <div className="relative">
                  <Select value={startHour.toString()} onValueChange={(value) => setStartHour(Number.parseInt(value))}>
                    <SelectTrigger className="pl-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 9).map((hour) => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {formatTime(hour)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                </div>
              </div>

              {template && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800">
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-2 text-blue-600" />
                    <div>
                      <p className="font-medium">Duration: {template.duration} hours</p>
                      <p className="text-xs mt-0.5">
                        {formatTime(startHour)} - {formatTime(endHour)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-slate-900">Location</h3>
              {formErrors.location && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertTriangleIcon className="w-4 h-4 mr-1" />
                  {formErrors.location}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select studio location" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleLocations.map((loc) => (
                      <SelectItem key={loc.id} value={loc.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{loc.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {loc.capacity} capacity
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <BuildingIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              </div>

              {location && (
                <Card className="overflow-hidden">
                  <div className="h-24 bg-slate-100">
                    <img
                      src={`/placeholder.svg?height=100&width=400&query=${location.name} studio`}
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="w-4 h-4 text-slate-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-900">{location.name}</p>
                        <p className="text-xs text-slate-500">{location.nameJp}</p>
                        <p className="text-sm text-slate-600 mt-1">{location.address}</p>
                        <div className="mt-2 flex items-center">
                          <UsersIcon className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                          <span className="text-xs text-slate-600">Maximum capacity: {location.capacity}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Render the details step (third step)
  const renderDetailsStep = () => (
    <div
      className={`transition-all duration-500 transform ${animateIn ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
    >
      <div className="space-y-6">
        {/* Event Summary */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
          <div className="flex flex-wrap gap-4 items-center">
            {template && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md overflow-hidden bg-white border border-slate-200">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{template.title}</p>
                  <p className="text-xs text-slate-500">
                    {template.duration}h • {template.difficulty}
                  </p>
                </div>
              </div>
            )}

            <Separator orientation="vertical" className="h-8 hidden sm:block" />

            {instructor && (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={instructor.avatar || "/placeholder.svg"} alt={instructor.name} />
                  <AvatarFallback>{instructor.initials}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium text-slate-900">{instructor.name}</p>
              </div>
            )}

            <Separator orientation="vertical" className="h-8 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-md border border-slate-200">
                <CalendarIcon className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{format(eventDate, "MMM d, yyyy")}</p>
                <p className="text-xs text-slate-500">
                  {formatTime(startHour)} - {formatTime(endHour)}
                </p>
              </div>
            </div>

            <Separator orientation="vertical" className="h-8 hidden sm:block" />

            {location && (
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-md border border-slate-200">
                  <MapPinIcon className="w-5 h-5 text-slate-600" />
                </div>
                <p className="text-sm font-medium text-slate-900">{location.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Options */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Capacity & Pricing */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-slate-900">Capacity & Pricing</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <InfoIcon className="h-4 w-4 text-slate-500" />
                        <span className="sr-only">Pricing information</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Standard pricing is ¥4,400 per participant. Special pricing can be set in the notes.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="capacity" className="text-sm text-slate-700">
                      Event Capacity
                    </Label>
                    {formErrors.capacity && <p className="text-xs text-red-500">{formErrors.capacity}</p>}
                  </div>
                  <div className="relative">
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      max={location?.capacity || 20}
                      value={capacity}
                      onChange={(e) => setCapacity(Number.parseInt(e.target.value) || 1)}
                      className="pl-10"
                    />
                    <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Maximum allowed: {location?.capacity || 20} (studio capacity)
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Price per participant</span>
                    <span className="font-medium">¥4,400</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Total potential revenue</span>
                    <span className="font-medium text-green-600">¥{(capacity * 4400).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Materials & Requirements */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-medium text-slate-900">Materials & Requirements</h3>

              {template && (
                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Included Materials</h4>
                    <div className="grid gap-2">
                      {template.materials.map((material, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-slate-600">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="special-notes" className="text-sm text-slate-700">
                      Special Notes (Optional)
                    </Label>
                    <Textarea
                      id="special-notes"
                      placeholder="Any special requirements, materials, or instructions..."
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Schedule Conflict Check */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900">Schedule Check</h4>
              <p className="text-sm text-green-700 mt-1">
                No conflicts detected for {instructor?.name} on {format(eventDate, "MMMM d, yyyy")} at{" "}
                {formatTime(startHour)}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Render the confirmation step (final step)
  const renderConfirmationStep = () => (
    <div
      className={`transition-all duration-500 transform ${animateIn ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
    >
      <div className="space-y-6">
        {/* Event Summary Card */}
        <Card className="overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
            {template && (
              <img
                src={template.image || "/placeholder.svg"}
                alt={template.title}
                className="w-full h-full object-cover opacity-20"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold">{template?.title}</h2>
                <p className="text-blue-100 mt-1">{template?.titleJp}</p>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Date & Time</p>
                    <p className="font-medium text-slate-900">{format(eventDate, "EEEE, MMMM d, yyyy")}</p>
                    <p className="text-sm text-slate-700">
                      {formatTime(startHour)} - {formatTime(endHour)} ({template?.duration} hours)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <MapPinIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="font-medium text-slate-900">{location?.name}</p>
                    <p className="text-sm text-slate-700">{location?.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <UsersIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Capacity & Revenue</p>
                    <p className="font-medium text-slate-900">{capacity} participants</p>
                    <p className="text-sm text-green-600">¥{(capacity * 4400).toLocaleString()} potential revenue</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={instructor?.avatar || "/placeholder.svg"} alt={instructor?.name} />
                    <AvatarFallback>{instructor?.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-slate-500">Instructor</p>
                    <p className="font-medium text-slate-900">{instructor?.name}</p>
                    <p className="text-sm text-slate-700">{instructor?.specialty}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-2">Materials Included</p>
                  <div className="bg-slate-50 rounded-lg p-3 space-y-1.5">
                    {template?.materials.map((material, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckIcon className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-sm text-slate-700">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {specialNotes && (
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Special Notes</p>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-sm text-slate-700">{specialNotes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Confirmation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Ready to Schedule</h4>
              <p className="text-sm text-blue-700 mt-1">
                Please review all details above before confirming. Once scheduled, the event will be visible to staff
                and available for booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!isSubmitting) {
          onOpenChange(open)
        }
      }}
    >
      <DialogContent className="sm:max-w-4xl h-[90vh] flex flex-col font-sans p-0">
        <DialogHeader className="p-6 border-b bg-gradient-to-r from-slate-50 to-slate-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-900">{getStepTitle()}</DialogTitle>
              <p className="text-slate-500 mt-1">{getStepDescription()}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <StepIndicator />

          {currentStep === "selection" && renderSelectionStep()}
          {currentStep === "schedule" && renderScheduleStep()}
          {currentStep === "details" && renderDetailsStep()}
          {currentStep === "confirmation" && renderConfirmationStep()}
        </div>

        <DialogFooter className="p-6 border-t bg-gradient-to-r from-slate-50 to-slate-100 flex justify-between flex-shrink-0">
          <Button
            variant="outline"
            onClick={currentStep === "selection" ? () => onOpenChange(false) : handleBack}
            disabled={isSubmitting}
            className="gap-2"
          >
            {currentStep === "selection" ? "Cancel" : "Back"}
          </Button>

          <div className="flex gap-2">
            {currentStep !== "confirmation" && (
              <Button onClick={handleNext} disabled={!canProceedToNext() || isSubmitting} className="gap-2">
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            )}

            {currentStep === "confirmation" && (
              <Button
                onClick={handleSchedule}
                className="bg-green-600 hover:bg-green-700 gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    Schedule Workshop
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
