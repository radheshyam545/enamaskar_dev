"use client"

import { useEffect, useState } from "react"

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

export function Countdown({ dateISO }: { dateISO: string }) {
  const target = new Date(dateISO)
  const [t, setT] = useState(() => getRemaining(target))

  useEffect(() => {
    const id = setInterval(() => setT(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [dateISO])

  if (t.finished) {
    return (
      <div className="grid grid-cols-4 gap-3 text-center">
        <TimeCard label="Status" value="Live" />
        <TimeCard label="Best" value="Wishes" />
        <TimeCard label="To the" value="Couple" />
        <TimeCard label="Enjoy" value="🎊" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-3 text-center">
      <TimeCard label="Days" value={t.days} />
      <TimeCard label="Hours" value={t.hours} />
      <TimeCard label="Minutes" value={t.minutes} />
      <TimeCard label="Seconds" value={t.seconds} />
    </div>
  )
}

function TimeCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-xs text-slate-600">{label}</div>
    </div>
  )
}
