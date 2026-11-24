import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Briefcase,
  ExternalLink,
  GitBranch,
  Globe,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

const SILKY_EASE = [0.16, 1, 0.3, 1]

function GitHubIcon({ className }) {
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

function LinkedInIcon({ className }) {
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

function InstagramIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function XIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  )
}

const CONTACT_ICON_MAP = {
  mail: Mail,
  email: Mail,
  gmail: Mail,
  git: GitHubIcon,
  github: GitHubIcon,
  gitbranch: GitBranch,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  ig: InstagramIcon,
  x: XIcon,
  twitter: XIcon,
  whatsapp: MessageCircle,
  wa: MessageCircle,
  message: MessageCircle,
  messagecircle: MessageCircle,
  telegram: Send,
  send: Send,
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

function ContactIconBadge({ icon, label }) {
  const isImage =
    typeof icon === 'string' &&
    (icon.startsWith('/') ||
      icon.startsWith('http://') ||
      icon.startsWith('https://') ||
      /\.(svg|png|jpe?g|webp)$/i.test(icon))

  if (isImage) {
    return (
      <img
        src={icon}
        alt={label}
        className="h-4 w-4 object-contain"
      />
    )
  }

  const key = String(icon || label || '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '')
  const Icon = CONTACT_ICON_MAP[key] || Mail

  return <Icon className="h-4 w-4" aria-hidden="true" />
}

const CURRENT_YEAR = new Date().getFullYear()

function normalizeWhatsappNumber(raw) {
  const digits = String(raw || '').replace(/\D/g, '')
  if (!digits) return ''
  return digits.startsWith('0') ? `62${digits.slice(1)}` : digits
}

/**
 * Footer / Contact Section ("LET'S WORK TOGETHER"):
 * Features an editorial direct-to-WhatsApp CTA card hitting wa.me with
 * pre-filled greeting ('Halo, mas airlangga').
 */
export default function ContactFooter({
  footerData = portfolioData.contactFooter,
}) {
  const {
    heading,
    pitch,
    availability,
    contacts,
    whatsappCard = portfolioData.contactFooter.whatsappCard,
    copyrightOwner,
    rightsText,
    editionText,
  } = footerData

  const phoneContact = contacts?.find(
    (item) =>
      typeof item.href === 'string' && item.href.toLowerCase().startsWith('tel:'),
  )
  const whatsappNumber =
    normalizeWhatsappNumber(whatsappCard?.whatsappNumber) ||
    normalizeWhatsappNumber(phoneContact?.href || phoneContact?.value) ||
    '6282130886720'

  const chatGreeting = whatsappCard?.chatGreeting || 'Halo, mas airlangga'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(chatGreeting)}`

  return (
    <footer
      id="contact"
      className="mx-auto w-full max-w-7xl px-5 pt-10 pb-12 sm:px-8 lg:px-12 lg:pt-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.1, ease: SILKY_EASE }}
        className="relative overflow-hidden rounded-3xl border border-[#1E293B] bg-[#0D1117] p-7 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-blue-500/50 hover:shadow-[0_22px_60px_-20px_rgba(37,99,235,0.35)] sm:p-10 lg:p-12 light:border-slate-200 light:bg-white light:shadow-[0_18px_50px_-22px_rgba(15,23,42,0.12)] light:hover:border-blue-500"
      >
        {/* Subtle ambient radial glow */}
        <div
          className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.2)_0%,transparent_70%)] blur-2xl light:bg-[radial-gradient(circle,rgba(37,99,235,0.1)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Heading, Pitch, Status */}
          <div className="lg:col-span-4">
            <h2 className="text-4xl leading-[1.02] font-extrabold tracking-tight text-white uppercase sm:text-5xl light:text-slate-950">
              {heading}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400 light:text-slate-600">
              {pitch}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-[#07090E] px-4 py-2 light:border-blue-200 light:bg-blue-50">
              <Sparkles
                className="h-3.5 w-3.5 shrink-0 text-[#38BDF8] light:text-[#2563EB]"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-200 uppercase light:text-slate-800">
                {availability}
              </span>
            </div>
          </div>

          {/* Center Column: Contact Details List */}
          <div className="flex flex-col gap-2.5 lg:col-span-4">
            {contacts.map((item, index) => {
              const itemKey = `${item.label}-${index}`
              const content = (
                <div className="group flex items-center gap-3.5 rounded-2xl border border-transparent px-2 py-1.5 transition-colors hover:border-[#1E293B] hover:bg-[#07090E]/70 light:hover:border-slate-200 light:hover:bg-slate-50">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-[#38BDF8] transition-all duration-300 group-hover:scale-105 group-hover:border-blue-400 group-hover:bg-blue-600/20 light:border-blue-200 light:bg-blue-50 light:text-[#2563EB] light:group-hover:border-blue-400 light:group-hover:bg-blue-100">
                    <ContactIconBadge icon={item.icon} label={item.label} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-[0.22em] text-slate-500 uppercase">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-slate-200 break-words transition-colors group-hover:text-[#38BDF8] light:text-slate-800 light:group-hover:text-[#2563EB]">
                      {item.value}
                    </p>
                  </div>
                </div>
              )

              return item.href ? (
                <a
                  key={itemKey}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {content}
                </a>
              ) : (
                <div key={itemKey}>{content}</div>
              )
            })}
          </div>

          {/* Right Column: Attractive Direct WhatsApp CTA Card */}
          <div className="lg:col-span-4">
            <div className="group relative overflow-hidden rounded-2xl border border-[#1E293B] bg-gradient-to-br from-[#0B1220] via-[#07090E] to-[#0A1326] p-6 shadow-[0_20px_50px_rgba(2,6,23,0.9),0_0_32px_rgba(37,99,235,0.16)] transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#38BDF8]/60 hover:shadow-[0_24px_60px_-14px_rgba(37,99,235,0.42)] light:border-slate-200 light:from-white light:via-slate-50 light:to-blue-50/70 light:shadow-[0_18px_40px_rgba(15,23,42,0.1)] light:hover:border-blue-500">
              {/* Subtle ambient pattern & blue top-right glow */}
              <div
                className="bg-hex-pattern pointer-events-none absolute inset-0 opacity-45"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.25)_0%,rgba(37,99,235,0.1)_48%,transparent_72%)] opacity-80 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-2">
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38BDF8] opacity-75 light:bg-[#2563EB]" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8] light:bg-[#2563EB]" />
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.22em] text-[#38BDF8] uppercase light:text-[#2563EB]">
                        {whatsappCard.eyebrow}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-lg leading-snug font-extrabold tracking-tight text-white light:text-slate-950">
                      {whatsappCard.title}
                    </h3>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-500/35 bg-blue-500/15 text-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.2)] light:border-blue-200 light:bg-blue-50 light:text-[#2563EB] light:shadow-none">
                    <MessageCircle className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-400 light:text-slate-600">
                  {whatsappCard.description}
                </p>

                {/* Subtle Direct WhatsApp Meta Strip */}
                <div className="mt-5 flex items-center justify-between gap-2 rounded-xl border border-[#1E293B]/90 bg-[#07090E]/85 px-3.5 py-2.5 text-[11px] font-medium text-slate-300 light:border-blue-200/80 light:bg-white light:text-slate-700">
                  <span className="inline-flex items-center gap-2">
                    <Phone
                      className="h-3.5 w-3.5 text-[#38BDF8] light:text-[#2563EB]"
                      aria-hidden="true"
                    />
                    <span>{whatsappCard.displayNumber}</span>
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.16em] text-[#38BDF8] uppercase light:text-[#2563EB]">
                    {whatsappCard.statusBadge}
                  </span>
                </div>

                {/* Direct Hit WhatsApp API CTA Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#38BDF8] px-5 py-3 text-xs font-bold tracking-[0.16em] text-white uppercase shadow-[0_12px_30px_-8px_rgba(37,99,235,0.65)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_16px_36px_-6px_rgba(56,189,248,0.5)] active:scale-[0.99]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{whatsappCard.buttonLabel}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Legal Bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, delay: 0.16, ease: SILKY_EASE }}
        className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#1E293B]/70 pt-6 text-[11px] tracking-[0.18em] text-slate-500 uppercase sm:flex-row light:border-slate-200"
      >
        <p>
          &copy; {CURRENT_YEAR} {copyrightOwner}. {rightsText}
        </p>
        <p className="text-slate-600 light:text-slate-400">
          {editionText}
        </p>
      </motion.div>
    </footer>
  )
}
