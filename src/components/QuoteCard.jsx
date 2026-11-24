import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

const SILKY_EASE = [0.16, 1, 0.3, 1]

/**
 * Full-width editorial Quote Bento card: responsive 2-zone banner on desktop
 * with stationary blue hover color/border/glow shift and Framer Motion reveal.
 */
export default function QuoteCard({
  data = portfolioData.quoteCard,
  staggerDelay = 0,
}) {
  const { quote, signature, roleCaption, ctaText, ctaHref } = data

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.0, delay: staggerDelay, ease: SILKY_EASE }}
      className="group relative w-full min-w-0 overflow-hidden rounded-3xl border border-blue-500/35 bg-gradient-to-br from-[#0F172A] via-[#1E3A8A]/60 to-[#020617] p-6 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.35)] transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#38BDF8]/75 hover:shadow-[0_24px_65px_-16px_rgba(56,189,248,0.38)] sm:p-8 lg:px-10 lg:py-9 light:border-blue-500/40 light:from-[#1E3A8A] light:via-[#1D4ED8] light:to-[#0F172A] light:shadow-[0_18px_45px_-20px_rgba(37,99,235,0.35)] light:hover:border-blue-600 light:hover:shadow-[0_24px_65px_-16px_rgba(37,99,235,0.35)]"
    >
      {/* Smooth hover deeper royal-blue surface wash (color-only fade, zero movement) */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#172554]/85 via-[#1E3A8A]/75 to-[#040B1C] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 light:from-[#1E40AF] light:via-[#1D4ED8] light:to-[#0F172A]"
        aria-hidden="true"
      />

      {/* Subtle radial electric blue ambient glow & hexagonal grid overlay */}
      <div
        className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.32)_0%,rgba(37,99,235,0.14)_45%,transparent_72%)] opacity-70 blur-xl transition-opacity duration-700 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div
        className="bg-hex-pattern pointer-events-none absolute inset-0 opacity-45"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        {/* Left Zone: Large Blue Quotation Mark + Quote */}
        <div className="min-w-0 lg:flex-1">
          <span
            className="block text-5xl leading-[0.7] font-extrabold text-[#38BDF8] select-none sm:text-6xl"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote className="mt-3 max-w-3xl text-lg leading-relaxed font-medium text-slate-100 break-words sm:text-xl lg:text-2xl">
            {quote}
          </blockquote>
        </div>

        {/* Right Zone: Signature, Role, & Bottom CTA */}
        <div className="shrink-0 lg:w-[340px] lg:border-l lg:border-blue-400/20 lg:pl-8 xl:w-[380px]">
          <p className="text-lg font-bold italic tracking-tight text-sky-300 break-words sm:text-xl">
            {signature}
          </p>
          <p className="mt-0.5 text-[11px] font-medium tracking-[0.18em] text-slate-300/80 uppercase break-words">
            {roleCaption}
          </p>

          {ctaText && ctaHref && (
            <a
              href={ctaHref}
              className="group/cta mt-5 flex items-center justify-between gap-3 border-t border-blue-400/25 pt-4 text-[11px] font-bold tracking-[0.14em] text-white uppercase transition-colors duration-300 hover:text-[#38BDF8]"
            >
              <span className="min-w-0 leading-snug break-words">{ctaText}</span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-[#38BDF8] transition-colors duration-300 group-hover/cta:text-sky-200"
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
