import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

const SILKY_EASE = [0.16, 1, 0.3, 1]

const leftColumnVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.24,
    },
  },
}

const introCardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: SILKY_EASE,
      staggerChildren: 0.13,
      delayChildren: 0.14,
    },
  },
}

const introLineVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: SILKY_EASE },
  },
}

const rightColumnVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.32,
    },
  },
}

const itemFadeUpVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: SILKY_EASE },
  },
}

/**
 * Smoothly counts up numeric values (e.g., "4+" or "6+") once Hero reveals.
 */
function CountUpStat({ value, active = true }) {
  const match = String(value || '').match(/^(\d+)(.*)$/)
  const hasMatch = Boolean(match)
  const target = match ? Number.parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''
  const [displayNum, setDisplayNum] = useState(0)

  useEffect(() => {
    if (!active || !hasMatch || target <= 0) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      const id = window.requestAnimationFrame(() => setDisplayNum(target))
      return () => window.cancelAnimationFrame(id)
    }

    let rafId = 0
    const delayMs = 380
    const durationMs = 1350
    const startAt = performance.now() + delayMs

    const step = (now) => {
      if (now < startAt) {
        rafId = window.requestAnimationFrame(step)
        return
      }
      const progress = Math.min(1, (now - startAt) / durationMs)
      const eased = 1 - (1 - progress) ** 3.5
      setDisplayNum(Math.round(eased * target))
      if (progress < 1) {
        rafId = window.requestAnimationFrame(step)
      }
    }

    rafId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(rafId)
  }, [active, hasMatch, target])

  if (!hasMatch) return <>{value}</>
  return (
    <>
      {displayNum}
      {suffix}
    </>
  )
}

/**
 * Clean editorial portrait placeholder shown automatically if
 * public/images/profile.png is not yet added or fails to load.
 */
function PortraitFallback({ monogram, name }) {
  return (
    <div
      className="relative flex h-[410px] w-[290px] flex-col items-center justify-end overflow-hidden rounded-t-[160px] border border-blue-500/20 bg-gradient-to-b from-[#0F172A] via-[#0D1117] to-[#07090E] px-6 pb-16 shadow-[0_0_60px_rgba(37,99,235,0.18)] sm:h-[490px] sm:w-[350px] lg:h-[560px] lg:w-[410px] light:border-blue-200 light:from-blue-50 light:via-white light:to-slate-100"
      role="img"
      aria-label={`${name} portrait placeholder`}
    >
      <div className="bg-hex-pattern pointer-events-none absolute inset-0 opacity-60" />

      <svg
        viewBox="0 0 240 280"
        className="relative z-10 h-64 w-64 text-slate-800 sm:h-80 sm:w-80"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="rimBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0D1117" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <circle
          cx="120"
          cy="92"
          r="46"
          fill="#0B1120"
          stroke="url(#rimBlue)"
          strokeWidth="2"
        />
        <path
          d="M36 268 C36 194, 72 156, 120 156 C168 156, 204 194, 204 268"
          fill="#0B1120"
          stroke="url(#rimBlue)"
          strokeWidth="2"
        />
      </svg>

      <div className="relative z-10 -mt-12 text-center">
        <span className="text-gradient-blue text-3xl font-extrabold tracking-widest">
          {monogram}
        </span>
        <p className="mt-1 text-[10px] tracking-[0.22em] text-slate-400 uppercase light:text-slate-500">
          Add public/images/profile.png
        </p>
      </div>
    </div>
  )
}

/**
 * Editorial layered hero section choreographed with Framer Motion:
 * - z-0: Full-fill background PORTOFOLIO smooth opacity reveal (preserving SVG stretch)
 * - z-10: Center portrait upward rise (y: 40 -> 0)
 * - z-20: Staggered left intro & right tagline/stats (y: 20 -> 0)
 */
export default function HeroSection({
  heroData = portfolioData.hero,
  isReady = true,
}) {
  const [imgError, setImgError] = useState(false)
  const {
    backgroundText,
    greeting,
    name,
    roleSubtitle,
    bio,
    availabilityBadge,
    portrait,
    tagline,
    stats,
  } = heroData

  return (
    <section
      id="hero"
      className="relative mx-auto w-full max-w-7xl overflow-x-hidden border-b border-[#1E293B]/60 px-5 pt-2 pb-12 sm:px-8 lg:px-12 lg:pt-4 lg:pb-0 light:border-slate-200"
    >
      {/* Wide, subtle atmospheric blue depth wash */}
      <motion.div
        animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.04, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_70%_60%_at_50%_38%,rgba(37,99,235,0.20)_0%,rgba(56,189,248,0.07)_42%,transparent_75%)] light:bg-[radial-gradient(ellipse_70%_60%_at_50%_38%,rgba(37,99,235,0.12)_0%,rgba(56,189,248,0.08)_42%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Layered composition container */}
      <div className="relative flex flex-col items-center">
        {/* z-0: Background display word wrapped in outer motion.div for pure opacity fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.4, ease: SILKY_EASE, delay: 0.05 }}
          className="pointer-events-none absolute inset-x-0 top-2 z-0 h-[395px] select-none sm:h-[510px] lg:bottom-0 lg:h-auto"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1000 144"
            preserveAspectRatio="none"
            className="font-hero-display h-full w-full overflow-visible"
          >
            <defs>
              <linearGradient id="heroWordGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" className="hero-grad-start" />
                <stop offset="52%" className="hero-grad-mid" />
                <stop offset="100%" className="hero-grad-end" />
              </linearGradient>
            </defs>
            <text
              x="500"
              y="140"
              textAnchor="middle"
              textLength="992"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#heroWordGrad)"
              fontSize="192"
              fontWeight="400"
              letterSpacing="4"
            >
              {backgroundText}
            </text>
          </svg>
        </motion.div>

        {/* z-10: Center foreground portrait rising smoothly in front of PORTOFOLIO */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.985 }}
          animate={
            isReady
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 36, scale: 0.985 }
          }
          transition={{ duration: 1.25, ease: SILKY_EASE, delay: 0.14 }}
          className="relative z-10 mt-[2.2rem] flex w-full justify-center sm:mt-[4.5rem] lg:mt-[6.8rem] xl:mt-[7.8rem]"
        >
          <div className="relative flex justify-center">
            {!imgError ? (
              <img
                src={portrait.src}
                alt={portrait.alt}
                onError={() => setImgError(true)}
                className="h-[380px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_18px_45px_rgba(37,99,235,0.22)] sm:h-[450px] lg:h-[500px] xl:h-[540px] light:drop-shadow-[0_18px_40px_rgba(15,23,42,0.16)]"
              />
            ) : (
              <PortraitFallback monogram={portrait.monogram} name={name} />
            )}

            {/* Gentle bottom edge blend matched to Night or Light canvas */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#07090E] via-[#07090E]/45 to-transparent sm:h-16 light:from-[#F8FAFC] light:via-[#F8FAFC]/65"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* z-20: Left & Right Overlay Columns with Staggered Children */}
        <div className="relative z-20 mt-4 grid w-full grid-cols-1 gap-10 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-10 lg:mt-0 lg:grid-cols-12 lg:items-end lg:gap-6">
          {/* Left Column Overlay */}
          <motion.div
            variants={leftColumnVariants}
            initial="hidden"
            animate={isReady ? 'visible' : 'hidden'}
            className="lg:pointer-events-auto lg:col-span-4 lg:pb-2"
          >
            <motion.div
              variants={introCardVariants}
              className="rounded-2xl border border-[#1E293B]/65 bg-[#07090E]/78 p-4 shadow-[0_12px_36px_rgba(2,6,23,0.65)] backdrop-blur-md sm:p-5 light:border-slate-200/85 light:bg-white/82 light:shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
            >
              <motion.p
                variants={introLineVariants}
                className="text-lg font-semibold italic tracking-wide text-[#38BDF8] sm:text-xl light:text-[#2563EB]"
              >
                {greeting}
              </motion.p>
              <motion.h1
                variants={introLineVariants}
                className="mt-1 text-4xl leading-[1.02] font-extrabold tracking-tight text-white uppercase sm:text-5xl xl:text-[3.2rem] light:text-slate-950"
              >
                {name}
              </motion.h1>
              <motion.p
                variants={introLineVariants}
                className="text-gradient-blue mt-2 text-xs font-bold tracking-[0.26em] uppercase sm:text-sm"
              >
                {roleSubtitle}
              </motion.p>
              <motion.p
                variants={introLineVariants}
                className="mt-3 max-w-sm text-sm leading-relaxed text-slate-300 light:text-slate-600"
              >
                {bio}
              </motion.p>
            </motion.div>

            {/* Availability Pill */}
            <motion.div
              variants={itemFadeUpVariants}
              className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-[#1E293B]/80 bg-[#07090E]/85 px-4 py-2 shadow-[0_8px_24px_rgba(2,6,23,0.6),0_0_24px_rgba(37,99,235,0.16)] backdrop-blur-md light:border-slate-200 light:bg-white/88 light:shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38BDF8] opacity-75 light:bg-[#2563EB]" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8] light:bg-[#2563EB] light:shadow-[0_0_10px_#2563EB]" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-200 uppercase light:text-slate-800">
                {availabilityBadge}
              </span>
            </motion.div>
          </motion.div>

          {/* Center spacer column on desktop */}
          <div className="hidden lg:col-span-4 lg:block" />

          {/* Right Column Overlay */}
          <motion.div
            variants={rightColumnVariants}
            initial="hidden"
            animate={isReady ? 'visible' : 'hidden'}
            className="flex flex-col gap-4 lg:pointer-events-auto lg:col-span-4 lg:items-end lg:pb-2 lg:text-right"
          >
            {/* Floating glassmorphic tagline */}
            <motion.div
              variants={itemFadeUpVariants}
              className="max-w-xs rounded-2xl border border-[#1E293B]/75 bg-[#07090E]/82 p-4 shadow-[0_12px_36px_rgba(2,6,23,0.7),0_0_28px_rgba(37,99,235,0.14)] backdrop-blur-md light:border-slate-200/85 light:bg-white/85 light:shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-start gap-3 lg:flex-row-reverse">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-[#38BDF8] light:border-blue-200 light:bg-blue-50 light:text-[#2563EB]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <p className="text-xs leading-relaxed font-medium text-slate-200 sm:text-sm light:text-slate-700">
                  {tagline}
                </p>
              </div>
            </motion.div>

            {/* Stacked Metric Stats */}
            <motion.div
              variants={itemFadeUpVariants}
              className="grid grid-cols-2 gap-4 rounded-2xl border border-[#1E293B]/65 bg-[#07090E]/82 px-5 py-4 shadow-[0_12px_36px_rgba(2,6,23,0.65)] backdrop-blur-md sm:gap-6 lg:flex lg:flex-col lg:items-end lg:gap-4 light:border-slate-200/85 light:bg-white/82 light:shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col lg:items-end">
                  <span className="text-gradient-blue text-3xl leading-none font-extrabold tracking-tight tabular-nums sm:text-4xl">
                    <CountUpStat value={stat.value} active={isReady} />
                  </span>
                  <span className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-slate-300 uppercase sm:text-[11px] light:text-slate-600">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
