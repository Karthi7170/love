"use client"

import { cn } from "@/lib/utils"

interface TimelineNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "home", label: "Home", icon: "♥" },
  { id: "school", label: "School Days", icon: "✎" },
  { id: "college", label: "College Life", icon: "★" },
  { id: "work", label: "Work Life", icon: "☕" },
  { id: "present", label: "Still Us", icon: "∞" },
  { id: "gallery", label: "Photos", icon: "📸" },
  { id: "surprise", label: "Surprise", icon: "♥" },
]

export function TimelineNav({ activeTab, onTabChange }: TimelineNavProps) {
  return (
    <nav
      className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md"
      aria-label="Love story timeline navigation"
    >
      <div className="mx-auto max-w-5xl overflow-x-auto px-4">
        <div className="flex items-center gap-1 py-2 md:justify-center">
          {tabs.map((tab, index) => (
            <div key={tab.id} className="flex items-center">
              <button
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 font-sans text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                )}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                <span aria-hidden="true">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
              {index < tabs.length - 1 && (
                <div className="mx-1 hidden h-px w-4 bg-border sm:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
