"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface EventImageUploadProps {
  currentImage: string
}

export function EventImageUpload({ currentImage }: EventImageUploadProps) {
  const [image, setImage] = useState(currentImage)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    // In a real app, you would handle file upload here
    // For this demo, we'll just simulate it
    setImage(currentImage)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you would handle file upload here
    // For this demo, we'll just simulate it
    setImage(currentImage)
  }

  const handleRemoveImage = () => {
    setImage("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Image</CardTitle>
      </CardHeader>
      <CardContent>
        {image ? (
          <div className="relative rounded-md overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt="Event image"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-md"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 rounded-full p-1 h-8 w-8"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-md p-6 text-center ${
              isDragging ? "border-primary bg-primary/5" : "border-gray-200"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <p className="text-sm font-medium">Drag and drop an image here, or</p>
              <label htmlFor="file-upload" className="mt-2 inline-block">
                <span className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer">
                  Browse files
                </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
