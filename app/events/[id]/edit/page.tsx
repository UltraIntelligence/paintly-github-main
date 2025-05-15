"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EventEditRedirect({ params }: { params: { id: string } }) {
  const router = useRouter()

  useEffect(() => {
    router.replace(`/events/${params.id}`)
  }, [router, params.id])

  return <div className="p-12 text-center">Redirecting to event details...</div>
}
