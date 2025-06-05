import { CardContent } from "@/components/ui/card"
import { CalendarIcon, ChevronDownIcon, FilterIcon, SearchIcon } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PaintlyEventCard } from "./paintly-event-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EventsSection() {
  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="mb-1">Upcoming Events</CardTitle>
              <CardDescription>Manage your scheduled painting workshops</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Select defaultValue="all-locations">
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-locations">All Locations</SelectItem>
                  <SelectItem value="shibuya">Shibuya Studio</SelectItem>
                  <SelectItem value="ginza">Ginza Studio</SelectItem>
                  <SelectItem value="ueno">Ueno Studio</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-instructors">
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="All Instructors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-instructors">All Instructors</SelectItem>
                  <SelectItem value="yuki">Yuki Tanaka</SelectItem>
                  <SelectItem value="hiroshi">Hiroshi Sato</SelectItem>
                  <SelectItem value="kenji">Kenji Yamada</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="h-9 gap-2">
                <CalendarIcon className="h-4 w-4" />
                All Dates
                <ChevronDownIcon className="h-4 w-4" />
              </Button>

              <div className="relative">
                <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search events..." className="w-[200px] lg:w-[250px] pl-9 h-9" />
              </div>

              <Button variant="outline" className="h-9 gap-2">
                <FilterIcon className="h-4 w-4" />
                Filters
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
