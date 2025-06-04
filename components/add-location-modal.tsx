"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckIcon, Upload, X, Users } from "lucide-react"

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
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  nameJapanese: z.string().min(2, {
    message: "Japanese name must be at least 2 characters.",
  }),
  nameEnglish: z.string().min(2, {
    message: "English name must be at least 2 characters.",
  }),
  type: z.string({
    required_error: "Please select a location type.",
  }),
  status: z.string({
    required_error: "Please select a status.",
  }),
  addressJapanese: z.string().min(10, {
    message: "Japanese address must be at least 10 characters.",
  }),
  addressEnglish: z.string().min(10, {
    message: "English address must be at least 10 characters.",
  }),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().optional(),
  capacity: z.number().min(1).max(200),
  openingHours: z.string().min(5, {
    message: "Please provide opening hours.",
  }),
  features: z.array(z.string()).optional(),
  accessInfo: z.string().optional(),
  featuredImage: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
})

interface AddLocationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddLocationModal({ open, onOpenChange }: AddLocationModalProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>("")
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameJapanese: "",
      nameEnglish: "",
      type: "",
      status: "",
      addressJapanese: "",
      addressEnglish: "",
      phone: "",
      email: "",
      website: "",
      capacity: 30,
      openingHours: "",
      features: [],
      accessInfo: "",
      featuredImage: "",
      galleryImages: [],
    },
  })

  const steps = [
    { number: 1, title: "Basic Info", completed: step > 1 },
    { number: 2, title: "Address & Contact", completed: step > 2 },
    { number: 3, title: "Details & Features", completed: step > 3 },
    { number: 4, title: "Images & Review", completed: false },
  ]

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

  const handleImageUpload = (file: File, type: "featured" | "gallery") => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      console.error("Please select an image file")
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      console.error("File size must be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (type === "featured") {
        setFeaturedImagePreview(result)
        form.setValue("featuredImage", result)
      } else if (type === "gallery") {
        const currentImages = form.getValues("galleryImages") || []
        const newImages = [...currentImages, result]
        setGalleryPreviews((prev) => [...prev, result])
        form.setValue("galleryImages", newImages)
      }
    }
    reader.onerror = () => {
      console.error("Error reading file")
    }
    reader.readAsDataURL(file)
  }

  const removeGalleryImage = (index: number) => {
    const currentImages = form.getValues("galleryImages") || []
    const newImages = currentImages.filter((_, i) => i !== index)
    const newPreviews = galleryPreviews.filter((_, i) => i !== index)

    setGalleryPreviews(newPreviews)
    form.setValue("galleryImages", newImages)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log("Creating location:", values)

    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      setStep(1)
      setFeaturedImagePreview("")
      setGalleryPreviews([])
      form.reset()
    }, 1500)
  }

  const nextStep = () => {
    const fieldsToValidate = {
      1: ["nameJapanese", "nameEnglish", "type", "status"],
      2: ["addressJapanese", "addressEnglish"],
      3: ["capacity", "openingHours"],
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
    setFeaturedImagePreview("")
    setGalleryPreviews([])
    form.reset()
    onOpenChange(false)
  }

  const goToStep = (stepNumber: number) => {
    if (stepNumber <= step) {
      setStep(stepNumber)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add New Location</DialogTitle>
          <DialogDescription>
            Create a new studio location with all necessary details and contact information.
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
                    <h3 className="text-lg font-medium">Basic Information</h3>
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

                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Address & Contact Information</h3>
                    <FormField
                      control={form.control}
                      name="addressJapanese"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address (Japanese)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="〒150-0034 東京都渋谷区代官山町 7-2"
                              className="resize-none"
                              {...field}
                            />
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
                            <Textarea
                              placeholder="7-2 Daikanyamachō, Shibuya, Tōkyō 150-0034"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accessInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Access Information (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="5-minute walk from Daikanyama Station" {...field} />
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

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="artbar.co.jp/daikanyama" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Details & Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="capacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capacity</FormLabel>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <Input
                                  type="number"
                                  min={1}
                                  max={200}
                                  {...field}
                                  onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                />
                              </FormControl>
                              <Users className="h-4 w-4 text-muted-foreground" />
                            </div>
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
                          <div className="mb-4">
                            <FormLabel className="text-base">Features & Amenities</FormLabel>
                            <FormDescription>Select all that apply to this location</FormDescription>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {locationFeatures.map((feature) => (
                              <FormField
                                key={feature}
                                control={form.control}
                                name="features"
                                render={({ field }) => {
                                  return (
                                    <FormItem key={feature} className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(feature)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, feature])
                                              : field.onChange(field.value?.filter((value) => value !== feature))
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">{feature}</FormLabel>
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

                {step === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Images & Review</h3>

                    {/* Featured Image */}
                    <FormField
                      control={form.control}
                      name="featuredImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Featured Image</FormLabel>
                          <FormDescription>Main image that represents this location</FormDescription>
                          <FormControl>
                            <div className="space-y-2">
                              {featuredImagePreview ? (
                                <div className="relative w-full h-32 border rounded-md overflow-hidden">
                                  <img
                                    src={featuredImagePreview || "/placeholder.svg"}
                                    alt="Featured preview"
                                    className="w-full h-full object-cover"
                                  />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2 h-6 w-6 p-0"
                                    onClick={() => {
                                      setFeaturedImagePreview("")
                                      form.setValue("featuredImage", "")
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <label className="block cursor-pointer">
                                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-gray-400 transition-colors">
                                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-600">Click to upload featured image</span>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP up to 5MB</p>
                                  </div>
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) {
                                        handleImageUpload(file, "featured")
                                        // Reset the input value to allow re-uploading the same file
                                        e.target.value = ""
                                      }
                                    }}
                                  />
                                </label>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Gallery Images */}
                    <FormField
                      control={form.control}
                      name="galleryImages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gallery Images (Optional)</FormLabel>
                          <FormDescription>Additional images to showcase the location</FormDescription>
                          <FormControl>
                            <div className="space-y-2">
                              {galleryPreviews.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 mb-2">
                                  {galleryPreviews.map((preview, index) => (
                                    <div
                                      key={index}
                                      className="relative aspect-square border rounded-md overflow-hidden group"
                                    >
                                      <img
                                        src={preview || "/placeholder.svg"}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeGalleryImage(index)}
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <label className="block cursor-pointer">
                                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-gray-400 transition-colors">
                                  <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                                  <span className="text-sm text-gray-600">Add gallery images</span>
                                  <p className="text-xs text-gray-400 mt-1">Select multiple images</p>
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  multiple
                                  onChange={(e) => {
                                    const files = Array.from(e.target.files || [])
                                    files.forEach((file) => handleImageUpload(file, "gallery"))
                                    // Reset the input value
                                    e.target.value = ""
                                  }}
                                />
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="text-center py-4">
                      <div className="text-green-600 font-medium">Location is ready to create</div>
                      <div className="text-sm text-gray-600 mt-1">
                        You can start scheduling events at this location once created
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold text-gray-900">Review Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Name:</span> {form.watch("nameEnglish") || "Not set"}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {form.watch("type") || "Not set"}
                        </div>
                        <div>
                          <span className="font-medium">Status:</span> {form.watch("status") || "Not set"}
                        </div>
                        <div>
                          <span className="font-medium">Capacity:</span> {form.watch("capacity") || "Not set"}
                        </div>
                        <div>
                          <span className="font-medium">Opening Hours:</span> {form.watch("openingHours") || "Not set"}
                        </div>
                        <div>
                          <span className="font-medium">Features:</span>{" "}
                          {form.watch("features")?.length ? form.watch("features")?.join(", ") : "None selected"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <DialogFooter className="flex gap-3 pt-6">
              {step > 1 && (
                <Button variant="outline" onClick={prevStep} className="px-6">
                  Back
                </Button>
              )}
              <Button variant="outline" onClick={handleCancel} className="px-6">
                Cancel
              </Button>
              <Button
                onClick={step === 4 ? form.handleSubmit(onSubmit) : nextStep}
                className="px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium"
                disabled={isSubmitting}
              >
                {step === 4 ? (isSubmitting ? "Creating..." : "Create Location") : "Next Step"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
