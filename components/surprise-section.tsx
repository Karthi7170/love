"use client"

import { useEffect, useRef, useState } from "react"

export function SurpriseSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  const toggleVideo = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      {!isRevealed ? (
        <div className="flex flex-col items-center gap-8 py-12 text-center">
          <div className="animate-pulse-soft text-6xl text-primary">♥</div>

          <h2 className="font-sans text-3xl font-bold md:text-4xl">
            A Special Surprise
          </h2>

          <p className="max-w-md font-serif text-lg text-muted-foreground">
            I have something special for you. Are you ready?
          </p>

          <button
            onClick={() => setIsRevealed(true)}
            className="mt-4 rounded-full bg-primary px-8 py-4 font-sans text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105"
          >
            Open My Heart ♥
          </button>
        </div>
      ) : (
        <div className="animate-fade-in flex flex-col items-center gap-8 py-8">
          
          {/* Video Wrapper */}
          <div className="relative w-full overflow-hidden rounded-2xl">
            <video
              ref={videoRef}
              autoPlay
              loop
              playsInline
              className="h-full w-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/images/video1.mp4" type="video/mp4" />
            </video>

            {/* Play / Pause Button */}
            <button
              onClick={toggleVideo}
              className="absolute bottom-4 left-4 rounded-full bg-black/60 px-5 py-2 text-sm font-medium text-white backdrop-blur transition-all hover:scale-105"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>

          {/* Message Card */}
          <div className="max-w-2xl rounded-2xl border border-border bg-card/80 p-8 shadow-lg backdrop-blur-sm md:p-12">
            <div className="flex flex-col gap-6 text-center">
              <span className="text-4xl text-primary">♥</span>

              <h3 className="font-sans text-2xl font-bold italic md:text-3xl">
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
                <span className="text-3xl text-primary">♥ ♥ ♥</span>
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
