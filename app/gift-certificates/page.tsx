"use client"

import { useState } from "react"
import { Search, Filter, QrCode } from "lucide-react"

import { ThemeProvider } from "../../components/theme-provider"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FeaturedSection, FeaturedCard } from "@/components/featured-section"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { GiftCertificateWizard } from "@/components/gift-certificate-wizard"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CertificateVerification } from "@/components/certificate-verification"

// Sample gift certificate data
const giftCertificates = [
  {
    id: "gc1",
    title: "Standard Gift Certificate",
    description: "Perfect for birthdays and special occasions",
    image: "/placeholder.svg?height=240&width=320",
    value: "¥5,000",
    status: "Active",
    purchaseDate: "2023-10-15",
    expiryDate: "2024-10-15",
    customer: "Tanaka Yuki",
    email: "tanaka.yuki@example.com",
    type: "Standard",
    certificateCode: "ART-A1B2-C3D4",
  },
  {
    id: "gc2",
    title: "Premium Gift Certificate",
    description: "Our premium experience with added benefits",
    image: "/placeholder.svg?height=240&width=320",
    value: "¥10,000",
    status: "Active",
    purchaseDate: "2023-11-05",
    expiryDate: "2024-11-05",
    customer: "Suzuki Haruto",
    email: "suzuki.haruto@example.com",
    type: "Premium",
    certificateCode: "ART-E5F6-G7H8",
  },
  {
    id: "gc3",
    title: "Group Experience Certificate",
    description: "Perfect for groups of 4-6 people",
    image: "/placeholder.svg?height=240&width=320",
    value: "¥25,000",
    status: "Active",
    purchaseDate: "2023-12-10",
    expiryDate: "2024-12-10",
    customer: "Watanabe Akira",
    email: "watanabe.akira@example.com",
    type: "Group",
    certificateCode: "ART-I9J0-K1L2",
  },
  {
    id: "gc4",
    title: "Corporate Gift Package",
    description: "Ideal for employee rewards and incentives",
    image: "/placeholder.svg?height=240&width=320",
    value: "¥50,000",
    status: "Active",
    purchaseDate: "2024-01-15",
    expiryDate: "2025-01-15",
    customer: "Yamamoto Corp",
    email: "hr@yamamoto-corp.co.jp",
    type: "Corporate",
    certificateCode: "ART-M3N4-O5P6",
  },
  {
    id: "gc5",
    title: "Special Occasion Certificate",
    description: "Customized for anniversaries and celebrations",
    image: "/placeholder.svg?height=240&width=320",
    value: "¥15,000",
    status: "Redeemed",
    purchaseDate: "2023-09-20",
    expiryDate: "2024-09-20",
    customer: "Nakamura Hana",
    email: "nakamura.hana@example.com",
    type: "Special",
    redeemedDate: "2024-02-14",
    certificateCode: "ART-Q7R8-S9T0",
  },
  {
    id: "gc6",
    title: "Holiday Gift Certificate",
    description: "Festive design for holiday gifting",
    image: "/placeholder.svg?height=240&width=320",
    value: "¥8,000",
    status: "Expired",
    purchaseDate: "2022-12-20",
    expiryDate: "2023-12-20",
    customer: "Sato Ren",
    email: "sato.ren@example.com",
    type: "Standard",
    certificateCode: "ART-U1V2-W3X4",
  },
]

function GiftCertificatesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showWizard, setShowWizard] = useState(false)
  const [showVerification, setShowVerification] = useState(false)

  // Filter certificates based on search query
  const filteredCertificates = giftCertificates.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Status badge color mapping
  const statusColorMap: Record<string, string> = {
    Active: "bg-green-500",
    Redeemed: "bg-blue-500",
    Expired: "bg-gray-500",
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      {/* Search and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
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

      {/* Featured Packages Section */}
      <FeaturedSection title="Featured Packages" subtitle="Popular gift certificate packages and special offers">
        {/* Holiday Special */}
        <FeaturedCard>
          <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
            {/* Image Section */}
            <div className="relative overflow-hidden h-56">
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 w-full h-full group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/placeholder.svg?height=240&width=320"
                  alt="Holiday Special Gift Certificate"
                  className="h-full w-full object-cover"
                />
              </div>
              <Badge className="absolute top-3 left-3 bg-red-500 text-white animate-pulse text-xs px-2 py-1">
                Limited Time
              </Badge>
              <Badge className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1">20% OFF</Badge>
            </div>

            {/* Content Section */}
            <CardContent className="p-5 flex-1 flex flex-col">
              <div className="space-y-1 mb-3">
                <h3 className="font-bold text-base text-gray-900 leading-tight">Holiday Special Package</h3>
                <p className="text-sm text-gray-600">Perfect for the holiday season</p>
                <p className="text-sm text-gray-500 line-clamp-2 mt-2">
                  Includes premium materials and seasonal workshop themes
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  Holiday Theme
                </Badge>
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  Premium
                </Badge>
              </div>

              <div className="text-lg font-bold text-amber-700 mt-auto">
                ¥8,000 <span className="text-xs text-gray-500 line-through font-normal">¥10,000</span>
              </div>
            </CardContent>

            {/* Actions Section */}
            <div className="p-5 pt-0">
              <div className="flex gap-2 items-center">
                <Button className="w-full bg-amber-600 hover:bg-amber-700">Get Holiday Special</Button>
              </div>
            </div>
          </Card>
        </FeaturedCard>

        {/* Corporate Bundle */}
        <FeaturedCard>
          <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Image Section */}
            <div className="relative overflow-hidden h-56">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-full h-full group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/placeholder.svg?height=240&width=320"
                  alt="Corporate Bundle Gift Certificate"
                  className="h-full w-full object-cover"
                />
              </div>
              <Badge className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1">Best Value</Badge>
              <Badge className="absolute top-3 right-3 bg-purple-500 text-white text-xs px-2 py-1">Bulk Discount</Badge>
            </div>

            {/* Content Section */}
            <CardContent className="p-5 flex-1 flex flex-col">
              <div className="space-y-1 mb-3">
                <h3 className="font-bold text-base text-gray-900 leading-tight">Corporate Bundle</h3>
                <p className="text-sm text-gray-600">Team building packages</p>
                <p className="text-sm text-gray-500 line-clamp-2 mt-2">Perfect for employee rewards and team events</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  Corporate
                </Badge>
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  Bulk
                </Badge>
              </div>

              <div className="text-lg font-bold text-blue-700 mt-auto">
                ¥40,000 <span className="text-xs text-gray-500 font-normal">10+ certificates</span>
              </div>
            </CardContent>

            {/* Actions Section */}
            <div className="p-5 pt-0">
              <div className="flex gap-2 items-center">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Contact Sales</Button>
              </div>
            </div>
          </Card>
        </FeaturedCard>

        {/* New Customer Special */}
        <FeaturedCard>
          <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
            {/* Image Section */}
            <div className="relative overflow-hidden h-56">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-full h-full group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/placeholder.svg?height=240&width=320"
                  alt="New Customer Special Gift Certificate"
                  className="h-full w-full object-cover"
                />
              </div>
              <Badge className="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-2 py-1">New Customer</Badge>
              <Badge className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1">Free Bonus</Badge>
            </div>

            {/* Content Section */}
            <CardContent className="p-5 flex-1 flex flex-col">
              <div className="space-y-1 mb-3">
                <h3 className="font-bold text-base text-gray-900 leading-tight">Welcome Package</h3>
                <p className="text-sm text-gray-600">First-time customer special</p>
                <p className="text-sm text-gray-500 line-clamp-2 mt-2">Includes complimentary take-home art kit</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  Welcome
                </Badge>
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  Bonus Kit
                </Badge>
              </div>

              <div className="text-lg font-bold text-emerald-700 mt-auto">
                ¥6,000 <span className="text-xs text-gray-500 font-normal">+ Free materials</span>
              </div>
            </CardContent>

            {/* Actions Section */}
            <div className="p-5 pt-0">
              <div className="flex gap-2 items-center">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Claim Welcome Offer</Button>
              </div>
            </div>
          </Card>
        </FeaturedCard>
      </FeaturedSection>

      {/* All Certificates Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">All Gift Certificates</h2>
          <p className="text-gray-600">Browse and manage your complete gift certificate portfolio</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredCertificates.map((certificate) => (
            <Card
              key={certificate.id}
              className="group overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100">
                  <img
                    src={certificate.image || "/placeholder.svg?height=240&width=320"}
                    alt={certificate.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Badge
                  className={`absolute top-2 left-2 text-xs px-2 py-1 ${statusColorMap[certificate.status] || "bg-gray-500"} text-white`}
                >
                  {certificate.status}
                </Badge>
              </div>

              {/* Content Section */}
              <CardContent className="flex-1 p-4 flex flex-col">
                <div className="space-y-1 mb-3">
                  <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-1">
                    {certificate.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-1">{certificate.type}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  <Badge variant="outline" className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200">
                    {certificate.value}
                  </Badge>
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    {certificate.status}
                  </Badge>
                </div>

                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{certificate.customer}</p>

                <div className="text-xs text-gray-500 mt-auto">
                  Expires: {new Date(certificate.expiryDate).toLocaleDateString()}
                </div>
              </CardContent>

              {/* Actions Section - Fixed at bottom */}
              <CardFooter className="p-4 pt-0">
                <div className="flex gap-2 items-center">
                  <Button size="sm" variant="default" className="flex-1 text-xs">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    Send Email
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline" className="px-2">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                        >
                          <path
                            d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-sm">Edit Certificate</DropdownMenuItem>
                      <DropdownMenuItem className="text-sm">Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-sm text-red-600">
                        {certificate.status === "Active" ? "Mark as Redeemed" : "Mark as Active"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <GiftCertificateWizard open={showWizard} onOpenChange={setShowWizard} />
      <CertificateVerification open={showVerification} onOpenChange={setShowVerification} />
    </div>
  )
}

export default function GiftCertificatesPage() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <GiftCertificatesContent />
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
