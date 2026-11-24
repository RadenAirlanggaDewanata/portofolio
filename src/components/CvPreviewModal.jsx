import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Briefcase,
  Download,
  ExternalLink,
  GitBranch,
  Globe,
  Languages,
  Link2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  X,
} from 'lucide-react'
import { getPortfolioData } from '../data/portfolioData'
import { buildCvModel } from '../utils/cvContent'
import { downloadCvPdf } from '../utils/generateCvPdf'

const MODAL_EASE = [0.16, 1, 0.3, 1]

function GitHubGlyph({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function LinkedInGlyph({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const CV_CONTACT_ICONS = {
  mail: Mail,
  email: Mail,
  gmail: Mail,
  git: GitHubGlyph,
  github: GitHubGlyph,
  gitbranch: GitBranch,
  linkedin: LinkedInGlyph,
  whatsapp: MessageCircle,
  wa: MessageCircle,
  telegram: Send,
  phone: Phone,
  tel: Phone,
  call: Phone,
  mappin: MapPin,
  location: MapPin,
  map: MapPin,
  pin: MapPin,
  globe: Globe,
  web: Globe,
  website: Globe,
  portfolio: Globe,
  briefcase: Briefcase,
  work: Briefcase,
  link: Link2,
  url: Link2,
  externallink: ExternalLink,
}

function CvContactBadge({ icon, label }) {
  const key = String(icon || label || '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '')
  const Icon = CV_CONTACT_ICONS[key] || Mail
  return (
    <Icon
      className="h-3 w-3 shrink-0 text-[#1F242B]"
      aria-hidden="true"
    />
  )
}

/**
 * Dynamic Minimalist A4 Curriculum Vitae Preview Modal.
 * Features an in-modal EN/ID CV language switcher and instant one-click
 * vector PDF download directly from src/data/portfolioData.js.
 */
export default function CvPreviewModal({
  isOpen,
  onClose,
  data,
  language = 'en',
}) {
  const [cvLanguageOverride, setCvLanguageOverride] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const activeCvLanguage = cvLanguageOverride ?? language
  const cvData =
    activeCvLanguage === language ? data : getPortfolioData(activeCvLanguage)
  const model = buildCvModel(cvData, activeCvLanguage)
  const { copy } = model

  const handleClose = () => {
    setCvLanguageOverride(null)
    onClose()
  }

  const handleDirectDownload = async () => {
    if (isDownloading) return
    setIsDownloading(true)
    try {
      await downloadCvPdf(cvData, activeCvLanguage)
    } finally {
      setIsDownloading(false)
    }
  }

  useEffect(() => {
    if (!isOpen) return undefined

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('cv-printing-open')

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setCvLanguageOverride(null)
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.classList.remove('cv-printing-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: MODAL_EASE }}
          className="cv-modal-backdrop fixed inset-0 z-50 flex flex-col bg-[#07090E]/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-heading"
        >
          {/* Sticky Top Action Bar */}
          <div className="cv-no-print sticky top-0 z-20 border-b border-slate-800/90 bg-[#07090E]/95 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]"
                  aria-hidden="true"
                />
                <h2
                  id="cv-modal-heading"
                  className="truncate text-sm font-bold tracking-wide text-slate-100 sm:text-base"
                >
                  {copy.previewTitle}
                </h2>
                <span className="hidden rounded-full border border-slate-800 bg-[#0D1117] px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase md:inline-block">
                  {copy.sheetTag}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
                {/* In-Modal CV Language Switcher (EN / ID) */}
                <div
                  className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-[#0D1117] p-0.5"
                  role="group"
                  aria-label="CV Language Switcher"
                >
                  <Languages
                    className="ml-2 h-3.5 w-3.5 shrink-0 text-[#38BDF8]"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    onClick={() => setCvLanguageOverride('en')}
                    className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase transition-colors duration-200 ${
                      activeCvLanguage === 'en'
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setCvLanguageOverride('id')}
                    className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase transition-colors duration-200 ${
                      activeCvLanguage === 'id'
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    ID
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleDirectDownload}
                  disabled={isDownloading}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] px-4 py-2 text-xs font-bold tracking-[0.12em] text-white uppercase shadow-[0_6px_20px_rgba(37,99,235,0.35)] transition-all duration-300 hover:brightness-110 active:scale-95 disabled:cursor-wait disabled:opacity-80"
                >
                  {isDownloading ? (
                    <Loader2
                      className="h-3.5 w-3.5 shrink-0 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  )}
                  <span className="hidden sm:inline">
                    {isDownloading ? copy.downloadingPdf : copy.downloadPdf}
                  </span>
                  <span className="sm:hidden">PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  aria-label={copy.closeLabel}
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-800 bg-[#0D1117] text-slate-300 transition-colors duration-300 hover:border-[#38BDF8] hover:text-[#38BDF8]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Modal Body */}
          <div
            className="cv-modal-scroll flex-1 overflow-y-auto px-3 py-6 sm:px-6 sm:py-8"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                handleClose()
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.985 }}
              transition={{ duration: 0.38, ease: MODAL_EASE }}
              className="mx-auto w-full max-w-[794px]"
            >
              {/* Classic Clean Monochrome A4 Printable Sheet */}
              <article
                id="cv-printable-area"
                lang={activeCvLanguage}
                className="mx-auto w-full max-w-[794px] overflow-hidden rounded-sm bg-white font-sans text-[#1F242B] shadow-2xl"
              >
                <div className="space-y-5 p-8 sm:p-12 print:space-y-4 print:p-2">
                  {/* 1. Centered Editorial Header */}
                  <header className="pb-1 text-center">
                    <h1 className="text-2xl font-extrabold tracking-[0.06em] text-[#1F242B] uppercase sm:text-[29px]">
                      {model.fullName}
                    </h1>
                    {model.roleTitle && (
                      <p className="mt-1 text-sm font-medium text-[#374151] sm:text-[15px]">
                        {model.roleTitle}
                      </p>
                    )}

                    {model.contacts.length > 0 && (
                      <ul className="mx-auto mt-3.5 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] text-[#374151]">
                        {model.contacts.map((contact, idx) => (
                          <li
                            key={`${contact.label}-${idx}`}
                            className="inline-flex items-center gap-1.5"
                          >
                            <CvContactBadge
                              icon={contact.icon}
                              label={contact.label}
                            />
                            {contact.href ? (
                              <a
                                href={contact.href}
                                target={
                                  contact.href.startsWith('http')
                                    ? '_blank'
                                    : undefined
                                }
                                rel={
                                  contact.href.startsWith('http')
                                    ? 'noreferrer'
                                    : undefined
                                }
                                className="text-[#374151] hover:text-[#1F242B] hover:underline"
                              >
                                {contact.value}
                              </a>
                            ) : (
                              <span>{contact.value}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </header>

                  {/* 2. ABOUT ME / TENTANG SAYA */}
                  {model.summaryBio && (
                    <section className="cv-print-avoid-break pt-1">
                      <h2 className="text-xs font-extrabold tracking-[0.14em] text-[#1F242B] uppercase sm:text-[13px]">
                        {copy.aboutHeading}
                      </h2>
                      <p className="mt-2 text-justify text-xs leading-[1.5] text-[#374151] sm:text-[12.5px]">
                        {model.summaryBio}
                      </p>
                    </section>
                  )}

                  {/* 3. EDUCATION / PENDIDIKAN */}
                  {model.education.length > 0 && (
                    <section className="border-t border-[#4B5563]/65 pt-4">
                      <h2 className="text-xs font-extrabold tracking-[0.14em] text-[#1F242B] uppercase sm:text-[13px]">
                        {copy.educationHeading}
                      </h2>
                      <ul className="mt-3 space-y-3.5">
                        {model.education.map((edu, idx) => (
                          <li
                            key={`${edu.title}-${idx}`}
                            className="cv-print-avoid-break"
                          >
                            {edu.metaLine && (
                              <p className="text-[11px] font-medium text-[#6B7280]">
                                {edu.metaLine}
                              </p>
                            )}
                            <h3 className="mt-0.5 text-[13px] font-bold text-[#1F242B]">
                              {edu.title}
                            </h3>
                            {edu.description && (
                              <p className="mt-1 text-justify text-xs leading-[1.5] text-[#374151]">
                                {edu.description}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* 4. WORK EXPERIENCE / PENGALAMAN KERJA */}
                  {model.experience.length > 0 && (
                    <section className="border-t border-[#4B5563]/65 pt-4">
                      <h2 className="text-xs font-extrabold tracking-[0.14em] text-[#1F242B] uppercase sm:text-[13px]">
                        {copy.experienceHeading}
                      </h2>
                      <ul className="mt-3 space-y-3.5">
                        {model.experience.map((item) => (
                          <li key={item.key} className="cv-print-avoid-break">
                            {item.metaLine && (
                              <p className="text-[11px] font-medium text-[#6B7280]">
                                {item.metaLine}
                              </p>
                            )}
                            <h3 className="mt-0.5 text-[13px] font-bold text-[#1F242B]">
                              {item.title}
                            </h3>
                            {item.description && (
                              <p className="mt-1 text-justify text-xs leading-[1.5] text-[#374151]">
                                {item.description}
                              </p>
                            )}
                            {item.highlights.length > 0 && (
                              <ul className="mt-1 space-y-0.5 text-xs leading-[1.5] text-[#374151]">
                                {item.highlights.map((bullet, bIdx) => (
                                  <li
                                    key={bIdx}
                                    className="flex items-start gap-2"
                                  >
                                    <span
                                      className="mt-[6.5px] h-1 w-1 shrink-0 rounded-full bg-[#1F242B]"
                                      aria-hidden="true"
                                    />
                                    <span className="min-w-0 flex-1 text-justify">
                                      {bullet}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* 5. SELECTED PROJECTS / PROYEK PILIHAN */}
                  {model.selectedProjects.length > 0 && (
                    <section className="border-t border-[#4B5563]/65 pt-4">
                      <h2 className="text-xs font-extrabold tracking-[0.14em] text-[#1F242B] uppercase sm:text-[13px]">
                        {copy.projectsHeading}
                      </h2>
                      <ul className="mt-3 space-y-2.5">
                        {model.selectedProjects.map((project) => {
                          const hasExternalUrl =
                            typeof project.liveUrl === 'string' &&
                            project.liveUrl.startsWith('http')

                          return (
                            <li
                              key={project.id}
                              className="cv-print-avoid-break"
                            >
                              {project.metaLine && (
                                <p className="text-[11px] font-medium text-[#6B7280]">
                                  {project.metaLine}
                                </p>
                              )}
                              <h3 className="mt-0.5 text-[13px] font-bold text-[#1F242B]">
                                {project.title}
                              </h3>
                              {project.summary && (
                                <p className="mt-1 text-justify text-xs leading-[1.5] text-[#374151]">
                                  {project.summary}
                                </p>
                              )}
                              {(project.stackLine || project.liveUrl) && (
                                <p className="mt-0.5 text-xs leading-[1.5] text-[#374151]">
                                  {project.stackLine && (
                                    <span>
                                      <strong className="font-semibold text-[#1F242B]">
                                        {copy.stackPrefix}:
                                      </strong>{' '}
                                      {project.stackLine}
                                    </span>
                                  )}
                                  {project.stackLine && project.liveUrl
                                    ? '  |  '
                                    : ''}
                                  {project.liveUrl &&
                                    (hasExternalUrl ? (
                                      <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[#374151] underline hover:text-[#1F242B]"
                                      >
                                        {project.liveUrl}
                                      </a>
                                    ) : (
                                      <span className="text-[#6B7280]">
                                        {project.liveUrl}
                                      </span>
                                    ))}
                                </p>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </section>
                  )}

                  {/* 6. ACHIEVEMENTS & COMPETITIONS */}
                  {model.certifications.length > 0 && (
                    <section className="border-t border-[#4B5563]/65 pt-4">
                      <h2 className="text-xs font-extrabold tracking-[0.14em] text-[#1F242B] uppercase sm:text-[13px]">
                        {copy.certificationsHeading}
                      </h2>
                      <ul className="mt-3 space-y-3">
                        {model.certifications.map((cert) => (
                          <li key={cert.id} className="cv-print-avoid-break">
                            {cert.metaLine && (
                              <p className="text-[11px] font-medium text-[#6B7280]">
                                {cert.metaLine}
                              </p>
                            )}
                            <h3 className="mt-0.5 text-[13px] font-bold text-[#1F242B]">
                              {cert.title}
                            </h3>
                            {(cert.role || cert.result) && (
                              <p className="mt-0.5 text-xs leading-[1.5] text-[#374151]">
                                {cert.role && (
                                  <span>
                                    <strong className="font-semibold text-[#1F242B]">
                                      {copy.rolePrefix}:
                                    </strong>{' '}
                                    {cert.role}
                                  </span>
                                )}
                                {cert.role && cert.result ? '  |  ' : ''}
                                {cert.result && (
                                  <span>
                                    <strong className="font-semibold text-[#1F242B]">
                                      {copy.resultPrefix}:
                                    </strong>{' '}
                                    {cert.result}
                                  </span>
                                )}
                              </p>
                            )}
                            {cert.summary && (
                              <p className="mt-1 text-justify text-xs leading-[1.5] text-[#374151]">
                                {cert.summary}
                              </p>
                            )}
                            {cert.credentialUrl && (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#374151] underline hover:text-[#1F242B]"
                              >
                                <span>{copy.verifyLabel}</span>
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* 7. SKILLS (Compact Categorized Lines) */}
                  {(model.skillGroups.length > 0 || model.skills.length > 0) && (
                    <section className="cv-print-avoid-break border-t border-[#4B5563]/65 pt-4">
                      <h2 className="text-xs font-extrabold tracking-[0.14em] text-[#1F242B] uppercase sm:text-[13px]">
                        {copy.skillsHeading}
                      </h2>

                      {model.skillGroups.length > 0 ? (
                        <ul className="mt-2.5 space-y-1.5">
                          {model.skillGroups.map((group) => (
                            <li
                              key={group.category}
                              className="text-justify text-xs leading-[1.5] text-[#374151]"
                            >
                              <strong className="font-bold text-[#1F242B]">
                                {group.category}:
                              </strong>{' '}
                              {group.items.join(', ')}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3 print:grid-cols-3">
                          {model.skills.map((skill) => (
                            <li
                              key={skill}
                              className="flex items-start gap-2 text-xs leading-[1.5] text-[#374151]"
                            >
                              <span
                                className="mt-[6.5px] h-1 w-1 shrink-0 rounded-full bg-[#1F242B]"
                                aria-hidden="true"
                              />
                              <span>{skill}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  )}

                  {/* 8. TOOLS & TECHNOLOGIES (Compact Categorized Lines) */}
                  {(model.toolGroups.length > 0 || model.tools.length > 0) && (
                    <section className="cv-print-avoid-break border-t border-[#4B5563]/65 pt-4">
                      <h2 className="text-xs font-extrabold tracking-[0.14em] text-[#1F242B] uppercase sm:text-[13px]">
                        {copy.toolsHeading}
                      </h2>

                      {model.toolGroups.length > 0 ? (
                        <ul className="mt-2.5 space-y-1.5">
                          {model.toolGroups.map((group) => (
                            <li
                              key={group.category}
                              className="text-justify text-xs leading-[1.5] text-[#374151]"
                            >
                              <strong className="font-bold text-[#1F242B]">
                                {group.category}:
                              </strong>{' '}
                              {group.items.join(', ')}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3 print:grid-cols-3">
                          {model.tools.map((toolName, idx) => (
                            <li
                              key={`${toolName}-${idx}`}
                              className="flex items-start gap-2 text-xs leading-[1.5] text-[#374151]"
                            >
                              <span
                                className="mt-[6.5px] h-1 w-1 shrink-0 rounded-full bg-[#1F242B]"
                                aria-hidden="true"
                              />
                              <span>{toolName}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  )}
                </div>
              </article>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
