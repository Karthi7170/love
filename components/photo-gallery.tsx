"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface PhotoGalleryProps {
  photos: string[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Auto-advance every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [photos.length])

  const goToPrevious = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const goToNext = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const goToPhoto = (index: number) => {
    setCurrentPhotoIndex(index)
  }

  return (
    <div className="w-full space-y-6">
      {/* Main Photo Display */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-secondary shadow-lg">
        <Image
          src={photos[currentPhotoIndex] || "/placeholder.svg"}
          alt={`Photo ${currentPhotoIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition-all hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Previous photo"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition-all hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Next photo"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19l7-7-7-7" />
          </svg>
        </button>

        {/* Photo Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-center text-sm font-medium text-white">
          {currentPhotoIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Thumbnails Grid */}
      <div className="grid grid-cols-6 gap-2">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => goToPhoto(index)}
            className={`relative aspect-square overflow-hidden rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
              currentPhotoIndex === index
                ? "ring-2 ring-primary shadow-lg"
                : "opacity-70 hover:opacity-100"
            }`}
            aria-label={`Go to photo ${index + 1}`}
            aria-current={currentPhotoIndex === index}
          >
            <Image
              src={photo || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 60px, 80px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
