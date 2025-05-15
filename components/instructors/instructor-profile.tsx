"use client"

import type React from "react"

import { useState } from "react"
import { PencilIcon, UploadIcon } from "lucide-react"
import type { Instructor } from "./instructor-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export function InstructorProfile({ instructor }: { instructor: Instructor }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: instructor.name,
    email: "instructor@paintly.com", // Example data
    phone: "+81 90-1234-5678", // Example data
    bioEn:
      "Specializing in watercolor and traditional Japanese painting techniques. Over 10 years of teaching experience with students of all ages and skill levels.",
    bioJp:
      "水彩画と日本の伝統的な絵画技法を専門としています。あらゆる年齢とスキルレベルの学生と10年以上の教育経験があります。",
    startDate: "2018-05-15", // Example data
    certifications: "Certified Art Educator, Master of Fine Arts", // Example data
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log("Saving profile data:", formData)
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Personal and professional details</CardDescription>
        </div>
        <Button variant={isEditing ? "ghost" : "outline"} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <PencilIcon className="mr-2 h-4 w-4" /> Edit Profile
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-[1fr_2fr]">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-full aspect-square max-w-full">
              <Avatar className="h-full w-full rounded-md border">
                <AvatarImage
                  src={instructor.photo || "/placeholder.svg"}
                  alt={instructor.name}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-md text-4xl">{instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            {isEditing && (
              <Button variant="outline" size="sm" className="w-full">
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload Photo
              </Button>
            )}
            <div className="w-full space-y-2 text-center">
              <h3 className="font-medium">Role</h3>
              <div className="flex flex-wrap justify-center gap-1">
                {instructor.role.map((role) => (
                  <Badge key={role} variant="outline">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} readOnly={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} readOnly={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {/* Bio with Language Tabs */}
            <div className="space-y-2">
              <Label>Biography</Label>
              <Tabs defaultValue="en">
                <TabsList>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="jp">日本語</TabsTrigger>
                </TabsList>
                <TabsContent value="en" className="mt-2">
                  <Textarea
                    name="bioEn"
                    value={formData.bioEn}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    rows={4}
                  />
                </TabsContent>
                <TabsContent value="jp" className="mt-2">
                  <Textarea
                    name="bioJp"
                    value={formData.bioJp}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    rows={4}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications</Label>
              <Input
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Languages and Specialties */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-medium">Languages</h3>
            <div className="flex flex-wrap gap-1.5">
              {instructor.languages.map((lang) => (
                <Badge key={lang.code} variant="secondary">
                  {lang.name} ({lang.code})
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Specialties</h3>
            <div className="flex flex-wrap gap-1.5">
              {instructor.specialties.map((specialty) => (
                <Badge key={specialty} className="bg-primary/10 text-primary hover:bg-primary/20">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      {isEditing && (
        <CardFooter className="flex justify-end gap-2 border-t bg-muted/20 px-6 py-4">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      )}
    </Card>
  )
}
