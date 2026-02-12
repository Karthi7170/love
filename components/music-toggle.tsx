"use client"

import { useState, useEffect } from "react"

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  // Initialize audio on mount only to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)

    const audioElement = new Audio("/audio/mudhal.mp3")
    audioElement.loop = true
    audioElement.volume = 0.3

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audioElement.addEventListener("play", handlePlay)
    audioElement.addEventListener("pause", handlePause)

    setAudio(audioElement)

    return () => {
      audioElement.removeEventListener("play", handlePlay)
      audioElement.removeEventListener("pause", handlePause)
      audioElement.pause()
    }
  }, [])

  const toggleMusic = async () => {
    if (!audio) return

    try {
      if (audio.paused) {
        await audio.play()
      } else {
        audio.pause()
      }
    } catch (error) {
      console.error("[v0] Error toggling audio:", error)
    }
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
    >
      {isPlaying ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )}
    </button>
  )
}
