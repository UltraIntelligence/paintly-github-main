"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, QrCode } from "lucide-react"

import { ThemeProvider } from "../../components/theme-provider"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FeaturedSection } from "@/components/featured-section"
import { useFavorites } from "@/hooks/use-favorites"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { FavoriteButton } from "@/components/favorite-button"
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
    image: "/placeholder.svg?height=100&width=250",
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
    image: "/placeholder.svg?height=100&width=250",
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
    image: "/placeholder.svg?height=100&width=250",
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
    image: "/placeholder.svg?height=100&width=250",
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
    image: "/placeholder.svg?height=100&width=250",
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
    image: "/placeholder.svg?height=100&width=250",
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

export default function GiftCertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showWizard, setShowWizard] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const { favorites, toggleFavorite, isFavorite } = useFavorites("certificates")

  // Filter certificates based on search query
  const filteredCertificates = giftCertificates.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get featured certificates (favorited ones)
  const featuredCertificates = giftCertificates.filter((cert) =>
    isFavorite(Number.parseInt(cert.id.replace(/\D/g, "")) || 1),
  )

  // Status badge color mapping
  const statusColorMap: Record<string, string> = {
    Active: "bg-green-500",
    Redeemed: "bg-blue-500",
    Expired: "bg-gray-500",
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <SidebarProvider>
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
              <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Gift Certificates</h1>
                <p className="text-muted-foreground">Manage and track all gift certificates for your customers.</p>
              </div>

              <div className="flex flex-col space-y-4">
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

                {/* Featured Promotions Section */}
                <div className="mb-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Promotions</h2>
                    <p className="text-gray-600">Special offers and popular gift certificate packages</p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Holiday Special */}
                    <Card className="overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                      <CardHeader className="p-0">
                        <div className="relative">
                          <div className="aspect-[2/1] overflow-hidden">
                            <img
                              src="/placeholder.svg?height=120&width=300"
                              alt="Holiday Special Gift Certificate"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
                            Limited Time
                          </Badge>
                          <Badge className="absolute top-2 right-2 bg-green-500 text-white">20% OFF</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">Holiday Special Package</h3>
                            <p className="text-sm text-muted-foreground">Perfect for the holiday season</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">¥8,000</p>
                            <p className="text-xs text-muted-foreground line-through">¥10,000</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-700">
                            Includes premium materials and seasonal workshop themes
                          </p>
                          <div className="flex gap-1 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              Holiday Theme
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              Premium
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full bg-amber-600 hover:bg-amber-700">Get Holiday Special</Button>
                      </CardFooter>
                    </Card>

                    {/* Corporate Bundle */}
                    <Card className="overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                      <CardHeader className="p-0">
                        <div className="relative">
                          <div className="aspect-[2/1] overflow-hidden">
                            <img
                              src="/placeholder.svg?height=120&width=300"
                              alt="Corporate Bundle Gift Certificate"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <Badge className="absolute top-2 left-2 bg-blue-500 text-white">Best Value</Badge>
                          <Badge className="absolute top-2 right-2 bg-purple-500 text-white">Bulk Discount</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">Corporate Bundle</h3>
                            <p className="text-sm text-muted-foreground">Team building packages</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">¥40,000</p>
                            <p className="text-xs text-muted-foreground">10+ certificates</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-700">Perfect for employee rewards and team events</p>
                          <div className="flex gap-1 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              Corporate
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              Bulk
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Contact Sales</Button>
                      </CardFooter>
                    </Card>

                    {/* New Customer Special */}
                    <Card className="overflow-hidden border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
                      <CardHeader className="p-0">
                        <div className="relative">
                          <div className="aspect-[2/1] overflow-hidden">
                            <img
                              src="/placeholder.svg?height=120&width=300"
                              alt="New Customer Special Gift Certificate"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <Badge className="absolute top-2 left-2 bg-emerald-500 text-white">New Customer</Badge>
                          <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">Free Bonus</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">Welcome Package</h3>
                            <p className="text-sm text-muted-foreground">First-time customer special</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-emerald-600">¥6,000</p>
                            <p className="text-xs text-muted-foreground">+ Free materials</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-700">Includes complimentary take-home art kit</p>
                          <div className="flex gap-1 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              Welcome
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              Bonus Kit
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Claim Welcome Offer</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>

                <FeaturedSection title="Your Favorite Certificates" subtitle="Certificates you've marked as favorites">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {featuredCertificates.map((certificate) => (
                      <Card key={certificate.id} className="overflow-hidden">
                        <CardHeader className="p-0">
                          <div className="relative">
                            <div className="aspect-[2/1] overflow-hidden">
                              <img
                                src={certificate.image || "/placeholder.svg"}
                                alt={certificate.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="absolute top-2 right-2">
                              <FavoriteButton
                                id={Number.parseInt(certificate.id.replace(/\D/g, "")) || 1}
                                isFavorited={isFavorite(Number.parseInt(certificate.id.replace(/\D/g, "")) || 1)}
                                onToggleFavorite={() =>
                                  toggleFavorite(Number.parseInt(certificate.id.replace(/\D/g, "")) || 1)
                                }
                              />
                            </div>
                            <Badge
                              className={`absolute top-2 left-2 ${statusColorMap[certificate.status] || "bg-gray-500"} text-white`}
                            >
                              {certificate.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{certificate.title}</h3>
                              <p className="text-sm text-muted-foreground">{certificate.type}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{certificate.value}</p>
                              <p className="text-xs text-muted-foreground">
                                Expires: {new Date(certificate.expiryDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm">{certificate.customer}</p>
                            <p className="text-xs text-muted-foreground">{certificate.email}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <div className="flex gap-2">
                            <Button size="sm" variant="default">
                              View Details
                            </Button>
                            <Button size="sm" variant="default">
                              Send Email
                            </Button>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <span className="sr-only">Open menu</span>
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                >
                                  <path
                                    d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Certificate</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                {certificate.status === "Active" ? "Mark as Redeemed" : "Mark as Active"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </FeaturedSection>

                <div>
                  <h2 className="text-xl font-semibold mb-4">All Certificates</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCertificates.map((certificate) => (
                      <Card key={certificate.id} className="overflow-hidden">
                        <CardHeader className="p-0">
                          <div className="relative">
                            <div className="aspect-[2/1] overflow-hidden">
                              <img
                                src={certificate.image || "/placeholder.svg"}
                                alt={certificate.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="absolute top-2 right-2">
                              <FavoriteButton
                                id={Number.parseInt(certificate.id.replace(/\D/g, "")) || 1}
                                isFavorited={isFavorite(Number.parseInt(certificate.id.replace(/\D/g, "")) || 1)}
                                onToggleFavorite={() =>
                                  toggleFavorite(Number.parseInt(certificate.id.replace(/\D/g, "")) || 1)
                                }
                              />
                            </div>
                            <Badge
                              className={`absolute top-2 left-2 ${statusColorMap[certificate.status] || "bg-gray-500"} text-white`}
                            >
                              {certificate.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{certificate.title}</h3>
                              <p className="text-sm text-muted-foreground">{certificate.type}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{certificate.value}</p>
                              <p className="text-xs text-muted-foreground">
                                Expires: {new Date(certificate.expiryDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm">{certificate.customer}</p>
                            <p className="text-xs text-muted-foreground">{certificate.email}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <div className="flex gap-2">
                            <Button size="sm" variant="default">
                              View Details
                            </Button>
                            <Button size="sm" variant="default">
                              Send Email
                            </Button>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <span className="sr-only">Open menu</span>
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                >
                                  <path
                                    d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Certificate</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                {certificate.status === "Active" ? "Mark as Redeemed" : "Mark as Active"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </SidebarInset>
      </SidebarProvider>

      <GiftCertificateWizard open={showWizard} onOpenChange={setShowWizard} />
      <CertificateVerification open={showVerification} onOpenChange={setShowVerification} />
    </ThemeProvider>
  )
}
