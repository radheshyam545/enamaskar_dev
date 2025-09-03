"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Hero } from "@/components/event/hero"
import { Countdown } from "@/components/event/countdown"
import { RsvpForm } from "@/components/event/rsvp-form"
import { GuestList } from "@/components/event/guest-list"
import { Gallery } from "@/components/event/gallery"
import { SaveTheDateVideo } from "@/components/event/save-the-date-video"

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
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
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
    <main className="font-sans bg-slate-50 text-slate-900">
      {/* Hero / Banner */}
      <Hero
        title={event.title}
        dateISO={event.dateISO}
        locationName={event.location.name}
        bannerImage={event.bannerImage}
        primaryCtaHref="#rsvp"
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
        {/* Details + Countdown */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <Card className="bg-white border-slate-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold tracking-tight text-balance">Event Details</h2>
              <p className="mt-3 leading-relaxed text-slate-700">{event.description}</p>
              <div className="mt-4 text-sm">
                <p className="font-medium">Date & Time</p>
                <p className="text-slate-700">{new Date(event.dateISO).toLocaleString()}</p>
              </div>
              <div className="mt-3 text-sm">
                <p className="font-medium">Location</p>
                <p className="text-slate-700">{event.location.name}</p>
                <p className="text-slate-700">{event.location.addressLine}</p>
                <a
                  href={event.location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-teal-700 hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>
              <div className="mt-6">
                <Button className="bg-teal-600 hover:bg-teal-700" asChild>
                  <a href="#rsvp">RSVP Now</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold tracking-tight">Countdown to Event</h2>
              <Separator className="my-4" />
              <Countdown dateISO={event.dateISO} />
            </CardContent>
          </Card>
        </div>

        {/* Save the Date Video */}
        <section aria-labelledby="save-the-date" className="mt-10 md:mt-14">
          <h2 id="save-the-date" className="text-xl font-semibold">
            Save the Date
          </h2>
          <p className="mt-2 text-slate-700">A short video invitation for friends and family.</p>
          <div className="mt-4">
            <SaveTheDateVideo videoUrl={event.videoUrl} poster="/save-the-date-poster.jpg" />
          </div>
        </section>

        {/* RSVP Form */}
        <section id="rsvp" aria-labelledby="rsvp-title" className="mt-12 md:mt-16">
          <h2 id="rsvp-title" className="text-xl font-semibold">
            RSVP
          </h2>
          <p className="mt-2 text-slate-700">Please confirm your attendance. You can also add a note for the couple.</p>
          <div className="mt-4">
            <RsvpForm />
          </div>
        </section>

        {/* Guest List (if public) */}
        {event.isGuestListPublic ? (
          <section id="guests" aria-labelledby="guest-list-title" className="mt-12 md:mt-16">
            <h2 id="guest-list-title" className="text-xl font-semibold">
              Guest List
            </h2>
            <p className="mt-2 text-slate-700">Guests who have RSVP’d (public view).</p>
            <div className="mt-4">
              <GuestList />
            </div>
          </section>
        ) : null}

        {/* Gallery */}
        <section id="gallery" aria-labelledby="gallery-title" className="mt-12 md:mt-16">
          <h2 id="gallery-title" className="text-xl font-semibold">
            Photo Gallery
          </h2>
          <p className="mt-2 text-slate-700">Photos will appear here after the event.</p>
          <div className="mt-4">
            <Gallery images={event.galleryImages} />
          </div>
        </section>
      </div>
    </main>
  )
}
