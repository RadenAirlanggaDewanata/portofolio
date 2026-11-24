import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import CertificationsSection from './components/CertificationsSection'
import ContactFooter from './components/ContactFooter'
import CvPreviewModal from './components/CvPreviewModal'
import EducationCard from './components/EducationCard'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import ProjectsSection from './components/ProjectsSection'
import QuoteCard from './components/QuoteCard'
import ScrollProgress from './components/ScrollProgress'
import SkillsCard from './components/SkillsCard'
import WorkProcess from './components/WorkProcess'
import { getPortfolioData } from './data/portfolioData'

function getInitialPreference(key, validValues, fallback) {
  try {
    const saved = window.localStorage.getItem(key)
    return validValues.includes(saved) ? saved : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true)
  const [heroReady, setHeroReady] = useState(false)
  const [showCvModal, setShowCvModal] = useState(false)
  const curtainTimerRef = useRef(0)
  const [language, setLanguage] = useState(() =>
    getInitialPreference('portfolio_lang', ['en', 'id'], 'en'),
  )
  const [theme, setTheme] = useState(() =>
    getInitialPreference('portfolio_theme', ['night', 'light'], 'night'),
  )

  const data = getPortfolioData(language)

  useEffect(() => {
    return () => {
      if (curtainTimerRef.current) {
        window.clearTimeout(curtainTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    document.title = data.meta.pageTitle
  }, [data.meta.pageTitle])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.classList.toggle('dark', theme === 'night')
    try {
      window.localStorage.setItem('portfolio_theme', theme)
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
    try {
      window.localStorage.setItem('portfolio_lang', language)
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, [language])

  const handleCurtainStart = useCallback(() => {
    // Trigger unhurried Hero & Navbar glide seamlessly as the curtain clears mid-screen
    if (curtainTimerRef.current) {
      window.clearTimeout(curtainTimerRef.current)
    }
    curtainTimerRef.current = window.setTimeout(() => setHeroReady(true), 240)
  }, [])

  const handlePreloaderFinish = useCallback(() => {
    setShowPreloader(false)
  }, [])

  const handleToggleLanguage = () =>
    setLanguage((prev) => (prev === 'en' ? 'id' : 'en'))

  const handleToggleTheme = () =>
    setTheme((prev) => (prev === 'night' ? 'light' : 'night'))

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 transition-colors duration-500 light:bg-[#F8FAFC] light:text-slate-900">
        {/* Editorial Curtain Preloader */}
        <AnimatePresence mode="wait">
          {showPreloader && (
            <Preloader
              key="editorial-preloader"
              onCurtainStart={handleCurtainStart}
              onFinish={handlePreloaderFinish}
            />
          )}
        </AnimatePresence>

        <ScrollProgress />

        {/* Subtle top-to-bottom ambient canvas backdrop */}
        <div
          className="bg-hex-pattern pointer-events-none fixed inset-0 opacity-30 light:opacity-45"
          aria-hidden="true"
        />

        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar
            headerData={data.header}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onOpenCv={() => setShowCvModal(true)}
            certificationsCount={data.certificationsSection?.items?.length || 0}
            isReady={heroReady}
          />

          <main className="flex-1">
            <HeroSection heroData={data.hero} isReady={heroReady} />
            <ProjectsSection
              projectsData={data.projectsSection}
              language={language}
            />

            {/* Balanced 12-Column Stationary Bento Section */}
            <section
              id="about-bento"
              aria-label="Education, Skills, Work Process, and Philosophy"
              className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
                {/* Left Column (7 cols): Education stacked above Skills & Tools */}
                <div className="flex flex-col gap-6 lg:col-span-7">
                  <EducationCard
                    data={data.educationAndSkills}
                    staggerDelay={0}
                  />
                  <div className="flex flex-1">
                    <SkillsCard
                      data={data.educationAndSkills}
                      staggerDelay={0.14}
                    />
                  </div>
                </div>

                {/* Right Column (5 cols): Work Process flowing alongside Education & Skills */}
                <div className="flex lg:col-span-5">
                  <WorkProcess
                    data={data.workProcess}
                    staggerDelay={0.24}
                  />
                </div>

                {/* Full-Width Single Row: Editorial Quote Card */}
                <div className="lg:col-span-12">
                  <QuoteCard data={data.quoteCard} staggerDelay={0.12} />
                </div>
              </div>
            </section>

            <CertificationsSection
              certificationsData={data.certificationsSection}
              language={language}
            />
          </main>

          <ContactFooter footerData={data.contactFooter} />
        </div>

        <CvPreviewModal
          isOpen={showCvModal}
          onClose={() => setShowCvModal(false)}
          data={data}
          language={language}
        />
      </div>
    </MotionConfig>
  )
}
