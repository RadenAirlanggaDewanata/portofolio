import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Layers, X } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

const SILKY_EASE = [0.16, 1, 0.3, 1]

/**
 * Clean fallback surface when a project thumbnail is missing or broken.
 */
function ProjectImage({ src, alt, id }) {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
    )
  }

  return (
    <div className="bg-hex-pattern relative flex h-full w-full flex-col items-center justify-center bg-[#07090E] p-6 text-center light:bg-slate-100">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-[#38BDF8] light:border-blue-200 light:bg-blue-50 light:text-[#2563EB]">
        <Layers className="h-5 w-5" aria-hidden="true" />
      </div>
      <span className="text-gradient-blue mt-3 text-2xl font-extrabold tracking-tight">
        PROJECT {id}
      </span>
      <span className="mt-1 text-[10px] tracking-[0.2em] text-slate-500 uppercase">
        Add thumbnail at {src}
      </span>
    </div>
  )
}

/**
 * 3-column Selected Projects section with Framer Motion whileInView reveal,
 * hover shine sweep, and AnimatePresence case study modal.
 */
export default function ProjectsSection({
  projectsData = portfolioData.projectsSection,
  language = 'en',
}) {
  const [showAll, setShowAll] = useState(false)
  const [activeProjectId, setActiveProjectId] = useState(null)

  const { eyebrow, heading, ctaLabel, collapseLabel, visitLabel, items } =
    projectsData

  const featuredItems = items.filter((item) => item.featured !== false)
  const displayedItems = showAll ? items : featuredItems.slice(0, 3)
  const hasMoreProjects = items.length > featuredItems.slice(0, 3).length
  const activeProject =
    items.find((item) => item.id === activeProjectId) || null

  useEffect(() => {
    if (!activeProjectId) return
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveProjectId(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeProjectId])

  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20"
    >
      {/* Header Row with clean whileInView entrance */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.95, ease: SILKY_EASE }}
        className="relative mb-8 flex flex-col justify-between gap-4 border-b border-[#1E293B] pb-5 sm:flex-row sm:items-end light:border-slate-200"
      >
        <div>
          <span className="text-[11px] font-semibold tracking-[0.26em] text-[#38BDF8] uppercase light:text-[#2563EB]">
            {eyebrow}
          </span>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-white uppercase sm:text-4xl light:text-slate-950">
            {heading}
          </h2>
        </div>

        {hasMoreProjects ? (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="group inline-flex cursor-pointer items-center gap-2 self-start text-xs font-bold tracking-[0.2em] text-slate-300 uppercase transition-colors hover:text-[#38BDF8] sm:self-auto light:text-slate-600 light:hover:text-[#2563EB]"
          >
            <span>{showAll ? collapseLabel : ctaLabel}</span>
            <ArrowRight
              className={`h-4 w-4 text-[#38BDF8] transition-transform duration-300 light:text-[#2563EB] ${
                showAll ? '-rotate-90' : 'group-hover:translate-x-1'
              }`}
              aria-hidden="true"
            />
          </button>
        ) : (
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 self-start text-xs font-bold tracking-[0.2em] text-slate-300 uppercase transition-colors hover:text-[#38BDF8] sm:self-auto light:text-slate-600 light:hover:text-[#2563EB]"
          >
            <span>{ctaLabel}</span>
            <ArrowRight
              className="h-4 w-4 text-[#38BDF8] transition-transform duration-300 group-hover:translate-x-1 light:text-[#2563EB]"
              aria-hidden="true"
            />
          </a>
        )}
      </motion.div>

      {/* 3-Column Responsive Project Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedItems.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 32, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 1.05,
              delay: (index % 3) * 0.16,
              ease: SILKY_EASE,
            }}
          >
            <article
              onClick={() => setActiveProjectId(project.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveProjectId(project.id)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={
                language === 'id'
                  ? `Lihat detail proyek ${project.title}`
                  : `Inspect project ${project.title}`
              }
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#1E293B] bg-[#0D1117] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#38BDF8]/65 hover:shadow-[0_22px_50px_-16px_rgba(37,99,235,0.48)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] light:border-slate-200 light:bg-white light:shadow-[0_10px_28px_-16px_rgba(15,23,42,0.12)] light:hover:border-blue-500 light:hover:shadow-[0_20px_45px_-18px_rgba(37,99,235,0.24)]"
            >
              {/* Preview Image Container with hover specular shine */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#07090E] light:bg-slate-100">
                <ProjectImage
                  src={project.image}
                  alt={project.title}
                  id={project.id}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1117]/70 via-transparent to-transparent opacity-80 light:from-slate-900/20"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-y-0 -left-2/3 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-sky-200/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[320%]"
                  aria-hidden="true"
                />
              </div>

              {/* Footer Row */}
              <div className="flex flex-1 items-center justify-between gap-4 border-t border-[#1E293B]/90 px-5 py-5 light:border-slate-100">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="text-gradient-blue shrink-0 text-3xl leading-none font-extrabold tracking-tight tabular-nums transition-transform duration-300 group-hover:scale-105">
                    {project.id}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold tracking-wide text-white uppercase transition-colors group-hover:text-[#38BDF8] light:text-slate-900 light:group-hover:text-[#2563EB]">
                      {project.title}
                    </h3>
                    <p className="mt-0.5 truncate text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase light:text-slate-500">
                      {project.category}
                    </p>
                  </div>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1E293B] bg-[#07090E] text-slate-400 transition-all duration-300 group-hover:border-[#38BDF8]/65 group-hover:bg-blue-600/20 group-hover:text-[#38BDF8] light:border-slate-200 light:bg-slate-50 light:text-slate-500 light:group-hover:border-blue-500/60 light:group-hover:bg-blue-50 light:group-hover:text-[#2563EB]">
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-45"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </article>
          </motion.div>
        ))}
      </div>

      {/* Case Study Quick-View Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.36 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md light:bg-slate-950/60"
            onClick={() => setActiveProjectId(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.45, ease: SILKY_EASE }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#1E293B] bg-[#0D1117] shadow-[0_25px_70px_rgba(37,99,235,0.28)] light:border-slate-200 light:bg-white light:shadow-[0_25px_70px_rgba(15,23,42,0.22)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveProjectId(null)}
                aria-label={
                  language === 'id'
                    ? 'Tutup detail proyek'
                    : 'Close project details'
                }
                className="absolute top-4 right-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#1E293B] bg-[#07090E]/90 text-slate-300 transition-colors hover:border-blue-500 hover:text-white light:border-slate-200 light:bg-white/95 light:text-slate-700 light:hover:border-blue-500 light:hover:text-[#2563EB]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="aspect-[16/9] w-full bg-[#07090E] light:bg-slate-100">
                <ProjectImage
                  src={activeProject.image}
                  alt={activeProject.title}
                  id={activeProject.id}
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-bold tracking-[0.22em] text-[#38BDF8] uppercase light:text-[#2563EB]">
                    {activeProject.category}
                  </span>
                  <span className="text-xs font-medium text-slate-400 light:text-slate-500">
                    {activeProject.client} • {activeProject.year}
                  </span>
                </div>

                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-gradient-blue text-3xl font-extrabold tracking-tight tabular-nums">
                    {activeProject.id}
                  </span>
                  <h3
                    id="project-modal-title"
                    className="text-2xl font-extrabold tracking-tight text-white uppercase sm:text-3xl light:text-slate-950"
                  >
                    {activeProject.title}
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300 light:text-slate-600">
                  {activeProject.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {activeProject.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#1E293B] bg-[#07090E] px-3 py-1 text-xs font-medium text-slate-300 light:border-slate-200 light:bg-slate-50 light:text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {activeProject.liveUrl && (
                  <div className="mt-6 flex justify-end border-t border-[#1E293B] pt-5 light:border-slate-200">
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#38BDF8] px-5 py-2.5 text-xs font-bold tracking-[0.18em] text-white uppercase transition-opacity hover:opacity-90"
                    >
                      <span>{visitLabel}</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
