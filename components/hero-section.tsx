"use client"

import Image from "next/image"

interface HeroSectionProps {
  onStart: () => void
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photo/main2.jpeg"   // ✅ CORRECT PATH
          alt="Two hands with wedding rings symbolizing commitment and forever"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <div className="animate-pulse-soft text-5xl text-primary" aria-hidden="true">
          ♥
        </div>

        <h1 className="animate-fade-in-up font-sans text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
  <span className="text-balance">Our Love Story</span>
  <span className="block text-balance">
    (Happy Valentines Day Bonda Mukki ♥♥♥)
  </span>
</h1>


        <p className="animate-fade-in-up opacity-0 delay-300 font-serif text-lg leading-relaxed text-muted-foreground md:max-w-xl md:text-xl">
          From a classroom in 11th standard to forever...
          <br />
          This is the story of us.
        </p>

        <button
          onClick={onStart}
          className="animate-fade-in-up opacity-0 delay-700 mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-sans text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Start Our Journey ♥
        </button>

        <div className="animate-fade-in opacity-0 delay-1000 mt-8 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="font-serif text-sm">Scroll down or tap to begin</span>
        </div>
      </div>
    </section>
  )
}
