// Utility functions for certificate generation and validation

export function generateCertificateCode(): string {
  // Generate a unique certificate code in format: ART-XXXX-XXXX
  const prefix = "ART"
  const part1 = Math.random().toString(36).substring(2, 6).toUpperCase()
  const part2 = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${part1}-${part2}`
}

export function generateQRCodeUrl(certificateCode: string, baseUrl = "https://artbar.com"): string {
  // Generate QR code URL using a QR code service
  const verificationUrl = `${baseUrl}/verify/${certificateCode}`
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(verificationUrl)}`
}

export function validateCertificateCode(code: string): boolean {
  // Validate certificate code format: ART-XXXX-XXXX
  const pattern = /^ART-[A-Z0-9]{4}-[A-Z0-9]{4}$/
  return pattern.test(code)
}

export function formatCertificateCode(code: string): string {
  // Format code for display with proper spacing
  return code.replace(/-/g, " - ")
}

export interface CertificateValidation {
  isValid: boolean
  certificate?: {
    id: string
    title: string
    value: string
    status: "Active" | "Redeemed" | "Expired"
    customer: string
    expiryDate: string
    redeemedDate?: string
  }
  error?: string
}

export function verifyCertificate(code: string): CertificateValidation {
  // Mock verification function - in real app, this would call an API
  if (!validateCertificateCode(code)) {
    return {
      isValid: false,
      error: "Invalid certificate code format",
    }
  }

  // Mock certificate data for demonstration
  const mockCertificates: Record<string, any> = {
    "ART-A1B2-C3D4": {
      id: "gc1",
      title: "Premium Paint & Sip Experience",
      value: "¥10,000",
      status: "Active",
      customer: "Tanaka Yuki",
      expiryDate: "2024-12-31",
    },
    "ART-E5F6-G7H8": {
      id: "gc2",
      title: "Group Art Workshop",
      value: "¥25,000",
      status: "Redeemed",
      customer: "Suzuki Haruto",
      expiryDate: "2024-11-30",
      redeemedDate: "2024-02-15",
    },
  }

  const certificate = mockCertificates[code]
  if (!certificate) {
    return {
      isValid: false,
      error: "Certificate not found",
    }
  }

  return {
    isValid: true,
    certificate,
  }
}
