import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Razor-thin top scroll indicator bar with liquid spring smoothing.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    restDelta: 0.0005,
  })

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#38BDF8] shadow-[0_0_10px_rgba(56,189,248,0.65)]"
        style={{ scaleX }}
      />
    </div>
  )
}
