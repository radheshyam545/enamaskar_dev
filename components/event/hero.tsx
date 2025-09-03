import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function Hero({
  title,
  dateISO,
  locationName,
  bannerImage,
  primaryCtaHref,
}: {
  title: string
  dateISO: string
  locationName: string
  bannerImage: string
  primaryCtaHref?: string
}) {
  const date = new Date(dateISO)
  const dateText = date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <header className="relative">
      <div className="relative h-64 w-full overflow-hidden md:h-96">
        <Image
          src={bannerImage || "/placeholder.svg?height=640&width=1280&query=wedding%20banner"}
          alt="Event banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-5xl px-4 pb-6 md:pb-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-amber-500 text-black hover:bg-amber-500">Save the Date</Badge>
              <span className="text-white/90 text-sm">{dateText}</span>
              <span className="text-white/90 text-sm">•</span>
              <span className="text-white/90 text-sm">{locationName}</span>
            </div>
            <h1 className="mt-3 text-pretty text-2xl font-semibold text-white md:text-4xl">{title}</h1>
            {primaryCtaHref ? (
              <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700 text-white">
                <a href={primaryCtaHref}>RSVP Now</a>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
