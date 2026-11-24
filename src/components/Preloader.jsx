import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'

const PRELOADER_DURATION_S = 1.35
const HOLD_DURATION_MS = 220
const CURTAIN_EASE = [0.76, 0, 0.24, 1]
const SILKY_EASE = [0.22, 1, 0.36, 1]

/**
 * Unhurried editorial curtain preloader (00% -> 100%) on initial load/refresh.
 * Uses GPU-composited Framer Motion scaleX + synced easing curve, then lifts smoothly upward.
 */
export default function Preloader({ onCurtainStart, onFinish }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      const immediateId = window.requestAnimationFrame(() => {
        setProgress(100)
        onCurtainStart?.()
        onFinish?.()
      })
      return () => {
        window.cancelAnimationFrame(immediateId)
        document.body.style.overflow = prevBodyOverflow
      }
    }

    let holdTimerId = 0

    const controls = animate(0, 100, {
      duration: PRELOADER_DURATION_S,
      ease: SILKY_EASE,
      onUpdate: (latest) => {
        setProgress(Math.round(latest))
      },
      onComplete: () => {
        holdTimerId = window.setTimeout(() => {
          document.body.style.overflow = prevBodyOverflow
          onCurtainStart?.()
          onFinish?.()
        }, HOLD_DURATION_MS)
      },
    })

    return () => {
      controls.stop()
      window.clearTimeout(holdTimerId)
      document.body.style.overflow = prevBodyOverflow
    }
  }, [onCurtainStart, onFinish])

  const formattedCounter = `${String(progress).padStart(2, '0')}%`

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: { duration: 1.05, ease: CURTAIN_EASE },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090E] px-6 select-none"
      aria-label="Loading portfolio"
      role="status"
    >
      {/* Subtle hexagonal mesh & ambient radial blue glow */}
      <div
        className="bg-hex-pattern pointer-events-none absolute inset-0 opacity-35"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0.4, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1.08 }}
        exit={{ opacity: 0, transition: { duration: 0.45 } }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22)_0%,rgba(56,189,248,0.08)_45%,transparent_72%)] blur-2xl"
        aria-hidden="true"
      />

      {/* Minimalist typographic counter & liquid-smooth glowing linear blue progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: -26,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex w-full max-w-xs flex-col items-center text-center"
      >
        <span className="text-[10px] font-bold tracking-[0.28em] text-slate-400 uppercase sm:text-[11px]">
          R AIRLANGGA DEWANATA
        </span>

        <span className="text-gradient-blue mt-3 text-6xl leading-none font-extrabold tracking-tight tabular-nums sm:text-7xl">
          {formattedCounter}
        </span>

        {/* Thin glowing linear blue progress bar (native 60/120fps GPU scaleX) */}
        <div className="mt-6 h-[2px] w-48 overflow-hidden rounded-full bg-[#1E293B] sm:w-64">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: PRELOADER_DURATION_S, ease: SILKY_EASE }}
            className="h-full w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#38BDF8] shadow-[0_0_16px_rgba(56,189,248,0.75)]"
          />
        </div>

        <span className="mt-3 text-[10px] font-semibold tracking-[0.26em] text-[#38BDF8]/80 uppercase">
          FULLSTACK DEVELOPER
        </span>
      </motion.div>
    </motion.div>
  )
}
