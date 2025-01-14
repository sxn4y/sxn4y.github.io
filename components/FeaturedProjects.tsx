'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
export default function FeaturedProjects() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
        <div className="grid gap-8">
          <ProjectCard
            title="Main Project"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            imageUrl="/placeholder.svg"
            fullWidth
          />
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              title="Project 2"
              description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              imageUrl="/placeholder.svg"
            />
            <ProjectCard
              title="Project 3"
              description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              imageUrl="/placeholder.svg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ title, description, imageUrl, fullWidth = false }: { title: string; description: string; imageUrl: string; fullWidth?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const tiltFactor = fullWidth ? 80 : 40
      const tiltX = (y - centerY) / tiltFactor
      const tiltY = (centerX - x) / tiltFactor

      card.style.setProperty('--x', `${x}px`)
      card.style.setProperty('--y', `${y}px`)
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
    }

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [fullWidth])

  return (
    <div ref={cardRef} className={`relative group tilt-card glow-effect ${fullWidth ? 'col-span-full' : ''}`}>
      <div className="absolute overflow-hidden inset-0.5 bg-background/60 rounded-lg blur opacity-60 shadow-lg group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-card/60 rounded-lg p-6 h-full flex flex-col shadow-lg border border-border transition-transform duration-300 ease-out">
        <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="transition-transform duration-300 ease-out group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/50"></div>
        </div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="glow-container" />
    </div>
  )
}

