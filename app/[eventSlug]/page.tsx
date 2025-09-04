// app/[eventSlug]/page.tsx
import { notFound } from "next/navigation";

export default async function EventPage({ params }: { params: { eventSlug: string } }) {
  const { eventSlug } = await params;

  // Fetch event details from DB
  const event = await getEventBySlug(eventSlug);

  if (!event) return notFound();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p>{event.date} @ {event.location}</p>
      <p>{event.description}</p>
      {/* RSVP Form etc */}
    </div>
  );
}

async function getEventBySlug(slug: string) {
  // Dummy data (replace with DB call)
  if (slug === "piyush-chanchal") {
    return {
      title: "Piyush ❤️ Chanchal Wedding",
      date: "2025-09-10",
      location: "Delhi",
      description: "You are warmly invited!"
    };
  }
  return null;
}
