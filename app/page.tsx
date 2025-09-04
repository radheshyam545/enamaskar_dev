"use client"

import { useMemo, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Hero } from "@/components/event/hero"
import { RsvpForm } from "@/components/event/rsvp-form"
import { GuestList } from "@/components/event/guest-list"
import { Gallery } from "@/components/event/gallery"
import { SaveTheDateVideo } from "@/components/event/save-the-date-video"

// Countdown logic
function getRemaining(target: Date) {
  const now = new Date().getTime()
  const diff = target.getTime() - now
  const clamped = Math.max(diff, 0)
  const sec = Math.floor(clamped / 1000)
  const days = Math.floor(sec / (3600 * 24))
  const hours = Math.floor((sec % (3600 * 24)) / 3600)
  const minutes = Math.floor((sec % 3600) / 60)
  const seconds = sec % 60
  return { days, hours, minutes, seconds, finished: diff <= 0 }
}

// Beautiful Time Card Component
function TimeCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/20 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10"></div>
      <div className="relative px-6 py-8 text-center">
        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {value}
        </div>
        <div className="text-sm font-medium text-slate-700 uppercase tracking-wider">{label}</div>
      </div>
    </div>
  )
}

// Beautiful Countdown Component
function BeautifulCountdown({ dateISO }: { dateISO: string }) {
  const target = new Date(dateISO)
  const [t, setT] = useState(() => getRemaining(target))

  useEffect(() => {
    const id = setInterval(() => setT(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [dateISO])

  if (t.finished) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <TimeCard label="Status" value="🎉" />
        <TimeCard label="Best" value="💕" />
        <TimeCard label="Wishes" value="✨" />
        <TimeCard label="Enjoy" value="🎊" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <TimeCard label="Days" value={t.days} />
      <TimeCard label="Hours" value={t.hours} />
      <TimeCard label="Minutes" value={t.minutes} />
      <TimeCard label="Seconds" value={t.seconds} />
    </div>
  )
}

export default function EventPage() {
  // Update these with your actual details (date, location, media, etc.)
  const event = useMemo(
    () => ({
      organizer: "piyush-chanchal",
      title: "Piyush & Chanchal — Wedding Celebration",
      dateISO: "2025-12-07T18:00:00+05:30",
      location: {
        name: "Enamaskar Banquet",
        addressLine: "MG Road, Jaipur, Rajasthan",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Enamaskar%20Banquet%20MG%20Road%20Jaipur",
      },
      description:
        "Join us for an evening of love, laughter, and celebration. Please RSVP to help us plan seating and catering.",
      bannerImage: "/wedding-banner-with-floral-motif.jpg",
      videoUrl: "/videos/wedding_1.mp4",
      isGuestListPublic: true,
      galleryImages: [
        "/engagement-photo-1.jpg",
        "/pre-wedding-shoot-2.jpg",
        "/family-photo-3.jpg",
        "/venue-decor-4.jpg",
        "/candid-5.jpg",
        "/friends-6.jpg",
      ],
    }),
    [],
  )

  return (
    <main className="relative font-sans text-slate-900 min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={event.videoUrl} type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            {event.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 drop-shadow-lg">
            {event.location.name}
          </p>
          <p className="text-lg text-white/80 drop-shadow-md">
            {event.location.addressLine}
          </p>
        </div>

        {/* Beautiful Countdown Section */}
        <div className="mb-16">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                  Countdown to Our Special Day
                </h2>
                <p className="text-white/80 text-lg drop-shadow-md">
                  The celebration begins in...
                </p>
              </div>
              <BeautifulCountdown dateISO={event.dateISO} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
