"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ImageIcon, X } from "lucide-react"

interface AddLocationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const locationSchema = z.object({
  // Step 1: Basic Information
  nameJapanese: z.string().min(1, "Japanese name is required"),
  nameEnglish: z.string().min(1, "English name is required"),
  type: z.enum(["flagship", "premium", "standard", "franchise"]),
  status: z.enum(["active", "under_construction", "coming_soon"]),

  // Step 2: Address & Contact
  addressJapanese: z.string().min(1, "Japanese address is required"),
  addressEnglish: z.string().min(1, "English address is required"),
  accessJapanese: z.string().optional(),
  accessEnglish: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),

  // Step 3: Details & Features
  capacity: z.number().min(1, "Capacity must be at least 1"),
  openingHours: z.string().min(1, "Opening hours are required"),
  features: z.array(z.string()).optional(),

  // Step 4: Photos & Media
  photo: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
})

type LocationFormValues = z.infer<typeof locationSchema>

const defaultValues: LocationFormValues = {
  nameJapanese: "",
  nameEnglish: "",
  type: "standard",
  status: "active",
  addressJapanese: "",
  addressEnglish: "",
  accessJapanese: "",
  accessEnglish: "",
  phone: "",
  website: "",
  email: "",
  capacity: 30,
  openingHours: "",
  features: [],
  photo: "",
  galleryImages: [],
}

const locationTypes = [
  { value: "flagship", label: "Flagship" },
  { value: "premium", label: "Premium" },
  { value: "standard", label: "Standard" },
  { value: "franchise", label: "Franchise" },
]

const locationStatuses = [
  { value: "active", label: "Active" },
  { value: "under_construction", label: "Under Construction" },
  { value: "coming_soon", label: "Coming Soon" },
]

const locationFeatures = [
  "Private Events",
  "Corporate Events",
  "Kids Classes",
  "Wheelchair Access",
  "Outdoor Space",
  "Ocean View",
  "Parking Available",
  "Public Transport Access",
  "Food & Beverage",
  "VIP Room",
]

export function AddLocationModal({ open, onOpenChange }: AddLocationModalProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const totalSteps = 4

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues,
    mode: "onChange",
  })

  const onSubmit = async (data: LocationFormValues) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Location data submitted:", data)

      // Reset form and close modal
      form.reset(defaultValues)
      setStep(1)
      onOpenChange(false)
    } catch (error) {
      console.error("Error submitting location:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = async () => {
    let fieldsToValidate: (keyof LocationFormValues)[] = []

    switch (step) {
      case 1:
        fieldsToValidate = ["nameJapanese", "nameEnglish", "type", "status"]
        break
      case 2:
        fieldsToValidate = ["addressJapanese", "addressEnglish"]
        break
      case 3:
        fieldsToValidate = ["capacity", "openingHours"]
        break
      case 4:
        // Final step, submit the form
        form.handleSubmit(onSubmit)()
        return
    }

    const isValid = await form.trigger(fieldsToValidate as any)
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleCancel = () => {
    form.reset(defaultValues)
    setStep(1)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden">
        <div className="p-6">
          <DialogTitle className="text-xl font-semibold">Add New Location</DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Create a new studio location with all necessary details and contact information.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center px-6 pb-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                  ${step === i + 1 ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}
              >
                {i + 1}
              </div>
              {i < totalSteps - 1 && <div className="w-12 h-[2px] mx-1 bg-gray-200" />}
            </div>
          ))}
        </div>

        <div className="px-6 pb-6">
          <Form {...form}>
            <form className="space-y-4">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    <p className="text-sm text-gray-500">Enter the basic details for the new location</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="nameJapanese"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location Name (Japanese)</FormLabel>
                        <FormControl>
                          <Input placeholder="アートバー代官山" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nameEnglish"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location Name (English)</FormLabel>
                        <FormControl>
                          <Input placeholder="Artbar Daikanyama" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {locationTypes.map((type) => (
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
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {locationStatuses.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Address & Contact */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-medium">Address & Contact</h3>
                    <p className="text-sm text-gray-500">Provide location address and contact details</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="addressJapanese"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address (Japanese)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="〒150-0034 東京都渋谷区代官山町 7-2" {...field} rows={2} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="addressEnglish"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address (English)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="7-2 Daikanyamachō, Shibuya, Tōkyō 150-0034" {...field} rows={2} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+81 3-1234-5678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="daikanyama@artbar.co.jp" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Details & Features */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-medium">Details & Features</h3>
                    <p className="text-sm text-gray-500">Configure capacity, hours, and available features</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="45"
                              {...field}
                              onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormDescription>Maximum number of participants</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="openingHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Opening Hours</FormLabel>
                          <FormControl>
                            <Input placeholder="11:00 - 21:00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="features"
                    render={() => (
                      <FormItem>
                        <FormLabel>Features & Amenities</FormLabel>
                        <FormDescription>Select all that apply</FormDescription>
                        <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto border rounded-md p-3">
                          {locationFeatures.map((feature) => (
                            <FormField
                              key={feature}
                              control={form.control}
                              name="features"
                              render={({ field }) => {
                                return (
                                  <FormItem key={feature} className="flex flex-row items-start space-x-2 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(feature)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), feature])
                                            : field.onChange(field.value?.filter((value) => value !== feature))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{feature}</FormLabel>
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
                </div>
              )}

              {/* Step 4: Photos & Media */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-medium">Photos & Media</h3>
                    <p className="text-sm text-gray-500">Upload images for your location</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Featured Photo</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                            {field.value ? (
                              <div className="relative">
                                <img
                                  src={field.value || "/placeholder.svg"}
                                  alt="Featured location"
                                  className="mx-auto h-40 object-cover rounded-md"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2 h-6 w-6"
                                  onClick={() => field.onChange("")}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-4">
                                <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">Click to upload a featured photo</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP up to 5MB</p>
                                <Input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                      // In a real app, you'd upload this to a server
                                      // For now, we'll just create a placeholder URL
                                      field.onChange("/placeholder.svg?height=240&width=320")
                                    }
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </form>
          </Form>
        </div>

        {/* Footer with navigation buttons */}
        <div className="flex justify-end items-center p-4 border-t bg-gray-50">
          <Button variant="outline" onClick={handleCancel} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleNext} disabled={isSubmitting} className="bg-black hover:bg-gray-800 text-white">
            {step === totalSteps ? (isSubmitting ? "Creating..." : "Create Location") : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
