"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckIcon, Clock, Users, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ImageIcon } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Template name must be at least 2 characters.",
  }),
  eventType: z.string({
    required_error: "Please select an event type.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  audience: z.string({
    required_error: "Please select a target audience.",
  }),
  featuredImage: z.string().optional(),
  companyLogo: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
  duration: z.number().min(1).max(8),
  minParticipants: z.number().min(5).max(50),
  maxParticipants: z.number().min(5).max(100),
  objectives: z.array(z.string()).min(1, {
    message: "Select at least one objective.",
  }),
  setupRequirements: z.string(),
  activities: z.array(z.string()).min(1, {
    message: "Select at least one activity.",
  }),
  materials: z.array(z.string()).min(1, {
    message: "Select at least one material.",
  }),
  deliverables: z.string(),
  pricingModel: z.enum(["fixed", "perPerson", "tiered"]),
  basePrice: z.number().min(0),
  perPersonPrice: z.number().min(0),
  timeline: z.array(
    z.object({
      phase: z.string(),
      duration: z.string(),
    }),
  ),
  notes: z.string().optional(),
  eventDate: z.string(),
  eventTime: z.string(),
  clientCompany: z.string().min(2, { message: "Client company name is required." }),
  contactPerson: z.string().min(2, { message: "Contact person name is required." }),
  contactEmail: z.string().email({ message: "Valid email is required." }),
  location: z.string({ required_error: "Please select a location." }),
})

const eventTypes = [
  { value: "team-building", label: "Team Building" },
  { value: "leadership-retreat", label: "Leadership Retreat" },
  { value: "product-launch", label: "Product Launch" },
  { value: "client-entertainment", label: "Client Entertainment" },
  { value: "employee-appreciation", label: "Employee Appreciation" },
  { value: "training-session", label: "Training Session" },
  { value: "networking-event", label: "Networking Event" },
  { value: "holiday-celebration", label: "Holiday Celebration" },
]

const audienceTypes = [
  { value: "executives", label: "Executives" },
  { value: "managers", label: "Managers" },
  { value: "employees", label: "All Employees" },
  { value: "clients", label: "Clients" },
  { value: "mixed", label: "Mixed Audience" },
]

const objectives = [
  { id: "teamwork", label: "Improve Teamwork" },
  { id: "communication", label: "Enhance Communication" },
  { id: "creativity", label: "Boost Creativity" },
  { id: "problem-solving", label: "Develop Problem Solving" },
  { id: "leadership", label: "Build Leadership" },
  { id: "stress-relief", label: "Stress Relief" },
  { id: "celebration", label: "Celebration" },
  { id: "networking", label: "Networking" },
]

const activities = [
  { id: "collaborative-painting", label: "Collaborative Painting" },
  { id: "individual-canvas", label: "Individual Canvas Painting" },
  { id: "pottery", label: "Pottery Workshop" },
  { id: "sculpture", label: "Sculpture Creation" },
  { id: "digital-art", label: "Digital Art Workshop" },
  { id: "printmaking", label: "Printmaking" },
  { id: "mixed-media", label: "Mixed Media Art" },
  { id: "calligraphy", label: "Calligraphy" },
]

const materials = [
  { id: "canvas", label: "Canvas" },
  { id: "acrylic-paint", label: "Acrylic Paint" },
  { id: "watercolor", label: "Watercolor" },
  { id: "clay", label: "Clay" },
  { id: "digital-tablets", label: "Digital Tablets" },
  { id: "printmaking-supplies", label: "Printmaking Supplies" },
  { id: "mixed-media-supplies", label: "Mixed Media Supplies" },
  { id: "calligraphy-sets", label: "Calligraphy Sets" },
]

interface CorporateEventTemplateWizardProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function PrivateEventWizard({ open = false, onOpenChange = () => {} }: CorporateEventTemplateWizardProps = {}) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>("")
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string>("")
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      featuredImage: "",
      companyLogo: "",
      galleryImages: [],
      duration: 2,
      minParticipants: 10,
      maxParticipants: 30,
      objectives: [],
      setupRequirements: "",
      activities: [],
      materials: [],
      deliverables: "",
      pricingModel: "fixed",
      basePrice: 2500,
      perPersonPrice: 75,
      timeline: [
        { phase: "Setup", duration: "30 minutes" },
        { phase: "Introduction", duration: "15 minutes" },
        { phase: "Main Activity", duration: "90 minutes" },
        { phase: "Break", duration: "15 minutes" },
        { phase: "Completion", duration: "30 minutes" },
        { phase: "Presentation", duration: "30 minutes" },
      ],
      notes: "",
      eventDate: "",
      eventTime: "",
      clientCompany: "",
      contactPerson: "",
      contactEmail: "",
      location: "ginza",
    },
  })

  const handleImageUpload = (file: File, type: "featured" | "logo" | "gallery") => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (type === "featured") {
        setFeaturedImagePreview(result)
        form.setValue("featuredImage", result)
      } else if (type === "logo") {
        setCompanyLogoPreview(result)
        form.setValue("companyLogo", result)
      } else if (type === "gallery") {
        const currentImages = form.getValues("galleryImages") || []
        const newImages = [...currentImages, result]
        setGalleryPreviews((prev) => [...prev, result])
        form.setValue("galleryImages", newImages)
      }
    }
    reader.readAsDataURL(file)
  }

  const removeGalleryImage = (index: number) => {
    const currentImages = form.getValues("galleryImages") || []
    const newImages = currentImages.filter((_, i) => i !== index)
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index))
    form.setValue("galleryImages", newImages)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log("Scheduling event:", values)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      setStep(1)
      setFeaturedImagePreview("")
      setCompanyLogoPreview("")
      setGalleryPreviews([])
      form.reset()
    }, 1500)
  }

  const nextStep = () => {
    const fieldsToValidate = {
      1: ["name", "eventType", "description", "audience"],
      2: ["clientCompany", "contactPerson", "contactEmail"],
      3: ["eventDate", "eventTime", "location"],
      4: ["duration", "minParticipants", "maxParticipants", "objectives", "setupRequirements"],
      5: ["activities", "materials", "deliverables"],
      6: [], // Images are optional
      7: ["pricingModel", "basePrice", "perPersonPrice"],
    }[step]

    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) setStep((prev) => Math.min(prev + 1, 8))
    })
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Private Event</DialogTitle>
          <DialogDescription>
            Schedule a new private event for a corporate client with custom details and requirements.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    step >= i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {step > i ? <CheckIcon className="h-4 w-4" /> : i}
                </div>
                {i < 8 && <div className={cn("h-1 w-10", step > i ? "bg-primary" : "bg-muted")} />}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Event Basics</h3>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Executive Team Building Workshop" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {eventTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the purpose and overview of this event"
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="audience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select target audience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {audienceTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Client Information</h3>
                  <FormField
                    control={form.control}
                    name="clientCompany"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Company</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Acme Corp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactPerson"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="e.g., john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Date, Time & Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="eventDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="eventTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["ginza", "daikanyama", "catstreet", "yokohama", "osaka", "okinawa", "fukuoka"].map(
                              (location) => (
                                <SelectItem key={location} value={location}>
                                  {location.charAt(0).toUpperCase() + location.slice(1)}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Event Details</h3>
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (hours)</FormLabel>
                        <div className="flex items-center gap-4">
                          <FormControl>
                            <Slider
                              min={1}
                              max={8}
                              step={0.5}
                              defaultValue={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                              className="flex-1"
                            />
                          </FormControl>
                          <div className="w-12 text-center font-medium">{field.value}h</div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="minParticipants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Min Participants</FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input
                                type="number"
                                min={5}
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
                                min={5}
                                max={100}
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
                  <FormField
                    control={form.control}
                    name="objectives"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Objectives</FormLabel>
                          <FormDescription>Select the key objectives for this event</FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                          {objectives.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="objectives"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(field.value?.filter((value) => value !== item.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-sm">{item.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="setupRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Setup Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List any special setup requirements for this event"
                            className="resize-none"
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Activities & Materials</h3>
                  <FormField
                    control={form.control}
                    name="activities"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Art Activities</FormLabel>
                          <FormDescription>Select the art activities for this event</FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                          {activities.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="activities"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(field.value?.filter((value) => value !== item.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-sm">{item.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="materials"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Materials</FormLabel>
                          <FormDescription>Select the materials needed for this event</FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                          {materials.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="materials"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(field.value?.filter((value) => value !== item.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-sm">{item.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deliverables"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deliverables</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe what participants will take away from this event"
                            className="resize-none"
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Images & Media</h3>

                  <FormField
                    control={form.control}
                    name="featuredImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Featured Image</FormLabel>
                        <FormDescription>Main image that represents this event</FormDescription>
                        <FormControl>
                          <div className="space-y-2">
                            {featuredImagePreview ? (
                              <div className="relative w-full h-24 border rounded-md overflow-hidden">
                                <img
                                  src={featuredImagePreview || "/placeholder.svg"}
                                  alt="Featured preview"
                                  className="w-full h-full object-cover"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-1 right-1"
                                  onClick={() => {
                                    setFeaturedImagePreview("")
                                    form.setValue("featuredImage", "")
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                                <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                                <label className="cursor-pointer">
                                  <span className="text-sm text-gray-600">Click to upload featured image</span>
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) handleImageUpload(file, "featured")
                                    }}
                                  />
                                </label>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyLogo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Logo</FormLabel>
                        <FormDescription>Logo to display on event materials</FormDescription>
                        <FormControl>
                          <div className="space-y-2">
                            {companyLogoPreview ? (
                              <div className="relative w-20 h-20 border rounded-md overflow-hidden">
                                <img
                                  src={companyLogoPreview || "/placeholder.svg"}
                                  alt="Logo preview"
                                  className="w-full h-full object-contain bg-gray-50"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute -top-2 -right-2"
                                  onClick={() => {
                                    setCompanyLogoPreview("")
                                    form.setValue("companyLogo", "")
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-gray-300 rounded-md p-3 text-center w-20 h-20 flex flex-col items-center justify-center">
                                <ImageIcon className="h-5 w-5 text-gray-400 mb-1" />
                                <label className="cursor-pointer">
                                  <span className="text-xs text-gray-600">Upload</span>
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) handleImageUpload(file, "logo")
                                    }}
                                  />
                                </label>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="galleryImages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gallery Images (Optional)</FormLabel>
                        <FormDescription>Additional images to showcase the event type</FormDescription>
                        <FormControl>
                          <div className="space-y-2">
                            {galleryPreviews.length > 0 && (
                              <div className="grid grid-cols-4 gap-2 max-h-24 overflow-y-auto">
                                {galleryPreviews.map((preview, index) => (
                                  <div key={index} className="relative aspect-square border rounded-md overflow-hidden">
                                    <img
                                      src={preview || "/placeholder.svg"}
                                      alt={`Gallery ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="sm"
                                      className="absolute top-0 right-0 h-4 w-4 p-0"
                                      onClick={() => removeGalleryImage(index)}
                                    >
                                      <X className="h-2 w-2" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="border-2 border-dashed border-gray-300 rounded-md p-3 text-center">
                              <Upload className="mx-auto h-5 w-5 text-gray-400 mb-1" />
                              <label className="cursor-pointer">
                                <span className="text-sm text-gray-600">Add gallery images</span>
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  multiple
                                  onChange={(e) => {
                                    const files = Array.from(e.target.files || [])
                                    files.forEach((file) => handleImageUpload(file, "gallery"))
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 7 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Pricing & Timeline</h3>
                  <FormField
                    control={form.control}
                    name="pricingModel"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Pricing Model</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="fixed" />
                              </FormControl>
                              <FormLabel className="font-normal">Fixed Price</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="perPerson" />
                              </FormControl>
                              <FormLabel className="font-normal">Per Person</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="tiered" />
                              </FormControl>
                              <FormLabel className="font-normal">Base + Per Person</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="basePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base Price (¥)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              {...field}
                              onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="perPersonPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Per Person Price (¥)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              {...field}
                              onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Event Timeline</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {form.watch("timeline").map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex-1 flex items-center gap-2 p-2 border rounded-md">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-sm">{item.phase}</span>
                            <Badge variant="outline" className="ml-auto text-xs">
                              {item.duration}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 8 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Review & Notes</h3>
                  <div className="border rounded-md p-4 space-y-3 max-h-64 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-muted-foreground">Event Name</h4>
                        <p>{form.watch("name") || "Not specified"}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground">Client Company</h4>
                        <p>{form.watch("clientCompany") || "Not specified"}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground">Event Date</h4>
                        <p>{form.watch("eventDate") || "Not specified"}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground">Event Time</h4>
                        <p>{form.watch("eventTime") || "Not specified"}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground">Location</h4>
                        <p>{form.watch("location") || "Not specified"}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground">Duration</h4>
                        <p>{form.watch("duration")} hours</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground">Participants</h4>
                        <p>
                          {form.watch("minParticipants")} - {form.watch("maxParticipants")}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground">Pricing</h4>
                        <p>
                          {form.watch("pricingModel") === "fixed"
                            ? `Fixed: ¥${form.watch("basePrice").toLocaleString()}`
                            : form.watch("pricingModel") === "perPerson"
                              ? `Per Person: ¥${form.watch("perPersonPrice").toLocaleString()}`
                              : `Base: ¥${form.watch("basePrice").toLocaleString()} + ¥${form
                                  .watch("perPersonPrice")
                                  .toLocaleString()} per person`}
                        </p>
                      </div>
                    </div>
                    {(form.watch("featuredImage") ||
                      form.watch("companyLogo") ||
                      (form.watch("galleryImages")?.length || 0) > 0) && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Images</h4>
                        <div className="flex gap-2">
                          {form.watch("featuredImage") && (
                            <div className="w-12 h-12 border rounded overflow-hidden">
                              <img
                                src={form.watch("featuredImage") || "/placeholder.svg"}
                                alt="Featured"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          {form.watch("companyLogo") && (
                            <div className="w-12 h-12 border rounded overflow-hidden bg-gray-50">
                              <img
                                src={form.watch("companyLogo") || "/placeholder.svg"}
                                alt="Logo"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          {form
                            .watch("galleryImages")
                            ?.slice(0, 3)
                            .map((img, index) => (
                              <div key={index} className="w-12 h-12 border rounded overflow-hidden">
                                <img
                                  src={img || "/placeholder.svg"}
                                  alt={`Gallery ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          {(form.watch("galleryImages")?.length || 0) > 3 && (
                            <div className="w-12 h-12 border rounded bg-gray-100 flex items-center justify-center">
                              <span className="text-xs text-gray-600">
                                +{(form.watch("galleryImages")?.length || 0) - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional notes about this event"
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <DialogFooter className="flex justify-between">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                {step < 8 ? (
                  <Button type="button" onClick={nextStep}>
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Schedule Event"}
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
