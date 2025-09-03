"use client"

import type React from "react"
import { useState } from "react"
import useSWR from "swr"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

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

export function RsvpForm() {
  const { toast } = useToast()
  const { data: rsvps = [], mutate } = useSWR<Rsvp[]>(storageKey, fetcher)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [guests, setGuests] = useState(1)
  const [message, setMessage] = useState("")

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const entry: Rsvp = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      guests: Math.max(1, guests | 0),
      message: message.trim() || undefined,
      createdAt: new Date().toISOString(),
    }
    const next = [entry, ...rsvps]
    localStorage.setItem(storageKey, JSON.stringify(next))
    await mutate(next, { revalidate: false })
    setName("")
    setEmail("")
    setGuests(1)
    setMessage("")
    toast({ title: "RSVP received", description: "Thank you for confirming!" })
  }

  return (
    <Card className="bg-white border-slate-200">
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="guests">Number of Guests (including you)</Label>
            <Input
              id="guests"
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(Number.parseInt(e.target.value || "1", 10))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any note or wishes"
            />
          </div>
          <div>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Confirm RSVP
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
