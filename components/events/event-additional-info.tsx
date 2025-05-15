"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"

interface TemplateUsage {
  id: string
  name: string
  date: string
  location: string
  instructor: string
}

interface EventAdditionalInfoProps {
  materials: string[]
  specialInstructions: string
  internalNotes: string
  isTemplate: boolean
  templateUsage: TemplateUsage[]
}

export function EventAdditionalInfo({
  materials,
  specialInstructions,
  internalNotes,
  isTemplate,
  templateUsage,
}: EventAdditionalInfoProps) {
  const [materialsList, setMaterialsList] = useState(materials)
  const [instructions, setInstructions] = useState(specialInstructions)
  const [notes, setNotes] = useState(internalNotes)

  const handleAddMaterial = () => {
    setMaterialsList([...materialsList, ""])
  }

  const handleRemoveMaterial = (index: number) => {
    setMaterialsList(materialsList.filter((_, i) => i !== index))
  }

  const handleMaterialChange = (index: number, value: string) => {
    const updated = [...materialsList]
    updated[index] = value
    setMaterialsList(updated)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Materials Needed</h4>
              <Button size="sm" variant="outline" className="h-8" onClick={handleAddMaterial}>
                <Plus className="h-4 w-4 mr-1" />
                Add Material
              </Button>
            </div>

            {materialsList.length > 0 ? (
              <div className="space-y-2">
                {materialsList.map((material, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={material}
                      onChange={(e) => handleMaterialChange(index, e.target.value)}
                      placeholder="e.g., Acrylic paints"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-10 w-10 p-0 text-gray-500"
                      onClick={() => handleRemoveMaterial(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No materials listed.</p>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Special Instructions</h4>
            <Textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Instructions for participants or instructors"
              rows={5}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Internal Notes</h4>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes visible only to staff"
              rows={5}
            />
          </div>
        </div>

        {isTemplate && templateUsage.length > 0 && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-medium">Template Usage History</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Event Name</th>
                    <th className="text-left py-2 font-medium">Date</th>
                    <th className="text-left py-2 font-medium">Location</th>
                    <th className="text-left py-2 font-medium">Instructor</th>
                  </tr>
                </thead>
                <tbody>
                  {templateUsage.map((usage) => (
                    <tr key={usage.id} className="border-b">
                      <td className="py-2">{usage.name}</td>
                      <td className="py-2">{formatDate(usage.date)}</td>
                      <td className="py-2">{usage.location}</td>
                      <td className="py-2">{usage.instructor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
