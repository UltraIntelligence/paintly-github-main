"use client"

import type React from "react"

import { useState } from "react"
import { Search, LayoutGrid, List, ChevronDown } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface EventsFiltersProps {
  onSearchChange: (search: string) => void
  onSortChange: (sort: string) => void
  onViewChange: (view: "grid" | "list") => void
  view: "grid" | "list"
}

export function EventsFilters({ onSearchChange, onSortChange, onViewChange, view }: EventsFiltersProps) {
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("Last Modified")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    onSearchChange(e.target.value)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    onSortChange(sort)
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input placeholder="Search templates..." value={search} onChange={handleSearchChange} className="pl-8" />
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto shadow-sm">
              Sort: {sortBy}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["Name", "Price", "Duration", "Last Modified", "Most Scheduled"].map((sort) => (
              <DropdownMenuItem key={sort} onClick={() => handleSortChange(sort)} className="cursor-pointer">
                {sort}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
          <Button
            variant={view === "grid" ? "default" : "ghost"}
            size="sm"
            className={`rounded-none px-2 ${view === "grid" ? "bg-blue-600" : ""}`}
            onClick={() => onViewChange("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="sm"
            className={`rounded-none px-2 ${view === "list" ? "bg-blue-600" : ""}`}
            onClick={() => onViewChange("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
