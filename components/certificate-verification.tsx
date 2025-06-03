"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Search, QrCode, Calendar, User, DollarSign } from "lucide-react"
import { verifyCertificate, formatCertificateCode, type CertificateValidation } from "@/lib/certificate-utils"

interface CertificateVerificationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CertificateVerification({ open, onOpenChange }: CertificateVerificationProps) {
  const [certificateCode, setCertificateCode] = useState("")
  const [verification, setVerification] = useState<CertificateValidation | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = async () => {
    if (!certificateCode.trim()) return

    setIsVerifying(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const result = verifyCertificate(certificateCode.toUpperCase().replace(/\s/g, ""))
    setVerification(result)
    setIsVerifying(false)
  }

  const handleReset = () => {
    setCertificateCode("")
    setVerification(null)
  }

  const statusColorMap = {
    Active: "bg-green-500",
    Redeemed: "bg-blue-500",
    Expired: "bg-gray-500",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Certificate Verification
          </DialogTitle>
          <DialogDescription>Enter a certificate code to verify its authenticity and status.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Verification Input */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="certificateCode">Certificate Code</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="certificateCode"
                  placeholder="ART-XXXX-XXXX"
                  value={certificateCode}
                  onChange={(e) => setCertificateCode(e.target.value)}
                  className="font-mono"
                />
                <Button
                  onClick={handleVerify}
                  disabled={!certificateCode.trim() || isVerifying}
                  className="flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  {isVerifying ? "Verifying..." : "Verify"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Format: ART-XXXX-XXXX (e.g., ART-A1B2-C3D4)</p>
            </div>
          </div>

          {/* Verification Results */}
          {verification && (
            <div className="space-y-4">
              {verification.isValid ? (
                <div className="space-y-4">
                  {/* Success Alert */}
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">Certificate verified successfully!</AlertDescription>
                  </Alert>

                  {/* Certificate Details */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{verification.certificate?.title}</CardTitle>
                          <CardDescription className="font-mono text-sm">
                            {formatCertificateCode(certificateCode.toUpperCase().replace(/\s/g, ""))}
                          </CardDescription>
                        </div>
                        <Badge
                          className={`${statusColorMap[verification.certificate?.status as keyof typeof statusColorMap]} text-white`}
                        >
                          {verification.certificate?.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Value</p>
                            <p className="font-semibold">{verification.certificate?.value}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Customer</p>
                            <p className="font-semibold">{verification.certificate?.customer}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Expires</p>
                            <p className="font-semibold">
                              {verification.certificate?.expiryDate
                                ? new Date(verification.certificate.expiryDate).toLocaleDateString()
                                : "No expiry"}
                            </p>
                          </div>
                        </div>
                        {verification.certificate?.redeemedDate && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Redeemed</p>
                              <p className="font-semibold">
                                {new Date(verification.certificate.redeemedDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4 border-t">
                        {verification.certificate?.status === "Active" && <Button size="sm">Mark as Redeemed</Button>}
                        <Button size="sm" variant="outline">
                          View Full Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Print Certificate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Error Alert */}
                  <Alert className="border-red-200 bg-red-50">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">{verification.error}</AlertDescription>
                  </Alert>

                  {/* Help Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Need Help?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>• Make sure the certificate code is entered correctly</p>
                      <p>• Certificate codes are in the format: ART-XXXX-XXXX</p>
                      <p>• Check that the certificate hasn't expired</p>
                      <p>• Contact customer support if you continue to have issues</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset}>
                  Verify Another Certificate
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* Sample Codes for Testing */}
          {!verification && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">Test Codes</CardTitle>
                <CardDescription>Use these sample codes to test the verification system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono">ART-A1B2-C3D4</code>
                  <Badge variant="outline" className="text-green-600">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono">ART-E5F6-G7H8</code>
                  <Badge variant="outline" className="text-blue-600">
                    Redeemed
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
