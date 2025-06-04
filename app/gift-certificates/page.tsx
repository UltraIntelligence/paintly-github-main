"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, QrCode, Gift, CircleDollarSign, Calendar, ArrowUpDown, Check, X } from "lucide-react"

import { ThemeProvider } from "../../components/theme-provider"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CertificateVerification } from "@/components/certificate-verification"
import { GiftCertificateWizard } from "@/components/gift-certificate-wizard"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample gift certificate data
const giftCertificates = [
  {
    id: "gc1",
    code: "ART-A1B2-C3D4",
    title: "Standard Gift Certificate",
    description: "Perfect for birthdays and special occasions",
    image: "/placeholder.svg?height=100&width=250",
    value: "¥5,000",
    originalValue: "¥5,000",
    status: "Active",
    purchaseDate: "2023-10-15",
    expiryDate: "2024-10-15",
    customer: "Tanaka Yuki",
    email: "tanaka.yuki@example.com",
    recipientName: "Tanaka Yuki",
    recipientEmail: "tanaka.yuki@example.com",
    type: "Standard",
    sentDate: "2023-10-15",
  },
  {
    id: "gc2",
    code: "ART-E5F6-G7H8",
    title: "Premium Gift Certificate",
    description: "Our premium experience with added benefits",
    image: "/placeholder.svg?height=100&width=250",
    value: "¥10,000",
    originalValue: "¥10,000",
    status: "Active",
    purchaseDate: "2023-11-05",
    expiryDate: "2024-11-05",
    customer: "Suzuki Haruto",
    email: "suzuki.haruto@example.com",
    recipientName: "Yamada Keiko",
    recipientEmail: "yamada.keiko@example.com",
    type: "Premium",
    sentDate: "2023-11-05",
  },
  {
    id: "gc3",
    code: "ART-I9J0-K1L2",
    title: "Group Experience Certificate",
    description: "Perfect for groups of 4-6 people",
    image: "/placeholder.svg?height=100&width=250",
    value: "¥25,000",
    originalValue: "¥25,000",
    status: "Active",
    purchaseDate: "2023-12-10",
    expiryDate: "2024-12-10",
    customer: "Watanabe Akira",
    email: "watanabe.akira@example.com",
    recipientName: "Ito Takashi",
    recipientEmail: "ito.takashi@example.com",
    type: "Group",
    sentDate: "2023-12-10",
  },
  {
    id: "gc4",
    code: "ART-M3N4-O5P6",
    title: "Corporate Gift Package",
    description: "Ideal for employee rewards and incentives",
    image: "/placeholder.svg?height=100&width=250",
    value: "¥50,000",
    originalValue: "¥50,000",
    status: "Active",
    purchaseDate: "2024-01-15",
    expiryDate: "2025-01-15",
    customer: "Yamamoto Corp",
    email: "hr@yamamoto-corp.co.jp",
    recipientName: "Yamamoto Corp Employees",
    recipientEmail: "hr@yamamoto-corp.co.jp",
    type: "Corporate",
    sentDate: "2024-01-15",
  },
  {
    id: "gc5",
    code: "ART-Q7R8-S9T0",
    title: "Special Occasion Certificate",
    description: "Customized for anniversaries and celebrations",
    image: "/placeholder.svg?height=100&width=250",
    value: "¥0",
    originalValue: "¥15,000",
    status: "Redeemed",
    purchaseDate: "2023-09-20",
    expiryDate: "2024-09-20",
    customer: "Nakamura Hana",
    email: "nakamura.hana@example.com",
    recipientName: "Sato Ren",
    recipientEmail: "sato.ren@example.com",
    type: "Special",
    redeemedDate: "2024-02-14",
    sentDate: "2023-09-20",
  },
  {
    id: "gc6",
    code: "ART-U1V2-W3X4",
    title: "Holiday Gift Certificate",
    description: "Festive design for holiday gifting",
    image: "/placeholder.svg?height=100&width=250",
    value: "¥0",
    originalValue: "¥8,000",
    status: "Expired",
    purchaseDate: "2022-12-20",
    expiryDate: "2023-12-20",
    customer: "Sato Ren",
    email: "sato.ren@example.com",
    recipientName: "Kato Yumi",
    recipientEmail: "kato.yumi@example.com",
    type: "Standard",
    sentDate: "2022-12-20",
  },
]

export default function GiftCertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showWizard, setShowWizard] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [showActiveOnly, setShowActiveOnly] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)
  const [showCertificateDetail, setShowCertificateDetail] = useState(false)
  const [showRedeemDialog, setShowRedeemDialog] = useState(false)
  const [redeemAmount, setRedeemAmount] = useState("")
  const [redeemDescription, setRedeemDescription] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
    key: "purchaseDate",
    direction: "desc",
  })

  // Filter and sort certificates
  const filteredCertificates = giftCertificates
    .filter((cert) => {
      const matchesSearch =
        cert.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.recipientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.type.toLowerCase().includes(searchQuery.toLowerCase())

      if (showActiveOnly) {
        return matchesSearch && cert.status === "Active"
      }

      return matchesSearch
    })
    .sort((a, b) => {
      // Handle different data types for sorting
      if (sortConfig.key === "value") {
        // Extract numeric value from string (e.g., "¥5,000" -> 5000)
        const valueA = Number.parseInt(a[sortConfig.key].replace(/[^\d]/g, "")) || 0
        const valueB = Number.parseInt(b[sortConfig.key].replace(/[^\d]/g, "")) || 0
        return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA
      } else if (sortConfig.key === "purchaseDate") {
        // Compare dates
        const dateA = new Date(a[sortConfig.key]).getTime()
        const dateB = new Date(b[sortConfig.key]).getTime()
        return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA
      } else {
        // Default string comparison
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      }
    })

  const handleOpenCertificate = (certificate: any) => {
    setSelectedCertificate(certificate)
    setShowCertificateDetail(true)
  }

  const handleRedeemOpen = () => {
    setShowRedeemDialog(true)
    setShowCertificateDetail(false)
  }

  const handleRedeemSubmit = () => {
    // In a real app, this would call an API to process the redemption
    console.log("Redeeming certificate", {
      certificate: selectedCertificate,
      amount: redeemAmount,
      description: redeemDescription,
    })
    setShowRedeemDialog(false)
    // Update the certificate status and value in a real app
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Certificate table row component to avoid duplication
  const CertificateTableRow = ({ certificate }: { certificate: any }) => {
    const isZeroBalance = certificate.value === "¥0"

    return (
      <TableRow className={isZeroBalance ? "opacity-60" : ""}>
        <TableCell className="md:w-[50px]">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isZeroBalance ? "bg-gray-100" : "bg-green-100"
            }`}
          >
            {isZeroBalance ? <Check className="h-4 w-4 text-gray-600" /> : <Gift className="h-4 w-4 text-green-600" />}
          </div>
        </TableCell>
        <TableCell className="md:w-[180px]">
          <div>
            <p className="font-medium">{certificate.code}</p>
            <p className="text-xs text-muted-foreground">{certificate.type}</p>
          </div>
        </TableCell>
        <TableCell>
          <div>
            <p className={`font-medium ${isZeroBalance ? "text-gray-600" : "text-green-600"}`}>{certificate.value}</p>
            <p className="text-xs text-muted-foreground">of {certificate.originalValue}</p>
          </div>
        </TableCell>
        <TableCell>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                      {certificate.customer.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate max-w-[120px]">{certificate.customer}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{certificate.email}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                      {certificate.recipientName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate max-w-[120px]">{certificate.recipientName}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{certificate.recipientEmail}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell>
          <div>
            <p>{formatDate(certificate.purchaseDate)}</p>
            <p className="text-xs text-muted-foreground">Sent: {formatDate(certificate.sentDate)}</p>
          </div>
        </TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm" onClick={() => handleOpenCertificate(certificate)}>
            Open
          </Button>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-6"
          >
            <div className="flex flex-col space-y-6">
              {/* Search and Actions Bar */}
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by code, name, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-7 w-7 p-0"
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Clear search</span>
                      </Button>
                    )}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <ArrowUpDown className="h-4 w-4" />
                        <span className="sr-only">Sort</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSortConfig({ key: "code", direction: "asc" })}>
                        Code (A-Z)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortConfig({ key: "code", direction: "desc" })}>
                        Code (Z-A)
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSortConfig({ key: "value", direction: "desc" })}>
                        Balance (High-Low)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortConfig({ key: "value", direction: "asc" })}>
                        Balance (Low-High)
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSortConfig({ key: "purchaseDate", direction: "desc" })}>
                        Purchase Date (Newest)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortConfig({ key: "purchaseDate", direction: "asc" })}>
                        Purchase Date (Oldest)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex gap-2 ml-auto">
                  <Button size="sm" variant="outline" onClick={() => setShowVerification(true)}>
                    <QrCode className="mr-2 h-4 w-4" />
                    Verify Certificate
                  </Button>
                  <Button size="sm" onClick={() => setShowWizard(true)}>
                    Create Certificate
                  </Button>
                </div>
              </div>

              {/* Gift Certificates Table */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold tracking-tight">All Gift Certificates</h2>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="active-only"
                      checked={showActiveOnly}
                      onCheckedChange={(checked) => setShowActiveOnly(checked as boolean)}
                    />
                    <label htmlFor="active-only" className="text-sm text-muted-foreground">
                      Show only active certificates
                    </label>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="md:w-[50px]"></TableHead>
                          <TableHead className="md:w-[180px]">
                            <div className="flex items-center gap-1">
                              Code
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead>
                            <div className="flex items-center gap-1">
                              Balance
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead>Buyer</TableHead>
                          <TableHead>Recipient</TableHead>
                          <TableHead>
                            <div className="flex items-center gap-1">
                              Purchased On
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCertificates.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No certificates found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredCertificates.map((certificate) => (
                            <CertificateTableRow key={certificate.id} certificate={certificate} />
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </SidebarInset>
      </SidebarProvider>

      {/* Certificate Detail Dialog */}
      <Dialog open={showCertificateDetail} onOpenChange={setShowCertificateDetail}>
        <DialogContent className="max-w-3xl">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Gift Certificate {selectedCertificate.code}
                </DialogTitle>
                <DialogDescription>
                  {selectedCertificate.type} certificate issued on {formatDate(selectedCertificate.purchaseDate)}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`${
                              selectedCertificate.status === "Active"
                                ? "bg-green-500"
                                : selectedCertificate.status === "Redeemed"
                                  ? "bg-blue-500"
                                  : "bg-gray-500"
                            }`}
                          >
                            {selectedCertificate.status}
                          </Badge>
                          {selectedCertificate.status === "Redeemed" && (
                            <span className="text-sm text-muted-foreground">
                              on {formatDate(selectedCertificate.redeemedDate || "")}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Balance</h3>
                        <div className="flex items-center gap-2">
                          <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-semibold">{selectedCertificate.value}</p>
                            <p className="text-xs text-muted-foreground">
                              Original value: {selectedCertificate.originalValue}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Expiry Date</h3>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{formatDate(selectedCertificate.expiryDate)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Buyer</h3>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {selectedCertificate.customer.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{selectedCertificate.customer}</p>
                            <p className="text-xs text-muted-foreground">{selectedCertificate.email}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Recipient</h3>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-purple-100 text-purple-700">
                              {selectedCertificate.recipientName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{selectedCertificate.recipientName}</p>
                            <p className="text-xs text-muted-foreground">{selectedCertificate.recipientEmail}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Certificate Type</h3>
                        <p className="font-medium">{selectedCertificate.title}</p>
                        <p className="text-sm text-muted-foreground">{selectedCertificate.description}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="pt-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Performed By</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{formatDate(selectedCertificate.purchaseDate)}</TableCell>
                          <TableCell>Certificate Created</TableCell>
                          <TableCell>{selectedCertificate.originalValue}</TableCell>
                          <TableCell>System</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{formatDate(selectedCertificate.sentDate)}</TableCell>
                          <TableCell>Certificate Sent</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>System</TableCell>
                        </TableRow>
                        {selectedCertificate.status === "Redeemed" && (
                          <TableRow>
                            <TableCell>{formatDate(selectedCertificate.redeemedDate || "")}</TableCell>
                            <TableCell>Certificate Redeemed</TableCell>
                            <TableCell>{selectedCertificate.originalValue}</TableCell>
                            <TableCell>Staff</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <h3 className="text-base font-medium">Certificate Actions</h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button
                          className="w-full justify-start"
                          variant="outline"
                          disabled={selectedCertificate.status !== "Active"}
                          onClick={handleRedeemOpen}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Redeem Certificate
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <X className="mr-2 h-4 w-4" />
                          Cancel Certificate
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Calendar className="mr-2 h-4 w-4" />
                          Extend Expiry Date
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <h3 className="text-base font-medium">Communication</h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button className="w-full justify-start" variant="outline">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                          Resend Certificate Email
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          Send Reminder
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          Change Recipient
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="flex gap-2">
                <Button variant="outline" onClick={() => setShowCertificateDetail(false)}>
                  Close
                </Button>
                {selectedCertificate.status === "Active" && (
                  <Button onClick={handleRedeemOpen}>Redeem Certificate</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Redeem Certificate Dialog */}
      <Dialog open={showRedeemDialog} onOpenChange={setShowRedeemDialog}>
        <DialogContent className="max-w-md">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Redeem Gift Card
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div>
                  <h3 className="font-medium">{selectedCertificate.recipientName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCertificate.recipientEmail}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Gift Card Code</p>
                    <p className="font-mono font-medium">{selectedCertificate.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Type</p>
                    <p>{selectedCertificate.type}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Available Value</p>
                  <p className="text-lg font-bold text-green-600">
                    {selectedCertificate.value}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      of {selectedCertificate.originalValue}
                    </span>
                  </p>
                </div>

                <div>
                  <label htmlFor="description" className="text-sm font-medium">
                    Purchase Description
                  </label>
                  <p className="text-xs text-muted-foreground mb-1">Set name for record purposes</p>
                  <Input
                    id="description"
                    placeholder="Enter description"
                    value={redeemDescription}
                    onChange={(e) => setRedeemDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="text-sm font-medium">
                    Amount
                  </label>
                  <p className="text-xs text-muted-foreground mb-1">Amount to be deducted</p>
                  <div className="flex items-center">
                    <div className="bg-muted flex items-center justify-center h-10 w-10 rounded-l-md border border-r-0">
                      <span>¥</span>
                    </div>
                    <Input
                      id="amount"
                      placeholder="Enter amount"
                      className="rounded-l-none"
                      value={redeemAmount}
                      onChange={(e) => setRedeemAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="tax" className="text-sm font-medium">
                    Tax (optional)
                  </label>
                  <p className="text-xs text-muted-foreground mb-1">Additional tax</p>
                  <div className="flex items-center">
                    <div className="bg-muted flex items-center justify-center h-10 w-10 rounded-l-md border border-r-0">
                      <span>%</span>
                    </div>
                    <Input id="tax" placeholder="0.0" className="rounded-l-none" defaultValue="0.0" />
                  </div>
                </div>
              </div>

              <DialogFooter className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowRedeemDialog(false)
                    setShowCertificateDetail(true)
                  }}
                >
                  Go Back
                </Button>
                <Button onClick={handleRedeemSubmit}>Redeem</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <GiftCertificateWizard open={showWizard} onOpenChange={setShowWizard} />
      <CertificateVerification open={showVerification} onOpenChange={setShowVerification} />
    </ThemeProvider>
  )
}
