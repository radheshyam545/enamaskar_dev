"use client"

import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SaveTheDateVideo({
  videoUrl,
  poster,
}: {
  videoUrl?: string
  poster?: string
}) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggle = async () => {
    const el = ref.current
    if (!el) return
    if (el.paused) {
      await el.play()
      setIsPlaying(true)
    } else {
      el.pause()
      setIsPlaying(false)
    }
  }

  if (!videoUrl) {
    return (
      <Card className="bg-white border-slate-200">
        <CardContent className="p-6">
          <p className="text-sm text-slate-700">
            Add your save-the-date video at public/videos/save-the-date.mp4 and set its URL here to display it.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="rounded-md border border-slate-200 bg-white p-3">
      <div className="relative w-full overflow-hidden rounded-md">
        <video ref={ref} controls={false} poster={poster} className="h-auto w-full">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Button onClick={toggle} className="bg-teal-600 hover:bg-teal-700">
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const el = ref.current
            if (!el) return
            el.currentTime = 0
            el.pause()
            setIsPlaying(false)
          }}
        >
          Restart
        </Button>
      </div>
      <p className="mt-2 text-xs text-slate-600">Replace with your own video link (e.g. /videos/save-the-date.mp4)</p>
    </div>
  )
}
