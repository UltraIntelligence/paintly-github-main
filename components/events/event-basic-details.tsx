"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface EventBasicDetailsProps {
  name: {
    en: string
    jp: string
  }
  description: {
    en: string
    jp: string
  }
  category: string
  duration: number
  skillLevel: "beginner" | "intermediate" | "advanced"
}

export function EventBasicDetails({ name, description, category, duration, skillLevel }: EventBasicDetailsProps) {
  const [nameEn, setNameEn] = useState(name.en)
  const [nameJp, setNameJp] = useState(name.jp)
  const [descriptionEn, setDescriptionEn] = useState(description.en)
  const [descriptionJp, setDescriptionJp] = useState(description.jp)
  const [selectedCategory, setSelectedCategory] = useState(category)
  const [eventDuration, setEventDuration] = useState(duration)
  const [selectedSkillLevel, setSelectedSkillLevel] = useState(skillLevel)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="event-name">Event Name</Label>
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="jp">Japanese</TabsTrigger>
            </TabsList>
            <TabsContent value="en">
              <Input
                id="event-name-en"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="Enter event name in English"
              />
            </TabsContent>
            <TabsContent value="jp">
              <Input
                id="event-name-jp"
                value={nameJp}
                onChange={(e) => setNameJp(e.target.value)}
                placeholder="Enter event name in Japanese"
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label htmlFor="event-description">Description</Label>
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="jp">Japanese</TabsTrigger>
            </TabsList>
            <TabsContent value="en">
              <Textarea
                id="event-description-en"
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                placeholder="Enter event description in English"
                rows={4}
              />
            </TabsContent>
            <TabsContent value="jp">
              <Textarea
                id="event-description-jp"
                value={descriptionJp}
                onChange={(e) => setDescriptionJp(e.target.value)}
                placeholder="Enter event description in Japanese"
                rows={4}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Art & Creativity">Art & Creativity</SelectItem>
              <SelectItem value="Cooking & Culinary">Cooking & Culinary</SelectItem>
              <SelectItem value="Fitness & Wellness">Fitness & Wellness</SelectItem>
              <SelectItem value="Language & Culture">Language & Culture</SelectItem>
              <SelectItem value="Technology & Digital">Technology & Digital</SelectItem>
              <SelectItem value="Business & Professional">Business & Professional</SelectItem>
              <SelectItem value="Family & Kids">Family & Kids</SelectItem>
              <SelectItem value="Seasonal & Holiday">Seasonal & Holiday</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={eventDuration}
            onChange={(e) => setEventDuration(Number.parseInt(e.target.value))}
            min={15}
            step={15}
          />
        </div>

        <div className="space-y-2">
          <Label>Skill Level</Label>
          <RadioGroup
            value={selectedSkillLevel}
            onValueChange={(value) => setSelectedSkillLevel(value as "beginner" | "intermediate" | "advanced")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beginner" id="beginner" />
              <Label htmlFor="beginner" className="cursor-pointer">
                Beginner
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="intermediate" />
              <Label htmlFor="intermediate" className="cursor-pointer">
                Intermediate
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advanced" id="advanced" />
              <Label htmlFor="advanced" className="cursor-pointer">
                Advanced
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
