'use client'

import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { FaJsSquare, FaHtml5, FaCss3Alt, FaPython, FaReact } from 'react-icons/fa'
import { SiTypescript, SiCplusplus } from 'react-icons/si'
import { PiFileCSharpFill } from 'react-icons/pi'
import { IconType } from 'react-icons'
import { EmojiProvider, Emoji } from 'react-apple-emojis'

import emojiData from "react-apple-emojis/src/data.json"

function Card({ children, className = '', fullWidth = false }: { children: React.ReactNode, className?: string, fullWidth?: boolean }) {
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
    <div ref={cardRef} className={`relative group tilt-card glow-effect ${fullWidth ? 'col-span-full' : ''} ${className}`}>
      <div className="absolute overflow-hidden inset-0.5 bg-background/60 rounded-lg blur opacity-60 shadow-lg group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-card/60 rounded-lg p-6 h-full flex flex-col shadow-lg border border-border transition-transform duration-300 ease-out">
        {children}
      </div>
      <div className="glow-container" />
    </div>
  )
}

function AboutCard() {
  return (
    <Card>
      <h3 className="text-2xl font-bold mb-4">Hello! <EmojiProvider data={emojiData}><Emoji name="waving-hand" className="inline" width={26} /></EmojiProvider></h3>
      <p className="text-lg">
        My name is… just call me <strong>Sunny <EmojiProvider data={emojiData}><Emoji name="sun" className="inline" width={20} /></EmojiProvider></strong>! I am a full-stack developer, graphics designer, and video editor based in the <strong>United Arab Emirates</strong> <EmojiProvider data={emojiData}><Emoji name="flag-united-arab-emirates" className="inline" width={20} /></EmojiProvider>. I love Valorant and Counter-strike. I enjoy geeking out about PC building and I hope we can work some projects soon! <EmojiProvider data={emojiData}><Emoji name="smiling-face-with-halo" className="inline" width={20} /></EmojiProvider>
      </p>
    </Card>
  )
}

function TechStackCard() {
  const techStack: { Icon: IconType; color: string; name: string }[] = [
    { Icon: PiFileCSharpFill, color: '#178600', name: 'C#' },
    { Icon: FaJsSquare, color: '#f7df1e', name: 'JavaScript' },
    { Icon: SiTypescript, color: '#007acc', name: 'TypeScript' },
    { Icon: SiCplusplus, color: '#00599c', name: 'C++' },
    { Icon: FaPython, color: '#3776ab', name: 'Python' },
    { Icon: FaHtml5, color: '#e34f26', name: 'HTML5' },
    { Icon: FaCss3Alt, color: '#1572b6', name: 'CSS3' },
    { Icon: FaReact, color: '#61dafb', name: 'React' },
  ]

  return (
    <Card className="h-52">
      <h3 className="text-2xl font-bold mb-4">Tech Stack <EmojiProvider data={emojiData}><Emoji name="star-struck" className="inline" width={26} /></EmojiProvider></h3>
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-6 w-full max-w-[240px]">
            {techStack.map(({ Icon, color, name }, index) => (
              <div key={index} className="relative group flex items-center justify-center">
                <Icon className="icon text-3xl transition-transform duration-200 transform group-hover:scale-110" style={{ color }} />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background/80 text-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

function DiscordStatusCard() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://api.lanyard.rest/v1/users/938696360704770048')
        .then(response => response.json())
        .then(data => setUserData(data.data));
    };

    fetchData(); // Fetch immediately on mount

    const intervalId = setInterval(fetchData, 2000); // Fetch every 2 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  if (!userData) return <Card>Loading...</Card>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getArtists = (str: string) => {
    return str.replaceAll(";", ",");
  }

  return (
    <Card>
      <h3 className="text-2xl font-bold mb-4">Discord Status</h3>
      <div className="flex items-center mb-4">
        <div className="relative">
          <Image
            src={`https://cdn.discordapp.com/avatars/${userData.discord_user.id}/${userData.discord_user.avatar}.png`}
            alt="Profile Picture"
            width={64}
            height={64}
            className="rounded-full"
          />
          <div className={`absolute bottom-0 right-0 w-4 h-4 ${getStatusColor(userData.discord_status)} rounded-full border-2 border-white`}></div>
        </div>
        <div className="ml-4">
          <h4 className="font-bold text-lg">{userData.discord_user.global_name}</h4>
          <p className="text-muted-foreground text-sm">{userData.discord_user.username}</p>
        </div>
      </div>
      {userData.spotify && (
        <div className="bg-background/60 border border-border p-3 rounded-lg flex items-center">
          <Image
            src={userData.spotify.album_art_url}
            alt="Album Cover"
            width={48}
            height={48}
            className="rounded"
          />
          <div className="ml-3">
            <p className="font-semibold">{userData.spotify.song}</p>
            <p className="text-sm text-muted-foreground">{getArtists(userData.spotify.artist)}</p>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function AboutSection() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-4xl font-bold mb-12">About Me</h2>
        <div className="grid gap-8">
          <AboutCard />
          <div className="grid md:grid-cols-2 gap-8">
            <TechStackCard />
            <DiscordStatusCard />
          </div>
        </div>
      </div>
    </section>
  )
}

