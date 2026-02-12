"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface PhaseProps {
  title: string
  subtitle: string
  year: string
  imageSrc: string
  imageAlt: string
  paragraphs: string[]
  captions: string[]
  isReversed?: boolean
}

export function PhaseSection({
  title,
  subtitle,
  year,
  imageSrc,
  imageAlt,
  paragraphs,
  captions,
  isReversed = false,
}: PhaseProps) {
  const [isVisible, setIsVisible] = useState(false)
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
      <div className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${isReversed ? "lg:flex-row-reverse" : ""}`}>
        {/* Image */}
        <div className="relative lg:w-1/2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          {/* Year badge */}
          <div className="absolute -bottom-4 left-6 rounded-full bg-primary px-5 py-2 font-sans text-sm font-bold text-primary-foreground shadow-lg">
            {year}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 lg:w-1/2">
          <span className="font-serif text-sm uppercase tracking-widest text-primary">
            {subtitle}
          </span>
          <h2 className="font-sans text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {title}
          </h2>
          <div className="h-px w-16 bg-primary/40" aria-hidden="true" />
          {paragraphs.map((p, i) => (
            <p key={i} className="font-serif text-base leading-relaxed text-muted-foreground md:text-lg">
              {p}
            </p>
          ))}
          {/* Captions */}
          <div className="mt-4 flex flex-col gap-3">
            {captions.map((caption, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1 text-primary" aria-hidden="true">{"♥"}</span>
                <p className="font-serif text-sm italic text-foreground/70">
                  {`"${caption}"`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
