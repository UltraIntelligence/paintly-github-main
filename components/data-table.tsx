"use client"

import * as React from "react"
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { arrayMove, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { CheckCircle2Icon, GripVerticalIcon, LoaderIcon, MoreVerticalIcon, TrendingUpIcon } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Table, TableBody, TableHead, TableHeader, TableCell, TableRow } from "@/components/ui/table"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Progress } from "@/components/ui/progress"
import { CopyIcon, Globe, Users, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: "Header",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />
    },
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Section Type",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {row.original.type}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3">
        {row.original.status === "Done" ? (
          <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
        ) : (
          <LoaderIcon />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "target",
    header: () => <div className="w-full text-right">Target</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          })
        }}
      >
        <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          Target
        </Label>
        <Input
          className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background"
          defaultValue={row.original.target}
          id={`${row.original.id}-target`}
        />
      </form>
    ),
  },
  {
    accessorKey: "limit",
    header: () => <div className="w-full text-right">Limit</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          })
        }}
      >
        <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
          Limit
        </Label>
        <Input
          className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background"
          defaultValue={row.original.limit}
          id={`${row.original.id}-limit`}
        />
      </form>
    ),
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Assign reviewer"

      if (isAssigned) {
        return row.original.reviewer
      }

      return (
        <>
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            Reviewer
          </Label>
          <Select>
            <SelectTrigger className="h-8 w-40" id={`${row.original.id}-reviewer`}>
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
              <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
            </SelectContent>
          </Select>
        </>
      )
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
            <MoreVerticalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
      ))}
    </TableRow>
  )
}

function EventEditModal({ event, trigger }: { event: any; trigger: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [language, setLanguage] = React.useState<"en" | "jp">("en")
  const [isLoading, setIsLoading] = React.useState(false)

  // Form state for bilingual content
  const [formData, setFormData] = React.useState({
    en: {
      title: event.title.split(" ").slice(2).join(" "), // Extract English part
      description:
        "Experience the beauty of Monet's Water Lilies in this relaxing paint & sip session. Perfect for beginners and art enthusiasts alike.",
      whatsIncluded: "All painting materials, brushes, canvas, green tea, juice or water, light snacks",
      specialRequirements: "No prior painting experience required. Aprons provided.",
      policies: "24-hour cancellation policy. No outside food or drinks allowed.",
    },
    jp: {
      title: event.title.split(" ").slice(0, 2).join(" "), // Extract Japanese part
      description:
        "モネの睡蓮の美しさを体験できるリラックスしたペイント&シップセッションです。初心者からアート愛好家まで楽しめます。",
      whatsIncluded: "絵画材料一式、筆、キャンバス、緑茶、ジュースまたは水、軽食",
      specialRequirements: "絵画経験は不要です。エプロンをご用意しています。",
      policies: "24時間前キャンセルポリシー。外部からの飲食物の持ち込みは禁止です。",
    },
    general: {
      date: "2024-05-25",
      startTime: event.time.split("-")[0],
      endTime: event.time.split("-")[1],
      location: event.location,
      instructor: event.instructor,
      capacity: Number.parseInt(event.capacity.split("/")[1]),
      currentBookings: Number.parseInt(event.capacity.split("/")[0]),
      price: "¥4,400",
      status: event.status,
      heroImage: null,
      galleryImages: [],
    },
  })

  // Auto-populate other language when typing
  const handleContentChange = (field: string, value: string, lang: "en" | "jp") => {
    setFormData((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }))

    // Simple auto-population logic
    const otherLang = lang === "en" ? "jp" : "en"
    if (
      !formData[otherLang][field as keyof typeof formData.en] ||
      formData[otherLang][field as keyof typeof formData.en].includes("[Auto-generated]")
    ) {
      const autoText =
        lang === "en" ? `[Auto-generated] ${value}の日本語版` : `[Auto-generated] English version of ${value}`

      setFormData((prev) => ({
        ...prev,
        [otherLang]: { ...prev[otherLang], [field]: autoText },
      }))
    }
  }

  const handleSave = async (action: "save" | "publish") => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    if (action === "publish") {
      setIsOpen(false)
    }
  }

  const labels = {
    en: {
      eventBasics: "Event Basics",
      bookingDetails: "Booking Details",
      contentDetails: "Content & Details",
      eventTitle: "Event Title",
      date: "Date",
      startTime: "Start Time",
      endTime: "End Time",
      location: "Location",
      instructor: "Instructor",
      heroImage: "Hero Image",
      galleryImages: "Gallery Images",
      capacity: "Capacity",
      currentBookings: "Current Bookings",
      price: "Price",
      status: "Status",
      description: "Event Description",
      whatsIncluded: "What's Included",
      specialRequirements: "Special Requirements",
      policies: "Policies",
    },
    jp: {
      eventBasics: "イベント基本情報",
      bookingDetails: "予約詳細",
      contentDetails: "内容・詳細",
      eventTitle: "イベントタイトル",
      date: "日付",
      startTime: "開始時間",
      endTime: "終了時間",
      location: "場所",
      instructor: "講師",
      heroImage: "メイン画像",
      galleryImages: "ギャラリー画像",
      capacity: "定員",
      currentBookings: "現在の予約状況",
      price: "価格",
      status: "ステータス",
      description: "イベント説明",
      whatsIncluded: "含まれるもの",
      specialRequirements: "特別な要件",
      policies: "ポリシー",
    },
  }

  const t = labels[language]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              {language === "en" ? "Edit Event" : "イベント編集"}: {formData[language].title}
            </DialogTitle>
            <ToggleGroup
              type="single"
              value={language}
              onValueChange={(value) => value && setLanguage(value as "en" | "jp")}
            >
              <ToggleGroupItem value="en">EN</ToggleGroupItem>
              <ToggleGroupItem value="jp">日本語</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Basics Card */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                {t.eventBasics}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t.eventTitle}</Label>
                <Input
                  value={formData[language].title}
                  onChange={(e) => handleContentChange("title", e.target.value, language)}
                  placeholder={language === "en" ? "Enter English title" : "日本語タイトルを入力"}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{t.date}</Label>
                  <Input
                    type="date"
                    value={formData.general.date}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        general: { ...prev.general, date: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.startTime}</Label>
                  <Input
                    value={formData.general.startTime}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        general: { ...prev.general, startTime: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.endTime}</Label>
                  <Input
                    value={formData.general.endTime}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        general: { ...prev.general, endTime: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t.location}</Label>
                  <Select
                    value={formData.general.location}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        general: { ...prev.general, location: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Artbar Ginza">Artbar Ginza</SelectItem>
                      <SelectItem value="Artbar Shibuya">Artbar Shibuya</SelectItem>
                      <SelectItem value="Artbar Harajuku">Artbar Harajuku</SelectItem>
                      <SelectItem value="SPACES Shinjuku">SPACES Shinjuku</SelectItem>
                      <SelectItem value="Artbar Daikanyama">Artbar Daikanyama</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t.instructor}</Label>
                  <Select
                    value={formData.general.instructor}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        general: { ...prev.general, instructor: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yuki Tanaka">Yuki Tanaka</SelectItem>
                      <SelectItem value="Hiroshi Sato">Hiroshi Sato</SelectItem>
                      <SelectItem value="Akiko Yamada">Akiko Yamada</SelectItem>
                      <SelectItem value="Nanako">Nanako</SelectItem>
                      <SelectItem value="Naomi">Naomi</SelectItem>
                      <SelectItem value="Luci">Luci</SelectItem>
                      <SelectItem value="Jenna">Jenna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{t.heroImage}</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center aspect-video bg-muted/20">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <CopyIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? "Click to upload hero image" : "メイン画像をアップロード"}
                      </p>
                      <p className="text-xs text-muted-foreground">16:9 ratio recommended</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t.galleryImages}</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center aspect-square bg-muted/20"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <CopyIcon className="h-4 w-4 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">
                            {language === "en" ? "Add image" : "画像追加"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details Card */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t.bookingDetails}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{t.capacity}</Label>
                  <Input
                    type="number"
                    value={formData.general.capacity}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        general: { ...prev.general, capacity: Number(e.target.value) },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.currentBookings}</Label>
                  <div className="p-3 bg-background rounded border">
                    <div className="text-sm font-medium mb-2">
                      {formData.general.currentBookings} of {formData.general.capacity}{" "}
                      {language === "en" ? "booked" : "予約済み"}
                    </div>
                    <Progress
                      value={(formData.general.currentBookings / formData.general.capacity) * 100}
                      className="h-2"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t.price}</Label>
                  <Input
                    value={formData.general.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        general: { ...prev.general, price: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t.status}</Label>
                <Select
                  value={formData.general.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      general: { ...prev.general, status: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Live">Live</SelectItem>
                    <SelectItem value="Sold Out">Sold Out</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Content & Details Card */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t.contentDetails}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t.description}</Label>
                <Textarea
                  value={formData[language].description}
                  onChange={(e) => handleContentChange("description", e.target.value, language)}
                  rows={3}
                  placeholder={
                    language === "en" ? "Describe the event experience..." : "イベントの体験を説明してください..."
                  }
                />
                {formData[language].description.includes("[Auto-generated]") && (
                  <p className="text-xs text-muted-foreground">
                    {language === "en"
                      ? "Auto-generated content - please review and edit"
                      : "自動生成されたコンテンツ - 確認・編集してください"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{t.whatsIncluded}</Label>
                <Textarea
                  value={formData[language].whatsIncluded}
                  onChange={(e) => handleContentChange("whatsIncluded", e.target.value, language)}
                  rows={2}
                  placeholder={language === "en" ? "List what's included..." : "含まれるものをリストしてください..."}
                />
              </div>

              <div className="space-y-2">
                <Label>{t.specialRequirements}</Label>
                <Textarea
                  value={formData[language].specialRequirements}
                  onChange={(e) => handleContentChange("specialRequirements", e.target.value, language)}
                  rows={2}
                  placeholder={language === "en" ? "Any special requirements..." : "特別な要件があれば..."}
                />
              </div>

              <div className="space-y-2">
                <Label>{t.policies}</Label>
                <Textarea
                  value={formData[language].policies}
                  onChange={(e) => handleContentChange("policies", e.target.value, language)}
                  rows={2}
                  placeholder={language === "en" ? "Cancellation and other policies..." : "キャンセルポリシーなど..."}
                />
              </div>
            </CardContent>
          </Card>

          {/* Secondary Actions */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  {language === "en" ? "Preview as Customer" : "顧客として表示"}
                </Button>
                <Button variant="outline" size="sm">
                  <CopyIcon className="h-4 w-4 mr-2" />
                  {language === "en" ? "Copy Booking URL" : "予約URLをコピー"}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <CopyIcon className="h-4 w-4 mr-2" />
                      {language === "en" ? "Duplicate Event" : "イベントを複製"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>{language === "en" ? "Create Template" : "テンプレート作成"}</DropdownMenuItem>
                    <DropdownMenuItem>{language === "en" ? "Archive Event" : "イベントをアーカイブ"}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="destructive" size="sm" className="ml-auto">
                  {language === "en" ? "Cancel Event" : "イベントをキャンセル"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {language === "en" ? "Cancel" : "キャンセル"}
          </Button>
          <Button onClick={() => handleSave("save")} disabled={isLoading}>
            {isLoading
              ? language === "en"
                ? "Saving..."
                : "保存中..."
              : language === "en"
                ? "Save Changes"
                : "変更を保存"}
          </Button>
          <Button onClick={() => handleSave("publish")} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
            {language === "en" ? "Save & Publish" : "保存して公開"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data])

  // Filter states
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedLocation, setSelectedLocation] = React.useState("all-locations")
  const [selectedInstructor, setSelectedInstructor] = React.useState("all-instructors")
  const [selectedStatus, setSelectedStatus] = React.useState("all-status")
  const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date }>({})
  const [isDatePopoverOpen, setIsDatePopoverOpen] = React.useState(false)
  const [isFiltersPopoverOpen, setIsFiltersPopoverOpen] = React.useState(false)

  // Sample event data for filtering
  const allEvents = [
    {
      id: 1,
      title: "モネ 睡蓮 Monet Water Lilies",
      time: "6:00-8:00 PM",
      location: "Artbar Ginza",
      capacity: "8/12",
      status: "Active",
      instructor: "Yuki Tanaka",
      date: "May 25",
      section: "TODAY - May 25",
      image: "/placeholder.svg?height=96&width=96",
    },
    {
      id: 2,
      title: "ゴッホ 星月夜 Van Gogh Starry Night",
      time: "7:30-9:30 PM",
      location: "Artbar Shibuya",
      capacity: "12/15",
      status: "Live",
      instructor: "Hiroshi Sato",
      date: "May 25",
      section: "TODAY - May 25",
      image: "/placeholder.svg?height=96&width=96",
    },
    {
      id: 3,
      title: "北斎 神奈川沖浪裏 Hokusai Great Wave",
      time: "2:00-4:00 PM",
      location: "Artbar Harajuku",
      capacity: "6/10",
      status: "Active",
      instructor: "Akiko Yamada",
      date: "May 26",
      section: "TOMORROW - May 26",
      image: "/placeholder.svg?height=96&width=96",
    },
    {
      id: 4,
      title: "SPACES新宿で マネの花束 Manet's Roses & Tulips",
      time: "5:00-7:00 PM",
      location: "SPACES Shinjuku",
      capacity: "12/15",
      status: "Active",
      instructor: "Nanako",
      date: "May 26",
      section: "TOMORROW - May 26",
      image: "/placeholder.svg?height=96&width=96",
    },
    {
      id: 5,
      title: "F6 たらし込みポーリングアート Paint Pouring Fluid Art",
      time: "2:00-4:00 PM",
      location: "Artbar Cat Street Harajuku",
      capacity: "8/12",
      status: "Active",
      instructor: "Naomi",
      date: "May 27",
      section: "MAY 27",
      image: "/placeholder.svg?height=96&width=96",
    },
    {
      id: 6,
      title: "モロッコの青い階段 Morocco Blue Stairs",
      time: "6:00-8:00 PM",
      location: "Artbar Daikanyama",
      capacity: "10/14",
      status: "Active",
      instructor: "Luci",
      date: "May 27",
      section: "MAY 27",
      image: "/placeholder.svg?height=96&width=96",
    },
    {
      id: 7,
      title: "ポップアート ペットの絵 Pop-Art Paint Your Pet!",
      time: "6:00-8:00 PM",
      location: "Artbar Ginza",
      capacity: "15/15",
      status: "Sold Out",
      instructor: "Jenna",
      date: "May 27",
      section: "MAY 27",
      image: "/placeholder.svg?height=96&width=96",
    },
  ]

  // Update the sample event data to include templateId
  const todayEvents = [
    {
      id: 1,
      title: "モネ 睡蓮 Monet Water Lilies",
      time: "6:00-8:00 PM",
      location: "Artbar Ginza",
      capacity: "8/12",
      status: "Active",
      instructor: "Yuki Tanaka",
      date: "May 25",
      section: "TODAY - May 25",
      templateId: "monet-water-lilies",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      title: "ゴッホ 星月夜 Van Gogh Starry Night",
      time: "7:30-9:30 PM",
      location: "Artbar Shibuya",
      capacity: "12/15",
      status: "Live",
      instructor: "Hiroshi Sato",
      date: "May 25",
      section: "TODAY - May 25",
      templateId: "van-gogh-starry-night",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  // Filter events based on current filter states
  const filteredEvents = React.useMemo(() => {
    return allEvents.filter((event) => {
      // Search filter
      if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Location filter
      if (selectedLocation !== "all-locations" && event.location !== selectedLocation) {
        return false
      }

      // Instructor filter
      if (selectedInstructor !== "all-instructors" && event.instructor !== selectedInstructor) {
        return false
      }

      // Status filter
      if (selectedStatus !== "all-status" && event.status !== selectedStatus) {
        return false
      }

      return true
    })
  }, [searchTerm, selectedLocation, selectedInstructor, selectedStatus])

  // Group filtered events by section
  const groupedEvents = React.useMemo(() => {
    const groups: { [key: string]: typeof allEvents } = {}
    filteredEvents.forEach((event) => {
      if (!groups[event.section]) {
        groups[event.section] = []
      }
      groups[event.section].push(event)
    })
    return groups
  }, [filteredEvents])

  // Helper functions for date filtering
  const formatDateRange = () => {
    if (!dateRange.from && !dateRange.to) return "All Dates"
    if (dateRange.from && !dateRange.to) return `${dateRange.from.toLocaleDateString()}`
    if (dateRange.from && dateRange.to)
      return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
    return "All Dates"
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedLocation("all-locations")
    setSelectedInstructor("all-instructors")
    setSelectedStatus("all-status")
    setDateRange({})
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => <DraggableRow key={row.id} row={row} />)
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          {item.header}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gap-1">
          <SheetTitle>{item.header}</SheetTitle>
          <SheetDescription>Showing total visitors for the last 6 months</SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUpIcon className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just some random text to test the layout. It
                  spans multiple lines and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Header</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Table of Contents">Table of Contents</SelectItem>
                    <SelectItem value="Executive Summary">Executive Summary</SelectItem>
                    <SelectItem value="Technical Approach">Technical Approach</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">Focus Documents</SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">Target</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit">Limit</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Reviewer</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder="Select a reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
                  <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
          <Button className="w-full">Submit</Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Done
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
