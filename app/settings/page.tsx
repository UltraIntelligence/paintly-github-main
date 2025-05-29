"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Upload, Check, Info, Clock, CreditCard, Mail, MessageSquare, Gift } from "lucide-react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
  const [hoursTemplate, setHoursTemplate] = useState("standard")
  const [selectedPalette, setSelectedPalette] = useState("creative")

  // Booking & Pricing state
  const [pricingTemplate, setPricingTemplate] = useState("tokyo-standard")
  const [adultPrice, setAdultPrice] = useState("3500")
  const [childPrice, setChildPrice] = useState("2500")
  const [seniorPrice, setSeniorPrice] = useState("3000")
  const [corporatePrice, setCorporatePrice] = useState("4000")
  const [currency, setCurrency] = useState("jpy")
  const [cancellationPolicy, setCancellationPolicy] = useState("standard")
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
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center mb-8">
                      <div className="flex-1">
                        <h1 className="text-2xl font-semibold mb-1">Settings</h1>
                        <p className="text-sm text-muted-foreground">Configure your studio business settings</p>
                      </div>
                      <div className="relative flex-shrink-0 w-full lg:w-auto lg:max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search settings..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="mb-6">
                        <TabsTrigger value="studio-setup">Studio Setup</TabsTrigger>
                        <TabsTrigger value="booking-pricing">Booking & Pricing</TabsTrigger>
                        <TabsTrigger value="customer-experience">Customer Experience</TabsTrigger>
                      </TabsList>

                      {/* Studio Setup Tab */}
                      <TabsContent value="studio-setup" className="space-y-6">
                        {/* Branding Section */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Branding</CardTitle>
                            <CardDescription>Configure your studio's brand identity</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Brand Color Palette</Label>
                                  <RadioGroup
                                    value={selectedPalette}
                                    onValueChange={setSelectedPalette}
                                    className="grid grid-cols-1 gap-3"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="creative" id="creative" />
                                      <Label htmlFor="creative" className="flex items-center gap-2">
                                        Creative Palette
                                        {getPalettePreview("creative")}
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="professional" id="professional" />
                                      <Label htmlFor="professional" className="flex items-center gap-2">
                                        Professional Palette
                                        {getPalettePreview("professional")}
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="warm" id="warm" />
                                      <Label htmlFor="warm" className="flex items-center gap-2">
                                        Warm Palette
                                        {getPalettePreview("warm")}
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                </div>

                                <div className="space-y-2 pt-4">
                                  <Label>Live Preview</Label>
                                  <div className="border rounded-lg p-4 bg-gray-50">
                                    <div className="flex gap-2 mb-3">
                                      <Button
                                        size="sm"
                                        className={
                                          selectedPalette === "creative"
                                            ? "bg-purple-500 hover:bg-purple-600"
                                            : selectedPalette === "professional"
                                              ? "bg-blue-500 hover:bg-blue-600"
                                              : "bg-red-500 hover:bg-red-600"
                                        }
                                      >
                                        Primary Button
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        Secondary Button
                                      </Button>
                                    </div>
                                    <div className="flex gap-2">
                                      <Badge
                                        className={
                                          selectedPalette === "creative"
                                            ? "bg-amber-500"
                                            : selectedPalette === "professional"
                                              ? "bg-emerald-500"
                                              : "bg-orange-500"
                                        }
                                      >
                                        Badge Example
                                      </Badge>
                                      <Badge variant="outline">Outline Badge</Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Business Information Section */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Business Information</CardTitle>
                            <CardDescription>Configure your studio's basic information</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="business-type">Business Type</Label>
                                  <Select value={businessType} onValueChange={setBusinessType}>
                                    <SelectTrigger id="business-type">
                                      <SelectValue placeholder="Select business type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="paint-sip">Paint & Sip Studio</SelectItem>
                                      <SelectItem value="art-school">Art School</SelectItem>
                                      <SelectItem value="creative-workshop">Creative Workshop</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

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
                              </div>

                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="hours-template">Business Hours Template</Label>
                                  <Select value={hoursTemplate} onValueChange={setHoursTemplate}>
                                    <SelectTrigger id="hours-template">
                                      <SelectValue placeholder="Select hours template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="standard">Standard Hours</SelectItem>
                                      <SelectItem value="weekend">Weekend Focus</SelectItem>
                                      <SelectItem value="evening">Evening Classes</SelectItem>
                                      <SelectItem value="custom">Custom</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {getHoursTemplateDescription(hoursTemplate)}
                                  </p>
                                </div>

                                {hoursTemplate === "custom" && (
                                  <div className="space-y-2 pt-2">
                                    <Label>Custom Hours Configuration</Label>
                                    <div className="border rounded-lg p-4 bg-gray-50">
                                      <p className="text-sm text-muted-foreground">
                                        Configure custom hours in the Business Hours section
                                      </p>
                                      <Button variant="outline" size="sm" className="mt-2">
                                        Configure Hours
                                      </Button>
                                    </div>
                                  </div>
                                )}
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
                                    <Label htmlFor="corporate-price">Corporate Price</Label>
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
                        {/* Booking Flow Section */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Booking Flow</CardTitle>
                            <CardDescription>Configure your customer booking experience</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="booking-theme">Booking Page Theme</Label>
                                  <Select value={bookingTheme} onValueChange={setBookingTheme}>
                                    <SelectTrigger id="booking-theme">
                                      <SelectValue placeholder="Select booking theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="modern">Modern</SelectItem>
                                      <SelectItem value="classic">Classic</SelectItem>
                                      <SelectItem value="minimal">Minimal</SelectItem>
                                      <SelectItem value="colorful">Colorful</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label>Theme Preview</Label>
                                  <div className="border rounded-lg overflow-hidden">
                                    <div
                                      className={`h-40 bg-${
                                        bookingTheme === "modern"
                                          ? "blue-50"
                                          : bookingTheme === "classic"
                                            ? "amber-50"
                                            : bookingTheme === "minimal"
                                              ? "gray-50"
                                              : "purple-50"
                                      } flex items-center justify-center`}
                                    >
                                      <img
                                        src={`/placeholder.svg?height=160&width=320&query=${bookingTheme}%20booking%20theme%20preview`}
                                        alt={`${bookingTheme} theme preview`}
                                        className="max-h-full"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Customer Information Requirements</Label>
                                  <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id="phone"
                                        checked={customerInfoRequired.phone}
                                        onCheckedChange={(checked) =>
                                          setCustomerInfoRequired({
                                            ...customerInfoRequired,
                                            phone: checked as boolean,
                                          })
                                        }
                                      />
                                      <Label htmlFor="phone" className="font-normal">
                                        Phone Number
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id="emergency"
                                        checked={customerInfoRequired.emergency}
                                        onCheckedChange={(checked) =>
                                          setCustomerInfoRequired({
                                            ...customerInfoRequired,
                                            emergency: checked as boolean,
                                          })
                                        }
                                      />
                                      <Label htmlFor="emergency" className="font-normal">
                                        Emergency Contact
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id="dietary"
                                        checked={customerInfoRequired.dietary}
                                        onCheckedChange={(checked) =>
                                          setCustomerInfoRequired({
                                            ...customerInfoRequired,
                                            dietary: checked as boolean,
                                          })
                                        }
                                      />
                                      <Label htmlFor="dietary" className="font-normal">
                                        Dietary Restrictions
                                      </Label>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2 pt-4">
                                  <Label htmlFor="email-template">Confirmation Email Template</Label>
                                  <Select value={emailTemplate} onValueChange={setEmailTemplate}>
                                    <SelectTrigger id="email-template">
                                      <SelectValue placeholder="Select email template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="standard">Standard</SelectItem>
                                      <SelectItem value="minimal">Minimal</SelectItem>
                                      <SelectItem value="detailed">Detailed</SelectItem>
                                      <SelectItem value="branded">Branded</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <div className="flex justify-end mt-2">
                                    <Button variant="outline" size="sm">
                                      Preview Template
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Communication Settings */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Communication Settings</CardTitle>
                            <CardDescription>Configure how you communicate with customers</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Automated Emails</Label>
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <Label htmlFor="confirmation-email" className="font-normal">
                                          Booking Confirmation
                                        </Label>
                                      </div>
                                      <Switch
                                        id="confirmation-email"
                                        checked={automatedEmails.confirmation}
                                        onCheckedChange={(checked) =>
                                          setAutomatedEmails({ ...automatedEmails, confirmation: checked })
                                        }
                                      />
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <Label htmlFor="reminder-email" className="font-normal">
                                          24hr Reminder
                                        </Label>
                                      </div>
                                      <Switch
                                        id="reminder-email"
                                        checked={automatedEmails.reminder}
                                        onCheckedChange={(checked) =>
                                          setAutomatedEmails({ ...automatedEmails, reminder: checked })
                                        }
                                      />
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-muted-foreground" />
                                        <Label htmlFor="thank-you-email" className="font-normal">
                                          Thank You Email
                                        </Label>
                                      </div>
                                      <Switch
                                        id="thank-you-email"
                                        checked={automatedEmails.thankYou}
                                        onCheckedChange={(checked) =>
                                          setAutomatedEmails({ ...automatedEmails, thankYou: checked })
                                        }
                                      />
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <Label htmlFor="newsletter-email" className="font-normal">
                                          Newsletter
                                        </Label>
                                      </div>
                                      <Switch
                                        id="newsletter-email"
                                        checked={automatedEmails.newsletter}
                                        onCheckedChange={(checked) =>
                                          setAutomatedEmails({ ...automatedEmails, newsletter: checked })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2 pt-4">
                                  <Label>SMS Notifications</Label>
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                        <Label htmlFor="confirmation-sms" className="font-normal">
                                          Booking Confirmation
                                        </Label>
                                      </div>
                                      <Switch
                                        id="confirmation-sms"
                                        checked={smsNotifications.confirmation}
                                        onCheckedChange={(checked) =>
                                          setSmsNotifications({ ...smsNotifications, confirmation: checked })
                                        }
                                      />
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <Label htmlFor="reminder-sms" className="font-normal">
                                          Class Reminder
                                        </Label>
                                      </div>
                                      <Switch
                                        id="reminder-sms"
                                        checked={smsNotifications.reminder}
                                        onCheckedChange={(checked) =>
                                          setSmsNotifications({ ...smsNotifications, reminder: checked })
                                        }
                                      />
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                        <Label htmlFor="marketing-sms" className="font-normal">
                                          Marketing Messages
                                        </Label>
                                      </div>
                                      <Switch
                                        id="marketing-sms"
                                        checked={smsNotifications.marketing}
                                        onCheckedChange={(checked) =>
                                          setSmsNotifications({ ...smsNotifications, marketing: checked })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Gift Certificate Settings</Label>
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="gift-expiration">Expiration Period</Label>
                                      <Select
                                        value={giftCertificateExpiration}
                                        onValueChange={setGiftCertificateExpiration}
                                      >
                                        <SelectTrigger id="gift-expiration">
                                          <SelectValue placeholder="Select expiration period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="3-months">3 Months</SelectItem>
                                          <SelectItem value="6-months">6 Months</SelectItem>
                                          <SelectItem value="12-months">12 Months</SelectItem>
                                          <SelectItem value="never">No Expiration</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {getGiftCertificateExpirationText(giftCertificateExpiration)}
                                      </p>
                                    </div>

                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <Label htmlFor="gift-design">Custom Gift Design</Label>
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                              <Info className="h-4 w-4" />
                                            </Button>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-80">
                                            <div className="space-y-2">
                                              <h4 className="font-medium">Gift Certificate Design</h4>
                                              <p className="text-sm text-muted-foreground">
                                                Customize the appearance of your gift certificates with your brand
                                                colors and logo.
                                              </p>
                                            </div>
                                          </PopoverContent>
                                        </Popover>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" className="flex-1">
                                          <Gift className="h-4 w-4 mr-2" />
                                          Customize Design
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1">
                                          Preview
                                        </Button>
                                      </div>
                                    </div>
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
