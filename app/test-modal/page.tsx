"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircleIcon, TestTubeIcon } from "lucide-react"
import { CreateEventModal } from "@/components/create-event-modal"
import type { UnifiedTemplate, UnifiedInstructor, UnifiedLocation, UnifiedEvent } from "@/lib/unified-types"

// Sample prefilled data for testing
const testInstructor: UnifiedInstructor = {
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
}

const testTemplate: UnifiedTemplate = {
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
}

const testLocation: UnifiedLocation = {
  id: "ginza-studio",
  name: "Artbar Ginza",
  nameJp: "アートバー銀座",
  address: "1-2-3 Ginza, Chuo-ku, Tokyo",
  addressJp: "東京都中央区銀座1-2-3",
  capacity: 20,
  isActive: true,
}

export default function TestModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"instructor-first" | "template-first" | "blank">("blank")
  const [prefilledData, setPrefilledData] = useState<any>({})
  const [lastScheduledEvent, setLastScheduledEvent] = useState<UnifiedEvent | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleOpenModal = (mode: "instructor-first" | "template-first" | "blank") => {
    setModalMode(mode)

    // Set prefilled data based on mode
    switch (mode) {
      case "instructor-first":
        setPrefilledData({
          instructor: testInstructor,
          timeSlot: {
            date: new Date(),
            startHour: 14,
            endHour: 16,
          },
          location: testLocation,
        })
        break
      case "template-first":
        setPrefilledData({
          template: testTemplate,
          timeSlot: {
            date: new Date(),
            startHour: 15,
            endHour: 17,
          },
          location: testLocation,
        })
        break
      case "blank":
        setPrefilledData({})
        break
    }

    setIsModalOpen(true)
  }

  const handleScheduleEvent = (eventData: UnifiedEvent) => {
    console.log("Event scheduled:", eventData)
    setLastScheduledEvent(eventData)
    setShowSuccess(true)

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <TestTubeIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">Modal Testing</h1>
          </div>
          <p className="text-lg text-slate-600">Test the CreateEventModal component in different modes</p>
        </div>

        {/* Success Message */}
        {showSuccess && lastScheduledEvent && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <CheckCircleIcon className="w-6 h-6 text-green-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Event Successfully Scheduled!</h3>
                  <div className="space-y-2 text-sm text-green-800">
                    <p>
                      <strong>Template:</strong> {lastScheduledEvent.template.title}
                    </p>
                    <p>
                      <strong>Instructor:</strong> {lastScheduledEvent.instructor.name}
                    </p>
                    <p>
                      <strong>Location:</strong> {lastScheduledEvent.location.name}
                    </p>
                    <p>
                      <strong>Time:</strong> {lastScheduledEvent.startTime.toLocaleString()}
                    </p>
                    <p>
                      <strong>Capacity:</strong> {lastScheduledEvent.capacity} participants
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Test Buttons */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Blank Mode */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Blank Mode</CardTitle>
              <p className="text-slate-600">Start from scratch</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                  <TestTubeIcon className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-sm text-slate-600">No prefilled data. User selects everything from scratch.</p>
              </div>
              <Button onClick={() => handleOpenModal("blank")} className="w-full" size="lg">
                Test Blank Mode
              </Button>
            </CardContent>
          </Card>

          {/* Instructor Mode */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Instructor Mode</CardTitle>
              <p className="text-slate-600">Instructor pre-selected</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-3">
                <Avatar className="w-16 h-16 mx-auto">
                  <AvatarImage src={testInstructor.avatar || "/placeholder.svg"} alt={testInstructor.name} />
                  <AvatarFallback className="text-lg">{testInstructor.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testInstructor.name}</p>
                  <p className="text-sm text-slate-600">{testInstructor.specialty}</p>
                  <Badge variant="outline" className="mt-1">
                    Prefilled
                  </Badge>
                </div>
              </div>
              <Button onClick={() => handleOpenModal("instructor-first")} className="w-full" size="lg">
                Test Instructor Mode
              </Button>
            </CardContent>
          </Card>

          {/* Template Mode */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Template Mode</CardTitle>
              <p className="text-slate-600">Template pre-selected</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-lg bg-blue-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={testTemplate.image || "/placeholder.svg"}
                    alt={testTemplate.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{testTemplate.title}</p>
                  <p className="text-sm text-slate-600">{testTemplate.titleJp}</p>
                  <div className="flex justify-center gap-1 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {testTemplate.duration}h
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {testTemplate.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button onClick={() => handleOpenModal("template-first")} className="w-full" size="lg">
                Test Template Mode
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Testing Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Blank Mode</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Select template manually</li>
                  <li>• Choose instructor</li>
                  <li>• Pick date, time & location</li>
                  <li>• Set capacity & notes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-900 mb-2">Instructor Mode</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Yuki Tanaka pre-selected</li>
                  <li>• Choose template for her</li>
                  <li>• Time slot suggested</li>
                  <li>• Location pre-filled</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-900 mb-2">Template Mode</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Monet template pre-selected</li>
                  <li>• Choose suitable instructor</li>
                  <li>• Duration auto-calculated</li>
                  <li>• Materials pre-listed</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Debug Info */}
        {lastScheduledEvent && (
          <Card className="bg-slate-100">
            <CardHeader>
              <CardTitle className="text-lg">Last Event Data (Debug)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-slate-700 overflow-x-auto">
                {JSON.stringify(lastScheduledEvent, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal */}
      <CreateEventModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        mode={modalMode}
        prefilled={prefilledData}
        onSchedule={handleScheduleEvent}
      />
    </div>
  )
}
