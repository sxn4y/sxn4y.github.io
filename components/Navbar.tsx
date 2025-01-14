'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, X } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/20 backdrop-blur-md backdrop-saturate-md border-b border-border shadow-lg">
      <div className="container mx-auto py-3 flex flex-wrap justify-between items-center px-6 md:px-18 lg:px-36">
        {/* Logo and Title */}
        <Link href="#top" className="flex flex-col">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#390099] via-[#9E0059] to-[#FF0054] text-transparent bg-clip-text transition duration-300 ease-out">
            <strong>Supern0va.</strong>
          </h1>
          <span className="text-xs text-muted-foreground">Sunny's portfolio</span>
        </Link>

        {/* Mobile Menu Button and Theme Switcher */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="mr-2"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Menu className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavButton onClick={() => scrollToSection('projects')}>Projects</NavButton>
          <NavButton onClick={() => scrollToSection('about')}>About</NavButton>
          <NavButton onClick={() => scrollToSection('contact')}>Contact</NavButton>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`w-full md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col gap-2 pt-2">
            <MobileNavButton onClick={() => scrollToSection('projects')}>
              Projects
            </MobileNavButton>
            <MobileNavButton onClick={() => scrollToSection('about')}>
              About
            </MobileNavButton>
            <MobileNavButton onClick={() => scrollToSection('contact')}>
              Contact
            </MobileNavButton>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const tiltX = (y - centerY) / 4
      const tiltY = (centerX - x) / 4
      
      button.style.setProperty('--x', `${x}px`)
      button.style.setProperty('--y', `${y}px`)
      button.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
    }
    
    const handleMouseLeave = () => {
      button.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [])

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      className="relative overflow-hidden inset-0.5 border-border hover: transition-all duration-300 group glow-effect"
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <div className="glow-container" />
    </Button>
  )
}

function MobileNavButton({ 
  children, 
  onClick 
}: { 
  children: React.ReactNode
  onClick?: () => void 
}) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start px-4 py-2 hover:bg-background/40"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

