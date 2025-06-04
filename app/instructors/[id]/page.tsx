"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { InstructorHeader } from "@/components/instructor-header"
import { InstructorTodayStatus } from "@/components/instructor-today-status"
import { AvailabilityCalendar } from "@/components/availability-calendar"
import { ClassCheckinInterface } from "@/components/class-checkin-interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  BriefcaseBusiness,
  Mail,
  Phone,
  Award,
  GraduationCap,
  BookOpen,
} from "lucide-react"
import { EventCard } from "@/components/event-card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Edit, Upload, ImageIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const instructorFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameJapanese: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  specialties: z.array(z.string()),
  bio: z.string().min(1, "Bio is required"),
  experience: z.string().min(1, "Experience is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  certifications: z.array(z.string()),
  avatar: z.string().optional(),
  flareImage: z.string().optional(),
})

type InstructorFormData = z.infer<typeof instructorFormSchema>

const getInstructorData = (id: string) => {
  const instructors = {
    cathy: {
      id: "cathy",
      name: "Cathy Thompson",
      nameJapanese: "キャシー・トンプソン",
      role: "CEO Artbar Tokyo",
      languages: ["English", "Japanese"],
      rating: 4.9,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "cathy@paintly.com",
      phone: "+81-90-1111-1111",
      specialties: ["Leadership", "Business Strategy", "Art Direction", "Team Management"],
      bio: "Cathy is Artbar Tokyo's CEO - the driving force behind Artbar! She strives to make it a fun and relaxing space for people to express their creative self and spark their love for art.",
      experience: "15+ years",
      certifications: ["MBA Business Administration", "Art Business Leadership", "Creative Director Certification"],
    },
    naomi: {
      id: "naomi",
      name: "Naomi",
      nameJapanese: "直美",
      role: "Marketing Director",
      languages: ["English", "Japanese"],
      rating: 4.8,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "naomi@paintly.com",
      phone: "+81-90-1234-5678",
      specialties: ["Abstract Painting", "Color Theory", "Marketing Strategy", "Team Leadership"],
      bio: "Experienced art instructor with over 8 years of teaching experience. Specializes in abstract painting techniques and color theory.",
      experience: "8+ years",
      certifications: ["Certified Art Instructor", "Color Theory Specialist", "Marketing Professional"],
    },
    luci: {
      id: "luci",
      name: "Luci",
      nameJapanese: "ルシファ・パン",
      role: "Art Instructor",
      languages: ["English", "Japanese", "Chinese"],
      rating: 4.8,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Busy" as const,
      email: "luci@paintly.com",
      phone: "+81-90-2222-2222",
      specialties: ["Fantasy Art", "Watercolor", "Color Theory", "Dreamy Landscapes"],
      bio: "Luci brings a soft, dreamy style to his paintings that will make you feel like you're transported to a fantasyland of colorful sunsets and milky ways!",
      experience: "6+ years",
      certifications: ["Emily Carr University of Art + Design", "Waseda University", "Color Theory Specialist"],
    },
    momo: {
      id: "momo",
      name: "Momo",
      nameJapanese: "モモ",
      role: "Senior Art Instructor",
      languages: ["English", "Japanese"],
      rating: 4.9,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "momo@paintly.com",
      phone: "+81-90-3333-3333",
      specialties: ["Abstract Art", "Dot Technique", "Acrylic Painting", "Color Theory"],
      bio: "Momo is an awesome instructor and specializes in her original dot technique art style and abstract art! She offers extremely good advice about color theory!",
      experience: "10+ years",
      certifications: [
        "Musashino Art University of Science of Design",
        "Abstract Art Specialist",
        "Professional Artist",
      ],
    },
    nanako: {
      id: "nanako",
      name: "Nanako",
      nameJapanese: "ななこ",
      role: "Art Instructor",
      languages: ["Japanese", "English"],
      rating: 4.8,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "nanako@paintly.com",
      phone: "+81-90-5555-5555",
      specialties: ["Traditional Japanese Art", "Sumi-e", "Watercolor", "Nature Painting"],
      bio: "Nanako specializes in traditional Japanese painting techniques with a modern twist. Her gentle teaching style makes complex techniques accessible to beginners.",
      experience: "9+ years",
      certifications: [
        "Tokyo University of the Arts",
        "Traditional Japanese Arts Certificate",
        "Art Education Diploma",
      ],
    },
    aika: {
      id: "aika",
      name: "Aika",
      nameJapanese: "愛花",
      role: "Art Instructor",
      languages: ["Japanese", "English", "French"],
      rating: 4.7,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Busy" as const,
      email: "aika@paintly.com",
      phone: "+81-90-6666-6666",
      specialties: ["Impressionist Techniques", "Floral Painting", "Oil Painting", "Plein Air"],
      bio: "Aika studied art in Paris and brings French impressionist techniques to her classes. She loves teaching floral compositions and outdoor painting.",
      experience: "8+ years",
      certifications: ["École des Beaux-Arts de Paris", "Impressionist Art Specialist", "Oil Painting Master Class"],
    },
    kiyoe: {
      id: "kiyoe",
      name: "Kiyoe",
      nameJapanese: "清江",
      role: "Senior Art Instructor",
      languages: ["Japanese", "English"],
      rating: 4.9,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "kiyoe@paintly.com",
      phone: "+81-90-7777-7777",
      specialties: ["Minimalist Art", "Zen Painting", "Meditation Through Art", "Monochrome"],
      bio: "Kiyoe brings mindfulness to her art classes, focusing on the meditative aspects of creating. Her minimalist approach helps students find peace through painting.",
      experience: "12+ years",
      certifications: ["Kyoto University of Art and Design", "Zen Arts Certificate", "Mindfulness in Education"],
    },
    "michi-kim": {
      id: "michi-kim",
      name: "Michi Kim",
      nameJapanese: "みち",
      role: "Art Instructor",
      languages: ["Japanese", "English"],
      rating: 4.6,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "michi@paintly.com",
      phone: "+81-90-8888-8888",
      specialties: ["Urban Sketching", "Architectural Drawing", "Perspective", "Cityscapes"],
      bio: "Michi loves capturing the energy of Tokyo's urban landscape. His classes focus on quick sketching techniques and understanding perspective in city environments.",
      experience: "5+ years",
      certifications: [
        "Tokyo Institute of Architecture",
        "Urban Sketchers Certification",
        "Perspective Drawing Specialist",
      ],
    },
    fuyou: {
      id: "fuyou",
      name: "Fuyou Nagashima",
      nameJapanese: "冬陽",
      role: "Art Instructor",
      languages: ["Japanese", "English"],
      rating: 4.8,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "fuyou@paintly.com",
      phone: "+81-80-1111-1111",
      specialties: ["Winter Landscapes", "Snow Scenes", "Light and Shadow", "Seasonal Art"],
      bio: "Fuyou's specialty is capturing the serene beauty of winter landscapes. His techniques focus on light, shadow, and the quiet magic of snowy scenes.",
      experience: "6+ years",
      certifications: ["Hokkaido University of Art", "Landscape Painting Specialist", "Winter Scene Master Class"],
    },
    sakura: {
      id: "sakura",
      name: "Sakura",
      nameJapanese: "さくら",
      role: "Art Instructor",
      languages: ["Japanese", "English"],
      rating: 4.9,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "sakura@paintly.com",
      phone: "+81-80-2222-2222",
      specialties: ["Cherry Blossom Art", "Seasonal Japanese Motifs", "Botanical Illustration", "Nature Art"],
      bio: "Sakura specializes in Japanese seasonal motifs, particularly cherry blossoms. Her delicate style brings the ephemeral beauty of nature to canvas.",
      experience: "8+ years",
      certifications: [
        "Kyoto Botanical Art School",
        "Japanese Cultural Arts Certificate",
        "Botanical Illustration Specialist",
      ],
    },
    daria: {
      id: "daria",
      name: "Daria",
      nameJapanese: "ダリア",
      role: "Art Instructor",
      languages: ["English", "Japanese", "Italian"],
      rating: 4.7,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "daria@paintly.com",
      phone: "+81-90-4444-4444",
      specialties: ["Mixed Media", "Illustration", "Experimental Art", "Creative Expression"],
      bio: "Daria is an Italian artist who studied painting in Florence. She believes art is a powerful tool to self-reflect and connect with others.",
      experience: "7+ years",
      certifications: [
        "Leon Battista Alberti (Florence, Italy)",
        "International School of Illustration",
        "Ca' Foscari University (Venice, Italy)",
      ],
    },
    rie: {
      id: "rie",
      name: "Rie",
      nameJapanese: "理恵",
      role: "Art Instructor",
      languages: ["Japanese", "English"],
      rating: 4.8,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "rie@paintly.com",
      phone: "+81-80-4444-4444",
      specialties: ["Digital Art", "Traditional to Digital Transition", "Tablet Painting", "Modern Media"],
      bio: "Rie bridges traditional and digital art techniques. Her classes help students transition their skills to digital media while maintaining artistic integrity.",
      experience: "7+ years",
      certifications: ["Digital Arts Tokyo", "Adobe Certified Expert", "Digital Illustration Specialist"],
    },
    ken: {
      id: "ken",
      name: "Ken Tanaka",
      nameJapanese: "健",
      role: "Art Instructor",
      languages: ["Japanese", "English"],
      rating: 4.6,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "ken@paintly.com",
      phone: "+81-80-5555-5555",
      specialties: ["Sculpture", "3D Art", "Clay Modeling", "Mixed Media Sculpture"],
      bio: "Ken brings three-dimensional thinking to Artbar. His classes explore sculpture and 3D art forms, helping students think beyond the canvas.",
      experience: "10+ years",
      certifications: ["Sculpture Institute of Tokyo", "3D Arts Specialist", "Mixed Media Sculpture Certificate"],
    },
    uka: {
      id: "uka",
      name: "Uka",
      nameJapanese: "羽花",
      role: "Art Instructor",
      languages: ["Japanese", "English"],
      rating: 4.8,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "uka@paintly.com",
      phone: "+81-80-7777-7777",
      specialties: ["Bird and Wildlife Art", "Nature Illustration", "Animal Anatomy", "Environmental Art"],
      bio: "Uka's passion is wildlife art, particularly birds. Her classes combine technical skill with a deep appreciation for nature and environmental awareness.",
      experience: "6+ years",
      certifications: ["Wildlife Art Institute", "Ornithological Illustration", "Natural Science Illustration"],
    },
    akiko: {
      id: "akiko",
      name: "Akiko",
      nameJapanese: "明子",
      role: "Art Instructor",
      languages: ["Japanese", "English"],
      rating: 4.9,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Busy" as const,
      email: "akiko@paintly.com",
      phone: "+81-70-3333-3333",
      specialties: ["Calligraphy", "Brush Techniques", "Letter Art", "Traditional Scripts"],
      bio: "Akiko is a master of calligraphy and brush techniques. Her classes explore the art of beautiful writing in both Japanese and Western traditions.",
      experience: "14+ years",
      certifications: ["Japanese Calligraphy Association", "Master Brush Techniques", "Traditional and Modern Scripts"],
    },
    minako: {
      id: "minako",
      name: "Minako",
      nameJapanese: "美奈子",
      role: "Art Instructor",
      languages: ["Japanese", "English"],
      rating: 4.7,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "minako@paintly.com",
      phone: "+81-70-4444-4444",
      specialties: ["Ceramics", "Pottery", "Glazing Techniques", "Functional Art"],
      bio: "Minako brings the art of ceramics to Artbar. Her classes explore pottery techniques and the creation of beautiful, functional ceramic art pieces.",
      experience: "9+ years",
      certifications: ["Ceramic Arts Tokyo", "Pottery Master Class", "Glazing Techniques Specialist"],
    },
    // Legacy numeric IDs for backward compatibility
    "1": {
      id: "1",
      name: "Cathy Thompson",
      nameJapanese: "キャシー・トンプソン",
      role: "CEO Artbar Tokyo",
      languages: ["English", "Japanese"],
      rating: 4.9,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "cathy@paintly.com",
      phone: "+81-90-1111-1111",
      specialties: ["Leadership", "Business Strategy", "Art Direction", "Team Management"],
      bio: "Cathy is Artbar Tokyo's CEO - the driving force behind Artbar! She strives to make it a fun and relaxing space for people to express their creative self and spark their love for art.",
      experience: "15+ years",
      certifications: ["MBA Business Administration", "Art Business Leadership", "Creative Director Certification"],
    },
    "2": {
      id: "2",
      name: "Naomi",
      nameJapanese: "直美",
      role: "Marketing Director",
      languages: ["English", "Japanese"],
      rating: 4.8,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "naomi@paintly.com",
      phone: "+81-90-1234-5678",
      specialties: ["Abstract Painting", "Color Theory", "Marketing Strategy", "Team Leadership"],
      bio: "Experienced art instructor with over 8 years of teaching experience. Specializes in abstract painting techniques and color theory.",
      experience: "8+ years",
      certifications: ["Certified Art Instructor", "Color Theory Specialist", "Marketing Professional"],
    },
    "3": {
      id: "3",
      name: "Luci",
      nameJapanese: "ルシファ・パン",
      role: "Art Instructor",
      languages: ["English", "Japanese", "Chinese"],
      rating: 4.8,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Busy" as const,
      email: "luci@paintly.com",
      phone: "+81-90-2222-2222",
      specialties: ["Fantasy Art", "Watercolor", "Color Theory", "Dreamy Landscapes"],
      bio: "Luci brings a soft, dreamy style to his paintings that will make you feel like you're transported to a fantasyland of colorful sunsets and milky ways!",
      experience: "6+ years",
      certifications: ["Emily Carr University of Art + Design", "Waseda University", "Color Theory Specialist"],
    },
    "4": {
      id: "4",
      name: "Momo",
      nameJapanese: "モモ",
      role: "Senior Art Instructor",
      languages: ["English", "Japanese"],
      rating: 4.9,
      avatar: "/placeholder.svg?height=64&width=64",
      status: "Available" as const,
      email: "momo@paintly.com",
      phone: "+81-90-3333-3333",
      specialties: ["Abstract Art", "Dot Technique", "Acrylic Painting", "Color Theory"],
      bio: "Momo is an awesome instructor and specializes in her original dot technique art style and abstract art! She offers extremely good advice about color theory!",
      experience: "10+ years",
      certifications: [
        "Musashino Art University of Science of Design",
        "Abstract Art Specialist",
        "Professional Artist",
      ],
    },
  }

  return instructors[id as keyof typeof instructors] || instructors["cathy"] // Default to Cathy if ID not found
}

export default function InstructorDetailPage() {
  const params = useParams()
  const instructorId = params.id as string

  // Mock user role - in real app, get from auth context
  const currentUser = { id: "1", role: "admin" }
  const isAdmin = currentUser.role === "admin"
  const isOwnProfile = currentUser.id === instructorId

  // Get instructor data based on ID
  const instructor = getInstructorData(instructorId)

  const [isEditing, setIsEditing] = useState(false)
  const [newLanguage, setNewLanguage] = useState("")
  const [newSpecialty, setNewSpecialty] = useState("")
  const [newCertification, setNewCertification] = useState("")

  const form = useForm<InstructorFormData>({
    resolver: zodResolver(instructorFormSchema),
    defaultValues: {
      name: instructor.name,
      nameJapanese: instructor.nameJapanese || "",
      role: instructor.role,
      languages: instructor.languages,
      specialties: instructor.specialties,
      bio: instructor.bio,
      experience: instructor.experience,
      email: instructor.email,
      phone: instructor.phone || "",
      certifications: instructor.certifications,
      avatar: instructor.avatar,
      flareImage: "",
    },
  })

  const onSubmit = (data: InstructorFormData) => {
    console.log("Form submitted:", data)
    // In real app, save to API
    setIsEditing(false)
  }

  const addLanguage = () => {
    if (newLanguage.trim()) {
      const currentLanguages = form.getValues("languages")
      form.setValue("languages", [...currentLanguages, newLanguage.trim()])
      setNewLanguage("")
    }
  }

  const removeLanguage = (index: number) => {
    const currentLanguages = form.getValues("languages")
    form.setValue(
      "languages",
      currentLanguages.filter((_, i) => i !== index),
    )
  }

  const addSpecialty = () => {
    if (newSpecialty.trim()) {
      const currentSpecialties = form.getValues("specialties")
      form.setValue("specialties", [...currentSpecialties, newSpecialty.trim()])
      setNewSpecialty("")
    }
  }

  const removeSpecialty = (index: number) => {
    const currentSpecialties = form.getValues("specialties")
    form.setValue(
      "specialties",
      currentSpecialties.filter((_, i) => i !== index),
    )
  }

  const addCertification = () => {
    if (newCertification.trim()) {
      const currentCertifications = form.getValues("certifications")
      form.setValue("certifications", [...currentCertifications, newCertification.trim()])
      setNewCertification("")
    }
  }

  const removeCertification = (index: number) => {
    const currentCertifications = form.getValues("certifications")
    form.setValue(
      "certifications",
      currentCertifications.filter((_, i) => i !== index),
    )
  }

  const todayStatus = {
    nextClass: {
      time: "2:30 PM",
      title: "Abstract Painting",
      location: "Ginza",
      studentCount: 8,
    },
    studentsToday: 16,
    classesScheduled: 2,
    hoursToday: "4.5",
    workingHours: "9:00 AM - 6:00 PM",
  }

  const upcomingClasses = [
    {
      id: "1",
      title: "Abstract Painting Basics",
      time: "2:30 PM - 4:00 PM",
      location: "Ginza Studio",
      students: 8,
      status: "upcoming",
    },
    {
      id: "2",
      title: "Color Theory Workshop",
      time: "5:00 PM - 6:30 PM",
      location: "Daikanyama Studio",
      students: 4,
      status: "upcoming",
    },
    {
      id: "3",
      title: "Marketing Team Meeting",
      time: "Tomorrow, 10:00 AM",
      location: "Online",
      students: 0,
      status: "internal",
    },
  ]

  // Mock check-in data matching the mockup exactly
  const [checkInAttendees, setCheckInAttendees] = useState([
    {
      id: "1",
      name: "Yuki Tanaka",
      memberNumber: "123456",
      notes: [],
      specialTags: [],
      checkedIn: false,
    },
    {
      id: "2",
      name: "Carly Doe",
      memberNumber: "234567",
      age: 4,
      notes: ["Birthday celebration"],
      specialTags: [{ text: "Birthday celebration", type: "birthday" as const }],
      checkedIn: false,
    },
    {
      id: "3",
      name: "Hiroshi Yamamoto",
      memberNumber: "345678",
      age: 1,
      notes: ["Payment Pending", "Vegetarian snacks only"],
      specialTags: [
        { text: "Payment Pending", type: "payment" as const },
        { text: "Vegetarian snacks only", type: "dietary" as const },
      ],
      checkedIn: false,
    },
    {
      id: "4",
      name: "Emma Wilson",
      memberNumber: "456789",
      notes: ["VIP member"],
      specialTags: [{ text: "VIP member", type: "vip" as const }],
      checkedIn: false,
    },
  ])

  const handleCheckIn = (attendeeId: string) => {
    setCheckInAttendees((prev) =>
      prev.map((attendee) => (attendee.id === attendeeId ? { ...attendee, checkedIn: !attendee.checkedIn } : attendee)),
    )
  }

  const handleAvailabilitySubmit = (availability: Record<string, boolean>) => {
    console.log("Availability submitted:", availability)
    // In real app, send to API
  }

  const handleCheckInExport = () => {
    console.log("Exporting check-in data...")
    // In real app, export functionality
  }

  const handleCheckInSave = () => {
    console.log("Saving check-in data...")
    // In real app, save to API
  }

  // Calculate experience level for progress bar (assuming 10+ years is max)
  const experienceYears = Number.parseInt(instructor.experience.replace(/\D/g, "")) || 0
  const experiencePercentage = Math.min(Math.round((experienceYears / 10) * 100), 100)

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
            {/* Instructor Header */}
            <InstructorHeader instructor={instructor} isAdmin={isAdmin} isOwnProfile={isOwnProfile} />

            {/* Today's Status */}
            <InstructorTodayStatus {...todayStatus} />

            {/* Integrated Profile and Tabs Section */}
            <div className="space-y-4">
              <Tabs defaultValue="schedule" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="checkin">Check-In</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-4">
                  {isEditing ? (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          {/* Left Column */}
                          <div className="space-y-6">
                            {/* Profile Images */}
                            <Card>
                              <CardHeader>
                                <CardTitle>Images</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Profile Photo</label>
                                  <div className="flex items-center gap-4 mt-2">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                      <ImageIcon className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <Button type="button" variant="outline" size="sm">
                                      <Upload className="h-4 w-4 mr-2" />
                                      Upload Photo
                                    </Button>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Flare Image (Favorite Art Piece)</label>
                                  <div className="flex items-center gap-4 mt-2">
                                    <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center">
                                      <ImageIcon className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <Button type="button" variant="outline" size="sm">
                                      <Upload className="h-4 w-4 mr-2" />
                                      Upload Art
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Basic Information */}
                            <Card>
                              <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Full Name</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="nameJapanese"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Japanese Name (Optional)</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="role"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Role/Title</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </CardContent>
                            </Card>

                            {/* Languages */}
                            <Card>
                              <CardHeader>
                                <CardTitle>Languages</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Languages Spoken</label>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {form.watch("languages").map((language, index) => (
                                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                        {language}
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeLanguage(index)} />
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="flex gap-2 mt-2">
                                    <Input
                                      placeholder="Add language"
                                      value={newLanguage}
                                      onChange={(e) => setNewLanguage(e.target.value)}
                                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
                                    />
                                    <Button type="button" onClick={addLanguage} size="sm">
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-6">
                            {/* Specialties/Tags */}
                            <Card>
                              <CardHeader>
                                <CardTitle>Specialties & Skills</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Skills & Specialties</label>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {form.watch("specialties").map((specialty, index) => (
                                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                        {specialty}
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeSpecialty(index)} />
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="flex gap-2 mt-2">
                                    <Input
                                      placeholder="Add specialty"
                                      value={newSpecialty}
                                      onChange={(e) => setNewSpecialty(e.target.value)}
                                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
                                    />
                                    <Button type="button" onClick={addSpecialty} size="sm">
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Bio & Experience */}
                            <Card>
                              <CardHeader>
                                <CardTitle>About</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <FormField
                                  control={form.control}
                                  name="bio"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Bio</FormLabel>
                                      <FormControl>
                                        <Textarea {...field} rows={4} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="experience"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Experience</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder="e.g., 8+ years" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </CardContent>
                            </Card>

                            {/* Contact Information */}
                            <Card>
                              <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <FormField
                                  control={form.control}
                                  name="email"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                        <Input {...field} type="email" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="phone"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Phone (Optional)</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        {/* Certifications */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Certifications</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Professional Certifications</label>
                              <div className="space-y-2 mt-2">
                                {form.watch("certifications").map((cert, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                                    <span className="text-sm">{cert}</span>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeCertification(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Input
                                  placeholder="Add certification"
                                  value={newCertification}
                                  onChange={(e) => setNewCertification(e.target.value)}
                                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCertification())}
                                />
                                <Button type="button" onClick={addCertification} size="sm">
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="flex gap-2">
                          <Button type="submit">Save Changes</Button>
                          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <Card className="overflow-hidden">
                      <div className="grid md:grid-cols-5 gap-0">
                        {/* Left Column (60%) - About/Bio */}
                        <div className="md:col-span-3 p-5 border-r border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-gray-500" />
                              <h4 className="text-sm font-medium">Bio</h4>
                            </div>
                            <Button
                              onClick={() => setIsEditing(!isEditing)}
                              variant="outline"
                              size="sm"
                              className="ml-auto"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Profile
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-6">{instructor.bio}</p>

                          <div className="flex items-center gap-2 mb-2">
                            <BriefcaseBusiness className="h-5 w-5 text-gray-500" />
                            <h4 className="text-sm font-medium">Experience</h4>
                          </div>
                          <div className="mb-6">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-muted-foreground">{instructor.experience}</span>
                              <span className="text-xs text-muted-foreground">{experiencePercentage}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${experiencePercentage}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {instructor.specialties.map((specialty) => (
                              <Badge key={specialty} variant="outline" className="text-xs bg-gray-50">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Right Column (40%) - Certifications/Contact */}
                        <div className="md:col-span-2 p-5 bg-gray-50">
                          <div className="flex items-center gap-2 mb-3">
                            <Award className="h-5 w-5 text-gray-500" />
                            <h4 className="text-sm font-medium">Certifications</h4>
                          </div>
                          <div className="space-y-2 mb-6">
                            {instructor.certifications.map((cert, index) => (
                              <div
                                key={cert}
                                className="flex items-center gap-2 p-2 bg-white rounded-md border border-gray-100"
                              >
                                <div className="bg-blue-100 p-1 rounded-full">
                                  <GraduationCap className="h-4 w-4 text-blue-600" />
                                </div>
                                <span className="text-sm">{cert}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <Mail className="h-5 w-5 text-gray-500" />
                            <h4 className="text-sm font-medium">Contact</h4>
                          </div>
                          <div className="space-y-2">
                            <a
                              href={`mailto:${instructor.email}`}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                            >
                              <Mail className="h-4 w-4" />
                              {instructor.email}
                            </a>
                            {instructor.phone && (
                              <a
                                href={`tel:${instructor.phone}`}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                              >
                                <Phone className="h-4 w-4" />
                                {instructor.phone}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </TabsContent>

                {/* Schedule Tab */}
                <TabsContent value="schedule" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingClasses.map((class_) => (
                          <EventCard
                            key={class_.id}
                            event={{
                              id: class_.id,
                              title: class_.title,
                              time: class_.time,
                              location: class_.location,
                              capacity: `${class_.students}/${class_.status === "internal" ? "-" : "12"}`,
                              status: class_.status === "internal" ? "Internal" : undefined,
                              onClick: () => console.log(`Clicked on class ${class_.id}`),
                            }}
                            context="instructor"
                          />
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <Button variant="outline">View Full Schedule</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Check-In Tab */}
                <TabsContent value="checkin" className="space-y-4">
                  <ClassCheckinInterface
                    className="Abstract Painting Basics"
                    time="2:30 PM - 4:00 PM"
                    location="Ginza Studio"
                    attendees={checkInAttendees}
                    onCheckIn={handleCheckIn}
                    onExport={handleCheckInExport}
                    onSave={handleCheckInSave}
                  />
                </TabsContent>

                {/* Availability Tab */}
                <TabsContent value="availability" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <AvailabilityCalendar month="January" year={2024} onSubmit={handleAvailabilitySubmit} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Quick Actions (Mobile-friendly) */}
            <Card className="md:hidden">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Calendar className="h-5 w-5" />
                    <span className="text-sm">Schedule Class</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Clock className="h-5 w-5" />
                    <span className="text-sm">Availability</span>
                  </Button>
                  <Button className="h-20 flex-col gap-2 bg-black text-white hover:bg-gray-800">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">Check In</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Users className="h-5 w-5" />
                    <span className="text-sm">Email</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
