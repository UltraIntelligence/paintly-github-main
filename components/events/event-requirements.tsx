"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

interface EventRequirementsProps {
  requirements: {
    minParticipants: number
    maxParticipants: number
    ageRestriction: {
      min: number
      max: number | null
    }
    prerequisites: string[]
  }
}

export function EventRequirements({ requirements }: EventRequirementsProps) {
  const [minParticipants, setMinParticipants] = useState(requirements.minParticipants)
  const [maxParticipants, setMaxParticipants] = useState(requirements.maxParticipants)
  const [minAge, setMinAge] = useState(requirements.ageRestriction.min)
  const [maxAge, setMaxAge] = useState(requirements.ageRestriction.max)
  const [prerequisites, setPrerequisites] = useState(requirements.prerequisites)

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, ""])
  }

  const handleRemovePrerequisite = (index: number) => {
    setPrerequisites(prerequisites.filter((_, i) => i !== index))
  }

  const handlePrerequisiteChange = (index: number, value: string) => {
    const updated = [...prerequisites]
    updated[index] = value
    setPrerequisites(updated)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Participants</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-participants">Minimum</Label>
              <Input
                id="min-participants"
                type="number"
                value={minParticipants}
                onChange={(e) => setMinParticipants(Number.parseInt(e.target.value))}
                min={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-participants">Maximum</Label>
              <Input
                id="max-participants"
                type="number"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number.parseInt(e.target.value))}
                min={1}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Age Restriction</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-age">Minimum Age</Label>
              <Input
                id="min-age"
                type="number"
                value={minAge}
                onChange={(e) => setMinAge(Number.parseInt(e.target.value))}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-age">Maximum Age (optional)</Label>
              <Input
                id="max-age"
                type="number"
                value={maxAge || ""}
                onChange={(e) => {
                  const value = e.target.value === "" ? null : Number.parseInt(e.target.value)
                  setMaxAge(value as number | null)
                }}
                min={0}
                placeholder="No maximum"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Prerequisites</h4>
            <Button size="sm" variant="outline" className="h-8" onClick={handleAddPrerequisite}>
              <Plus className="h-4 w-4 mr-1" />
              Add Prerequisite
            </Button>
          </div>

          {prerequisites.length > 0 ? (
            <div className="space-y-2">
              {prerequisites.map((prerequisite, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={prerequisite}
                    onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                    placeholder="e.g., Basic drawing skills"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-10 w-10 p-0 text-gray-500"
                    onClick={() => handleRemovePrerequisite(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No prerequisites required.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
