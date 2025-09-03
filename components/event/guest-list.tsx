"use client"

import useSWR from "swr"
import { Card, CardContent } from "@/components/ui/card"

type Rsvp = {
  id: string
  name: string
  email: string
  guests: number
  message?: string
  createdAt: string
}

const storageKey = "rsvps"
const fetcher = async () => {
  const raw = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null
  return raw ? (JSON.parse(raw) as Rsvp[]) : []
}

export function GuestList() {
  const { data: rsvps = [] } = useSWR<Rsvp[]>(storageKey, fetcher)

  if (!rsvps.length) {
    return (
      <Card className="bg-white border-slate-200">
        <CardContent className="p-6 text-sm text-slate-700">No guests yet. Be the first to RSVP!</CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-3">
      {rsvps.map((r) => (
        <Card key={r.id} className="bg-white border-slate-200">
          <CardContent className="p-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{r.name}</p>
                <p className="text-xs text-slate-600">{new Date(r.createdAt).toLocaleString()}</p>
              </div>
              <p className="text-sm text-slate-700">
                Guests: <span className="font-medium">{r.guests}</span>
              </p>
              {r.message ? <p className="text-sm text-slate-700">“{r.message}”</p> : null}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
