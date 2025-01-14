'use client'

import { useEffect, useRef } from 'react'

export default function GridBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollY = window.scrollY
        backgroundRef.current.style.transform = `translateY(${scrollY * -0.5}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div
        ref={backgroundRef}
        className="absolute inset-0 grid-background"
        style={{ height: '300%' }}
      />
    </div>
  )
}

