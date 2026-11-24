import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

const SILKY_EASE = [0.16, 1, 0.3, 1]

const LOCAL_TOOL_MAP = {
  react: '/images/tools/react.svg',
  reactjs: '/images/tools/react.svg',
  next: '/images/tools/nextjs.svg',
  nextjs: '/images/tools/nextjs.svg',
  nextdotjs: '/images/tools/nextjs.svg',
  tailwind: '/images/tools/tailwind.svg',
  tailwindcss: '/images/tools/tailwind.svg',
  typescript: '/images/tools/typescript.svg',
  ts: '/images/tools/typescript.svg',
  javascript: '/images/tools/javascript.svg',
  js: '/images/tools/javascript.svg',
  node: '/images/tools/nodejs.svg',
  nodejs: '/images/tools/nodejs.svg',
  nodedotjs: '/images/tools/nodejs.svg',
  postgresql: '/images/tools/postgresql.svg',
  postgres: '/images/tools/postgresql.svg',
  mysql: '/images/tools/mysql.svg',
  php: '/images/tools/php.svg',
  laravel: '/images/tools/laravel.svg',
  figma: '/images/tools/figma.svg',
  github: '/images/tools/github.svg',
  git: '/images/tools/git.svg',
  n8n: '/images/tools/n8n.svg',
  docker: '/images/tools/docker.svg',
  vscode: '/images/tools/vscode.svg',
  visualstudiocode: '/images/tools/vscode.svg',
  vite: '/images/tools/vite.svg',
  postman: '/images/tools/postman.svg',
}

const SIMPLE_ICON_ALIASES = {
  vue: 'vuedotjs',
  vuejs: 'vuedotjs',
  express: 'express',
  expressjs: 'express',
  nestjs: 'nestjs',
  'c++': 'cplusplus',
  cpp: 'cplusplus',
  'c#': 'csharp',
  csharp: 'csharp',
  '.net': 'dotnet',
  dotnet: 'dotnet',
  socketio: 'socketdotio',
  'socket.io': 'socketdotio',
  threejs: 'threedotjs',
  'three.js': 'threedotjs',
  shadcn: 'shadcnui',
  'shadcn/ui': 'shadcnui',
  golang: 'go',
}

const MONOCHROME_DARK_BRANDS = new Set([
  'nextjs',
  'nextdotjs',
  'github',
  'vercel',
  'express',
  'prisma',
  'astro',
  'shadcnui',
  'socketdotio',
  'threedotjs',
  'notion',
  'linear',
  'framer',
  'expo',
  'flask',
  'symfony',
  'rust',
  'markdown',
  'bash',
  'apple',
  'codepen',
])

function toNormalizedKey(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
}

function toSimpleIconSlug(raw) {
  const compact = toNormalizedKey(raw)
  if (SIMPLE_ICON_ALIASES[compact]) return SIMPLE_ICON_ALIASES[compact]

  return String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp')
    .replace(/\./g, 'dot')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]/g, '')
}

function resolveToolSource(title, icon) {
  const rawIcon = typeof icon === 'string' ? icon.trim() : ''

  if (
    rawIcon.startsWith('/') ||
    rawIcon.startsWith('http://') ||
    rawIcon.startsWith('https://') ||
    rawIcon.startsWith('data:') ||
    /\.(svg|png|jpe?g|webp|ico)$/i.test(rawIcon)
  ) {
    const isLightInvert =
      rawIcon.endsWith('nextjs.svg') || rawIcon.endsWith('github.svg')
    return { src: rawIcon, invertInLightMode: isLightInvert }
  }

  const key = toNormalizedKey(rawIcon || title)
  if (LOCAL_TOOL_MAP[key]) {
    const src = LOCAL_TOOL_MAP[key]
    const isLightInvert =
      src.endsWith('nextjs.svg') || src.endsWith('github.svg')
    return { src, invertInLightMode: isLightInvert }
  }

  const slug = toSimpleIconSlug(rawIcon || title)
  if (!slug) return { src: null, invertInLightMode: false }

  const isMonochrome = MONOCHROME_DARK_BRANDS.has(slug)
  const src = isMonochrome
    ? `https://cdn.simpleicons.org/${slug}/f8fafc`
    : `https://cdn.simpleicons.org/${slug}`

  return { src, invertInLightMode: isMonochrome }
}

function getToolInitials(title) {
  const words = String(title || '?')
    .trim()
    .split(/[\s./-]+/)
    .filter(Boolean)
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase()
  }
  return (
    String(title || '?')
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 2)
      .toUpperCase() || '?'
  )
}

function ToolLogo({ title, icon }) {
  const [failed, setFailed] = useState(false)
  const { src, invertInLightMode } = resolveToolSource(title, icon)

  if (!src || failed) {
    return (
      <span className="text-gradient-blue text-[11px] font-extrabold tracking-tight uppercase">
        {getToolInitials(title)}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={title}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`h-5 w-5 object-contain ${
        invertInLightMode ? 'light:brightness-0' : ''
      }`}
    />
  )
}

/**
 * Skills & Tools Bento card: full-width lower deck with stationary hover
 * color/border/glow transitions and zero-setup tool logo resolution.
 */
export default function SkillsCard({
  data = portfolioData.educationAndSkills,
  staggerDelay = 0,
}) {
  const {
    skillsEyebrow,
    skillsHeading,
    toolsHeading = 'TOOLS',
    skillsFooterLabel,
    skillsCountLabel,
    skills,
    tools = [],
  } = data

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.0, delay: staggerDelay, ease: SILKY_EASE }}
      className="group relative flex h-full w-full min-w-0 flex-1 flex-col justify-between rounded-3xl border border-[#1E293B] bg-[#0D1117] p-5 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#38BDF8]/65 hover:shadow-[0_22px_55px_-16px_rgba(37,99,235,0.45)] sm:p-6 light:border-slate-200 light:bg-white light:shadow-[0_10px_28px_-16px_rgba(15,23,42,0.1)] light:hover:border-blue-500 light:hover:shadow-[0_22px_55px_-16px_rgba(37,99,235,0.22)]"
    >
      {/* Clipped background effects wrapper so tool tooltips can overflow freely */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1E3A] via-[#0D1424] to-[#08101E] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 light:from-[#EFF6FF] light:via-white light:to-[#E0F2FE]" />
        <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,rgba(37,99,235,0.1)_45%,transparent_72%)] opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="block text-[10px] font-bold tracking-[0.22em] text-[#38BDF8] uppercase light:text-[#2563EB]">
              {skillsEyebrow}
            </span>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight text-white uppercase transition-colors duration-300 group-hover:text-[#38BDF8] sm:text-2xl light:text-slate-950 light:group-hover:text-[#1D4ED8]">
              {skillsHeading}
            </h2>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1E293B] bg-[#07090E] text-slate-400 transition-colors duration-300 group-hover:border-[#38BDF8]/50 group-hover:bg-blue-500/20 group-hover:text-[#38BDF8] light:border-slate-200 light:bg-slate-50 light:text-slate-500 light:group-hover:border-blue-400 light:group-hover:bg-blue-50 light:group-hover:text-[#2563EB]">
            <Layers className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        {/* Auto-wrapping Flexible Skill Pills */}
        <div className="mt-5 flex flex-wrap content-start gap-1.5 sm:gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="max-w-full rounded-full border border-slate-800 bg-[#07090E] px-2.5 py-1 text-[11px] font-medium leading-tight text-slate-300 transition-colors duration-300 group-hover:border-blue-500/45 group-hover:bg-[#091326] group-hover:text-sky-100 hover:border-[#38BDF8]! hover:bg-blue-600/25! hover:text-[#38BDF8]! light:border-slate-200 light:bg-slate-50 light:text-slate-700 light:group-hover:border-blue-300 light:group-hover:bg-blue-50/90 light:group-hover:text-blue-950 light:hover:border-blue-600! light:hover:bg-blue-100!"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Tools Section Below Skills */}
        {tools.length > 0 && (
          <div className="mt-5 border-t border-[#1E293B]/80 pt-4 light:border-slate-100">
            <h3 className="text-[10px] font-bold tracking-[0.22em] text-[#38BDF8] uppercase light:text-[#2563EB]">
              {toolsHeading}
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {tools.map((entry, idx) => {
                const tool =
                  typeof entry === 'string'
                    ? { title: entry, icon: entry }
                    : entry
                const toolTitle = tool.title || tool.name || ''
                const toolIcon = tool.icon || toolTitle

                return (
                  <div
                    key={`${toolTitle}-${idx}`}
                    tabIndex={0}
                    aria-label={toolTitle}
                    className="group/tool relative flex h-10 w-10 cursor-default items-center justify-center rounded-xl border border-slate-800 bg-[#07090E] transition-[border-color,background-color,box-shadow] duration-300 group-hover:border-blue-500/45 group-hover:bg-[#091326] hover:border-[#38BDF8]! hover:bg-blue-600/20! hover:shadow-[0_6px_16px_rgba(56,189,248,0.22)]! focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] light:border-slate-200 light:bg-slate-50 light:group-hover:border-blue-300 light:group-hover:bg-blue-50/90 light:hover:border-blue-600! light:hover:bg-blue-100!"
                  >
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 rounded-lg border border-blue-500/40 bg-[#07090E]/95 px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap text-sky-200 opacity-0 shadow-[0_8px_20px_rgba(2,6,23,0.8)] backdrop-blur-md transition-opacity duration-200 group-hover/tool:opacity-100 group-focus-visible/tool:opacity-100 light:border-blue-200 light:bg-slate-900 light:text-white light:shadow-[0_8px_20px_rgba(15,23,42,0.22)]"
                    >
                      {toolTitle}
                      <span
                        className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#07090E]/95 light:border-t-slate-900"
                        aria-hidden="true"
                      />
                    </span>

                    <ToolLogo
                      key={`${toolTitle}-${toolIcon}`}
                      title={toolTitle}
                      icon={toolIcon}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Bottom count bar */}
        <div className="mt-5 flex items-center justify-between border-t border-[#1E293B]/80 pt-3 text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase light:border-slate-100 light:text-slate-500">
          <span>{skillsFooterLabel}</span>
          <span className="text-[#38BDF8] light:text-[#2563EB]">
            {skills.length} {skillsCountLabel}
            {tools.length > 0 ? ` • ${tools.length} ${toolsHeading}` : ''}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
