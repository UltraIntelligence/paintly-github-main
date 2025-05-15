"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface SpecialPricing {
  price: number
  startDate: string
  endDate: string
  description: string
}

interface EventPricingProps {
  pricing: {
    regular: number
    member: number
    group: number
    special: SpecialPricing[]
  }
}

export function EventPricing({ pricing }: EventPricingProps) {
  const [regularPrice, setRegularPrice] = useState(pricing.regular)
  const [memberPrice, setMemberPrice] = useState(pricing.member)
  const [groupPrice, setGroupPrice] = useState(pricing.group)
  const [specialPricing, setSpecialPricing] = useState<SpecialPricing[]>(pricing.special)

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleAddSpecialPricing = () => {
    setSpecialPricing([
      ...specialPricing,
      {
        price: regularPrice,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Special Offer",
      },
    ])
  }

  const handleRemoveSpecialPricing = (index: number) => {
    setSpecialPricing(specialPricing.filter((_, i) => i !== index))
  }

  const handleSpecialPriceChange = (index: number, value: number) => {
    const updated = [...specialPricing]
    updated[index].price = value
    setSpecialPricing(updated)
  }

  const handleSpecialDescriptionChange = (index: number, value: string) => {
    const updated = [...specialPricing]
    updated[index].description = value
    setSpecialPricing(updated)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="regular-price">Regular Price</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">¥</span>
              <Input
                id="regular-price"
                type="number"
                value={regularPrice}
                onChange={(e) => setRegularPrice(Number.parseInt(e.target.value))}
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="member-price">Member Price</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">¥</span>
              <Input
                id="member-price"
                type="number"
                value={memberPrice}
                onChange={(e) => setMemberPrice(Number.parseInt(e.target.value))}
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="group-price">Group Price (per person)</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">¥</span>
              <Input
                id="group-price"
                type="number"
                value={groupPrice}
                onChange={(e) => setGroupPrice(Number.parseInt(e.target.value))}
                className="pl-8"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Special Pricing Periods</h4>
            <Button size="sm" variant="outline" className="h-8" onClick={handleAddSpecialPricing}>
              <Plus className="h-4 w-4 mr-1" />
              Add Special Price
            </Button>
          </div>

          {specialPricing.length > 0 ? (
            <div className="space-y-4">
              {specialPricing.map((special, index) => (
                <div key={index} className="p-4 border rounded-md space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Special Offer</h5>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveSpecialPricing(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price</Label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">¥</span>
                        <Input
                          type="number"
                          value={special.price}
                          onChange={(e) => handleSpecialPriceChange(index, Number.parseInt(e.target.value))}
                          className="pl-8"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        value={special.description}
                        onChange={(e) => handleSpecialDescriptionChange(index, e.target.value)}
                        placeholder="e.g., Summer Special"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(new Date(special.startDate), "PPP")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={new Date(special.startDate)}
                            onSelect={(date) => {
                              if (date) {
                                const updated = [...specialPricing]
                                updated[index].startDate = date.toISOString()
                                setSpecialPricing(updated)
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(new Date(special.endDate), "PPP")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={new Date(special.endDate)}
                            onSelect={(date) => {
                              if (date) {
                                const updated = [...specialPricing]
                                updated[index].endDate = date.toISOString()
                                setSpecialPricing(updated)
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No special pricing periods set.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
