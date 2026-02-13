"use client"

import { useEffect, useRef, useState } from "react"

export function SurpriseSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      {!isRevealed ? (
        <div className="flex flex-col items-center gap-8 py-12 text-center">
          <div className="animate-pulse-soft text-6xl text-primary" aria-hidden="true">
            ♥
          </div>

          <h2 className="font-sans text-3xl font-bold text-foreground md:text-4xl">
            A Special Surprise
          </h2>

          <p className="max-w-md font-serif text-lg leading-relaxed text-muted-foreground">
            I have something special for you. Are you ready?
          </p>

          <button
            onClick={() => setIsRevealed(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-sans text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Open My Heart <span aria-hidden="true">♥</span>
          </button>
        </div>
      ) : (
        <div className="animate-fade-in flex flex-col items-center gap-8 py-8">
          
          {/* Video Section */}
          <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl shadow-xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/images/video1.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Message Card */}
          <div className="max-w-2xl rounded-2xl border border-border bg-card/80 p-8 shadow-lg backdrop-blur-sm md:p-12">
            <div className="flex flex-col gap-6 text-center">
              <span className="text-4xl text-primary" aria-hidden="true">♥</span>

              <h3 className="font-sans text-2xl font-bold italic text-foreground md:text-3xl">
                To the love of my life...
              </h3>

              <div className="h-px w-full bg-primary/20" />

              <p className="font-serif text-base leading-loose text-foreground/80 md:text-lg">
                From the first time I saw you in class, something changed in me forever.
                You were not just a person who walked into my life — you became my life.
              </p>

              <p className="font-serif text-base leading-loose text-foreground/80 md:text-lg">
                Through every season — school days filled with stolen glances,
                college years of growing together, and now as we build our futures —
                you have been my constant, my comfort, and my greatest joy.
              </p>

              <p className="font-serif text-base leading-loose text-foreground/80 md:text-lg">
                I promise to keep choosing you, every single day.
                To laugh with you on the easy days and hold you closer on the hard ones.
                To dream with you, build with you, and love you — endlessly.
              </p>

              <p className="font-sans text-xl font-bold text-primary md:text-2xl">
                I love you, today and forever.
              </p>

              <div className="mt-4 flex flex-col items-center gap-2">
                <span className="text-3xl text-primary" aria-hidden="true">♥ ♥ ♥</span>
                <p className="font-serif text-sm italic text-muted-foreground">
                  — With all my heart
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
