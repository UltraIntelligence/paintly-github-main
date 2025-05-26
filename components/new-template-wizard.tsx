"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRightIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NewTemplateWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewTemplateWizard({ open, onOpenChange }: NewTemplateWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    nameJapanese: "",
    nameEnglish: "",
    category: "",
    descriptionJapanese: "",
    descriptionEnglish: "",
    duration: "",
    difficulty: "",
    canvasSize: "",
    maxParticipants: "",
    whatsIncluded: "",
    ticketPrices: [{ type: "adult", amount: "" }],
    specialMaterials: "",
    image: null as File | null,
  })

  const steps = [
    { number: 1, title: "Basic Info", completed: currentStep > 1 },
    { number: 2, title: "Class Details", completed: currentStep > 2 },
    { number: 3, title: "Materials", completed: currentStep > 3 },
    { number: 4, title: "Review", completed: false },
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      // Handle form submission
      console.log("Creating template with data:", formData)
      onOpenChange(false)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCancel = () => {
    setCurrentStep(1)
    setFormData({
      nameJapanese: "",
      nameEnglish: "",
      category: "",
      descriptionJapanese: "",
      descriptionEnglish: "",
      duration: "",
      difficulty: "",
      canvasSize: "",
      maxParticipants: "",
      whatsIncluded: "",
      ticketPrices: [{ type: "adult", amount: "" }],
      specialMaterials: "",
      image: null,
    })
    onOpenChange(false)
  }

  const updateFormData = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const goToStep = (stepNumber: number) => {
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber)
    }
  }

  const addTicketPrice = () => {
    setFormData((prev) => ({
      ...prev,
      ticketPrices: [...prev.ticketPrices, { type: "", amount: "" }],
    }))
  }

  const removeTicketPrice = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ticketPrices: prev.ticketPrices.filter((_, i) => i !== index),
    }))
  }

  const updateTicketPrice = (index: number, field: "type" | "amount", value: string) => {
    setFormData((prev) => ({
      ...prev,
      ticketPrices: prev.ticketPrices.map((price, i) => (i === index ? { ...price, [field]: value } : price)),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full p-6 sm:p-8">
        <DialogHeader className="space-y-3 mb-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center space-x-2 text-sm">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <button
                  onClick={() => goToStep(step.number)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    step.number === currentStep
                      ? "bg-blue-500 text-white font-medium"
                      : step.completed
                        ? "text-blue-600 hover:bg-blue-50 cursor-pointer"
                        : "text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={step.number > currentStep}
                >
                  {step.title}
                </button>
                {index < steps.length - 1 && <ChevronRightIcon className="w-4 h-4 mx-2 text-gray-400" />}
              </div>
            ))}
          </div>
        </DialogHeader>

        <Card className="border-2 border-gray-200 bg-white min-h-[500px] h-[500px]">
          <CardContent className="p-6 h-full overflow-y-auto">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nameJapanese" className="text-sm font-medium text-gray-700">
                    Template Name (Japanese)
                  </Label>
                  <Input
                    id="nameJapanese"
                    value={formData.nameJapanese}
                    onChange={(e) => updateFormData("nameJapanese", e.target.value)}
                    placeholder="テンプレート名を入力してください"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nameEnglish" className="text-sm font-medium text-gray-700">
                    Template Name (English)
                  </Label>
                  <Input
                    id="nameEnglish"
                    value={formData.nameEnglish}
                    onChange={(e) => updateFormData("nameEnglish", e.target.value)}
                    placeholder="Enter template name"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Category
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="kids-only">Kids Only</SelectItem>
                      <SelectItem value="master-artists">Master Artists</SelectItem>
                      <SelectItem value="paint-pouring">Paint Pouring</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Brief Description</Label>
                  <Tabs defaultValue="japanese" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="japanese">Japanese</TabsTrigger>
                      <TabsTrigger value="english">English</TabsTrigger>
                    </TabsList>
                    <TabsContent value="japanese" className="mt-2">
                      <Textarea
                        value={formData.descriptionJapanese}
                        onChange={(e) => updateFormData("descriptionJapanese", e.target.value)}
                        placeholder="テンプレートの特徴を説明してください..."
                        className="w-full min-h-[100px]"
                      />
                    </TabsContent>
                    <TabsContent value="english" className="mt-2">
                      <Textarea
                        value={formData.descriptionEnglish}
                        onChange={(e) => updateFormData("descriptionEnglish", e.target.value)}
                        placeholder="Describe what makes this template special..."
                        className="w-full min-h-[100px]"
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
                    Duration
                  </Label>
                  <Select value={formData.duration} onValueChange={(value) => updateFormData("duration", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select class duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-hour">1 hour</SelectItem>
                      <SelectItem value="1.5-hours">1.5 hours</SelectItem>
                      <SelectItem value="2-hours">2 hours</SelectItem>
                      <SelectItem value="2.5-hours">2.5 hours</SelectItem>
                      <SelectItem value="3-hours">3 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="text-sm font-medium text-gray-700">
                    Difficulty Level
                  </Label>
                  <Select value={formData.difficulty} onValueChange={(value) => updateFormData("difficulty", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="kids">Kids</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="canvasSize" className="text-sm font-medium text-gray-700">
                    Canvas Size
                  </Label>
                  <Select value={formData.canvasSize} onValueChange={(value) => updateFormData("canvasSize", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select canvas size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="f6">F6</SelectItem>
                      <SelectItem value="f10">F10</SelectItem>
                      <SelectItem value="f12">F12</SelectItem>
                      <SelectItem value="30cm-round">30cm Round</SelectItem>
                      <SelectItem value="40cm-round">40cm Round</SelectItem>
                      <SelectItem value="25cm-round">25cm Round</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants" className="text-sm font-medium text-gray-700">
                    Max Participants
                  </Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => updateFormData("maxParticipants", e.target.value)}
                    placeholder="Enter maximum number of participants"
                    className="w-full"
                    min="1"
                    max="50"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="whatsIncluded" className="text-sm font-medium text-gray-700">
                    What's Included
                  </Label>
                  <Textarea
                    id="whatsIncluded"
                    value={formData.whatsIncluded}
                    onChange={(e) => updateFormData("whatsIncluded", e.target.value)}
                    placeholder="List all materials provided (canvas, paints, brushes, etc.)"
                    className="w-full min-h-[100px]"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">Default Ticket Prices</Label>

                  {formData.ticketPrices.map((price, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
                      <Select value={price.type} onValueChange={(value) => updateTicketPrice(index, "type", value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adult">Adult</SelectItem>
                          <SelectItem value="kids">Kids</SelectItem>
                          <SelectItem value="seniors">Seniors</SelectItem>
                          <SelectItem value="students">Students</SelectItem>
                          <SelectItem value="special">Special</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
                        <Input
                          type="number"
                          value={price.amount}
                          onChange={(e) => updateTicketPrice(index, "amount", e.target.value)}
                          placeholder="0"
                          className="pl-8"
                        />
                      </div>

                      {formData.ticketPrices.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTicketPrice(index)}
                          className="px-2"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button type="button" variant="outline" onClick={addTicketPrice} className="w-full">
                    Add Another Price
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialMaterials" className="text-sm font-medium text-gray-700">
                    Special Materials (Optional)
                  </Label>
                  <Textarea
                    id="specialMaterials"
                    value={formData.specialMaterials}
                    onChange={(e) => updateFormData("specialMaterials", e.target.value)}
                    placeholder="Any unique supplies or special materials for this template..."
                    className="w-full min-h-[80px]"
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="image" className="text-sm font-medium text-gray-700">
                    Template Image
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => updateFormData("image", e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Label htmlFor="image" className="cursor-pointer">
                      <div className="space-y-2">
                        <div className="text-gray-500">Click to upload template image</div>
                        <div className="text-xs text-gray-400">PNG, JPG up to 10MB</div>
                      </div>
                    </Label>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900">Review Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {formData.nameEnglish || "Not set"}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {formData.category || "Not set"}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {formData.duration || "Not set"}
                    </div>
                    <div>
                      <span className="font-medium">Difficulty:</span> {formData.difficulty || "Not set"}
                    </div>
                    <div>
                      <span className="font-medium">Canvas:</span> {formData.canvasSize || "Not set"}
                    </div>
                    <div>
                      <span className="font-medium">Max Participants:</span> {formData.maxParticipants || "Not set"}
                    </div>
                    <div>
                      <span className="font-medium">Ticket Prices:</span>
                      {formData.ticketPrices.map((price, index) => (
                        <span key={index}>
                          {price.type ? `${price.type}: ¥${price.amount || "0"}` : "Not set"}
                          {index < formData.ticketPrices.length - 1 ? ", " : ""}
                        </span>
                      )) || "Not set"}
                    </div>
                  </div>
                </div>

                <div className="text-center py-4">
                  <div className="text-green-600 font-medium">Template is ready to schedule</div>
                  <div className="text-sm text-gray-600 mt-1">
                    You can start scheduling events with this template once created
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <DialogFooter className="flex gap-3 pt-6">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack} className="px-6">
              Back
            </Button>
          )}
          <Button variant="outline" onClick={handleCancel} className="px-6">
            Cancel
          </Button>
          <Button onClick={handleNext} className="px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium">
            {currentStep === 4 ? "Create Template" : "Next Step"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
