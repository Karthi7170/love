"use client"

import { useState, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import { HeroSection } from "@/components/hero-section"
import { TimelineNav } from "@/components/timeline-nav"
import { PhaseSection } from "@/components/phase-section"
import { SurpriseSection } from "@/components/surprise-section"
import { FloatingHearts } from "@/components/floating-hearts"
import { PhotoGallery } from "@/components/photo-gallery"

const MusicToggle = dynamic(
  () => import("@/components/music-toggle").then(mod => ({ default: mod.MusicToggle })),
  { ssr: false }
)

// ✅ CORRECT generator for 99 photos named 1.jpg → 99.jpg
const galleryPhotos = Array.from(
  { length: 90 },
  (_, i) => `/images/${i + 1}.JPG`
)

const phases = [
  {
    id: "school",
    title: "Where It All Started From Vaani School",
    subtitle: "11th Standard - First Chapter",
    year: "2019",
    imageSrc: "/images/1.JPG",
    imageAlt: "School memories",

    paragraphs: [
      "It all began in a classroom filled with chalk dust and nervous laughter.",
      "Among all the faces, there was only one that made time slow down.",
    ],
    captions: [
      "I didn't know then, but you were already my forever.",
    ],
  },
  {
    id: "college",
    title: "Growing Together",
    subtitle: "Crazy Memories",
    year: "2021",
    imageSrc: "/gallery/2.jpg",
    imageAlt: "College memories",
    paragraphs: [
      "College brought new adventures, new challenges, and a love that only grew deeper.",
      "Every moment together proved that what we have is unshakeable.",
    ],
    captions: [
      "You made ordinary days unforgettable.",
    ],
  },
  {
    id: "work",
    title: "Stronger Than Ever",
    subtitle: "Side by Side",
    year: "2023",
    imageSrc: "/images/23.JPG",
    imageAlt: "Work phase",
    paragraphs: [
      "The real world hit, but we faced everything — together.",
      "Every hard day ended softer because of you.",
    ],
    captions: [
      "We became each other's home.",
    ],
  },

  // ✅ STILL SECTION
  {
    id: "still",
    title: "Still Us",
    subtitle: "Through Everything",
    year: "Always",
    imageSrc: "/images/40.JPG", // change if needed
    imageAlt: "Still together",
    paragraphs: [
      "Time changed, life changed, but one thing never did — us.",
      "Through every phase, every challenge, every moment, we remained.",
    ],
    captions: [
      "Some things are simply meant to last.",
    ],
  },

  // ✅ GALLERY SECTION
  {
    id: "gallery",
    title: "Our Memories",
    subtitle: "Captured Moments",
    year: "∞",
    imageSrc: "/images/53.JPG",
    imageAlt: "Gallery memories",
    paragraphs: [
      "Every picture holds a piece of our story.",
      "Moments frozen in time, feelings that never fade.",
    ],
    captions: [
      "Our journey, frame by frame.",
    ],
  },

  {
    id: "present",
    title: "Still Choosing You",
    subtitle: "Our Present & Future",
    year: "2026",
    imageSrc: "/images/6.JPG",
    imageAlt: "Present & future",
    paragraphs: [
      "Years later, my heart still skips a beat for you.",
      "Every dream, every plan, every tomorrow — I want it all with you.",
    ],
    captions: [
      "Our best chapter hasn't been written yet.",
    ],
  },
]

export default function Page() {
  const [showTimeline, setShowTimeline] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const handleStart = () => {
    setShowTimeline(true)
    setActiveTab("school")

    setTimeout(() => {
      sectionRefs.current["school"]?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)

    if (tab === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    sectionRefs.current[tab]?.scrollIntoView({ behavior: "smooth" })
  }

  // ✅ Scroll detection
  useEffect(() => {
    if (!showTimeline) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section")
            if (id) setActiveTab(id)
          }
        }
      },
      { threshold: 0.4 }
    )

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [showTimeline])

  return (
    <main className="min-h-screen">
      <FloatingHearts />
      <MusicToggle />

      <HeroSection onStart={handleStart} />

      {showTimeline && (
        <TimelineNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {showTimeline && (
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-24">
  <div className="flex flex-col gap-24 md:gap-32">

            {phases.map((phase, index) => (
              <div
                key={phase.id}
                ref={(el) => { sectionRefs.current[phase.id] = el }}
                data-section={phase.id}
              >
                <PhaseSection {...phase} isReversed={index % 2 !== 0} />

                {/* ✅ Only gallery renders PhotoGallery */}
                {phase.id === "gallery" && (
                  <div className="mt-10">
                    <PhotoGallery photos={galleryPhotos} />
                  </div>
                )}
              </div>
            ))}

            <div
              ref={(el) => { sectionRefs.current["surprise"] = el }}
              data-section="surprise"
            >
              <SurpriseSection />
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-border bg-card/50 py-12 text-center">
        <p className="font-serif text-sm text-muted-foreground">
          Made with all my love, just for you Only you d Mukki.
        </p>
        <p className="mt-2 text-2xl text-primary">{"♥"}</p>
      </footer>
    </main>
  )
}
