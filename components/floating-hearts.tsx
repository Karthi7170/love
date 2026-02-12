"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  left: number
  size: number
  delay: number
  duration: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * 16 + 10,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 3,
      }
      setHearts((prev) => [...prev.slice(-12), newHeart])
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-float-heart text-primary opacity-0"
          style={{
            left: `${heart.left}%`,
            bottom: "-20px",
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
          aria-hidden="true"
        >
          {"♥"}
        </span>
      ))}
    </div>
  )
}
