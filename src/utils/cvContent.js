/**
 * Shared bilingual copy and data normalization for both the CV Preview Modal
 * and the direct ATS-friendly vector PDF generator.
 */
export const CV_COPY = {
  en: {
    previewTitle: 'Curriculum Vitae Preview',
    sheetTag: 'A4 • ATS-Friendly',
    downloadPdf: 'Download PDF',
    downloadingPdf: 'Generating PDF...',
    closeLabel: 'Close CV preview',
    aboutHeading: 'PROFESSIONAL SUMMARY',
    educationHeading: 'EDUCATION',
    experienceHeading: 'WORK EXPERIENCE',
    projectsHeading: 'SELECTED PROJECTS',
    certificationsHeading: 'ACHIEVEMENTS & COMPETITIONS',
    skillsHeading: 'SKILLS',
    toolsHeading: 'TOOLS & TECHNOLOGIES',
    stepLabel: 'Stage',
    rolePrefix: 'Role',
    resultPrefix: 'Result',
    stackPrefix: 'Stack',
    linkPrefix: 'Link',
    verifyLabel: 'Verify Credential',
  },
  id: {
    previewTitle: 'Pratinjau Curriculum Vitae',
    sheetTag: 'A4 • Ramah ATS',
    downloadPdf: 'Unduh PDF',
    downloadingPdf: 'Mengunduh PDF...',
    closeLabel: 'Tutup pratinjau CV',
    aboutHeading: 'RINGKASAN PROFESIONAL',
    educationHeading: 'PENDIDIKAN',
    experienceHeading: 'PENGALAMAN KERJA',
    projectsHeading: 'PROYEK PILIHAN',
    certificationsHeading: 'PRESTASI & KOMPETISI',
    skillsHeading: 'KEAHLIAN',
    toolsHeading: 'TOOLS & TEKNOLOGI',
    stepLabel: 'Tahap',
    rolePrefix: 'Peran',
    resultPrefix: 'Hasil',
    stackPrefix: 'Teknologi',
    linkPrefix: 'Tautan',
    verifyLabel: 'Verifikasi Kredensial',
  },
}

/**
 * Normalizes localized portfolio data into clean, flat CV sections, preferring
 * dedicated `cvData.cv` content when provided so landing page copy remains independent.
 */
export function buildCvModel(cvData, language = 'en') {
  const langKey = language === 'id' ? 'id' : 'en'
  const copy = CV_COPY[langKey]
  const cv = cvData.cv || {}

  const fullName =
    cv.fullName?.trim() ||
    cvData.header?.roleLines?.[0]?.trim() ||
    cvData.hero?.name?.trim() ||
    'Portfolio'
  const roleTitle =
    cv.roleTitle?.trim() ||
    cvData.hero?.roleSubtitle?.trim() ||
    cvData.header?.roleLines?.[1]?.trim() ||
    ''
  const summaryBio =
    cv.professionalSummary?.trim() || cvData.hero?.bio?.trim() || ''
  const contacts = cv.contacts || cvData.contactFooter?.contacts || []

  const educationSource =
    cv.education || cvData.educationAndSkills?.education || []
  const education = educationSource.map((edu) => ({
    metaLine: [edu.institution, edu.year].filter(Boolean).join(' | '),
    title: edu.degree || '',
    description: edu.description || '',
  }))

  const rawExperience =
    cv.workExperience || cvData.workExperience || cvData.workProcess?.steps || []
  const experience = rawExperience.map((item, idx) => {
    const metaLine = item.company
      ? [item.company, item.period].filter(Boolean).join(' | ')
      : item.period || (item.number ? `${copy.stepLabel} ${item.number}` : '')

    return {
      key: `${item.number || idx}-${item.role || item.title || ''}`,
      metaLine,
      title: item.role || item.title || '',
      description: item.description || '',
      highlights: Array.isArray(item.highlights) ? item.highlights : [],
    }
  })

  let selectedProjects
  if (Array.isArray(cv.selectedProjects)) {
    selectedProjects = cv.selectedProjects.map((project, idx) => ({
      id: project.id || `cv-p-${idx}`,
      metaLine: project.meta || '',
      title: project.title || '',
      summary: project.summary || '',
      stackLine: project.techStack || '',
      liveUrl: project.link || '',
    }))
  } else {
    const allProjects = cvData.projectsSection?.items || []
    const featured = allProjects.filter((item) => item.featured !== false)
    selectedProjects = (
      featured.length > 0 ? featured : allProjects.slice(0, 3)
    ).map((project) => ({
      id: project.id,
      metaLine: [project.client || project.category, project.year]
        .filter(Boolean)
        .join(' | '),
      title: project.title || '',
      summary: project.summary || '',
      stackLine: Array.isArray(project.tags) ? project.tags.join(', ') : '',
      liveUrl: project.liveUrl || '',
    }))
  }

  const rawAchievements =
    cv.achievements || cvData.certificationsSection?.items || []
  const certifications = rawAchievements.map((cert, idx) => ({
    id: cert.id || `cert-${idx}`,
    metaLine: [cert.issuer, cert.issueDate].filter(Boolean).join(' | '),
    title: cert.title || '',
    role: cert.role || '',
    result: cert.result || '',
    summary: cert.summary || '',
    credentialUrl: cert.credentialUrl || '',
  }))

  const skillGroups = Array.isArray(cv.skillGroups) ? cv.skillGroups : []
  const toolGroups = Array.isArray(cv.toolGroups) ? cv.toolGroups : []

  const skills = cvData.educationAndSkills?.skills || []
  const tools = (cvData.educationAndSkills?.tools || [])
    .map((entry) =>
      typeof entry === 'string' ? entry : entry.title || entry.name || '',
    )
    .filter(Boolean)

  return {
    langKey,
    copy,
    fullName,
    roleTitle,
    summaryBio,
    contacts,
    education,
    experience,
    selectedProjects,
    certifications,
    skillGroups,
    toolGroups,
    skills,
    tools,
  }
}
