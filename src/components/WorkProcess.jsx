import { motion } from 'framer-motion'
import {
  Code2,
  Compass,
  Layers,
  Lightbulb,
  PenTool,
  Rocket,
  Sparkles,
} from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

const SILKY_EASE = [0.16, 1, 0.3, 1]

const ICON_MAP = {
  Compass,
  Lightbulb,
  PenTool,
  Code2,
  Rocket,
  Layers,
  Sparkles,
}

/**
 * Work Process Bento card: full-height dedicated timeline column with stationary
 * hover color/border/glow transitions and Framer Motion whileInView reveal.
 */
export default function WorkProcess({
  data = portfolioData.workProcess,
  staggerDelay = 0,
}) {
  const { eyebrow, sectionTitle, steps } = data

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.0, delay: staggerDelay, ease: SILKY_EASE }}
      className="group relative flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border border-[#1E293B] bg-[#0D1117] p-5 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#38BDF8]/65 hover:shadow-[0_22px_55px_-16px_rgba(37,99,235,0.45)] sm:p-6 light:border-slate-200 light:bg-white light:shadow-[0_10px_28px_-16px_rgba(15,23,42,0.1)] light:hover:border-blue-500 light:hover:shadow-[0_22px_55px_-16px_rgba(37,99,235,0.22)]"
    >
      {/* Smooth hover blue surface wash (color-only fade, zero movement) */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0F1E3A] via-[#0D1424] to-[#08101E] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 light:from-[#EFF6FF] light:via-white light:to-[#E0F2FE]"
        aria-hidden="true"
      />

      {/* Subtle radial blue hover glow */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,rgba(37,99,235,0.1)_45%,transparent_72%)] opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col">
        <span className="block text-[10px] font-bold tracking-[0.22em] text-[#38BDF8] uppercase light:text-[#2563EB]">
          {eyebrow}
        </span>
        <h2 className="mt-1 text-xl font-extrabold tracking-tight text-white uppercase transition-colors duration-300 group-hover:text-[#38BDF8] sm:text-2xl light:text-slate-950 light:group-hover:text-[#1D4ED8]">
          {sectionTitle}
        </h2>

        {/* Auto-stretching Vertical Timeline */}
        <ol className="mt-6 flex flex-1 flex-col">
          {steps.map((step, index) => {
            const IconComponent = ICON_MAP[step.icon] || Sparkles
            const isLast = index === steps.length - 1

            return (
              <li
                key={step.number}
                className="group/step flex flex-1 items-stretch gap-3.5"
              >
                {/* Left Rail: Icon Node + Flexible Flex-1 Line */}
                <div className="flex shrink-0 flex-col items-center">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-500/40 bg-[#07090E] text-[#38BDF8] shadow-[0_0_14px_rgba(37,99,235,0.18)] transition-[border-color,background-color,box-shadow] duration-300 group-hover:border-[#38BDF8]/65 group-hover:bg-[#09152B] group-hover:shadow-[0_0_18px_rgba(56,189,248,0.28)] group-hover/step:border-[#38BDF8]! light:border-blue-200 light:bg-blue-50/70 light:text-[#2563EB] light:shadow-none light:group-hover:border-blue-500 light:group-hover:bg-blue-50 light:group-hover:shadow-[0_0_14px_rgba(37,99,235,0.2)]">
                    <IconComponent className="h-4 w-4" aria-hidden="true" />
                  </div>

                  {!isLast && (
                    <span
                      className="my-1.5 w-px flex-1 bg-gradient-to-b from-blue-500/60 via-blue-500/25 to-[#1E293B] transition-colors duration-300 group-hover:from-[#38BDF8]/80 group-hover:via-blue-500/45 group-hover:to-blue-500/20 light:from-blue-400/70 light:via-blue-200 light:to-slate-200 light:group-hover:from-blue-600/80 light:group-hover:via-blue-400/50 light:group-hover:to-blue-200"
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Right Content */}
                <div
                  className={`min-w-0 flex-1 pt-1 ${
                    isLast ? 'pb-0' : 'pb-5'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <span className="text-gradient-blue shrink-0 text-base leading-none font-extrabold tracking-tight tabular-nums">
                      {step.number}
                    </span>
                    <h3 className="text-xs font-bold tracking-[0.14em] text-[#38BDF8] uppercase break-words transition-colors group-hover/step:text-white light:text-[#2563EB] light:group-hover/step:text-[#1E3A8A]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400 break-words sm:text-[13px] light:text-slate-600">
                    {step.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </motion.article>
  )
}
