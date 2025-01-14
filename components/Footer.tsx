'use client'

import { FaInstagram, FaGithub, FaDiscord } from 'react-icons/fa'
import { GoCopy } from "react-icons/go"
import { useRef, useEffect, useState } from 'react'

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-background/80 backdrop-blur-md border-t border-border py-12">
      <div className="container mx-auto px-6 md:px-18 lg:px-36">
        <h2 className="text-3xl font-bold mb-8">Contacts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ContactCard
            platform="Instagram"
            username="@5unn7n"
            icon={<FaInstagram size={24} />}
            color="#FF0054"
            link="https://www.instagram.com/5unn7n"
          />
          <ContactCard
            platform="GitHub"
            username="@sxn4y"
            icon={<FaGithub size={24} />}
            color="#FF5400"
            link="https://github.com/sxn4y"
          />
          <ContactCard
            platform="Discord"
            username="@5unn7n"
            icon={<FaDiscord size={24} />}
            color="#FFBD00"
            link=""
          />
        </div>
      </div>
    </footer>
  )
}

function ContactCard({ platform, username, icon, color, link }: { platform: string; username: string; icon: React.ReactNode; color: string; link: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = (y - centerY) / 20;
      const tiltY = (centerX - x) / 20;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [])

  const handleClick = () => {
    if (platform === 'Discord') {
      navigator.clipboard.writeText(username).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    } else {
      window.open(link, '_blank')
    }
  }

  return (
    <div
      ref={cardRef}
      className="relative group glow-effect tilt-card cursor-pointer"
      onClick={handleClick}
    >
      <div className="absolute inset-0.5 bg-background/60 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative bg-card rounded-lg p-6 flex items-center space-x-4 shadow-lg border border-border transition-transform duration-300 ease-out">
        <div className={`text-${color} transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-glow`}>
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className="font-bold">{platform}</h3>
          <p className="text-muted-foreground">{username}</p>
        </div>
        {platform === 'Discord' && copied && (
          <GoCopy className="transition-colors text-green-500 animate-pulse" />
        )}
      </div>
      <div className="glow-container" />
    </div>
  )
}

