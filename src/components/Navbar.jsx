import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, FileText, Languages, Moon, Sun } from 'lucide-react'

/**
 * Fixed top minimal editorial header with role label on the left,
 * live certification count pill, CV modal trigger, and Language & Night/Light toggles on the far right.
 */
export default function Navbar({
  headerData,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  onOpenCv,
  certificationsCount = 0,
  isReady = true,
}) {
  const [scrolled, setScrolled] = useState(false)
  const { roleLines } = headerData
  const isLight = theme === 'light'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-40 w-full transition-colors duration-500 ${
          scrolled
            ? 'border-b border-[#1E293B]/90 bg-[#07090E]/88 shadow-[0_12px_36px_rgba(2,6,23,0.75)] backdrop-blur-xl light:border-slate-200/90 light:bg-white/88 light:shadow-[0_10px_30px_rgba(15,23,42,0.06)]'
            : 'border-b border-transparent bg-[#07090E]/55 backdrop-blur-md light:bg-[#F8FAFC]/75'
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8 sm:py-4 lg:px-12">
          {/* Left: Two-line role label */}
          <div className="flex min-w-0 flex-col leading-tight">
            {roleLines.map((line, index) => (
              <span
                key={line}
                className={
                  index === 0
                    ? 'truncate text-[11px] font-bold tracking-[0.2em] text-slate-200 uppercase sm:text-xs light:text-slate-900'
                    : 'truncate text-[11px] font-semibold tracking-[0.2em] text-[#38BDF8] uppercase sm:text-xs light:text-[#2563EB]'
                }
              >
                {line}
              </span>
            ))}
          </div>

          {/* Far-Right Controls: Certifications Counter + CV Preview + Language + Night/Light Mode */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              {certificationsCount > 0 && (
                <a
                  href="#certifications"
                  aria-label={
                    language === 'id'
                      ? `${certificationsCount} Sertifikasi Terverifikasi — Lihat sertifikat`
                      : `${certificationsCount} Verified Certification${certificationsCount > 1 ? 's' : ''} — View certifications`
                  }
                  title={
                    language === 'id'
                      ? `Memiliki ${certificationsCount} sertifikasi — Klik untuk melihat`
                      : `${certificationsCount} Certification${certificationsCount > 1 ? 's' : ''} — Click to view`
                  }
                  className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[#1E293B] bg-[#0D1117]/85 px-2.5 text-[11px] font-bold tracking-[0.12em] text-slate-200 uppercase backdrop-blur-md transition-all duration-300 hover:border-[#38BDF8]/70 hover:bg-blue-950/45 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.28)] sm:h-9 sm:px-3.5 light:border-slate-200 light:bg-white/90 light:text-slate-800 light:hover:border-blue-500/60 light:hover:bg-blue-50 light:hover:text-[#1D4ED8]"
                >
                  <Award
                    className="h-3.5 w-3.5 shrink-0 text-[#38BDF8] light:text-[#2563EB]"
                    aria-hidden="true"
                  />
                  <span className="tabular-nums text-[#38BDF8] light:text-[#2563EB]">
                    {certificationsCount}
                  </span>
                  <span className="hidden sm:inline">
                    {language === 'id'
                      ? 'Sertifikat'
                      : certificationsCount === 1
                        ? 'Certified'
                        : 'Certifications'}
                  </span>
                </a>
              )}

              <button
                type="button"
                onClick={onOpenCv}
                aria-label={
                  language === 'id'
                    ? 'Pratinjau dan Unduh CV'
                    : 'Preview / Download CV'
                }
                title={
                  language === 'id'
                    ? 'Pratinjau / Unduh CV'
                    : 'Preview / Download CV'
                }
                className="group/cv relative inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-800 bg-[#0D1117]/80 text-slate-200 backdrop-blur-md transition-colors duration-300 hover:border-[#38BDF8] hover:text-[#38BDF8] hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] active:scale-95 sm:h-9 sm:w-9 light:border-slate-200 light:bg-white/90 light:text-slate-700 light:hover:border-blue-500 light:hover:bg-blue-50 light:hover:text-[#2563EB]"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span
                  role="tooltip"
                  className="pointer-events-none absolute top-full right-0 z-50 mt-2 rounded-lg border border-blue-500/35 bg-[#07090E]/95 px-2.5 py-1 text-[10px] font-semibold tracking-wide whitespace-nowrap text-sky-200 opacity-0 shadow-[0_8px_20px_rgba(2,6,23,0.8)] backdrop-blur-md transition-opacity duration-200 group-hover/cv:opacity-100 group-focus-visible/cv:opacity-100 light:border-blue-200 light:bg-slate-900 light:text-white light:shadow-[0_8px_20px_rgba(15,23,42,0.22)]"
                >
                  Preview / Download CV
                </span>
              </button>

              <button
                type="button"
                onClick={onToggleLanguage}
                aria-label={
                  language === 'en'
                    ? 'Switch language to Indonesian'
                    : 'Ganti bahasa ke Inggris'
                }
                title={
                  language === 'en'
                    ? 'Language: English (Click for Indonesia)'
                    : 'Bahasa: Indonesia (Klik untuk English)'
                }
                className="inline-flex h-8 w-[62px] cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#1E293B] bg-[#0D1117]/85 text-[11px] font-bold tracking-[0.14em] text-slate-200 uppercase backdrop-blur-md transition-all duration-300 hover:border-[#38BDF8]/60 hover:bg-blue-950/40 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] active:scale-95 sm:h-9 sm:w-[68px] light:border-slate-200 light:bg-white/90 light:text-slate-800 light:hover:border-blue-500/60 light:hover:bg-blue-50 light:hover:text-[#1D4ED8]"
              >
                <Languages
                  className="h-3.5 w-3.5 shrink-0 text-[#38BDF8] light:text-[#2563EB]"
                  aria-hidden="true"
                />
                <span>{language === 'en' ? 'EN' : 'ID'}</span>
              </button>

              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={
                  isLight ? 'Switch to Night mode' : 'Switch to Light mode'
                }
                title={
                  isLight
                    ? 'Mode: Light (Click for Night)'
                    : 'Mode: Night (Click for Light)'
                }
                className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#1E293B] bg-[#0D1117]/85 text-[#38BDF8] backdrop-blur-md transition-all duration-300 hover:border-[#38BDF8]/60 hover:bg-blue-950/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] active:scale-95 sm:h-9 sm:w-9 light:border-slate-200 light:bg-white/90 light:text-[#2563EB] light:hover:border-blue-500/60 light:hover:bg-blue-50"
              >
                {isLight ? (
                  <Moon
                    className="h-4 w-4 transition-transform duration-300 hover:-rotate-12"
                    aria-hidden="true"
                  />
                ) : (
                  <Sun
                    className="h-4 w-4 transition-transform duration-300 hover:rotate-45"
                    aria-hidden="true"
                  />
                )}
              </button>
          </div>
        </div>
      </motion.header>

      {/* Spacer matching fixed header height */}
      <div className="h-[62px] sm:h-[68px]" aria-hidden="true" />
    </>
  )
}
