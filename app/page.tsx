import Navbar from '@/components/Navbar'
import HiSection from '@/components/HiSection'
import FeaturedProjects from '@/components/FeaturedProjects'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mx-3 md:mx-18 lg:mx-36">
        <HiSection />
        <div id="projects">
          <FeaturedProjects />
        </div>
        <div id="about">
          <AboutSection />
        </div>
      </main>
      <div id="contact">
        <Footer />
      </div>
    </div>
  )
}

