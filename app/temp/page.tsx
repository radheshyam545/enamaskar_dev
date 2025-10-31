"use client";

import React, { useState } from "react";
import { Heart, Calendar, MapPin, Send } from "lucide-react";

interface Section {
  title: string;
  description: string;
  media: string;
  type: "video" | "image";
  date: string;
  time: string;
  venue: string;
  color: string;
}

interface Wish {
  id: number;
  name: string;
  message: string;
}

const WeddingEventPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<number>(0);
  const [wishName, setWishName] = useState<string>("");
  const [wishMessage, setWishMessage] = useState<string>("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const sections: Section[] = [
  {
    title: "Mehendi Carnival",
    description:
      "Join us for an evening of intricate henna designs, vibrant colors, and traditional festivities. Let the artistry of mehendi mark the beginning of our beautiful journey together.",
    media:
      "mehandi.jpg",
    type: "image",
    date: "November 03, 2025",
    time: "1:00 PM onwards",
    venue: "Pool Side, Pushkara Resort",
    color: "from-green-50 to-emerald-50",
  },
  {
    title: "Sangeet",
    description:
      "Dance the night away with music, performances, and celebrations. A night filled with rhythm, laughter, and cherished memories as our families come together in harmony.",
    media:"sangeet.jpg",
    type: "image",
    date:"November 03, 2025",
    time: "6:30 PM onwards",
    venue: "Main Lawn, Pushkara Resort",
    color: "from-purple-50 to-pink-50",
  },
  {
    title: "Haldi",
    description:
      "A vibrant morning ceremony where turmeric paste brings blessings and glow. Experience the joyous tradition that purifies and prepares us for the sacred union ahead.",
    media:"haldi.jpg",
    type: "image",
    date: "November 04, 2025",
    time: "08:30 AM onwards",
    venue: "Pool Side, Pushkara Resort",
    color: "from-yellow-50 to-orange-50",
  },
  {
    title: "Wedding Reception & Pheras",
    description:
      "Witness the sacred union as we take our seven vows around the holy fire, followed by an elegant reception celebrating our new beginning. Join us for an evening of love, blessings, and celebration.",
    media:"reception.jpg",
    type: "image",
    date: "November 04, 2025",
    time: "Reception-07:00 PM & Pheras-11:00 PM",
    venue: "Main Lawn, Pushkara Resort",
    color: "from-red-50 to-rose-50",
  },
  {
    title: "Wish & Compliments",
    description:
      "Share your love, blessings, and heartfelt wishes with the couple. Let your words add to the joy of their celebration and create cherished memories for a lifetime.",
    media:"complements.jpg",
    type: "image",
    date: "",
    time: "",
    venue: "",
    color: "from-pink-50 to-red-50",
  },
];


  const handleSectionChange = (index: number) => {
    if (index === selectedSection) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedSection(index);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSubmitWish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (wishName.trim() && wishMessage.trim()) {
      const newWish: Wish = {
        id: Date.now(),
        name: wishName,
        message: wishMessage,
      };
      setWishes((prev) => [...prev, newWish]);
      setWishName("");
      setWishMessage("");
    }
  };

  const currentSection = sections[selectedSection];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex flex-col">
  {/* Header */}
  <header className="text-center py-8 md:py-10 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-3 mb-2 md:mb-3">
        <Heart className="w-6 h-6 md:w-7 md:h-7 text-rose-400 fill-rose-400" />
        <h1 className="text-3xl md:text-5xl font-serif text-gray-800">
          Piyush & Chanchal
        </h1>
        <Heart className="w-6 h-6 md:w-7 md:h-7 text-rose-400 fill-rose-400" />
      </div>
      <p className="text-sm md:text-lg text-gray-600 font-light">
        Together with their families, invite you to celebrate their union
      </p>
    </div>

    {/* Decorative divider */}
    <div className="flex items-center justify-center gap-4 mt-4">
      <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-rose-300"></div>
      <div className="text-lg md:text-2xl text-rose-300">❁</div>
      <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-rose-300"></div>
    </div>
  </header>

  {/* Section Selector */}
  <div className="max-w-5xl mx-auto px-3 mb-6 md:mb-10">
    <div className="bg-white rounded-2xl shadow-md p-2 flex flex-wrap gap-2 justify-center">
      {sections.map((section, index) => (
        <button
          key={section.title}
          onClick={() => handleSectionChange(index)}
          className={`px-3 py-2 md:px-5 md:py-2.5 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
            selectedSection === index
              ? "bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md transform scale-105"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          {section.title}
        </button>
      ))}
    </div>
  </div>

  {/* Main Display Area */}
  <div className="flex-grow flex items-center justify-center px-3 mb-8 md:mb-12">
    <div
      className={`bg-gradient-to-br ${currentSection.color} rounded-3xl shadow-xl overflow-hidden transition-all duration-500 w-full max-w-5xl`}
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Media Section */}
        <div className="relative h-[60vh] md:h-[360px] lg:h-[400px] overflow-hidden">
          <div
            key={currentSection.media} // ✅ ensures re-render on tab change
            className={`w-full h-full transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentSection.type === "video" ? (
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={currentSection.media} type="video/mp4" />
              </video>
            ) : (
              <img
                src={currentSection.media}
                alt={currentSection.title}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>

        {/* Content Section */}
        <div
          className={`p-5 md:p-8 flex flex-col justify-center transition-all duration-500 ${
            isTransitioning
              ? "opacity-0 translate-x-4"
              : "opacity-100 translate-x-0"
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-serif text-gray-800 mb-3 md:mb-5">
            {currentSection.title}
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-5 md:mb-6">
            {currentSection.description}
          </p>

          <div className="space-y-3 text-sm md:text-base">
            {currentSection.date && currentSection.time && (
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />
                <div>
                  <p className="font-semibold">{currentSection.date}</p>
                  <p className="text-gray-600">{currentSection.time}</p>
                </div>
              </div>
            )}
            {currentSection.venue && (
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />
                <p className="font-semibold">{currentSection.venue}</p>
              </div>
            )}
          </div>

          {/* Decorative line */}
          <div className="mt-5 flex items-center gap-2">
            <div className="h-1 w-8 md:w-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full"></div>
            <div className="text-rose-400 text-xs md:text-sm">✦</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Footer */}
  <footer className="text-center py-6 px-4 border-t border-gray-200 mt-auto">
    <p className="text-gray-600 text-sm md:text-base">With love and gratitude</p>
    <div className="flex items-center justify-center gap-2 mt-1">
      <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
      <p className="text-gray-500 text-xs md:text-sm">Piyush & Chanchal</p>
    </div>
  </footer>
</div>


  );
};

export default WeddingEventPage;
