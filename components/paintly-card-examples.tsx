"use client"

import { PaintlyCard } from "./paintly-card"

export function PaintlyCardExamples() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">PaintlyCard Component Examples</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Template Card Example */}
        <PaintlyCard
          type="template"
          image="/placeholder.svg?height=300&width=300&text=Watercolor+Landscape"
          title="Watercolor Landscape Basics"
          subtitle="Perfect for beginners"
          badges={[
            { text: "2 hours", variant: "outline" },
            { text: "Beginner", variant: "secondary" },
          ]}
          metaInfo={[
            { icon: "👥", text: "Used 24 times" },
            { icon: "⭐", text: "4.8 rating" },
          ]}
          primaryButton={{
            text: "Schedule",
            onClick: () => console.log("Schedule template"),
          }}
          secondaryButton={{
            text: "Edit",
            onClick: () => console.log("Edit template"),
            variant: "outline",
          }}
          onFavorite={() => console.log("Toggle favorite")}
          isFavorited={true}
          menuItems={[
            { label: "Duplicate", onClick: () => console.log("Duplicate") },
            { label: "Archive", onClick: () => console.log("Archive") },
            { label: "Delete", onClick: () => console.log("Delete") },
          ]}
        />

        {/* Instructor Card Example */}
        <PaintlyCard
          type="instructor"
          image="/images/cathy-avatar.png"
          title="Luci Martinez"
          subtitle="Watercolor & Acrylic Expert"
          badges={[
            { text: "Watercolor", variant: "default" },
            { text: "Acrylic", variant: "default" },
            { text: "Admin", variant: "secondary" },
          ]}
          metaInfo={[
            { icon: "📍", text: "Daikanyama Studio" },
            { icon: "🎨", text: "5 years experience" },
          ]}
          rating={4.9}
          primaryButton={{
            text: "Schedule",
            onClick: () => console.log("Schedule with Luci"),
          }}
          secondaryButton={{
            text: "View Details",
            onClick: () => console.log("View Luci details"),
            variant: "outline",
          }}
          onFavorite={() => console.log("Toggle favorite instructor")}
          isFavorited={false}
          menuItems={[
            { label: "Send Message", onClick: () => console.log("Send message") },
            { label: "View Schedule", onClick: () => console.log("View schedule") },
          ]}
        />

        {/* Location Card Example */}
        <PaintlyCard
          type="location"
          image="/placeholder.svg?height=200&width=300&text=Daikanyama+Studio"
          title="Daikanyama Studio"
          subtitle="1-2-3 Daikanyama, Shibuya City, Tokyo"
          badges={[
            { text: "Flagship", variant: "default" },
            { text: "Capacity: 20", variant: "outline" },
          ]}
          metaInfo={[
            { icon: "🚇", text: "5 min from station" },
            { icon: "🅿️", text: "Parking available" },
          ]}
          primaryButton={{
            text: "View Details",
            onClick: () => console.log("View Daikanyama details"),
          }}
          secondaryButton={{
            text: "Schedule Event",
            onClick: () => console.log("Schedule at Daikanyama"),
            variant: "outline",
          }}
          onFavorite={() => console.log("Toggle favorite location")}
          isFavorited={true}
          menuItems={[
            { label: "Edit Location", onClick: () => console.log("Edit location") },
            { label: "View Analytics", onClick: () => console.log("View analytics") },
          ]}
        />

        {/* Private Event Card Example */}
        <PaintlyCard
          type="event"
          image="/placeholder.svg?height=200&width=300&text=Corporate+Team+Building"
          title="Corporate Team Building Workshop"
          subtitle="Tech Company Annual Retreat"
          badges={[
            { text: "Corporate", variant: "default" },
            { text: "Premium", variant: "secondary" },
          ]}
          metaInfo={[
            { icon: "📅", text: "Dec 15, 2024" },
            { icon: "👥", text: "25 participants" },
            { icon: "💰", text: "¥150,000" },
          ]}
          primaryButton={{
            text: "View Details",
            onClick: () => console.log("View event details"),
          }}
          secondaryButton={{
            text: "Schedule Event",
            onClick: () => console.log("Schedule similar event"),
            variant: "outline",
          }}
          onFavorite={() => console.log("Toggle favorite event")}
          isFavorited={false}
          menuItems={[
            { label: "Edit Event", onClick: () => console.log("Edit event") },
            { label: "Duplicate", onClick: () => console.log("Duplicate event") },
            { label: "Cancel", onClick: () => console.log("Cancel event") },
          ]}
        />

        {/* Template Card without Image */}
        <PaintlyCard
          type="template"
          image="/placeholder.svg?height=300&width=300&text=Abstract+Acrylic"
          title="Abstract Acrylic Techniques"
          subtitle="Advanced color mixing"
          badges={[
            { text: "3 hours", variant: "outline" },
            { text: "Advanced", variant: "secondary" },
          ]}
          metaInfo={[
            { icon: "👥", text: "Used 12 times" },
            { icon: "⭐", text: "4.6 rating" },
          ]}
          primaryButton={{
            text: "Schedule",
            onClick: () => console.log("Schedule template"),
          }}
          secondaryButton={{
            text: "Edit",
            onClick: () => console.log("Edit template"),
            variant: "outline",
          }}
          onFavorite={() => console.log("Toggle favorite")}
          isFavorited={false}
        />

        {/* Instructor Card without Image */}
        <PaintlyCard
          type="instructor"
          title="Momo Tanaka"
          subtitle="Creative Director"
          badges={[
            { text: "Digital Art", variant: "default" },
            { text: "Manager", variant: "secondary" },
          ]}
          metaInfo={[
            { icon: "📍", text: "Multiple Locations" },
            { icon: "🎨", text: "8 years experience" },
          ]}
          rating={4.8}
          primaryButton={{
            text: "Schedule",
            onClick: () => console.log("Schedule with Momo"),
          }}
          secondaryButton={{
            text: "View Details",
            onClick: () => console.log("View Momo details"),
            variant: "outline",
          }}
          onFavorite={() => console.log("Toggle favorite instructor")}
          isFavorited={true}
        />
      </div>
    </div>
  )
}
