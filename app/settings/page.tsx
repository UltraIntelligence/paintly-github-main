"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Upload, Info, CreditCard, Mail, MessageSquare, Gift } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.4,
    ease: [0.4, 0.0, 0.2, 1],
  },
}

export default function SettingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("studio-setup")
  const [isSaving, setIsSaving] = useState(false)

  // Studio Setup state
  const [businessName, setBusinessName] = useState("Artbar Tokyo")
  const [businessType, setBusinessType] = useState("paint-sip")
  const [primaryLocation, setPrimaryLocation] = useState("ginza")
  const [hoursTemplate, setHoursTemplate] = useState("Mon-Thu 10AM-9PM, Fri-Sat 10AM-10PM, Sun 12PM-8PM")
  // const [selectedPalette, setSelectedPalette] = useState("creative")

  // Theme System state
  const [selectedTheme, setSelectedTheme] = useState("clean")
  const [customColors, setCustomColors] = useState({
    button: "#3B82F6",
    background: "#FFFFFF",
    accent: "#F59E0B",
    text: "#374151",
  })

  // Enhanced Business Information state
  const [businessRegNumber, setBusinessRegNumber] = useState("")
  const [taxId, setTaxId] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")
  const [businessPhone, setBusinessPhone] = useState("")
  const [studioDescription, setStudioDescription] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [socialMedia, setSocialMedia] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
  })
  const [emergencyContact, setEmergencyContact] = useState("")

  // Legal Documents state
  const [legalDocuments, setLegalDocuments] = useState({
    privacyPolicy: "",
    termsConditions: "",
    cancellationPolicy: "",
  })
  const [customDocuments, setCustomDocuments] = useState([])
  const [newDocTitle, setNewDocTitle] = useState("")
  const [newDocContent, setNewDocContent] = useState("")

  // Booking & Pricing state
  const [pricingTemplate, setPricingTemplate] = useState("tokyo-standard")
  const [adultPrice, setAdultPrice] = useState("3500")
  const [childPrice, setChildPrice] = useState("2500")
  const [seniorPrice, setSeniorPrice] = useState("3000")
  const [corporatePrice, setCorporatePrice] = useState("4000")
  const [currency, setCurrency] = useState("jpy")
  const [cancellationPolicy, setCancellationPolicy] = useState("standard")
  const [delistPolicy, setDelistPolicy] = useState("24-hours")
  const [paymentMethods, setPaymentMethods] = useState({
    stripe: true,
    paypal: true,
    cash: true,
    creditCard: false,
  })

  // Customer Experience state
  const [bookingTheme, setBookingTheme] = useState("modern")
  const [customerInfoRequired, setCustomerInfoRequired] = useState({
    phone: true,
    emergency: false,
    dietary: true,
  })
  const [emailTemplate, setEmailTemplate] = useState("standard")
  const [automatedEmails, setAutomatedEmails] = useState({
    confirmation: true,
    reminder: true,
    thankYou: true,
    newsletter: false,
  })
  const [smsNotifications, setSmsNotifications] = useState({
    confirmation: false,
    reminder: true,
    marketing: false,
  })
  const [giftCertificateExpiration, setGiftCertificateExpiration] = useState("12-months")

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been successfully updated.",
      })
    }, 1500)
  }

  const handlePricingTemplateChange = (value: string) => {
    setPricingTemplate(value)

    // Update prices based on template
    switch (value) {
      case "tokyo-standard":
        setAdultPrice("3500")
        setChildPrice("2500")
        setSeniorPrice("3000")
        setCorporatePrice("4000")
        break
      case "premium":
        setAdultPrice("4500")
        setChildPrice("3200")
        setSeniorPrice("4000")
        setCorporatePrice("5500")
        break
      case "community":
        setAdultPrice("2800")
        setChildPrice("2000")
        setSeniorPrice("2500")
        setCorporatePrice("3200")
        break
      case "custom":
        // Keep current values for custom
        break
    }
  }

  const getCurrencySymbol = (currencyCode: string) => {
    switch (currencyCode) {
      case "jpy":
        return "¥"
      case "usd":
        return "$"
      case "eur":
        return "€"
      case "gbp":
        return "£"
      default:
        return "¥"
    }
  }

  const getPalettePreview = (palette: string) => {
    switch (palette) {
      case "creative":
        return (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-500"></div>
            <div className="w-6 h-6 rounded-full bg-amber-500"></div>
            <div className="w-6 h-6 rounded-full bg-pink-500"></div>
          </div>
        )
      case "professional":
        return (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500"></div>
            <div className="w-6 h-6 rounded-full bg-emerald-500"></div>
            <div className="w-6 h-6 rounded-full bg-gray-500"></div>
          </div>
        )
      case "warm":
        return (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-red-500"></div>
            <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
            <div className="w-6 h-6 rounded-full bg-orange-500"></div>
          </div>
        )
      default:
        return null
    }
  }

  const getHoursTemplateDescription = (template: string) => {
    switch (template) {
      case "standard":
        return "Mon-Thu 10AM-9PM, Fri-Sat 10AM-10PM, Sun 12PM-8PM"
      case "weekend":
        return "Thu-Sun only, 10AM-10PM"
      case "evening":
        return "6PM-10PM daily"
      case "custom":
        return "Custom hours configuration"
      default:
        return ""
    }
  }

  const getCancellationPolicyDescription = (policy: string) => {
    switch (policy) {
      case "flexible":
        return "Free cancellation up to 24 hours before class"
      case "standard":
        return "Free cancellation up to 48 hours, 50% refund after"
      case "strict":
        return "No refunds within 48 hours of class"
      case "custom":
        return "Custom cancellation policy"
      default:
        return ""
    }
  }

  const getDelistPolicyDescription = (policy: string) => {
    switch (policy) {
      case "6-hours":
        return "Delist events with 0 purchases 6 hours before start time"
      case "24-hours":
        return "Delist events with 0 purchases 24 hours before start time"
      case "48-hours":
        return "Delist events with 0 purchases 48 hours before start time"
      case "72-hours":
        return "Delist events with 0 purchases 72 hours before start time"
      case "never":
        return "Never automatically delist events"
      default:
        return ""
    }
  }

  const getGiftCertificateExpirationText = (period: string) => {
    switch (period) {
      case "3-months":
        return "3 months from purchase"
      case "6-months":
        return "6 months from purchase"
      case "12-months":
        return "12 months from purchase"
      case "never":
        return "No expiration"
      default:
        return ""
    }
  }

  const getThemeColors = (theme) => {
    switch (theme) {
      case "clean":
        return {
          button: "#3B82F6",
          background: "#FFFFFF",
          accent: "#F59E0B",
          text: "#374151",
        }
      case "dark":
        return {
          button: "#DBE64C",
          background: "#001F3F",
          accent: "#1E488F",
          text: "#F6F7ED",
        }
      case "custom":
        return customColors
      default:
        return customColors
    }
  }

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme)
    if (theme !== "custom") {
      setCustomColors(getThemeColors(theme))
    }
  }

  const handleCustomColorChange = (colorRole, color) => {
    setCustomColors((prev) => ({
      ...prev,
      [colorRole]: color,
    }))
  }

  const addCustomDocument = () => {
    if (newDocTitle && newDocContent) {
      setCustomDocuments((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: newDocTitle,
          content: newDocContent,
        },
      ])
      setNewDocTitle("")
      setNewDocContent("")
    }
  }

  const removeCustomDocument = (id) => {
    setCustomDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <AnimatePresence mode="wait">
            <motion.div key="settings" className="flex flex-1 flex-col" {...pageTransition}>
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <div className="px-4 lg:px-6">
                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center mb-6">
                        <TabsList className="flex-shrink-0">
                          <TabsTrigger value="studio-setup">Studio Setup</TabsTrigger>
                          <TabsTrigger value="booking-pricing">Booking & Pricing</TabsTrigger>
                          <TabsTrigger value="customer-experience">Customer Experience</TabsTrigger>
                        </TabsList>
                        <div className="relative flex-shrink-0 w-full lg:w-auto lg:max-w-sm lg:ml-auto">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search settings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      {/* Studio Setup Tab */}
                      <TabsContent value="studio-setup" className="space-y-6">
                        {/* Branding and Theme Selection - Side by Side */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Simplified Branding Section */}
                          <Card>
                            <CardHeader>
                              <CardTitle>Branding</CardTitle>
                              <CardDescription>Configure your studio's brand identity</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="business-name">Business Name</Label>
                                  <Input
                                    id="business-name"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>Logo</Label>
                                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm font-medium mb-1">Drag and drop your logo here</p>
                                    <p className="text-xs text-muted-foreground mb-4">SVG, PNG or JPG (max. 2MB)</p>
                                    <Button variant="outline" size="sm">
                                      Browse Files
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Redesigned Theme Selection Section */}
                          <Card>
                            <CardHeader>
                              <CardTitle>Theme Selection</CardTitle>
                              <CardDescription>Choose your studio's color theme system</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                  {/* Clean Theme Card */}
                                  <div
                                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                                      selectedTheme === "clean"
                                        ? "border-blue-500 bg-blue-50 shadow-md"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    onClick={() => handleThemeChange("clean")}
                                  >
                                    <div className="flex items-center justify-between mb-3">
                                      <div>
                                        <h4 className="font-medium">Clean Theme</h4>
                                        <p className="text-sm text-muted-foreground">Professional blue and orange</p>
                                      </div>
                                      <div className="flex gap-1">
                                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                        <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-200"></div>
                                        <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                                      </div>
                                    </div>
                                    <div className="bg-white rounded p-3 border">
                                      <div className="flex gap-2 items-center">
                                        <div className="bg-blue-500 text-white px-3 py-1 rounded text-xs">Button</div>
                                        <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs">Badge</div>
                                        <span className="text-gray-700 text-xs">Sample text</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Dark Theme Card */}
                                  <div
                                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                                      selectedTheme === "dark"
                                        ? "border-blue-500 bg-blue-50 shadow-md"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    onClick={() => handleThemeChange("dark")}
                                  >
                                    <div className="flex items-center justify-between mb-3">
                                      <div>
                                        <h4 className="font-medium">Dark Theme</h4>
                                        <p className="text-sm text-muted-foreground">Midnight with spring accents</p>
                                      </div>
                                      <div className="flex gap-1">
                                        <div
                                          className="w-4 h-4 rounded-full"
                                          style={{ backgroundColor: "#DBE64C" }}
                                        ></div>
                                        <div
                                          className="w-4 h-4 rounded-full"
                                          style={{ backgroundColor: "#001F3F" }}
                                        ></div>
                                        <div
                                          className="w-4 h-4 rounded-full"
                                          style={{ backgroundColor: "#1E488F" }}
                                        ></div>
                                      </div>
                                    </div>
                                    <div className="rounded p-3 border" style={{ backgroundColor: "#001F3F" }}>
                                      <div className="flex gap-2 items-center">
                                        <div
                                          className="text-black px-3 py-1 rounded text-xs font-medium"
                                          style={{ backgroundColor: "#DBE64C" }}
                                        >
                                          Button
                                        </div>
                                        <div
                                          className="px-2 py-1 rounded text-xs"
                                          style={{ backgroundColor: "#1E488F", color: "#F6F7ED" }}
                                        >
                                          Badge
                                        </div>
                                        <span className="text-xs" style={{ color: "#F6F7ED" }}>
                                          Sample text
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Custom Theme Card */}
                                  <div
                                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                                      selectedTheme === "custom"
                                        ? "border-blue-500 bg-blue-50 shadow-md"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    onClick={() => handleThemeChange("custom")}
                                  >
                                    <div className="flex items-center justify-between mb-3">
                                      <div>
                                        <h4 className="font-medium">Custom Theme</h4>
                                        <p className="text-sm text-muted-foreground">Create your own color scheme</p>
                                      </div>
                                      <div className="flex gap-1">
                                        <div className="w-4 h-4 rounded-full border-2 border-dashed border-gray-400"></div>
                                        <div className="w-4 h-4 rounded-full border-2 border-dashed border-gray-400"></div>
                                        <div className="w-4 h-4 rounded-full border-2 border-dashed border-gray-400"></div>
                                      </div>
                                    </div>
                                    <div className="bg-gray-50 rounded p-3 border">
                                      <div className="grid grid-cols-4 gap-2">
                                        <div className="text-center">
                                          <div className="w-6 h-6 mx-auto rounded border-2 border-dashed border-gray-400 mb-1"></div>
                                          <span className="text-xs text-gray-500">Button</span>
                                        </div>
                                        <div className="text-center">
                                          <div className="w-6 h-6 mx-auto rounded border-2 border-dashed border-gray-400 mb-1"></div>
                                          <span className="text-xs text-gray-500">BG</span>
                                        </div>
                                        <div className="text-center">
                                          <div className="w-6 h-6 mx-auto rounded border-2 border-dashed border-gray-400 mb-1"></div>
                                          <span className="text-xs text-gray-500">Accent</span>
                                        </div>
                                        <div className="text-center">
                                          <div className="w-6 h-6 mx-auto rounded border-2 border-dashed border-gray-400 mb-1"></div>
                                          <span className="text-xs text-gray-500">Text</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Custom Color Pickers - Show only when Custom is selected */}
                                {selectedTheme === "custom" && (
                                  <div className="space-y-4 pt-4 border-t">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="button-color">Button Color</Label>
                                        <div className="flex gap-2">
                                          <input
                                            type="color"
                                            value={customColors.button}
                                            onChange={(e) => handleCustomColorChange("button", e.target.value)}
                                            className="w-10 h-10 rounded border"
                                          />
                                          <Input
                                            value={customColors.button}
                                            onChange={(e) => handleCustomColorChange("button", e.target.value)}
                                            placeholder="#3B82F6"
                                          />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="background-color">Background Color</Label>
                                        <div className="flex gap-2">
                                          <input
                                            type="color"
                                            value={customColors.background}
                                            onChange={(e) => handleCustomColorChange("background", e.target.value)}
                                            className="w-10 h-10 rounded border"
                                          />
                                          <Input
                                            value={customColors.background}
                                            onChange={(e) => handleCustomColorChange("background", e.target.value)}
                                            placeholder="#FFFFFF"
                                          />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="accent-color">Accent Color</Label>
                                        <div className="flex gap-2">
                                          <input
                                            type="color"
                                            value={customColors.accent}
                                            onChange={(e) => handleCustomColorChange("accent", e.target.value)}
                                            className="w-10 h-10 rounded border"
                                          />
                                          <Input
                                            value={customColors.accent}
                                            onChange={(e) => handleCustomColorChange("accent", e.target.value)}
                                            placeholder="#F59E0B"
                                          />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="text-color">Text Color</Label>
                                        <div className="flex gap-2">
                                          <input
                                            type="color"
                                            value={customColors.text}
                                            onChange={(e) => handleCustomColorChange("text", e.target.value)}
                                            className="w-10 h-10 rounded border"
                                          />
                                          <Input
                                            value={customColors.text}
                                            onChange={(e) => handleCustomColorChange("text", e.target.value)}
                                            placeholder="#374151"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {/* Live Preview for Custom Theme */}
                                    <div className="space-y-2">
                                      <Label>Live Preview</Label>
                                      <div
                                        className="border rounded-lg p-4"
                                        style={{ backgroundColor: getThemeColors(selectedTheme).background }}
                                      >
                                        <div className="space-y-3">
                                          <button
                                            className="px-4 py-2 rounded text-white font-medium"
                                            style={{ backgroundColor: getThemeColors(selectedTheme).button }}
                                          >
                                            Primary Button
                                          </button>
                                          <div
                                            className="px-3 py-1 rounded text-sm inline-block"
                                            style={{
                                              backgroundColor: getThemeColors(selectedTheme).accent,
                                              color: getThemeColors(selectedTheme).background,
                                            }}
                                          >
                                            Accent Badge
                                          </div>
                                          <p style={{ color: getThemeColors(selectedTheme).text }}>
                                            Sample text content with your selected theme colors.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Enhanced Business Information Section */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Business Information</CardTitle>
                            <CardDescription>Complete business details and contact information</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="business-reg">Business Registration Number</Label>
                                  <Input
                                    id="business-reg"
                                    value={businessRegNumber}
                                    onChange={(e) => setBusinessRegNumber(e.target.value)}
                                    placeholder="Enter registration number"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="tax-id">Tax ID</Label>
                                  <Input
                                    id="tax-id"
                                    value={taxId}
                                    onChange={(e) => setTaxId(e.target.value)}
                                    placeholder="Enter tax identification number"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="business-address">Official Business Address</Label>
                                  <Textarea
                                    id="business-address"
                                    value={businessAddress}
                                    onChange={(e) => setBusinessAddress(e.target.value)}
                                    placeholder="Enter complete business address"
                                    className="min-h-[80px]"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="business-phone">Business Phone</Label>
                                  <Input
                                    id="business-phone"
                                    value={businessPhone}
                                    onChange={(e) => setBusinessPhone(e.target.value)}
                                    placeholder="+81 3-1234-5678"
                                  />
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="primary-location">Primary Location</Label>
                                  <Select value={primaryLocation} onValueChange={setPrimaryLocation}>
                                    <SelectTrigger id="primary-location">
                                      <SelectValue placeholder="Select primary location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="ginza">Artbar Ginza</SelectItem>
                                      <SelectItem value="daikanyama">Artbar Daikanyama</SelectItem>
                                      <SelectItem value="catstreet">Artbar Cat Street</SelectItem>
                                      <SelectItem value="yokohama">Artbar Yokohama</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="studio-description">Studio Description/Tagline</Label>
                                  <Textarea
                                    id="studio-description"
                                    value={studioDescription}
                                    onChange={(e) => setStudioDescription(e.target.value)}
                                    placeholder="Brief description of your studio"
                                    className="min-h-[80px]"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="website-url">Website URL</Label>
                                  <Input
                                    id="website-url"
                                    value={websiteUrl}
                                    onChange={(e) => setWebsiteUrl(e.target.value)}
                                    placeholder="https://your-studio.com"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>Social Media Handles</Label>
                                  <div className="space-y-2">
                                    <Input
                                      value={socialMedia.instagram}
                                      onChange={(e) =>
                                        setSocialMedia((prev) => ({ ...prev, instagram: e.target.value }))
                                      }
                                      placeholder="Instagram username"
                                    />
                                    <Input
                                      value={socialMedia.facebook}
                                      onChange={(e) =>
                                        setSocialMedia((prev) => ({ ...prev, facebook: e.target.value }))
                                      }
                                      placeholder="Facebook page"
                                    />
                                    <Input
                                      value={socialMedia.twitter}
                                      onChange={(e) => setSocialMedia((prev) => ({ ...prev, twitter: e.target.value }))}
                                      placeholder="Twitter handle"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="emergency-contact">Emergency Contact</Label>
                                  <Input
                                    id="emergency-contact"
                                    value={emergencyContact}
                                    onChange={(e) => setEmergencyContact(e.target.value)}
                                    placeholder="Emergency contact information"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Custom Business Hours */}
                            <div className="space-y-2">
                              <Label htmlFor="business-hours">Business Hours</Label>
                              <Textarea
                                id="business-hours"
                                value={hoursTemplate}
                                onChange={(e) => setHoursTemplate(e.target.value)}
                                placeholder="Enter your business hours (e.g., Mon-Thu 10AM-9PM, Fri-Sat 10AM-10PM, Sun 12PM-8PM)"
                                className="min-h-[80px]"
                              />
                            </div>
                          </CardContent>
                        </Card>

                        {/* Legal Documents Section remains the same */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Legal Documents</CardTitle>
                            <CardDescription>Manage your studio's legal policies and documents</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="privacy-policy">Privacy Policy</Label>
                                <Textarea
                                  id="privacy-policy"
                                  value={legalDocuments.privacyPolicy}
                                  onChange={(e) =>
                                    setLegalDocuments((prev) => ({ ...prev, privacyPolicy: e.target.value }))
                                  }
                                  placeholder="Enter your privacy policy..."
                                  className="min-h-[120px]"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="terms-conditions">Terms & Conditions</Label>
                                <Textarea
                                  id="terms-conditions"
                                  value={legalDocuments.termsConditions}
                                  onChange={(e) =>
                                    setLegalDocuments((prev) => ({ ...prev, termsConditions: e.target.value }))
                                  }
                                  placeholder="Enter your terms and conditions..."
                                  className="min-h-[120px]"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="cancellation-policy-legal">Cancellation Policy</Label>
                                <Textarea
                                  id="cancellation-policy-legal"
                                  value={legalDocuments.cancellationPolicy}
                                  onChange={(e) =>
                                    setLegalDocuments((prev) => ({ ...prev, cancellationPolicy: e.target.value }))
                                  }
                                  placeholder="Enter your detailed cancellation policy..."
                                  className="min-h-[120px]"
                                />
                              </div>

                              {/* Custom Documents */}
                              <div className="space-y-4 pt-4 border-t">
                                <div className="flex items-center justify-between">
                                  <Label className="text-base font-medium">Custom Documents</Label>
                                </div>

                                {customDocuments.map((doc) => (
                                  <div key={doc.id} className="border rounded-lg p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-medium">{doc.title}</h4>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeCustomDocument(doc.id)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-3">{doc.content}</p>
                                  </div>
                                ))}

                                <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
                                  <div className="space-y-2">
                                    <Label htmlFor="new-doc-title">Document Title</Label>
                                    <Input
                                      id="new-doc-title"
                                      value={newDocTitle}
                                      onChange={(e) => setNewDocTitle(e.target.value)}
                                      placeholder="Enter document title"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="new-doc-content">Document Content</Label>
                                    <Textarea
                                      id="new-doc-content"
                                      value={newDocContent}
                                      onChange={(e) => setNewDocContent(e.target.value)}
                                      placeholder="Enter document content..."
                                      className="min-h-[100px]"
                                    />
                                  </div>
                                  <Button onClick={addCustomDocument} disabled={!newDocTitle || !newDocContent}>
                                    + Add Document
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between border-t pt-6">
                            <Button variant="outline">Reset to Defaults</Button>
                            <Button onClick={handleSave} disabled={isSaving}>
                              {isSaving ? <>Saving...</> : <>Save Studio Setup</>}
                            </Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>

                      {/* Booking & Pricing Tab */}
                      <TabsContent value="booking-pricing" className="space-y-6">
                        {/* Pricing Tiers Section */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Pricing Tiers</CardTitle>
                            <CardDescription>Configure your studio's pricing structure</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="pricing-template">Pricing Template</Label>
                                  <Select value={pricingTemplate} onValueChange={handlePricingTemplateChange}>
                                    <SelectTrigger id="pricing-template">
                                      <SelectValue placeholder="Select pricing template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="tokyo-standard">Tokyo Standard</SelectItem>
                                      <SelectItem value="premium">Premium Studio</SelectItem>
                                      <SelectItem value="community">Community Center</SelectItem>
                                      <SelectItem value="custom">Custom Pricing</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="currency">Currency</Label>
                                  <Select value={currency} onValueChange={setCurrency}>
                                    <SelectTrigger id="currency">
                                      <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="jpy">Japanese Yen (¥)</SelectItem>
                                      <SelectItem value="usd">US Dollar ($)</SelectItem>
                                      <SelectItem value="eur">Euro (€)</SelectItem>
                                      <SelectItem value="gbp">British Pound (£)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="adult-price">Adult Price</Label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        {getCurrencySymbol(currency)}
                                      </span>
                                      <Input
                                        id="adult-price"
                                        value={adultPrice}
                                        onChange={(e) => setAdultPrice(e.target.value)}
                                        className="pl-8"
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="child-price">Child Price</Label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        {getCurrencySymbol(currency)}
                                      </span>
                                      <Input
                                        id="child-price"
                                        value={childPrice}
                                        onChange={(e) => setChildPrice(e.target.value)}
                                        className="pl-8"
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="senior-price">Senior Price</Label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        {getCurrencySymbol(currency)}
                                      </span>
                                      <Input
                                        id="senior-price"
                                        value={seniorPrice}
                                        onChange={(e) => setSeniorPrice(e.target.value)}
                                        className="pl-8"
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="corporate-price">Special Price</Label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        {getCurrencySymbol(currency)}
                                      </span>
                                      <Input
                                        id="corporate-price"
                                        value={corporatePrice}
                                        onChange={(e) => setCorporatePrice(e.target.value)}
                                        className="pl-8"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-2">
                                  <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">Bulk Discount</Label>
                                    <Switch checked={true} />
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Apply 10% discount for groups of 5+ people
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Policies Section */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Policies</CardTitle>
                            <CardDescription>Configure your studio's booking and payment policies</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="cancellation-policy">Cancellation Policy</Label>
                                  <Select value={cancellationPolicy} onValueChange={setCancellationPolicy}>
                                    <SelectTrigger id="cancellation-policy">
                                      <SelectValue placeholder="Select cancellation policy" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="flexible">Flexible</SelectItem>
                                      <SelectItem value="standard">Standard</SelectItem>
                                      <SelectItem value="strict">Strict</SelectItem>
                                      <SelectItem value="custom">Custom</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {getCancellationPolicyDescription(cancellationPolicy)}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="delist-policy">Delist Policy</Label>
                                  <Select value={delistPolicy} onValueChange={setDelistPolicy}>
                                    <SelectTrigger id="delist-policy">
                                      <SelectValue placeholder="Select delist policy" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="6-hours">6 Hours Before</SelectItem>
                                      <SelectItem value="24-hours">24 Hours Before</SelectItem>
                                      <SelectItem value="48-hours">48 Hours Before</SelectItem>
                                      <SelectItem value="72-hours">72 Hours Before</SelectItem>
                                      <SelectItem value="never">Never Delist</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {getDelistPolicyDescription(delistPolicy)}
                                  </p>
                                </div>

                                {cancellationPolicy === "custom" && (
                                  <div className="space-y-2">
                                    <Label htmlFor="custom-policy">Custom Cancellation Policy</Label>
                                    <Textarea
                                      id="custom-policy"
                                      placeholder="Enter your custom cancellation policy..."
                                      className="min-h-[100px]"
                                    />
                                  </div>
                                )}
                              </div>

                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Payment Methods</Label>
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                        <Label htmlFor="stripe" className="font-normal">
                                          Stripe
                                        </Label>
                                      </div>
                                      <Switch
                                        id="stripe"
                                        checked={paymentMethods.stripe}
                                        onCheckedChange={(checked) =>
                                          setPaymentMethods({ ...paymentMethods, stripe: checked })
                                        }
                                      />
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                        <Label htmlFor="paypal" className="font-normal">
                                          PayPal
                                        </Label>
                                      </div>
                                      <Switch
                                        id="paypal"
                                        checked={paymentMethods.paypal}
                                        onCheckedChange={(checked) =>
                                          setPaymentMethods({ ...paymentMethods, paypal: checked })
                                        }
                                      />
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                        <Label htmlFor="cash" className="font-normal">
                                          Cash
                                        </Label>
                                      </div>
                                      <Switch
                                        id="cash"
                                        checked={paymentMethods.cash}
                                        onCheckedChange={(checked) =>
                                          setPaymentMethods({ ...paymentMethods, cash: checked })
                                        }
                                      />
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                        <Label htmlFor="credit-card" className="font-normal">
                                          Credit Card (In-person)
                                        </Label>
                                      </div>
                                      <Switch
                                        id="credit-card"
                                        checked={paymentMethods.creditCard}
                                        onCheckedChange={(checked) =>
                                          setPaymentMethods({ ...paymentMethods, creditCard: checked })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between border-t pt-6">
                            <Button variant="outline">Reset to Defaults</Button>
                            <Button onClick={handleSave} disabled={isSaving}>
                              {isSaving ? <>Saving...</> : <>Save Booking & Pricing</>}
                            </Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>

                      {/* Customer Experience Tab */}
                      <TabsContent value="customer-experience" className="space-y-6">
                        {/* Customer Event Page Preview */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Customer Event Page Preview</CardTitle>
                            <CardDescription>See how your events will appear to customers</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                {/* Mobile Preview Mockup */}
                                <div className="mx-auto max-w-sm">
                                  <div className="bg-gray-900 rounded-[2.5rem] p-2">
                                    <div className="bg-white rounded-[2rem] overflow-hidden">
                                      {/* Phone Screen Content */}
                                      <div className="space-y-4">
                                        {/* Hero Banner Area */}
                                        <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center border-b border-dashed border-gray-300">
                                          <div className="text-center p-4">
                                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-600 font-medium">Your custom banner</p>
                                            <p className="text-xs text-gray-500">will appear here</p>
                                          </div>
                                        </div>

                                        {/* Event Content */}
                                        <div className="p-4 space-y-4">
                                          {/* Event Title */}
                                          <div>
                                            <h3 className="font-bold text-lg text-gray-900">
                                              Abstract Painting Basics
                                            </h3>
                                            <p className="text-sm text-gray-600">with Naomi</p>
                                          </div>

                                          {/* Event Details */}
                                          <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                              <span className="text-gray-700">2 hours • Beginner friendly</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                              <span className="text-gray-700">All materials included</span>
                                            </div>
                                          </div>

                                          {/* Instructor Card */}
                                          <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="flex items-center gap-3">
                                              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                                                <span className="text-white font-medium text-sm">N</span>
                                              </div>
                                              <div className="flex-1">
                                                <h4 className="font-medium text-sm">Naomi</h4>
                                                <p className="text-xs text-gray-600">Abstract Art Specialist</p>
                                                <p className="text-xs text-gray-500">5+ years experience</p>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Location */}
                                          <div className="space-y-2">
                                            <h4 className="font-medium text-sm">Location</h4>
                                            <div className="text-sm text-gray-600">
                                              <p>Artbar Daikanyama</p>
                                              <p className="text-xs">Shibuya City, Tokyo</p>
                                            </div>
                                          </div>

                                          {/* Pricing */}
                                          <div className="bg-blue-50 rounded-lg p-3">
                                            <div className="flex items-center justify-between">
                                              <div>
                                                <p className="font-bold text-lg text-blue-900">¥3,500</p>
                                                <p className="text-sm text-blue-700">per person</p>
                                              </div>
                                              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                                Book Now
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                {/* Content Integration Actions */}
                                <div className="space-y-3">
                                  <div>
                                    <Label className="text-base font-medium">Customize Your Event Pages</Label>
                                    <p className="text-sm text-muted-foreground mb-4">
                                      Update these elements to improve how customers see your events
                                    </p>
                                  </div>

                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                          <Upload className="h-4 w-4 text-purple-600" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-sm">Event Banner</p>
                                          <p className="text-xs text-gray-600">Add visual appeal to your events</p>
                                        </div>
                                      </div>
                                      <Button variant="outline" size="sm">
                                        Customize Banner
                                      </Button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                          <div className="w-4 h-4 bg-blue-600 rounded"></div>
                                        </div>
                                        <div>
                                          <p className="font-medium text-sm">Event Templates</p>
                                          <p className="text-xs text-gray-600">Descriptions, duration, difficulty</p>
                                        </div>
                                      </div>
                                      <Button variant="outline" size="sm">
                                        Edit Templates
                                      </Button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                          <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                                        </div>
                                        <div>
                                          <p className="font-medium text-sm">Instructor Profiles</p>
                                          <p className="text-xs text-gray-600">Photos, bios, and specialties</p>
                                        </div>
                                      </div>
                                      <Button variant="outline" size="sm">
                                        Update Instructors
                                      </Button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                          <div className="w-4 h-4 bg-orange-600 rounded-sm"></div>
                                        </div>
                                        <div>
                                          <p className="font-medium text-sm">Location Details</p>
                                          <p className="text-xs text-gray-600">Address, amenities, directions</p>
                                        </div>
                                      </div>
                                      <Button variant="outline" size="sm">
                                        Edit Locations
                                      </Button>
                                    </div>
                                  </div>
                                </div>

                                {/* Optimization Tips */}
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                  <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                                      <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-green-900 mb-1">Boost Your Bookings</h4>
                                      <ul className="text-sm text-green-700 space-y-1">
                                        <li>• Add high-quality instructor photos</li>
                                        <li>• Write detailed event descriptions</li>
                                        <li>• Include materials and difficulty level</li>
                                        <li>• Upload attractive banner images</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Information Collection Section */}
                            <div className="border-t pt-6">
                              <div className="space-y-4">
                                <div>
                                  <Label className="text-base font-medium">Information We Collect</Label>
                                  <p className="text-sm text-muted-foreground">
                                    Choose what information to request from customers during booking
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="flex items-start space-x-3">
                                    <Checkbox
                                      id="phone-required"
                                      checked={customerInfoRequired.phone}
                                      onCheckedChange={(checked) =>
                                        setCustomerInfoRequired({
                                          ...customerInfoRequired,
                                          phone: checked as boolean,
                                        })
                                      }
                                      className="mt-0.5"
                                    />
                                    <div className="space-y-1">
                                      <Label htmlFor="phone-required" className="font-medium text-sm">
                                        Phone Number
                                      </Label>
                                      <p className="text-xs text-muted-foreground">
                                        For booking confirmations and class updates
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-start space-x-3">
                                    <Checkbox
                                      id="emergency-required"
                                      checked={customerInfoRequired.emergency}
                                      onCheckedChange={(checked) =>
                                        setCustomerInfoRequired({
                                          ...customerInfoRequired,
                                          emergency: checked as boolean,
                                        })
                                      }
                                      className="mt-0.5"
                                    />
                                    <div className="space-y-1">
                                      <Label htmlFor="emergency-required" className="font-medium text-sm">
                                        Emergency Contact
                                      </Label>
                                      <p className="text-xs text-muted-foreground">
                                        Required for safety during classes
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-start space-x-3">
                                    <Checkbox
                                      id="dietary-required"
                                      checked={customerInfoRequired.dietary}
                                      onCheckedChange={(checked) =>
                                        setCustomerInfoRequired({
                                          ...customerInfoRequired,
                                          dietary: checked as boolean,
                                        })
                                      }
                                      className="mt-0.5"
                                    />
                                    <div className="space-y-1">
                                      <Label htmlFor="dietary-required" className="font-medium text-sm">
                                        Dietary Restrictions
                                      </Label>
                                      <p className="text-xs text-muted-foreground">
                                        Important for wine and snack offerings
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Booking Confirmations */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Booking Confirmations</CardTitle>
                            <CardDescription>
                              Manage how customers receive booking confirmations and reminders
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-base font-medium">Send Booking Confirmations</Label>
                                      <p className="text-sm text-muted-foreground">
                                        Automatically confirm bookings via email
                                      </p>
                                    </div>
                                    <Switch
                                      checked={automatedEmails.confirmation}
                                      onCheckedChange={(checked) =>
                                        setAutomatedEmails({ ...automatedEmails, confirmation: checked })
                                      }
                                    />
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-base font-medium">24-Hour Reminders</Label>
                                      <p className="text-sm text-muted-foreground">Reduces no-shows by 40%</p>
                                    </div>
                                    <Switch
                                      checked={automatedEmails.reminder}
                                      onCheckedChange={(checked) =>
                                        setAutomatedEmails({ ...automatedEmails, reminder: checked })
                                      }
                                    />
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-base font-medium">SMS Notifications</Label>
                                      <p className="text-sm text-muted-foreground">
                                        Send confirmations and reminders via text
                                      </p>
                                    </div>
                                    <Switch
                                      checked={smsNotifications.confirmation}
                                      onCheckedChange={(checked) =>
                                        setSmsNotifications({
                                          ...smsNotifications,
                                          confirmation: checked,
                                          reminder: checked,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="space-y-3">
                                  <Label className="text-base font-medium">Email Template</Label>
                                  <Select value={emailTemplate} onValueChange={setEmailTemplate}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select email template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="standard">Standard Template</SelectItem>
                                      <SelectItem value="minimal">Minimal Template</SelectItem>
                                      <SelectItem value="detailed">Detailed Template</SelectItem>
                                      <SelectItem value="branded">Branded Template</SelectItem>
                                    </SelectContent>
                                  </Select>

                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                      <Mail className="h-4 w-4 mr-2" />
                                      Preview Email
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                      <MessageSquare className="h-4 w-4 mr-2" />
                                      Preview SMS
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Customer Communication */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Customer Communication</CardTitle>
                            <CardDescription>Configure follow-up communications and marketing messages</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-base font-medium">Post-Class Follow-up</Label>
                                      <p className="text-sm text-muted-foreground">
                                        Thank customers and request feedback
                                      </p>
                                    </div>
                                    <Switch
                                      checked={automatedEmails.thankYou}
                                      onCheckedChange={(checked) =>
                                        setAutomatedEmails({ ...automatedEmails, thankYou: checked })
                                      }
                                    />
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-base font-medium">Newsletter Signup</Label>
                                      <p className="text-sm text-muted-foreground">
                                        Add customers to marketing list automatically
                                      </p>
                                    </div>
                                    <Switch
                                      checked={automatedEmails.newsletter}
                                      onCheckedChange={(checked) =>
                                        setAutomatedEmails({ ...automatedEmails, newsletter: checked })
                                      }
                                    />
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-base font-medium">Marketing Messages</Label>
                                      <p className="text-sm text-muted-foreground">
                                        Send promotional offers and class announcements
                                      </p>
                                    </div>
                                    <Switch
                                      checked={smsNotifications.marketing}
                                      onCheckedChange={(checked) =>
                                        setSmsNotifications({ ...smsNotifications, marketing: checked })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                  <div className="flex items-start gap-3">
                                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                      <h4 className="font-medium text-blue-900 mb-1">Recommended Settings</h4>
                                      <p className="text-sm text-blue-700 mb-3">
                                        Enable booking confirmations and reminders for best results. Marketing messages
                                        are optional.
                                      </p>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-blue-300 text-blue-700 hover:bg-blue-100"
                                        onClick={() => {
                                          setAutomatedEmails({
                                            confirmation: true,
                                            reminder: true,
                                            thankYou: true,
                                            newsletter: false,
                                          })
                                          setSmsNotifications({
                                            confirmation: true,
                                            reminder: true,
                                            marketing: false,
                                          })
                                        }}
                                      >
                                        Apply Recommended Settings
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Gift Certificates */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Gift Certificates</CardTitle>
                            <CardDescription>
                              Configure digital gift certificates sent automatically to customers
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="gift-expiration" className="text-base font-medium">
                                    Expiration Period
                                  </Label>
                                  <Select
                                    value={giftCertificateExpiration}
                                    onValueChange={setGiftCertificateExpiration}
                                  >
                                    <SelectTrigger id="gift-expiration">
                                      <SelectValue placeholder="Select expiration period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="6-months">6 Months</SelectItem>
                                      <SelectItem value="12-months">12 Months</SelectItem>
                                      <SelectItem value="24-months">24 Months</SelectItem>
                                      <SelectItem value="never">Never Expires</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <p className="text-xs text-muted-foreground">
                                    {getGiftCertificateExpirationText(giftCertificateExpiration)}
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-base font-medium">Custom Message Template</Label>
                                  <Textarea
                                    placeholder="Add a personal message that appears on all gift certificates..."
                                    className="min-h-[80px]"
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    This message will appear on every gift certificate sent to customers
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="space-y-3">
                                  <Label className="text-base font-medium">Certificate Design</Label>
                                  <div className="border rounded-lg p-4 bg-gradient-to-br from-purple-50 to-pink-50">
                                    <div className="text-center space-y-2">
                                      <Gift className="h-8 w-8 mx-auto text-purple-600" />
                                      <h4 className="font-medium text-purple-900">Gift Certificate Preview</h4>
                                      <p className="text-sm text-purple-700">Your studio branding will appear here</p>
                                    </div>
                                  </div>

                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                      <Gift className="h-4 w-4 mr-2" />
                                      Customize Design
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                      Preview Certificate
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between border-t pt-6">
                            <Button variant="outline">Reset to Defaults</Button>
                            <Button onClick={handleSave} disabled={isSaving}>
                              {isSaving ? <>Saving...</> : <>Save Customer Experience</>}
                            </Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
