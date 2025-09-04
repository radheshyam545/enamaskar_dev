"use client"

import { useMemo, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

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
      dateISO: "2025-11-03T18:00:00+05:30",
      
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
    <main className="relative font-sans text-slate-900">
      {/* Background Video Section */}
      <div className="relative h-screen w-full bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Desktop Layout with Flowers */}
        <div className="hidden md:flex h-full items-center justify-center">
          {/* Left Side Flowers */}
          <div className="absolute left-0 top-0 w-1/4 h-full flex items-center justify-center">
            <div className="text-8xl opacity-20 transform rotate-12">🌸</div>
            <div className="absolute top-1/4 left-1/4 text-6xl opacity-15 transform -rotate-12">🌺</div>
            <div className="absolute bottom-1/4 left-1/3 text-7xl opacity-25 transform rotate-45">🌻</div>
            <div className="absolute top-3/4 left-1/2 text-5xl opacity-20 transform -rotate-30">🌷</div>
          </div>

          {/* Center Video - Reel Format */}
          <div className="relative w-[347px] h-[629px] bg-black rounded-3xl overflow-hidden shadow-2xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={event.videoUrl} type="video/mp4" />
            </video>
            {/* Video Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div> */}
            {/* <div className="absolute bottom-6 left-6 right-6 text-center">
              <h1 className="text-2xl font-bold text-black mb-2 drop-shadow-lg">
                {event.title}
              </h1>
              <p className="text-black/90 text-sm drop-shadow-md">
                November 3-4, 2024
              </p>
            </div> */}
          </div>

          {/* Right Side Flowers */}
          <div className="absolute right-0 top-0 w-1/4 h-full flex items-center justify-center">
            <div className="text-8xl opacity-20 transform -rotate-12">🌹</div>
            <div className="absolute top-1/4 right-1/4 text-6xl opacity-15 transform rotate-12">🌼</div>
            <div className="absolute bottom-1/4 right-1/3 text-7xl opacity-25 transform -rotate-45">🌺</div>
            <div className="absolute top-3/4 right-1/2 text-5xl opacity-20 transform rotate-30">🌸</div>
          </div>
        </div>

        {/* Mobile Layout - Full Screen */}
        <div className="md:hidden h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={event.videoUrl} type="video/mp4" />
          </video>
          {/* Mobile Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div> */}
          {/* <div className="absolute bottom-8 left-4 right-4 text-center">
            <h1 className="text-3xl font-bold text-black mb-2 drop-shadow-lg">
              {event.title}
            </h1>
            <p className="text-white/90 text-lg drop-shadow-md">
              November 3-4, 2025
            </p>
          </div> */}
        </div>
      </div>

      {/* Countdown Section - Below Video */}
      <div className="relative z-10 bg-gradient-to-b from-slate-900 to-slate-800 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                  Countdown to  Special Day
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
