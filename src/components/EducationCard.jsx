import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

const SILKY_EASE = [0.16, 1, 0.3, 1]

/**
 * Education Bento card: stationary hover color/border/glow transitions
 * paired with Framer Motion whileInView reveal.
 */
export default function EducationCard({
  data = portfolioData.educationAndSkills,
  staggerDelay = 0,
}) {
  const { educationEyebrow, educationHeading, education } = data

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.0, delay: staggerDelay, ease: SILKY_EASE }}
      className="group relative flex w-full min-w-0 flex-col justify-between overflow-hidden rounded-3xl border border-[#1E293B] bg-[#0D1117] p-5 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#38BDF8]/65 hover:shadow-[0_22px_55px_-16px_rgba(37,99,235,0.45)] sm:p-6 light:border-slate-200 light:bg-white light:shadow-[0_10px_28px_-16px_rgba(15,23,42,0.1)] light:hover:border-blue-500 light:hover:shadow-[0_22px_55px_-16px_rgba(37,99,235,0.22)]"
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

      <div className="relative z-10 flex flex-col">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="block text-[10px] font-bold tracking-[0.22em] text-[#38BDF8] uppercase light:text-[#2563EB]">
              {educationEyebrow}
            </span>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight text-white uppercase transition-colors duration-300 group-hover:text-[#38BDF8] sm:text-2xl light:text-slate-950 light:group-hover:text-[#1D4ED8]">
              {educationHeading}
            </h2>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1E293B] bg-[#07090E] text-slate-400 transition-colors duration-300 group-hover:border-[#38BDF8]/50 group-hover:bg-blue-500/20 group-hover:text-[#38BDF8] light:border-slate-200 light:bg-slate-50 light:text-slate-500 light:group-hover:border-blue-400 light:group-hover:bg-blue-50 light:group-hover:text-[#2563EB]">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        {/* Education Timeline List */}
        <ul className="mt-5 flex flex-1 flex-col divide-y divide-[#1E293B]/90 light:divide-slate-100">
          {education.map((item) => (
            <li
              key={`${item.degree}-${item.year}`}
              className="flex flex-col gap-1.5 py-4 first:pt-1 last:pb-0"
            >
              <span className="inline-flex w-fit rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-[#38BDF8] light:border-blue-200 light:bg-blue-50 light:text-[#2563EB]">
                {item.year}
              </span>
              <p className="mt-0.5 text-sm font-semibold leading-snug text-slate-100 break-words light:text-slate-900">
                {item.degree}
              </p>
              <p className="text-xs leading-relaxed text-slate-400 break-words light:text-slate-600">
                {item.institution}
              </p>
            </li>
          ))}
        </ul>

        {/* Bottom accent bar */}
        <div
          className="mt-6 h-0.5 w-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-transparent opacity-30 transition-opacity duration-500 group-hover:opacity-90"
          aria-hidden="true"
        />
      </div>
    </motion.article>
  )
}
