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
import {
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
  GripVerticalIcon,
  LoaderIcon,
  MoreVerticalIcon,
  PlusIcon,
  TrendingUpIcon,
} from "lucide-react"
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
  DropdownMenuCheckboxItem,
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
import { TableCell, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <Tabs defaultValue="today" className="flex w-full flex-col justify-start gap-2">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="outline">
          <SelectTrigger className="@4xl/main:hidden flex w-fit" id="view-selector">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="@4xl/main:flex hidden">
          <TabsTrigger value="today" className="gap-1">
            Today{" "}
            <Badge
              variant="secondary"
              className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
            >
              2
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="gap-1">
            Scheduled{" "}
            <Badge
              variant="secondary"
              className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
            >
              15
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Conditional rendering: Show original buttons for Today tab, filters for Scheduled tab */}
        <Tabs defaultValue="today" className="contents">
          <TabsContent value="today" className="contents m-0 data-[state=inactive]:hidden">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ColumnsIcon />
                    <span className="hidden lg:inline">Customize Columns</span>
                    <span className="lg:hidden">Columns</span>
                    <ChevronDownIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {table
                    .getAllColumns()
                    .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm">
                <PlusIcon />
                <span className="hidden lg:inline">Add Section</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="contents m-0 data-[state=inactive]:hidden">
            {/* Filter Bar for Scheduled Tab */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-2">
              <div className="hidden md:flex items-center gap-2">
                <Select defaultValue="all-locations">
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-locations">All Locations</SelectItem>
                    <SelectItem value="artbar-ginza">Artbar Ginza</SelectItem>
                    <SelectItem value="artbar-shibuya">Artbar Shibuya</SelectItem>
                    <SelectItem value="artbar-harajuku">Artbar Harajuku</SelectItem>
                    <SelectItem value="artbar-omotesando">Artbar Omotesando</SelectItem>
                    <SelectItem value="artbar-daikanyama">Artbar Daikanyama</SelectItem>
                    <SelectItem value="artbar-shinjuku">Artbar Shinjuku</SelectItem>
                    <SelectItem value="artbar-yokohama">Artbar Yokohama</SelectItem>
                    <SelectItem value="spaces-shinjuku">SPACES Shinjuku</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all-instructors">
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="All Instructors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-instructors">All Instructors</SelectItem>
                    <SelectItem value="yuki-tanaka">Yuki Tanaka</SelectItem>
                    <SelectItem value="hiroshi-sato">Hiroshi Sato</SelectItem>
                    <SelectItem value="akiko-yamada">Akiko Yamada</SelectItem>
                    <SelectItem value="nanako">Nanako</SelectItem>
                    <SelectItem value="naomi">Naomi</SelectItem>
                    <SelectItem value="luci">Luci</SelectItem>
                    <SelectItem value="jenna">Jenna</SelectItem>
                    <SelectItem value="mei-suzuki">Mei Suzuki</SelectItem>
                    <SelectItem value="kenji-nakamura">Kenji Nakamura</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="select-dates">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select dates" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="select-dates">Select dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="next-week">Next Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                  </SelectContent>
                </Select>

                <Input placeholder="Search events..." className="w-40" />

                <Button variant="outline" size="sm">
                  More Filters
                  <ChevronDownIcon />
                </Button>
              </div>

              {/* Mobile filter dropdown */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Filters
                      <ChevronDownIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="p-2 space-y-2">
                      <Input placeholder="Search events..." />
                      <Select defaultValue="all-locations">
                        <SelectTrigger>
                          <SelectValue placeholder="All Locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-locations">All Locations</SelectItem>
                          <SelectItem value="artbar-ginza">Artbar Ginza</SelectItem>
                          <SelectItem value="artbar-shibuya">Artbar Shibuya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <TabsContent value="today" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="space-y-4">
          {/* Event Card 1 - Monet Water Lilies */}
          <div className="group hover:bg-muted/50 border rounded-lg p-4 bg-white">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              {/* Column 1: Thumbnail */}
              <div className="flex items-start gap-1 md:basis-1/5">
                <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
                  <img
                    src="/placeholder.svg?height=96&width=96&query=monet water lilies painting"
                    alt="Monet Water Lilies"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 md:hidden">
                  <h3 className="font-medium text-sm mb-1">モネ 睡蓮 Monet Water Lilies</h3>
                  <p className="text-xs text-muted-foreground">6:00-8:00 PM • Artbar Ginza</p>
                </div>
              </div>

              {/* Column 2: Event Details (Desktop only) */}
              <div className="hidden md:block md:basis-1/4">
                <h3 className="font-medium text-base mb-1">モネ 睡蓮 Monet Water Lilies</h3>
                <p className="text-sm text-muted-foreground">6:00-8:00 PM • Artbar Ginza</p>
              </div>

              {/* Column 3: Capacity & Progress */}
              <div className="flex items-center gap-3 md:flex-col md:items-start md:basis-1/5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">8/12</span>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-primary rounded-full"></div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs px-2 py-1">
                  Starting in 2 hours
                </Badge>
              </div>

              {/* Column 4: Status & Instructor */}
              <div className="flex items-center justify-between md:flex-col md:items-start md:basis-1/4 md:gap-2">
                <Badge variant="outline" className="flex gap-1 px-2 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Active
                </Badge>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-muted border overflow-hidden">
                    <img
                      src="/placeholder.svg?height=28&width=28&query=japanese woman instructor"
                      alt="Yuki Tanaka"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm">Yuki Tanaka</span>
                </div>
              </div>

              {/* Column 5: Actions */}
              <div className="flex flex-row gap-2 md:flex-col md:gap-2 md:basis-1/6">
                <Button variant="outline" size="default" className="flex-1 h-9">
                  Edit
                </Button>
                <Button variant="outline" size="default" className="flex-1 h-9">
                  View Bookings
                </Button>
              </div>
            </div>
          </div>

          {/* Event Card 2 - Van Gogh Starry Night */}
          <div className="group hover:bg-muted/50 border rounded-lg p-4 bg-white">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              <div className="flex items-start gap-2 md:basis-1/5">
                <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
                  <img
                    src="/placeholder.svg?height=96&width=96&query=van gogh starry night painting"
                    alt="Van Gogh Starry Night"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 md:hidden">
                  <h3 className="font-medium text-sm mb-1">ゴッホ 星月夜 Van Gogh Starry Night</h3>
                  <p className="text-xs text-muted-foreground">7:30-9:30 PM • Artbar Shibuya</p>
                </div>
              </div>

              <div className="hidden md:block md:basis-1/4">
                <h3 className="font-medium text-base mb-1">ゴッホ 星月夜 Van Gogh Starry Night</h3>
                <p className="text-sm text-muted-foreground">7:30-9:30 PM • Artbar Shibuya</p>
              </div>

              <div className="flex items-center gap-3 md:flex-col md:items-start md:basis-1/5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">12/15</span>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-primary rounded-full"></div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs px-2 py-1 bg-green-100 text-green-700">
                  In progress
                </Badge>
              </div>

              <div className="flex items-center justify-between md:flex-col md:items-start md:basis-1/4 md:gap-2">
                <Badge className="flex gap-1 px-2 bg-blue-500 text-white animate-pulse">Live</Badge>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-muted border overflow-hidden">
                    <img
                      src="/placeholder.svg?height=28&width=28&query=japanese man instructor"
                      alt="Hiroshi Sato"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm">Hiroshi Sato</span>
                </div>
              </div>

              <div className="flex flex-row gap-2 md:flex-col md:gap-2 md:basis-1/6">
                <Button variant="outline" size="default" className="flex-1 h-9">
                  Edit
                </Button>
                <Button variant="outline" size="default" className="flex-1 h-9">
                  View Bookings
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">2 of 2 events today</div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Events per page
              </Label>
              <Select defaultValue="10">
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">Page 1 of 1</div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" disabled>
                <ChevronsLeftIcon />
              </Button>
              <Button variant="outline" className="size-8" size="icon" disabled>
                <ChevronLeftIcon />
              </Button>
              <Button variant="outline" className="size-8" size="icon" disabled>
                <ChevronRightIcon />
              </Button>
              <Button variant="outline" className="hidden size-8 lg:flex" size="icon" disabled>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="scheduled" className="relative flex flex-col gap-2 overflow-auto px-4 lg:px-6">
        {/* Events List - removed separate filter bar */}
        <div className="space-y-6">
          {/* TODAY Section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">TODAY - May 25</h3>
            <div className="space-y-4">
              {/* Event 1 - Monet Water Lilies */}
              <div className="group hover:bg-muted/50 border rounded-lg p-4 bg-white">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="flex items-start gap-1 md:basis-1/5">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
                      <img
                        src="/placeholder.svg?height=96&width=96&query=monet water lilies painting"
                        alt="Monet Water Lilies"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 md:hidden">
                      <h3 className="font-medium text-sm mb-1">モネ 睡蓮 Monet Water Lilies</h3>
                      <p className="text-xs text-muted-foreground">6:00-8:00 PM • Artbar Ginza</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:basis-1/4">
                    <h3 className="font-medium text-base mb-1">モネ 睡蓮 Monet Water Lilies</h3>
                    <p className="text-sm text-muted-foreground">6:00-8:00 PM • Artbar Ginza</p>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-start md:basis-1/5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">8/12</span>
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      Starting in 2 hours
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-start md:basis-1/4 md:gap-2">
                    <Badge variant="outline" className="flex gap-1 px-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Active
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted border overflow-hidden">
                        <img
                          src="/placeholder.svg?height=28&width=28&query=japanese woman instructor"
                          alt="Yuki Tanaka"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">Yuki Tanaka</span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 md:flex-col md:gap-2 md:basis-1/6">
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      Edit
                    </Button>
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      View Bookings
                    </Button>
                  </div>
                </div>
              </div>

              {/* Event 2 - Van Gogh Starry Night */}
              <div className="group hover:bg-muted/50 border rounded-lg p-4 bg-white">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="flex items-start gap-2 md:basis-1/5">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
                      <img
                        src="/placeholder.svg?height=96&width=96&query=van gogh starry night painting"
                        alt="Van Gogh Starry Night"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 md:hidden">
                      <h3 className="font-medium text-sm mb-1">ゴッホ 星月夜 Van Gogh Starry Night</h3>
                      <p className="text-xs text-muted-foreground">7:30-9:30 PM • Artbar Shibuya</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:basis-1/4">
                    <h3 className="font-medium text-base mb-1">ゴッホ 星月夜 Van Gogh Starry Night</h3>
                    <p className="text-sm text-muted-foreground">7:30-9:30 PM • Artbar Shibuya</p>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-start md:basis-1/5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">12/15</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs px-2 py-1 bg-green-100 text-green-700">
                      In progress
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-start md:basis-1/4 md:gap-2">
                    <Badge className="flex gap-1 px-2 bg-blue-500 text-white animate-pulse">Live</Badge>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted border overflow-hidden">
                        <img
                          src="/placeholder.svg?height=28&width=28&query=japanese man instructor"
                          alt="Hiroshi Sato"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">Hiroshi Sato</span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 md:flex-col md:gap-2 md:basis-1/6">
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      Edit
                    </Button>
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      View Bookings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TOMORROW Section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">TOMORROW - May 26</h3>
            <div className="space-y-4">
              {/* Event 3 - Hokusai Great Wave */}
              <div className="group hover:bg-muted/50 border rounded-lg p-4 bg-white">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="flex items-start gap-2 md:basis-1/5">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
                      <img
                        src="/placeholder.svg?height=96&width=96&query=hokusai great wave painting"
                        alt="Hokusai Great Wave"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 md:hidden">
                      <h3 className="font-medium text-sm mb-1">北斎 神奈川沖浪裏 Hokusai Great Wave</h3>
                      <p className="text-xs text-muted-foreground">2:00-4:00 PM • Artbar Harajuku</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:basis-1/4">
                    <h3 className="font-medium text-base mb-1">北斎 神奈川沖浪裏 Hokusai Great Wave</h3>
                    <p className="text-sm text-muted-foreground">2:00-4:00 PM • Artbar Harajuku</p>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-start md:basis-1/5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">6/10</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-3/5 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      Tomorrow
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-start md:basis-1/4 md:gap-2">
                    <Badge variant="outline" className="flex gap-1 px-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Active
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted border overflow-hidden">
                        <img
                          src="/placeholder.svg?height=28&width=28&query=japanese woman art instructor"
                          alt="Akiko Yamada"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">Akiko Yamada</span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 md:flex-col md:gap-2 md:basis-1/6">
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      Edit
                    </Button>
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      View Bookings
                    </Button>
                  </div>
                </div>
              </div>

              {/* Event 4 - Manet's Roses & Tulips */}
              <div className="group hover:bg-muted/50 border rounded-lg p-4 bg-white">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="flex items-start gap-2 md:basis-1/5">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
                      <img
                        src="/placeholder.svg?height=96&width=96&query=manet roses tulips painting"
                        alt="Manet's Roses & Tulips"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 md:hidden">
                      <h3 className="font-medium text-sm mb-1">SPACES新宿で マネの花束 Manet's Roses & Tulips</h3>
                      <p className="text-xs text-muted-foreground">5:00-7:00 PM • SPACES Shinjuku</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:basis-1/4">
                    <h3 className="font-medium text-base mb-1">SPACES新宿で マネの花束 Manet's Roses & Tulips</h3>
                    <p className="text-sm text-muted-foreground">5:00-7:00 PM • SPACES Shinjuku</p>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-start md:basis-1/5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">12/15</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      Tomorrow
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-start md:basis-1/4 md:gap-2">
                    <Badge variant="outline" className="flex gap-1 px-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Active
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted border overflow-hidden">
                        <img
                          src="/placeholder.svg?height=28&width=28&query=japanese woman instructor nanako"
                          alt="Nanako"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">Nanako</span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 md:flex-col md:gap-2 md:basis-1/6">
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      Edit
                    </Button>
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      View Bookings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAY 27 Section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">MAY 27</h3>
            <div className="space-y-4">
              {/* Event 5 - Paint Pouring Fluid Art */}
              <div className="group hover:bg-muted/50 border rounded-lg p-4 bg-white">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="flex items-start gap-2 md:basis-1/5">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
                      <img
                        src="/placeholder.svg?height=96&width=96&query=fluid art paint pouring colorful"
                        alt="Paint Pouring Fluid Art"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 md:hidden">
                      <h3 className="font-medium text-sm mb-1">
                        F6 たらし込みポーリングアート Paint Pouring Fluid Art
                      </h3>
                      <p className="text-xs text-muted-foreground">2:00-4:00 PM • Artbar Cat Street Harajuku</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:basis-1/4">
                    <h3 className="font-medium text-base mb-1">
                      F6 たらし込みポーリングアート Paint Pouring Fluid Art
                    </h3>
                    <p className="text-sm text-muted-foreground">2:00-4:00 PM • Artbar Cat Street Harajuku</p>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-start md:basis-1/5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">8/12</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      May 27
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-start md:basis-1/4 md:gap-2">
                    <Badge variant="outline" className="flex gap-1 px-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Active
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted border overflow-hidden">
                        <img
                          src="/placeholder.svg?height=28&width=28&query=japanese woman instructor naomi"
                          alt="Naomi"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">Naomi</span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 md:flex-col md:gap-2 md:basis-1/6">
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      Edit
                    </Button>
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      View Bookings
                    </Button>
                  </div>
                </div>
              </div>

              {/* Event 6 - Morocco Blue Stairs */}
              <div className="group hover:bg-muted/50 border rounded-lg p-4 bg-white">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="flex items-start gap-2 md:basis-1/5">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
                      <img
                        src="/placeholder.svg?height=96&width=96&query=morocco blue stairs painting"
                        alt="Morocco Blue Stairs"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 md:hidden">
                      <h3 className="font-medium text-sm mb-1">モロッコの青い階段 Morocco Blue Stairs</h3>
                      <p className="text-xs text-muted-foreground">6:00-8:00 PM • Artbar Daikanyama</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:basis-1/4">
                    <h3 className="font-medium text-base mb-1">モロッコの青い階段 Morocco Blue Stairs</h3>
                    <p className="text-sm text-muted-foreground">6:00-8:00 PM • Artbar Daikanyama</p>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-start md:basis-1/5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">10/14</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-5/7 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      May 27
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-start md:basis-1/4 md:gap-2">
                    <Badge variant="outline" className="flex gap-1 px-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Active
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted border overflow-hidden">
                        <img
                          src="/placeholder.svg?height=28&width=28&query=instructor luci"
                          alt="Luci"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">Luci</span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 md:flex-col md:gap-2 md:basis-1/6">
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      Edit
                    </Button>
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      View Bookings
                    </Button>
                  </div>
                </div>
              </div>

              {/* Event 7 - Pop-Art Paint Your Pet */}
              <div className="group hover:bg-muted/50 border rounded-lg p-4 bg-white">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="flex items-start gap-2 md:basis-1/5">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
                      <img
                        src="/placeholder.svg?height=96&width=96&query=pop art pet painting colorful"
                        alt="Pop-Art Paint Your Pet"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 md:hidden">
                      <h3 className="font-medium text-sm mb-1">ポップアート ペットの絵 Pop-Art Paint Your Pet!</h3>
                      <p className="text-xs text-muted-foreground">6:00-8:00 PM • Artbar Ginza</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:basis-1/4">
                    <h3 className="font-medium text-base mb-1">ポップアート ペットの絵 Pop-Art Paint Your Pet!</h3>
                    <p className="text-sm text-muted-foreground">6:00-8:00 PM • Artbar Ginza</p>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-start md:basis-1/5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">15/15</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-full h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <Badge variant="destructive" className="text-xs px-2 py-1">
                      Sold Out
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-start md:basis-1/4 md:gap-2">
                    <Badge variant="destructive" className="flex gap-1 px-2">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      Sold Out
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted border overflow-hidden">
                        <img
                          src="/placeholder.svg?height=28&width=28&query=instructor jenna"
                          alt="Jenna"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">Jenna</span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 md:flex-col md:gap-2 md:basis-1/6">
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      Edit
                    </Button>
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      View Bookings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* THIS WEEKEND Section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">THIS WEEKEND - May 28</h3>
            <div className="space-y-4">
              {/* Event 8 - Cherry Blossoms */}
              <div className="group hover:bg-muted/50 border rounded-lg p-4 bg-white">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="flex items-start gap-2 md:basis-1/5">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
                      <img
                        src="/placeholder.svg?height=96&width=96&query=cherry blossom sakura painting"
                        alt="Cherry Blossoms"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 md:hidden">
                      <h3 className="font-medium text-sm mb-1">桜 Cherry Blossoms Spring Scene</h3>
                      <p className="text-xs text-muted-foreground">11:00 AM-1:00 PM • Artbar Omotesando</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:basis-1/4">
                    <h3 className="font-medium text-base mb-1">桜 Cherry Blossoms Spring Scene</h3>
                    <p className="text-sm text-muted-foreground">11:00 AM-1:00 PM • Artbar Omotesando</p>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-start md:basis-1/5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">4/8</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      This weekend
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-start md:basis-1/4 md:gap-2">
                    <Badge variant="outline" className="flex gap-1 px-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Active
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted border overflow-hidden">
                        <img
                          src="/placeholder.svg?height=28&width=28&query=japanese woman art teacher"
                          alt="Mei Suzuki"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">Mei Suzuki</span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 md:flex-col md:gap-2 md:basis-1/6">
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      Edit
                    </Button>
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      View Bookings
                    </Button>
                  </div>
                </div>
              </div>

              {/* Event 9 - Kids Afternoon Tea */}
              <div className="group hover:bg-muted/50 border rounded-lg p-4 bg-white">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="flex items-start gap-2 md:basis-1/5">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
                      <img
                        src="/placeholder.svg?height=96&width=96&query=afternoon tea painting kids"
                        alt="Kids Afternoon Tea"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 md:hidden">
                      <h3 className="font-medium text-sm mb-1">YOKOHAMA Kids Only アフタヌーンティー Afternoon Tea</h3>
                      <p className="text-xs text-muted-foreground">11:00 AM-1:00 PM • Artbar Yokohama</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:basis-1/4">
                    <h3 className="font-medium text-base mb-1">YOKOHAMA Kids Only アフタヌーンティー Afternoon Tea</h3>
                    <p className="text-sm text-muted-foreground">11:00 AM-1:00 PM • Artbar Yokohama</p>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-start md:basis-1/5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">7/10</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-7/10 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      This weekend
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-start md:basis-1/4 md:gap-2">
                    <Badge variant="outline" className="flex gap-1 px-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Active
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted border overflow-hidden">
                        <img
                          src="/placeholder.svg?height=28&width=28&query=japanese woman art instructor akiko"
                          alt="Akiko"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">Akiko</span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 md:flex-col md:gap-2 md:basis-1/6">
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      Edit
                    </Button>
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      View Bookings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NEXT WEEK Section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">NEXT WEEK</h3>
            <div className="space-y-4">
              {/* Event 10 - Modern Abstract Expression Workshop */}
              <div className="group hover:bg-muted/50 border rounded-lg p-4 bg-white">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="flex items-start gap-2 md:basis-1/5">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
                      <img
                        src="/placeholder.svg?height=96&width=96&query=abstract modern art painting colorful"
                        alt="Abstract Art"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 md:hidden">
                      <h3 className="font-medium text-sm mb-1">Modern Abstract Expression Workshop</h3>
                      <p className="text-xs text-muted-foreground">3:00-5:00 PM • Artbar Shinjuku</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:basis-1/4">
                    <h3 className="font-medium text-base mb-1">Modern Abstract Expression Workshop</h3>
                    <p className="text-sm text-muted-foreground">3:00-5:00 PM • Artbar Shinjuku</p>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-start md:basis-1/5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">2/6</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      Next week
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-start md:basis-1/4 md:gap-2">
                    <Badge variant="outline" className="flex gap-1 px-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Active
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted border overflow-hidden">
                        <img
                          src="/placeholder.svg?height=28&width=28&query=japanese man modern art instructor"
                          alt="Kenji Nakamura"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">Kenji Nakamura</span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 md:flex-col md:gap-2 md:basis-1/6">
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      Edit
                    </Button>
                    <Button variant="outline" size="default" className="flex-1 h-9">
                      View Bookings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">10 of 15 scheduled events</div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page-scheduled" className="text-sm font-medium">
                Events per page
              </Label>
              <Select defaultValue="10">
                <SelectTrigger className="w-20" id="rows-per-page-scheduled">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">Page 1 of 2</div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" disabled>
                <ChevronsLeftIcon />
              </Button>
              <Button variant="outline" className="size-8" size="icon" disabled>
                <ChevronLeftIcon />
              </Button>
              <Button variant="outline" className="size-8" size="icon">
                <ChevronRightIcon />
              </Button>
              <Button variant="outline" className="hidden size-8 lg:flex" size="icon">
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
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
