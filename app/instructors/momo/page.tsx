"use client"

import { useState } from "react"
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
import { BriefcaseBusiness, Mail, Phone, Award, GraduationCap, BookOpen } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { Form } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { Edit } from "lucide-react"
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

export default function MomoDetailPage() {
  const currentUser = { id: "1", role: "admin" }
  const isAdmin = currentUser.role === "admin"
  const isOwnProfile = currentUser.id === "momo"

  const instructor = {
    id: "momo",
    name: "Momo",
    nameJapanese: "モモ",
    role: "Senior Art Instructor",
    languages: ["English", "Japanese"],
    rating: 4.9,
    avatar: "/placeholder.svg?height=64&width=64",
    status: "Available" as const,
    email: "momo@artbar.tokyo",
    phone: "+81-90-1234-0003",
    specialties: ["Abstract Art", "Dot Technique", "Color Theory", "Professional Art Guidance"],
    bio: "Momo is an awesome instructor and specializes in her original dot technique art style and abstract art! She is also very bright and knows a lot about different paint mediums, she offers extremely good advice about color theory! Come join her class sometime and get to learn about her unique style.",
    experience: "10+ years",
    certifications: ["Musashino Art University of Science of Design", "Abstract Art Specialist", "Color Theory Expert"],
  }

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
      time: "10:00 AM",
      title: "Abstract Dot Technique",
      location: "Cat Street",
      studentCount: 16,
    },
    studentsToday: 64,
    classesScheduled: 4,
    hoursToday: "6.5",
    workingHours: "9:30 AM - 7:00 PM",
  }

  const upcomingClasses = [
    {
      id: "1",
      title: "Abstract Dot Technique",
      time: "10:00 AM - 11:30 AM",
      location: "Cat Street Studio",
      students: 16,
      status: "upcoming",
    },
    {
      id: "2",
      title: "Color Theory Workshop",
      time: "1:00 PM - 2:30 PM",
      location: "Cat Street Studio",
      students: 18,
      status: "upcoming",
    },
    {
      id: "3",
      title: "Advanced Abstract Art",
      time: "3:30 PM - 5:00 PM",
      location: "Cat Street Studio",
      students: 15,
      status: "upcoming",
    },
    {
      id: "4",
      title: "Professional Techniques",
      time: "5:30 PM - 7:00 PM",
      location: "Cat Street Studio",
      students: 15,
      status: "upcoming",
    },
  ]

  const [checkInAttendees, setCheckInAttendees] = useState([
    {
      id: "1",
      name: "Akira Suzuki",
      memberNumber: "567890",
      notes: ["Advanced student"],
      specialTags: [{ text: "Advanced student", type: "vip" as const }],
      checkedIn: false,
    },
    {
      id: "2",
      name: "Maria Santos",
      memberNumber: "678901",
      notes: ["Loves dot technique"],
      specialTags: [{ text: "Loves dot technique", type: "info" as const }],
      checkedIn: false,
    },
    {
      id: "3",
      name: "Taro Yamamoto",
      memberNumber: "789012",
      notes: [],
      specialTags: [],
      checkedIn: false,
    },
    {
      id: "4",
      name: "Lisa Kim",
      memberNumber: "890123",
      notes: ["Color theory enthusiast"],
      specialTags: [{ text: "Color theory enthusiast", type: "info" as const }],
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
  }

  const handleCheckInExport = () => {
    console.log("Exporting check-in data...")
  }

  const handleCheckInSave = () => {
    console.log("Saving check-in data...")
  }

  const experienceYears = Number.parseInt(instructor.experience.replace(/\D/g, "")) || 0
  const experiencePercentage = Math.min(Math.round((experienceYears / 15) * 100), 100)

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
            <InstructorHeader instructor={instructor} isAdmin={isAdmin} isOwnProfile={isOwnProfile} />
            <InstructorTodayStatus {...todayStatus} />

            <div className="space-y-4">
              <Tabs defaultValue="schedule" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="checkin">Check-In</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                  {isEditing ? (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Form content similar to Naomi's page */}
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
                                className="bg-pink-500 h-2 rounded-full"
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
                                <div className="bg-pink-100 p-1 rounded-full">
                                  <GraduationCap className="h-4 w-4 text-pink-600" />
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
                              capacity: `${class_.students}/18`,
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

                <TabsContent value="checkin" className="space-y-4">
                  <ClassCheckinInterface
                    className="Abstract Dot Technique"
                    time="10:00 AM - 11:30 AM"
                    location="Cat Street Studio"
                    attendees={checkInAttendees}
                    onCheckIn={handleCheckIn}
                    onExport={handleCheckInExport}
                    onSave={handleCheckInSave}
                  />
                </TabsContent>

                <TabsContent value="availability" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <AvailabilityCalendar month="January" year={2024} onSubmit={handleAvailabilitySubmit} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
