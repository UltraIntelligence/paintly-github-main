import { CardContent } from "@/components/ui/card"
import { CalendarIcon, ChevronDownIcon, FilterIcon, SearchIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PaintlyEventCard } from "./paintly-event-card"

export function EventsSection() {
  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Manage your scheduled painting workshops</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Tabs defaultValue="today" className="w-auto">
                <TabsList>
                  <TabsTrigger value="today" className="flex gap-2">
                    Today{" "}
                    <Badge variant="secondary" className="rounded-full">
                      2
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="scheduled" className="flex gap-2">
                    Scheduled{" "}
                    <Badge variant="secondary" className="rounded-full">
                      15
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="flex-1 flex flex-col md:flex-row gap-3">
              <Button variant="outline" className="justify-between w-full md:w-auto">
                All Locations
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="justify-between w-full md:w-auto">
                All Instructors
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="justify-between w-full md:w-auto">
                <CalendarIcon className="mr-2 h-4 w-4" />
                All Dates
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search events..." className="w-full pl-8 md:w-[200px] lg:w-[300px]" />
              </div>
              <Button variant="outline" className="gap-2">
                <FilterIcon className="h-4 w-4" />
                Filters
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="today" className="w-full">
            <TabsContent value="today" className="space-y-4 mt-0">
              <PaintlyEventCard
                title="Monet Water Lilies Workshop"
                titleJp="モネの睡蓮ワークショップ"
                subtitle="Impressionist watercolor techniques"
                participants={{ current: 8, capacity: 12 }}
                time="9:00 AM - 11:00 AM"
                location="Shibuya Studio"
                instructor="Yuki Tanaka"
                status="Scheduled"
                onAction={() => {
                  /* navigation logic */
                }}
                actionText="View Details"
              />
              <PaintlyEventCard
                title="Van Gogh Starry Night"
                titleJp="ゴッホの星月夜"
                subtitle="Post-impressionist oil painting"
                participants={{ current: 15, capacity: 16 }}
                time="2:00 PM - 4:00 PM"
                location="Ginza Studio"
                instructor="Hiroshi Sato"
                status="Live"
                onAction={() => {
                  /* navigation logic */
                }}
                actionText="Join Now"
              />
            </TabsContent>
            <TabsContent value="scheduled" className="space-y-4 mt-0">
              <PaintlyEventCard
                title="Picasso Guernica Study"
                titleJp="ピカソのゲルニカ研究"
                subtitle="Cubist painting techniques"
                participants={{ current: 5, capacity: 10 }}
                time="10:00 AM - 12:00 PM"
                location="Ueno Studio"
                instructor="Kenji Yamada"
                status="Scheduled"
                onAction={() => {
                  /* navigation logic */
                }}
                actionText="View Details"
              />
              <PaintlyEventCard
                title="Frida Kahlo Self-Portrait"
                titleJp="フリーダ・カーロの自画像"
                subtitle="Surrealist self-portraiture"
                participants={{ current: 10, capacity: 12 }}
                time="3:00 PM - 5:00 PM"
                location="Shinjuku Studio"
                instructor="Akari Suzuki"
                status="Scheduled"
                onAction={() => {
                  /* navigation logic */
                }}
                actionText="Register"
              />
              <PaintlyEventCard
                title="Hokusai Great Wave Workshop"
                titleJp="北斎の大波ワークショップ"
                subtitle="Traditional Japanese woodblock printing"
                participants={{ current: 7, capacity: 15 }}
                time="1:00 PM - 4:00 PM"
                location="Yokohama Studio"
                instructor="Takashi Murakami"
                status="Scheduled"
                onAction={() => {
                  /* navigation logic */
                }}
                actionText="View Details"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
