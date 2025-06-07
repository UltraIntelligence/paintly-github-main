"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { BriefcaseBusiness, Award } from "lucide-react"

interface InstructorHeaderProps {
  instructor: {
    id: string
    name: string
    nameJapanese?: string
    role: string
    languages: string[]
    rating: number
    avatar: string
    status: "Available" | "Busy" | "Offline"
    email: string
    phone?: string
    specialties: string[]
    experience: string
    certifications?: string[]
  }
  isAdmin: boolean
  isOwnProfile: boolean
}

export function InstructorHeader({ instructor, isAdmin, isOwnProfile }: InstructorHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700"
      case "Busy":
        return "bg-yellow-100 text-yellow-700"
      case "Offline":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Profile Photo and Basic Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
            <Avatar className="h-16 w-16">
              <AvatarImage src={instructor.avatar || "/placeholder.svg"} alt={instructor.name} />
              <AvatarFallback>
                {instructor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div>
                <h1 className="text-2xl font-bold">{instructor.name}</h1>
                {instructor.nameJapanese && <p className="text-muted-foreground">{instructor.nameJapanese}</p>}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">{instructor.role}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{instructor.languages.join(", ")}</span>
                <Badge className={getStatusColor(instructor.status)}>{instructor.status}</Badge>
              </div>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{instructor.rating}</span>
                <span className="text-sm text-muted-foreground">({instructor.rating})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specialties and Quick Stats */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {instructor.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <BriefcaseBusiness className="h-4 w-4 text-gray-500" />
                <span>{instructor.experience}</span>
              </div>
              {instructor.certifications && (
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-gray-500" />
                  <span>{instructor.certifications.length} Certifications</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
