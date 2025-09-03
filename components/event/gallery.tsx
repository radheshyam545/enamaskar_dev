import Image from "next/image"
import { Card } from "@/components/ui/card"

export function Gallery({ images }: { images: string[] }) {
  if (!images?.length) return null
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {images.map((src, idx) => (
        <Card key={idx} className="overflow-hidden">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={src || "/placeholder.svg?height=600&width=800&query=gallery%20photo"}
              alt={`Gallery image ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        </Card>
      ))}
    </div>
  )
}
