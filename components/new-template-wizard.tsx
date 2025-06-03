"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckIcon, Users, Upload, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  nameJapanese: z.string().min(2, { message: "Japanese name must be at least 2 characters." }),
  nameEnglish: z.string().min(2, { message: "English name must be at least 2 characters." }),
  category: z.string({ required_error: "Please select a category." }),
  descriptionJapanese: z.string().min(10, { message: "Japanese description must be at least 10 characters." }),
  descriptionEnglish: z.string().min(10, { message: "English description must be at least 10 characters." }),
  duration: z.number().min(1).max(8),
  difficulty: z.string({ required_error: "Please select a difficulty level." }),
  canvasSize: z.string({ required_error: "Please select a canvas size." }),
  maxParticipants: z.number().min(1).max(50),
  whatsIncluded: z.string().min(10, { message: "Please describe what's included." }),
  ticketPrices: z
    .array(
      z.object({
        type: z.string(),
        amount: z.string(),
      }),
    )
    .min(1),
  specialMaterials: z.string().optional(),
  featuredImage: z.string().optional(),
  referenceImages: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
})

interface NewTemplateWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewTemplateWizard({ open, onOpenChange }: NewTemplateWizardProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>("")
  const [referenceImagePreviews, setReferenceImagePreviews] = useState<string[]>([])
  const [highlights, setHighlights] = useState<string[]>([])
  const [newHighlight, setNewHighlight] = useState("")

  const [availableCategories] = useState(["All", "Kids Only", "Master Artists", "Paint Pouring", "Seasonal"])

  const [availableCanvasSizes] = useState(["F6", "F10", "F12", "30cm Round", "40cm Round", "25cm Round"])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameJapanese: "",
      nameEnglish: "",
      category: "",
      descriptionJapanese: "",
      descriptionEnglish: "",
      duration: 2,
      difficulty: "",
      canvasSize: "",
      maxParticipants: 20,
      whatsIncluded: "",
      ticketPrices: [{ type: "adult", amount: "" }],
      specialMaterials: "",
      featuredImage: "",
      referenceImages: [],
      highlights: [],
    },
  })

  const steps = [
    { number: 1, title: "Basic Info", completed: step > 1 },
    { number: 2, title: "Class Details", completed: step > 2 },
    { number: 3, title: "Materials & Pricing", completed: step > 3 },
    { number: 4, title: "Images & Highlights", completed: step > 4 },
    { number: 5, title: "Review", completed: false },
  ]

  const handleImageUpload = (file: File, type: "featured" | "reference") => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (type === "featured") {
        setFeaturedImagePreview(result)
        form.setValue("featuredImage", result)
      } else if (type === "reference") {
        const currentImages = form.getValues("referenceImages") || []
        const newImages = [...currentImages, result]
        setReferenceImagePreviews((prev) => [...prev, result])
        form.setValue("referenceImages", newImages)
      }
    }
    reader.readAsDataURL(file)
  }

  const removeReferenceImage = (index: number) => {
    const currentImages = form.getValues("referenceImages") || []
    const newImages = currentImages.filter((_, i) => i !== index)
    setReferenceImagePreviews((prev) => prev.filter((_, i) => i !== index))
    form.setValue("referenceImages", newImages)
  }

  const addHighlight = () => {
    if (newHighlight.trim()) {
      const newHighlights = [...highlights, newHighlight.trim()]
      setHighlights(newHighlights)
      form.setValue("highlights", newHighlights)
      setNewHighlight("")
    }
  }

  const removeHighlight = (index: number) => {
    const newHighlights = highlights.filter((_, i) => i !== index)
    setHighlights(newHighlights)
    form.setValue("highlights", newHighlights)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log("Creating template:", values)

    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      setStep(1)
      setFeaturedImagePreview("")
      setReferenceImagePreviews([])
      setHighlights([])
      form.reset()
    }, 1500)
  }

  const nextStep = () => {
    const fieldsToValidate = {
      1: ["nameJapanese", "nameEnglish", "category", "descriptionJapanese", "descriptionEnglish"],
      2: ["duration", "difficulty", "canvasSize", "maxParticipants"],
      3: ["whatsIncluded", "ticketPrices"],
      4: [],
    }[step]

    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) setStep((prev) => Math.min(prev + 1, 5))
    })
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleCancel = () => {
    setStep(1)
    setFeaturedImagePreview("")
    setReferenceImagePreviews([])
    setHighlights([])
    form.reset()
    onOpenChange(false)
  }

  const addTicketPrice = () => {
    const currentPrices = form.getValues("ticketPrices")
    form.setValue("ticketPrices", [...currentPrices, { type: "", amount: "" }])
  }

  const removeTicketPrice = (index: number) => {
    const currentPrices = form.getValues("ticketPrices")
    form.setValue(
      "ticketPrices",
      currentPrices.filter((_, i) => i !== index),
    )
  }

  const updateTicketPrice = (index: number, field: "type" | "amount", value: string) => {
    const currentPrices = form.getValues("ticketPrices")
    const newPrices = currentPrices.map((price, i) => (i === index ? { ...price, [field]: value } : price))
    form.setValue("ticketPrices", newPrices)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create Event Template</DialogTitle>
          <DialogDescription>
            Create a reusable template for art classes and workshops. This template will be available when scheduling
            events.
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
                          <FormLabel>Template Name</FormLabel>
                          <Tabs defaultValue="japanese" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="japanese">Japanese</TabsTrigger>
                              <TabsTrigger value="english">English</TabsTrigger>
                            </TabsList>
                            <TabsContent value="japanese" className="mt-2">
                              <FormControl>
                                <Input {...field} placeholder="テンプレート名を入力してください" className="w-full" />
                              </FormControl>
                            </TabsContent>
                            <TabsContent value="english" className="mt-2">
                              <FormField
                                control={form.control}
                                name="nameEnglish"
                                render={({ field: englishField }) => (
                                  <FormControl>
                                    <Input {...englishField} placeholder="Enter template name" className="w-full" />
                                  </FormControl>
                                )}
                              />
                            </TabsContent>
                          </Tabs>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
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
                      name="descriptionJapanese"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brief Description</FormLabel>
                          <Tabs defaultValue="japanese" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="japanese">Japanese</TabsTrigger>
                              <TabsTrigger value="english">English</TabsTrigger>
                            </TabsList>
                            <TabsContent value="japanese" className="mt-2">
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="テンプレートの特徴を説明してください..."
                                  className="w-full min-h-[100px]"
                                />
                              </FormControl>
                            </TabsContent>
                            <TabsContent value="english" className="mt-2">
                              <FormField
                                control={form.control}
                                name="descriptionEnglish"
                                render={({ field: englishField }) => (
                                  <FormControl>
                                    <Textarea
                                      {...englishField}
                                      placeholder="Describe what makes this template special..."
                                      className="w-full min-h-[100px]"
                                    />
                                  </FormControl>
                                )}
                              />
                            </TabsContent>
                          </Tabs>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Class Details</h3>
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
                              />
                            </FormControl>
                            <div className="w-12 text-center font-medium">{field.value}h</div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                              <SelectItem value="kids">Kids</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="canvasSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Canvas Size</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select canvas size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableCanvasSizes.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
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
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Materials & Pricing</h3>
                    <FormField
                      control={form.control}
                      name="whatsIncluded"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What's Included</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="List all materials provided (canvas, paints, brushes, etc.)"
                              className="w-full min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-gray-700">Default Ticket Prices</Label>
                      {form.watch("ticketPrices").map((price, index) => (
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

                          {form.watch("ticketPrices").length > 1 && (
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

                    <FormField
                      control={form.control}
                      name="specialMaterials"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Materials (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Any unique supplies or special materials for this template..."
                              className="w-full min-h-[80px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Images & Highlights</h3>

                    {/* Featured Image */}
                    <FormField
                      control={form.control}
                      name="featuredImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Featured Image</FormLabel>
                          <FormDescription>Main image that represents this template</FormDescription>
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
                                    className="absolute top-2 right-2"
                                    onClick={() => {
                                      setFeaturedImagePreview("")
                                      form.setValue("featuredImage", "")
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
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

                    {/* Reference Images */}
                    <FormField
                      control={form.control}
                      name="referenceImages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reference Images (Optional)</FormLabel>
                          <FormDescription>Additional images to showcase the art style</FormDescription>
                          <FormControl>
                            <div className="space-y-2">
                              {referenceImagePreviews.length > 0 && (
                                <div className="grid grid-cols-3 gap-2">
                                  {referenceImagePreviews.map((preview, index) => (
                                    <div
                                      key={index}
                                      className="relative aspect-square border rounded-md overflow-hidden"
                                    >
                                      <img
                                        src={preview || "/placeholder.svg"}
                                        alt={`Reference ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-1 right-1"
                                        onClick={() => removeReferenceImage(index)}
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                                <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                                <label className="cursor-pointer">
                                  <span className="text-sm text-gray-600">Add reference images</span>
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                      const files = Array.from(e.target.files || [])
                                      files.forEach((file) => handleImageUpload(file, "reference"))
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

                    {/* Event Highlights */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Event Highlights</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newHighlight}
                          onChange={(e) => setNewHighlight(e.target.value)}
                          placeholder="Add a highlight..."
                          onKeyPress={(e) => e.key === "Enter" && addHighlight()}
                        />
                        <Button type="button" onClick={addHighlight} size="sm">
                          Add
                        </Button>
                      </div>
                      {highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {highlights.map((highlight, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {highlight}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0"
                                onClick={() => removeHighlight(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Review</h3>
                    <div className="border rounded-md p-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Template Name</h4>
                        <p>{form.watch("nameEnglish") || "Not specified"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                        <p>{form.watch("category") || "Not specified"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
                        <p>{form.watch("duration")} hours</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Difficulty</h4>
                        <p>{form.watch("difficulty") || "Not specified"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Canvas Size</h4>
                        <p>{form.watch("canvasSize") || "Not specified"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Max Participants</h4>
                        <p>{form.watch("maxParticipants")}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Ticket Prices</h4>
                        <div className="space-y-1">
                          {form.watch("ticketPrices").map((price, index) => (
                            <p key={index} className="text-sm">
                              {price.type}: ¥{price.amount || "0"}
                            </p>
                          ))}
                        </div>
                      </div>
                      {highlights.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Highlights</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {highlights.map((highlight, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-center py-4">
                      <div className="text-green-600 font-medium">Template is ready to create</div>
                      <div className="text-sm text-gray-600 mt-1">
                        You can start scheduling events with this template once created
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
              {step < 5 ? (
                <Button type="button" onClick={nextStep}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Template"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
