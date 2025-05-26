"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface QuickCreateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickCreateModal({ open, onOpenChange }: QuickCreateModalProps) {
  const handleCreateTemplate = () => {
    // TODO: Navigate to template creation
    onOpenChange(false)
  }

  const handleScheduleEvent = () => {
    // TODO: Navigate to event scheduling
    onOpenChange(false)
  }

  const handleCreatePrivateEvent = () => {
    // TODO: Navigate to private event creation
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full p-6 sm:p-8">
        <DialogHeader className="text-center space-y-2 mb-8">
          <DialogTitle className="text-2xl font-semibold">Quick Create</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            What would you like to create?
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Template Card */}
          <Card className="flex flex-col h-full cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">New Template</CardTitle>
              <CardDescription className="text-sm text-gray-600">Create a reusable painting template</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-6">
              <div className="space-y-3 text-sm text-gray-700">
                <div>Set class details & pricing</div>
                <div>Upload reference images</div>
                <div>Define materials needed</div>
                <div>Add step-by-step guide</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5"
                onClick={handleCreateTemplate}
              >
                Create Template
              </Button>
            </CardFooter>
          </Card>

          {/* Schedule Event Card */}
          <Card className="flex flex-col h-full cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">Schedule Event</CardTitle>
              <CardDescription className="text-sm text-gray-600">Schedule an existing template</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-6">
              <div className="space-y-3 text-sm text-gray-700">
                <div>Choose from templates</div>
                <div>Set date and time</div>
                <div>Assign instructor</div>
                <div>Open for bookings</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5"
                onClick={handleScheduleEvent}
              >
                Schedule Event
              </Button>
            </CardFooter>
          </Card>

          {/* Private Event Card */}
          <Card className="flex flex-col h-full cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-gray-200 md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">Private Event</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Book a private party or corporate event
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-6">
              <div className="space-y-3 text-sm text-gray-700">
                <div>Custom event details</div>
                <div>Group size & pricing</div>
                <div>Special requirements</div>
                <div>Dedicated coordination</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5"
                onClick={handleCreatePrivateEvent}
              >
                Create Private Event
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
