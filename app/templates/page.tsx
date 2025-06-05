"use client"

import { useState, useMemo } from "react"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeProvider } from "../../components/theme-provider"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { useFavorites } from "@/hooks/use-favorites"
import { FeaturedSection, FeaturedCard } from "@/components/featured-section"
import { NewTemplateWizard } from "@/components/new-template-wizard"
import { PaintlyCard } from "@/components/paintly-card"

const templatesData = [
  {
    id: 1,
    japaneseTitle: "モネ 睡蓮",
    englishTitle: "Monet Water Lilies",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    category: "Master Artists",
    scheduled: "12x this month",
    popular: true,
    description: "Create Monet's iconic water lilies with soft brushwork and impressionist techniques.",
    completionRate: "94%",
    averageRating: 4.8,
  },
  {
    id: 2,
    japaneseTitle: "たらし込みアート",
    englishTitle: "Paint Pouring",
    duration: "2 hours",
    canvas: "30cm Round",
    difficulty: "Beginner",
    category: "Paint Pouring",
    scheduled: "8x this month",
    popular: false,
    description: "Explore fluid art techniques with vibrant colors and organic patterns.",
    completionRate: "98%",
    averageRating: 4.6,
  },
  {
    id: 3,
    japaneseTitle: "キッズ カメレオン",
    englishTitle: "Kids Chameleon",
    duration: "2 hours",
    canvas: "30cm Round",
    difficulty: "Kids",
    category: "Kids Only",
    scheduled: "5x this month",
    popular: false,
    description: "Fun and colorful chameleon painting perfect for young artists.",
    completionRate: "100%",
    averageRating: 4.9,
  },
  {
    id: 4,
    japaneseTitle: "ピカソ自画像",
    englishTitle: "Picasso Self-Portrait",
    duration: "2.5 hours",
    canvas: "F6",
    difficulty: "Advanced",
    category: "Master Artists",
    scheduled: "3x this month",
    popular: false,
    description: "Master cubist techniques with this challenging Picasso-inspired self-portrait.",
    completionRate: "76%",
    averageRating: 4.7,
  },
  {
    id: 5,
    japaneseTitle: "東京タワー",
    englishTitle: "Tokyo Tower",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    category: "Seasonal",
    scheduled: "6x this month",
    popular: false,
    description: "Paint Tokyo's iconic landmark with sunset colors and urban atmosphere.",
    completionRate: "89%",
    averageRating: 4.5,
  },
  {
    id: 6,
    japaneseTitle: "ゴッホ星月夜",
    englishTitle: "Van Gogh Starry Night",
    duration: "2.5 hours",
    canvas: "F10",
    difficulty: "Advanced",
    category: "Master Artists",
    scheduled: "4x this month",
    popular: true,
    description: "Recreate Van Gogh's masterpiece with swirling brushstrokes and vibrant blues.",
    completionRate: "82%",
    averageRating: 4.9,
  },
  {
    id: 7,
    japaneseTitle: "キッズ ナマケモノ",
    englishTitle: "Kids Sloth",
    duration: "1.5 hours",
    canvas: "25cm Round",
    difficulty: "Kids",
    category: "Kids Only",
    scheduled: "7x this month",
    popular: false,
    description: "Adorable sloth painting that teaches patience and gentle brushwork.",
    completionRate: "96%",
    averageRating: 4.8,
  },
  {
    id: 8,
    japaneseTitle: "花瓶のひまわり",
    englishTitle: "Sunflowers Vase",
    duration: "2 hours",
    canvas: "F6",
    difficulty: "Intermediate",
    category: "All",
    scheduled: "9x this month",
    popular: false,
    description: "Bright and cheerful sunflowers in a classic still life composition.",
    completionRate: "91%",
    averageRating: 4.6,
  },
  {
    id: 9,
    japaneseTitle: "アルコールインク",
    englishTitle: "Alcohol Ink Art",
    duration: "2 hours",
    canvas: "30cm Round",
    difficulty: "Intermediate",
    category: "Paint Pouring",
    scheduled: "11x this month",
    popular: true,
    description: "Create stunning abstract art with alcohol inks and unique blending techniques.",
    completionRate: "87%",
    averageRating: 4.7,
  },
  {
    id: 10,
    japaneseTitle: "マティス 赤い室内",
    englishTitle: "Matisse Red Room",
    duration: "2.5 hours",
    canvas: "F10",
    difficulty: "Advanced",
    category: "Master Artists",
    scheduled: "2x this month",
    popular: false,
    description: "Explore Fauvism with bold colors and expressive brushwork.",
    completionRate: "79%",
    averageRating: 4.8,
  },
]

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.4,
    ease: [0.4, 0.0, 0.2, 1],
  },
}

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [activeCategory, setActiveCategory] = useState("All")
  const [showTemplateWizard, setShowTemplateWizard] = useState(false)
  const [categories, setCategories] = useState([
    "All",
    "Favorites",
    "Kids Only",
    "Master Artists",
    "Paint Pouring",
    "Seasonal",
  ])
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")

  const { toggleFavorite, isFavorite, favorites } = useFavorites("templates")

  const templates = templatesData || []

  // Get favorited templates for Featured section
  const featuredTemplates = useMemo(() => {
    return templates.filter((template) => isFavorite(template.id)).slice(0, 6)
  }, [templates, isFavorite, favorites])

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.japaneseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.englishTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || template.category === activeCategory
    const matchesFavorites = activeCategory !== "Favorites" || isFavorite(template.id)
    return matchesSearch && matchesCategory && matchesFavorites
  })

  const addNewCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      setCategories((prev) => [...prev, newCategoryName.trim()])
      setNewCategoryName("")
      setShowNewCategoryInput(false)
    }
  }

  const getCategoryCount = (category: string) => {
    if (category === "All") return templates.length
    if (category === "Favorites") return favorites.size
    return templates.filter((template) => template.category === category).length
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <AnimatePresence mode="wait">
            <motion.div key="templates" className="flex flex-1 flex-col" {...pageTransition}>
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <div className="px-4 lg:px-6">
                    {/* Featured Section */}
                    <FeaturedSection
                      title="Featured"
                      subtitle="Your most-used templates"
                      isEmpty={featuredTemplates.length === 0}
                    >
                      {featuredTemplates.map((template) => (
                        <FeaturedCard key={template.id}>
                          <PaintlyCard
                            type="template"
                            image={`/placeholder.svg?height=300&width=300&query=${encodeURIComponent(template.englishTitle + " " + template.category + " art painting featured")}`}
                            title={template.japaneseTitle}
                            subtitle={template.englishTitle}
                            badges={[
                              { text: template.difficulty, variant: "outline" },
                              { text: template.category, variant: "outline" },
                              { text: template.canvas, variant: "outline" },
                            ]}
                            metaInfo={[
                              { text: template.duration },
                              { text: `Used ${template.scheduled}` },
                              { text: `${template.averageRating} rating` },
                            ]}
                            rating={template.averageRating}
                            primaryButton={{
                              text: "Schedule",
                              onClick: () => console.log(`Schedule ${template.englishTitle}`),
                            }}
                            secondaryButton={{
                              text: "Edit",
                              onClick: () => console.log(`Edit ${template.englishTitle}`),
                            }}
                            onFavorite={() => toggleFavorite(template.id)}
                            isFavorited={isFavorite(template.id)}
                            menuItems={[
                              { label: "View Details", onClick: () => console.log(`View ${template.englishTitle}`) },
                              { label: "Duplicate", onClick: () => console.log(`Duplicate ${template.englishTitle}`) },
                              { label: "Archive", onClick: () => console.log(`Archive ${template.englishTitle}`) },
                            ]}
                            className="h-full"
                          />
                        </FeaturedCard>
                      ))}
                    </FeaturedSection>

                    {/* All Templates Section */}
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">All Templates</h2>
                        <p className="text-gray-600">Browse and manage your complete template library</p>
                      </div>

                      {/* Filters */}
                      <div className="space-y-4">
                        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                          <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="Search templates..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                            <SelectTrigger className="w-full sm:w-[200px]">
                              <SelectValue placeholder="All Locations" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Locations</SelectItem>
                              <SelectItem value="ginza">Artbar Ginza</SelectItem>
                              <SelectItem value="daikanyama">Artbar Daikanyama</SelectItem>
                              <SelectItem value="catstreet">Artbar Cat Street</SelectItem>
                              <SelectItem value="yokohama">Artbar Yokohama</SelectItem>
                            </SelectContent>
                          </Select>

                          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-auto">
                            <TabsList>
                              {categories.map((category) => (
                                <TabsTrigger key={category} value={category} className="gap-1">
                                  {category}{" "}
                                  <Badge
                                    variant="secondary"
                                    className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                                  >
                                    {getCategoryCount(category)}
                                  </Badge>
                                </TabsTrigger>
                              ))}
                            </TabsList>
                          </Tabs>

                          <div className="flex gap-2 ml-auto">
                            {showNewCategoryInput ? (
                              <div className="flex gap-2 items-center">
                                <Input
                                  value={newCategoryName}
                                  onChange={(e) => setNewCategoryName(e.target.value)}
                                  placeholder="Category name"
                                  className="w-32"
                                  onKeyPress={(e) => e.key === "Enter" && addNewCategory()}
                                />
                                <Button size="sm" onClick={addNewCategory}>
                                  Add
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setShowNewCategoryInput(false)
                                    setNewCategoryName("")
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button size="sm" variant="outline" onClick={() => setShowNewCategoryInput(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Category
                              </Button>
                            )}
                            <Button size="sm" onClick={() => setShowTemplateWizard(true)}>
                              Add Template
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Template Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {filteredTemplates.map((template) => (
                          <PaintlyCard
                            key={template.id}
                            type="template"
                            image={`/placeholder.svg?height=300&width=300&query=${encodeURIComponent(template.englishTitle + " " + template.category + " art painting")}`}
                            title={template.japaneseTitle}
                            subtitle={template.englishTitle}
                            badges={[
                              { text: template.difficulty, variant: "outline" },
                              { text: template.category, variant: "outline" },
                              { text: template.canvas, variant: "outline" },
                            ]}
                            metaInfo={[
                              { text: template.duration },
                              { text: template.canvas },
                              { text: `Used ${template.scheduled}` },
                            ]}
                            rating={template.averageRating}
                            primaryButton={{
                              text: "Schedule",
                              onClick: () => console.log(`Schedule ${template.englishTitle}`),
                            }}
                            secondaryButton={{
                              text: "Edit",
                              onClick: () => console.log(`Edit ${template.englishTitle}`),
                            }}
                            onFavorite={() => toggleFavorite(template.id)}
                            isFavorited={isFavorite(template.id)}
                            menuItems={[
                              { label: "View Details", onClick: () => console.log(`View ${template.englishTitle}`) },
                              { label: "Duplicate", onClick: () => console.log(`Duplicate ${template.englishTitle}`) },
                              { label: "Archive", onClick: () => console.log(`Archive ${template.englishTitle}`) },
                            ]}
                            className="h-full"
                          />
                        ))}
                      </div>

                      {filteredTemplates.length === 0 && (
                        <div className="text-center py-12">
                          <div className="text-gray-400 text-sm">No templates found matching your criteria.</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SidebarInset>
        <NewTemplateWizard open={showTemplateWizard} onOpenChange={setShowTemplateWizard} />
      </SidebarProvider>
    </ThemeProvider>
  )
}
