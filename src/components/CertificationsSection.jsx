import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Award,
  Calendar,
  ExternalLink,
  Eye,
  ShieldCheck,
  X,
} from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

const SILKY_EASE = [0.16, 1, 0.3, 1]

/**
 * Clean fallback surface if a certification mockup image is missing.
 */
function CertificateImage({ src, alt, id }) {
  const [failed, setFailed] = useState(false)

  if (!failed && src) {
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
        <Award className="h-5 w-5" aria-hidden="true" />
      </div>
      <span className="text-gradient-blue mt-3 text-xl font-extrabold tracking-tight uppercase">
        CERTIFICATION {id}
      </span>
      <span className="mt-1 text-[10px] tracking-[0.2em] text-slate-500 uppercase">
        Add mockup at {src}
      </span>
    </div>
  )
}

/**
 * Certifications & Competition Honors section with auto-counted header badge,
 * uniform tablet mockup cards, Verify Credential links, and Quick-View Preview Modal.
 */
export default function CertificationsSection({
  certificationsData = portfolioData.certificationsSection,
  language = 'en',
}) {
  const [activeCertId, setActiveCertId] = useState(null)

  const {
    eyebrow,
    heading,
    verifyLabel = 'Verify Credential',
    previewLabel = 'Preview Certificate',
    roleLabel = 'ROLE',
    issuerLabel = 'ISSUER',
    dateLabel = 'ISSUED',
    items = [],
  } = certificationsData || {}

  const activeCert = items.find((item) => item.id === activeCertId) || null
  const totalCount = items.length

  useEffect(() => {
    if (!activeCertId) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveCertId(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeCertId])

  if (totalCount === 0) return null

  return (
    <section
      id="certifications"
      className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20"
    >
      {/* Header Row with Automatic Total Counter */}
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

        <div className="inline-flex items-center gap-2.5 self-start rounded-full border border-[#1E293B] bg-[#0D1117]/90 px-4 py-2 sm:self-auto light:border-slate-200 light:bg-white light:shadow-sm">
          <Award
            className="h-4 w-4 text-[#38BDF8] light:text-[#2563EB]"
            aria-hidden="true"
          />
          <span className="text-xs font-extrabold tracking-[0.16em] text-white tabular-nums uppercase light:text-slate-900">
            {totalCount}{' '}
            {language === 'id'
              ? 'SERTIFIKAT'
              : totalCount === 1
                ? 'CERTIFICATION'
                : 'CERTIFICATIONS'}
          </span>
        </div>
      </motion.div>

      {/* Responsive Certification Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((cert, index) => (
          <motion.div
            key={cert.id || `${cert.title}-${index}`}
            initial={{ opacity: 0, y: 32, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 1.05,
              delay: (index % 3) * 0.14,
              ease: SILKY_EASE,
            }}
          >
            <article
              onClick={() => setActiveCertId(cert.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveCertId(cert.id)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={
                language === 'id'
                  ? `Tinjau sertifikat ${cert.title}`
                  : `Preview certificate ${cert.title}`
              }
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#1E293B] bg-[#0D1117] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#38BDF8]/65 hover:shadow-[0_22px_50px_-16px_rgba(37,99,235,0.48)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] light:border-slate-200 light:bg-white light:shadow-[0_10px_28px_-16px_rgba(15,23,42,0.12)] light:hover:border-blue-500 light:hover:shadow-[0_20px_45px_-18px_rgba(37,99,235,0.24)]"
            >
              {/* Mockup Image Preview Area */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#07090E] light:bg-slate-100">
                <CertificateImage
                  src={cert.image}
                  alt={cert.title}
                  id={cert.id}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1117]/75 via-transparent to-transparent opacity-80 light:from-slate-900/25"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-y-0 -left-2/3 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-sky-200/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[320%]"
                  aria-hidden="true"
                />

                {cert.issueDate && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-blue-500/35 bg-[#07090E]/88 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#38BDF8] uppercase backdrop-blur-md light:border-blue-200 light:bg-white/95 light:text-[#2563EB]">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    <span>{cert.issueDate}</span>
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between gap-4 border-t border-[#1E293B]/90 p-5 light:border-slate-100">
                <div>
                  {cert.role && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-[#38BDF8] uppercase light:border-blue-200 light:bg-blue-50 light:text-[#2563EB]">
                      <Award className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span>{cert.role}</span>
                    </span>
                  )}

                  <h3 className="mt-2.5 text-base leading-snug font-bold tracking-tight text-white transition-colors group-hover:text-[#38BDF8] light:text-slate-900 light:group-hover:text-[#2563EB]">
                    {cert.title}
                  </h3>

                  {cert.issuer && (
                    <p className="mt-1.5 text-xs leading-relaxed font-medium text-slate-400 light:text-slate-600">
                      {cert.issuer}
                    </p>
                  )}
                </div>

                {/* Action Footer Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#1E293B]/80 pt-3.5 light:border-slate-100">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-slate-300 uppercase transition-colors group-hover:text-[#38BDF8] light:text-slate-700 light:group-hover:text-[#2563EB]">
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{previewLabel}</span>
                  </span>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/35 bg-blue-500/10 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#38BDF8] uppercase transition-colors hover:border-[#38BDF8] hover:bg-blue-600/20 light:border-blue-200 light:bg-blue-50 light:text-[#2563EB] light:hover:border-blue-500 light:hover:bg-blue-100"
                    >
                      <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                      <span>{verifyLabel}</span>
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </motion.div>
        ))}
      </div>

      {/* Quick-View Certificate Inspection Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.36 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md light:bg-slate-950/60"
            onClick={() => setActiveCertId(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.45, ease: SILKY_EASE }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#1E293B] bg-[#0D1117] shadow-[0_25px_70px_rgba(37,99,235,0.28)] light:border-slate-200 light:bg-white light:shadow-[0_25px_70px_rgba(15,23,42,0.22)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveCertId(null)}
                aria-label={
                  language === 'id'
                    ? 'Tutup pratinjau sertifikat'
                    : 'Close certificate preview'
                }
                className="absolute top-4 right-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#1E293B] bg-[#07090E]/90 text-slate-300 transition-colors hover:border-blue-500 hover:text-white light:border-slate-200 light:bg-white/95 light:text-slate-700 light:hover:border-blue-500 light:hover:text-[#2563EB]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="aspect-[16/10] w-full bg-[#07090E] light:bg-slate-100">
                <CertificateImage
                  src={activeCert.image}
                  alt={activeCert.title}
                  id={activeCert.id}
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-4 border-b border-[#1E293B] pb-5 sm:grid-cols-3 light:border-slate-200">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                      {roleLabel}
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#38BDF8] uppercase light:text-[#2563EB]">
                      {activeCert.role || '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                      {issuerLabel}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-200 light:text-slate-800">
                      {activeCert.issuer}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                      {dateLabel}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-200 light:text-slate-800">
                      {activeCert.issueDate}
                    </p>
                  </div>
                </div>

                <h3
                  id="cert-modal-title"
                  className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl light:text-slate-950"
                >
                  {activeCert.title}
                </h3>

                {activeCert.summary && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-300 light:text-slate-600">
                    {activeCert.summary}
                  </p>
                )}

                {activeCert.credentialUrl && (
                  <div className="mt-6 flex justify-end border-t border-[#1E293B] pt-5 light:border-slate-200">
                    <a
                      href={activeCert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#38BDF8] px-5 py-2.5 text-xs font-bold tracking-[0.18em] text-white uppercase transition-opacity hover:opacity-90"
                    >
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                      <span>{verifyLabel}</span>
                      <ArrowRightInline />
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

function ArrowRightInline() {
  return <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
}
