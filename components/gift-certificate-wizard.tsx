"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ChevronLeft, ChevronRight, Check, Gift, User, CreditCard, FileText, QrCode } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { generateCertificateCode, generateQRCodeUrl } from "@/lib/certificate-utils"

interface GiftCertificateWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface CertificateData {
  // Step 1: Certificate Type
  type: string
  value: string
  customValue?: string

  // Step 2: Customer Information
  customerName: string
  customerEmail: string
  customerPhone: string
  recipientName?: string
  recipientEmail?: string
  isGift: boolean

  // Step 3: Certificate Details
  title: string
  description: string
  expiryDate: Date | undefined
  specialInstructions: string

  // Step 4: Design & Delivery
  design: string
  deliveryMethod: string
  deliveryDate: Date | undefined
  personalMessage: string

  // Generated fields
  certificateCode?: string
  qrCodeUrl?: string
}

const certificateTypes = [
  {
    id: "standard",
    name: "Standard Certificate",
    description: "Perfect for individual experiences",
    values: ["¥3,000", "¥5,000", "¥8,000", "Custom"],
    image: "/placeholder.svg?height=120&width=200&text=Standard",
  },
  {
    id: "premium",
    name: "Premium Certificate",
    description: "Enhanced experience with premium materials",
    values: ["¥10,000", "¥15,000", "¥20,000", "Custom"],
    image: "/placeholder.svg?height=120&width=200&text=Premium",
  },
  {
    id: "group",
    name: "Group Certificate",
    description: "Perfect for groups of 4-8 people",
    values: ["¥25,000", "¥35,000", "¥50,000", "Custom"],
    image: "/placeholder.svg?height=120&width=200&text=Group",
  },
  {
    id: "corporate",
    name: "Corporate Package",
    description: "Ideal for employee rewards and team building",
    values: ["¥50,000", "¥100,000", "¥200,000", "Custom"],
    image: "/placeholder.svg?height=120&width=200&text=Corporate",
  },
]

const designTemplates = [
  {
    id: "classic",
    name: "Classic Elegance",
    description: "Timeless design with gold accents",
    image: "/placeholder.svg?height=120&width=200&text=Classic",
  },
  {
    id: "modern",
    name: "Modern Minimalist",
    description: "Clean, contemporary design",
    image: "/placeholder.svg?height=120&width=200&text=Modern",
  },
  {
    id: "festive",
    name: "Festive Holiday",
    description: "Perfect for holiday gifting",
    image: "/placeholder.svg?height=120&width=200&text=Festive",
  },
  {
    id: "birthday",
    name: "Birthday Special",
    description: "Colorful design for birthdays",
    image: "/placeholder.svg?height=120&width=200&text=Birthday",
  },
]

export function GiftCertificateWizard({ open, onOpenChange }: GiftCertificateWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [certificateData, setCertificateData] = useState<CertificateData>({
    type: "",
    value: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    isGift: false,
    title: "",
    description: "",
    expiryDate: undefined,
    specialInstructions: "",
    design: "",
    deliveryMethod: "email",
    deliveryDate: undefined,
    personalMessage: "",
  })

  const steps = [
    { number: 1, title: "Certificate Type", icon: Gift },
    { number: 2, title: "Customer Info", icon: User },
    { number: 3, title: "Certificate Details", icon: FileText },
    { number: 4, title: "Design & Delivery", icon: CreditCard },
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = () => {
    // Generate unique certificate code and QR code
    const certificateCode = generateCertificateCode()
    const qrCodeUrl = generateQRCodeUrl(certificateCode)

    const finalCertificateData = {
      ...certificateData,
      certificateCode,
      qrCodeUrl,
    }

    console.log("Certificate data:", finalCertificateData)
    onOpenChange(false)
    setCurrentStep(1)
    setCertificateData({
      type: "",
      value: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      isGift: false,
      title: "",
      description: "",
      expiryDate: undefined,
      specialInstructions: "",
      design: "",
      deliveryMethod: "email",
      deliveryDate: undefined,
      personalMessage: "",
    })
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return certificateData.type && certificateData.value
      case 2:
        return certificateData.customerName && certificateData.customerEmail
      case 3:
        return certificateData.title && certificateData.expiryDate
      case 4:
        return certificateData.design && certificateData.deliveryMethod
      default:
        return false
    }
  }

  const selectedType = certificateTypes.find((type) => type.id === certificateData.type)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Create Gift Certificate</DialogTitle>
          <DialogDescription>Follow these steps to create a new gift certificate for your customer.</DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                  currentStep >= step.number
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "border-gray-300 text-gray-500",
                )}
              >
                {currentStep > step.number ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <div className="ml-3">
                <p
                  className={cn("text-sm font-medium", currentStep >= step.number ? "text-blue-600" : "text-gray-500")}
                >
                  Step {step.number}
                </p>
                <p className={cn("text-xs", currentStep >= step.number ? "text-blue-600" : "text-gray-500")}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={cn("w-16 h-0.5 mx-4", currentStep > step.number ? "bg-blue-500" : "bg-gray-300")} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {/* Step 1: Certificate Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Choose Certificate Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificateTypes.map((type) => (
                    <Card
                      key={type.id}
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-md",
                        certificateData.type === type.id ? "ring-2 ring-blue-500 bg-blue-50" : "",
                      )}
                      onClick={() => setCertificateData({ ...certificateData, type: type.id, value: "" })}
                    >
                      <CardHeader className="pb-3">
                        <div className="aspect-[5/3] overflow-hidden rounded-md mb-3">
                          <img
                            src={type.image || "/placeholder.svg"}
                            alt={type.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <CardTitle className="text-base">{type.name}</CardTitle>
                        <CardDescription className="text-sm">{type.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              {certificateData.type && selectedType && (
                <div>
                  <h4 className="text-md font-medium mb-3">Select Value</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedType.values.map((value) => (
                      <Button
                        key={value}
                        variant={certificateData.value === value ? "default" : "outline"}
                        className="h-12"
                        onClick={() => setCertificateData({ ...certificateData, value })}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                  {certificateData.value === "Custom" && (
                    <div className="mt-4">
                      <Label htmlFor="customValue">Custom Amount (¥)</Label>
                      <Input
                        id="customValue"
                        placeholder="Enter custom amount"
                        value={certificateData.customValue || ""}
                        onChange={(e) => setCertificateData({ ...certificateData, customValue: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Customer Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      placeholder="Enter customer name"
                      value={certificateData.customerName}
                      onChange={(e) => setCertificateData({ ...certificateData, customerName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Customer Email *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder="Enter customer email"
                      value={certificateData.customerEmail}
                      onChange={(e) => setCertificateData({ ...certificateData, customerEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Customer Phone</Label>
                    <Input
                      id="customerPhone"
                      placeholder="Enter customer phone"
                      value={certificateData.customerPhone}
                      onChange={(e) => setCertificateData({ ...certificateData, customerPhone: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isGift"
                      checked={certificateData.isGift}
                      onChange={(e) => setCertificateData({ ...certificateData, isGift: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="isGift">This is a gift for someone else</Label>
                  </div>
                </div>
              </div>

              {certificateData.isGift && (
                <div>
                  <h4 className="text-md font-medium mb-3">Recipient Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="recipientName">Recipient Name</Label>
                      <Input
                        id="recipientName"
                        placeholder="Enter recipient name"
                        value={certificateData.recipientName || ""}
                        onChange={(e) => setCertificateData({ ...certificateData, recipientName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="recipientEmail">Recipient Email</Label>
                      <Input
                        id="recipientEmail"
                        type="email"
                        placeholder="Enter recipient email"
                        value={certificateData.recipientEmail || ""}
                        onChange={(e) => setCertificateData({ ...certificateData, recipientEmail: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Certificate Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Certificate Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Certificate Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter certificate title"
                      value={certificateData.title}
                      onChange={(e) => setCertificateData({ ...certificateData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter certificate description"
                      value={certificateData.description}
                      onChange={(e) => setCertificateData({ ...certificateData, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Expiry Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !certificateData.expiryDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {certificateData.expiryDate ? format(certificateData.expiryDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={certificateData.expiryDate}
                            onSelect={(date) => setCertificateData({ ...certificateData, expiryDate: date })}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      placeholder="Any special instructions or notes"
                      value={certificateData.specialInstructions}
                      onChange={(e) => setCertificateData({ ...certificateData, specialInstructions: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Design & Delivery */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Design & Delivery</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium mb-3">Choose Design Template</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {designTemplates.map((design) => (
                        <Card
                          key={design.id}
                          className={cn(
                            "cursor-pointer transition-all hover:shadow-md",
                            certificateData.design === design.id ? "ring-2 ring-blue-500 bg-blue-50" : "",
                          )}
                          onClick={() => setCertificateData({ ...certificateData, design: design.id })}
                        >
                          <CardHeader className="pb-3">
                            <div className="aspect-[5/3] overflow-hidden rounded-md mb-3">
                              <img
                                src={design.image || "/placeholder.svg"}
                                alt={design.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <CardTitle className="text-base">{design.name}</CardTitle>
                            <CardDescription className="text-sm">{design.description}</CardDescription>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deliveryMethod">Delivery Method</Label>
                      <Select
                        value={certificateData.deliveryMethod}
                        onValueChange={(value) => setCertificateData({ ...certificateData, deliveryMethod: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select delivery method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email Delivery</SelectItem>
                          <SelectItem value="print">Print & Pickup</SelectItem>
                          <SelectItem value="mail">Physical Mail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Delivery Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !certificateData.deliveryDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {certificateData.deliveryDate ? format(certificateData.deliveryDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={certificateData.deliveryDate}
                            onSelect={(date) => setCertificateData({ ...certificateData, deliveryDate: date })}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="personalMessage">Personal Message</Label>
                    <Textarea
                      id="personalMessage"
                      placeholder="Add a personal message to the certificate"
                      value={certificateData.personalMessage}
                      onChange={(e) => setCertificateData({ ...certificateData, personalMessage: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Certificate Preview */}
              <div>
                <h4 className="text-md font-medium mb-3">Certificate Preview</h4>
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800">{certificateData.title || "Certificate Title"}</h3>
                    <p className="text-lg text-gray-600">
                      {certificateData.description || "Certificate description will appear here"}
                    </p>
                    <div className="text-3xl font-bold text-blue-600">
                      {certificateData.value === "Custom"
                        ? `¥${certificateData.customValue || "0"}`
                        : certificateData.value || "¥0"}
                    </div>
                    <Badge variant="outline" className="text-sm">
                      Expires:{" "}
                      {certificateData.expiryDate ? format(certificateData.expiryDate, "PPP") : "No expiry date set"}
                    </Badge>
                    {certificateData.personalMessage && (
                      <p className="text-sm italic text-gray-600 mt-4">"{certificateData.personalMessage}"</p>
                    )}

                    {/* QR Code and Certificate Code Preview */}
                    <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-2">
                          <QrCode className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500">QR Code</p>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-sm bg-white px-3 py-2 rounded border">ART-XXXX-XXXX</div>
                        <p className="text-xs text-gray-500 mt-1">Certificate Code</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {currentStep < 4 ? (
              <Button onClick={handleNext} disabled={!isStepValid()} className="flex items-center">
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleFinish} disabled={!isStepValid()} className="flex items-center">
                <Check className="w-4 h-4 mr-2" />
                Create Certificate
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
