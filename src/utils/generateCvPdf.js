import { buildCvModel } from './cvContent.js'

const PAGE_W = 210
const PAGE_H = 297
const MARGIN_X = 18
const MARGIN_TOP = 18
const MARGIN_BOTTOM = 16
const CONTENT_W = PAGE_W - MARGIN_X * 2
const MAX_Y = PAGE_H - MARGIN_BOTTOM

const COLOR_DARK = [31, 36, 43]
const COLOR_BODY = [55, 65, 81]
const COLOR_MUTED = [107, 114, 128]
const COLOR_RULE = [115, 123, 134]

/**
 * Replaces rare non-WinAnsi characters so standard PDF fonts remain spotless and searchable.
 */
function sanitizePdfText(value) {
  return String(value ?? '')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/[^\x20-\x7E\xA0-\xFF\u2013\u2014\u2022]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function drawContactGlyph(doc, icon, label, cx, cy) {
  const key = String(icon || label || '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '')

  doc.setDrawColor(...COLOR_DARK)
  doc.setFillColor(...COLOR_DARK)
  doc.setLineWidth(0.28)

  if (key === 'phone' || key === 'tel' || key === 'call') {
    doc.line(cx - 0.9, cy - 1.1, cx - 0.4, cy - 0.5)
    doc.line(cx - 0.9, cy - 1.1, cx - 1.1, cy - 0.2)
    doc.line(cx - 1.1, cy - 0.2, cx + 0.1, cy + 1.0)
    doc.line(cx + 0.1, cy + 1.0, cx + 1.0, cy + 0.8)
    doc.line(cx + 0.5, cy + 0.3, cx + 1.0, cy + 0.8)
    return
  }

  if (key === 'mail' || key === 'email' || key === 'gmail') {
    doc.rect(cx - 1.3, cy - 0.9, 2.6, 1.8)
    doc.line(cx - 1.3, cy - 0.9, cx, cy + 0.1)
    doc.line(cx + 1.3, cy - 0.9, cx, cy + 0.1)
    return
  }

  if (key === 'mappin' || key === 'location' || key === 'map' || key === 'pin') {
    doc.circle(cx, cy - 0.35, 0.75, 'S')
    doc.line(cx - 0.58, cy + 0.1, cx, cy + 1.05)
    doc.line(cx + 0.58, cy + 0.1, cx, cy + 1.05)
    doc.circle(cx, cy - 0.35, 0.22, 'F')
    return
  }

  // Minimal globe / link glyph for social/web URLs
  doc.circle(cx, cy, 1.05, 'S')
  doc.line(cx - 1.05, cy, cx + 1.05, cy)
  doc.line(cx, cy - 1.05, cx, cy + 1.05)
}

function drawThreeColumnBullets(doc, items, state, fontSize = 9, lineH = 4.2) {
  if (!items.length) return

  const colGap = 6
  const colW = (CONTENT_W - colGap * 2) / 3
  const textOffsetX = 3.2
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(fontSize)
  doc.setTextColor(...COLOR_BODY)

  for (let i = 0; i < items.length; i += 3) {
    const rowItems = items.slice(i, i + 3)
    const wrappedRow = rowItems.map((entry) =>
      doc.splitTextToSize(sanitizePdfText(entry), colW - textOffsetX),
    )
    const maxLines = Math.max(...wrappedRow.map((lines) => lines.length))
    const rowHeight = maxLines * lineH + 1.2

    state.ensureSpace(rowHeight)

    wrappedRow.forEach((lines, colIdx) => {
      const colX = MARGIN_X + colIdx * (colW + colGap)
      doc.setFillColor(...COLOR_DARK)
      doc.circle(colX + 1.0, state.y - 1.0, 0.5, 'F')
      doc.setTextColor(...COLOR_BODY)
      doc.text(lines, colX + textOffsetX, state.y)
    })

    state.y += rowHeight
  }
}

/**
 * Generates an ATS-friendly vector A4 jsPDF document matching the minimalist CV preview.
 */
export async function createCvPdf(cvData, language = 'en') {
  const { jsPDF } = await import('jspdf')
  const model = buildCvModel(cvData, language)
  const { copy } = model

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  })

  doc.setProperties({
    title: `${model.fullName} - CV (${model.langKey.toUpperCase()})`,
    subject: model.roleTitle || 'Curriculum Vitae',
    author: model.fullName,
  })

  const state = {
    y: MARGIN_TOP,
    ensureSpace(neededHeight) {
      if (this.y + neededHeight > MAX_Y) {
        doc.addPage()
        this.y = MARGIN_TOP
      }
    },
    drawDivider() {
      this.y += 2.2
      this.ensureSpace(7)
      doc.setDrawColor(...COLOR_RULE)
      doc.setLineWidth(0.25)
      doc.line(MARGIN_X, this.y, PAGE_W - MARGIN_X, this.y)
      this.y += 5.5
    },
    drawSectionHeading(label) {
      this.ensureSpace(10)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10.5)
      doc.setTextColor(...COLOR_DARK)
      doc.text(sanitizePdfText(label).toUpperCase(), MARGIN_X, this.y)
      this.y += 5.2
    },
  }

  // 1. Centered Editorial Header
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(19.5)
  doc.setTextColor(...COLOR_DARK)
  doc.text(sanitizePdfText(model.fullName).toUpperCase(), PAGE_W / 2, state.y, {
    align: 'center',
  })
  state.y += 6.2

  if (model.roleTitle) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.setTextColor(...COLOR_BODY)
    doc.text(sanitizePdfText(model.roleTitle), PAGE_W / 2, state.y, {
      align: 'center',
    })
    state.y += 5.8
  }

  // Centered Wrapped Contacts Row with Crisp Vector Icons & Links
  if (model.contacts.length > 0) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)

    const gapBetweenItems = 6.5
    const iconSlotW = 3.8
    const prepared = model.contacts.map((contact) => {
      const text = sanitizePdfText(contact.value)
      const textW = doc.getTextWidth(text)
      return {
        ...contact,
        text,
        totalW: iconSlotW + textW,
      }
    })

    const rows = []
    let currentRow = []
    let currentW = 0

    prepared.forEach((item) => {
      const nextW =
        currentRow.length === 0
          ? item.totalW
          : currentW + gapBetweenItems + item.totalW
      if (currentRow.length > 0 && nextW > CONTENT_W) {
        rows.push({ items: currentRow, width: currentW })
        currentRow = [item]
        currentW = item.totalW
      } else {
        currentRow.push(item)
        currentW = nextW
      }
    })
    if (currentRow.length > 0) {
      rows.push({ items: currentRow, width: currentW })
    }

    rows.forEach((row) => {
      let cursorX = (PAGE_W - row.width) / 2
      row.items.forEach((item, idx) => {
        drawContactGlyph(doc, item.icon, item.label, cursorX + 1.4, state.y - 1.0)
        doc.setTextColor(...COLOR_BODY)
        doc.text(item.text, cursorX + iconSlotW, state.y)
        if (item.href) {
          doc.link(cursorX, state.y - 3.0, item.totalW, 4.0, {
            url: item.href,
          })
        }
        cursorX += item.totalW + (idx < row.items.length - 1 ? gapBetweenItems : 0)
      })
      state.y += 4.6
    })
  }

  state.y += 3.5

  const BODY_LINE_FACTOR = 1.5
  const getLineHeightMm = (fontSizePt) =>
    (fontSizePt * BODY_LINE_FACTOR) / doc.internal.scaleFactor

  doc.setLineHeightFactor(BODY_LINE_FACTOR)

  const drawJustifiedLines = (lines, x, y, maxWidth, fontSizePt) => {
    const lineH = getLineHeightMm(fontSizePt)
    doc.text(lines, x, y, {
      maxWidth,
      align: 'justify',
      lineHeightFactor: BODY_LINE_FACTOR,
    })
    return lines.length * lineH
  }

  // 2. ABOUT ME / TENTANG SAYA
  if (model.summaryBio) {
    state.drawSectionHeading(copy.aboutHeading)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.2)
    doc.setTextColor(...COLOR_BODY)
    const lines = doc.splitTextToSize(sanitizePdfText(model.summaryBio), CONTENT_W)
    const blockH = lines.length * getLineHeightMm(9.2) + 2
    state.ensureSpace(blockH)
    state.y += drawJustifiedLines(lines, MARGIN_X, state.y, CONTENT_W, 9.2) + 1.5
  }

  // 3. EDUCATION / PENDIDIKAN
  if (model.education.length > 0) {
    state.drawDivider()
    state.drawSectionHeading(copy.educationHeading)
    const eduLineH = getLineHeightMm(9.2)

    model.education.forEach((edu) => {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9.2)
      const descLines = edu.description
        ? doc.splitTextToSize(sanitizePdfText(edu.description), CONTENT_W)
        : []
      const blockH = 9.5 + (descLines.length > 0 ? descLines.length * eduLineH + 1.2 : 0) + 2.5
      state.ensureSpace(blockH)

      if (edu.metaLine) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.5)
        doc.setTextColor(...COLOR_MUTED)
        doc.text(sanitizePdfText(edu.metaLine), MARGIN_X, state.y)
        state.y += 4.1
      }

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9.8)
      doc.setTextColor(...COLOR_DARK)
      doc.text(sanitizePdfText(edu.title), MARGIN_X, state.y)
      state.y += 4.5

      if (descLines.length > 0) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9.2)
        doc.setTextColor(...COLOR_BODY)
        state.y += drawJustifiedLines(descLines, MARGIN_X, state.y, CONTENT_W, 9.2)
      }

      state.y += 2.2
    })
  }

  // 4. WORK EXPERIENCE / PENGALAMAN KERJA
  if (model.experience.length > 0) {
    state.drawDivider()
    state.drawSectionHeading(copy.experienceHeading)
    const expLineH = getLineHeightMm(9.2)
    const bulletOffsetX = 3.4
    const bulletMaxW = CONTENT_W - bulletOffsetX

    model.experience.forEach((item) => {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9.2)
      const descLines = item.description
        ? doc.splitTextToSize(sanitizePdfText(item.description), CONTENT_W)
        : []
      const hlLines = item.highlights.map((bullet) =>
        doc.splitTextToSize(sanitizePdfText(bullet), bulletMaxW),
      )
      const hlHeight = hlLines.reduce((acc, lines) => acc + lines.length * expLineH + 0.8, 0)
      const blockH =
        (item.metaLine ? 4.1 : 0) +
        4.6 +
        (descLines.length > 0 ? descLines.length * expLineH + 0.6 : 0) +
        hlHeight +
        2.5

      state.ensureSpace(blockH)

      if (item.metaLine) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.5)
        doc.setTextColor(...COLOR_MUTED)
        doc.text(sanitizePdfText(item.metaLine), MARGIN_X, state.y)
        state.y += 4.1
      }

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9.8)
      doc.setTextColor(...COLOR_DARK)
      doc.text(sanitizePdfText(item.title), MARGIN_X, state.y)
      state.y += 4.4

      if (descLines.length > 0) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9.2)
        doc.setTextColor(...COLOR_BODY)
        state.y +=
          drawJustifiedLines(descLines, MARGIN_X, state.y, CONTENT_W, 9.2) + 0.6
      }

      hlLines.forEach((lines) => {
        doc.setFillColor(...COLOR_DARK)
        doc.circle(MARGIN_X + 1.0, state.y - 1.0, 0.5, 'F')
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9.2)
        doc.setTextColor(...COLOR_BODY)
        state.y +=
          drawJustifiedLines(
            lines,
            MARGIN_X + bulletOffsetX,
            state.y,
            bulletMaxW,
            9.2,
          ) + 0.8
      })

      state.y += 2.2
    })
  }

  // 5. SELECTED PROJECTS / PROYEK PILIHAN
  if (model.selectedProjects.length > 0) {
    state.drawDivider()
    state.drawSectionHeading(copy.projectsHeading)
    const sumLineH = getLineHeightMm(9.2)
    const detailLineH = getLineHeightMm(8.8)

    model.selectedProjects.forEach((project) => {
      const hasExternalUrl =
        typeof project.liveUrl === 'string' && project.liveUrl.startsWith('http')
      const detailParts = [
        project.stackLine ? `${copy.stackPrefix}: ${project.stackLine}` : '',
        project.liveUrl || '',
      ].filter(Boolean)
      const detailLine = detailParts.join('  |  ')

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9.2)
      const sumLines = project.summary
        ? doc.splitTextToSize(sanitizePdfText(project.summary), CONTENT_W)
        : []
      doc.setFontSize(8.8)
      const detailLines = detailLine
        ? doc.splitTextToSize(sanitizePdfText(detailLine), CONTENT_W)
        : []

      const blockH =
        (project.metaLine ? 4.0 : 0) +
        4.4 +
        (sumLines.length > 0 ? sumLines.length * sumLineH + 0.5 : 0) +
        (detailLines.length > 0 ? detailLines.length * detailLineH : 0) +
        2.0
      state.ensureSpace(blockH)

      if (project.metaLine) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.5)
        doc.setTextColor(...COLOR_MUTED)
        doc.text(sanitizePdfText(project.metaLine), MARGIN_X, state.y)
        state.y += 4.0
      }

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9.8)
      doc.setTextColor(...COLOR_DARK)
      const cleanTitle = sanitizePdfText(project.title)
      doc.text(cleanTitle, MARGIN_X, state.y)
      if (hasExternalUrl) {
        doc.link(MARGIN_X, state.y - 3.4, doc.getTextWidth(cleanTitle), 4.2, {
          url: project.liveUrl,
        })
      }
      state.y += 4.4

      if (sumLines.length > 0) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9.2)
        doc.setTextColor(...COLOR_BODY)
        state.y +=
          drawJustifiedLines(sumLines, MARGIN_X, state.y, CONTENT_W, 9.2) + 0.5
      }

      if (detailLines.length > 0) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.8)
        doc.setTextColor(...COLOR_BODY)
        doc.text(detailLines, MARGIN_X, state.y, {
          lineHeightFactor: BODY_LINE_FACTOR,
        })
        if (hasExternalUrl && detailLines.length === 1) {
          doc.link(
            MARGIN_X,
            state.y - 3.2,
            doc.getTextWidth(detailLines[0]),
            4.0,
            { url: project.liveUrl },
          )
        }
        state.y += detailLines.length * detailLineH
      }

      state.y += 2.0
    })
  }

  // 6. ACHIEVEMENTS & COMPETITIONS
  if (model.certifications.length > 0) {
    state.drawDivider()
    state.drawSectionHeading(copy.certificationsHeading)
    const certLineH = getLineHeightMm(9.2)

    model.certifications.forEach((cert) => {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9.0)
      const metaSummaryParts = [
        cert.role ? `${copy.rolePrefix}: ${cert.role}` : '',
        cert.result ? `${copy.resultPrefix}: ${cert.result}` : '',
      ].filter(Boolean)
      const roleResultLine = metaSummaryParts.join('  |  ')
      const sumLines = cert.summary
        ? doc.splitTextToSize(sanitizePdfText(cert.summary), CONTENT_W)
        : []
      const blockH =
        (cert.metaLine ? 4.0 : 0) +
        4.4 +
        (roleResultLine ? getLineHeightMm(9.0) : 0) +
        (sumLines.length > 0 ? sumLines.length * certLineH + 0.5 : 0) +
        (cert.credentialUrl ? getLineHeightMm(8.4) : 0) +
        2.0
      state.ensureSpace(blockH)

      if (cert.metaLine) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.5)
        doc.setTextColor(...COLOR_MUTED)
        doc.text(sanitizePdfText(cert.metaLine), MARGIN_X, state.y)
        state.y += 4.0
      }

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9.8)
      doc.setTextColor(...COLOR_DARK)
      const cleanCertTitle = sanitizePdfText(cert.title)
      doc.text(cleanCertTitle, MARGIN_X, state.y)
      if (cert.credentialUrl) {
        doc.link(MARGIN_X, state.y - 3.4, doc.getTextWidth(cleanCertTitle), 4.2, {
          url: cert.credentialUrl,
        })
      }
      state.y += 4.4

      if (roleResultLine) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9.0)
        doc.setTextColor(...COLOR_BODY)
        doc.text(sanitizePdfText(roleResultLine), MARGIN_X, state.y)
        state.y += getLineHeightMm(9.0)
      }

      if (sumLines.length > 0) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9.2)
        doc.setTextColor(...COLOR_BODY)
        state.y +=
          drawJustifiedLines(sumLines, MARGIN_X, state.y, CONTENT_W, 9.2) + 0.5
      }

      if (cert.credentialUrl) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.4)
        doc.setTextColor(...COLOR_MUTED)
        const verifyText = `${copy.verifyLabel}: ${cert.credentialUrl}`
        doc.text(sanitizePdfText(verifyText), MARGIN_X, state.y)
        doc.link(
          MARGIN_X,
          state.y - 3.2,
          doc.getTextWidth(sanitizePdfText(verifyText)),
          4.0,
          { url: cert.credentialUrl },
        )
        state.y += getLineHeightMm(8.4)
      }

      state.y += 2.0
    })
  }

  const drawCategoryLines = (groups) => {
    const catLineH = getLineHeightMm(9.0)
    groups.forEach((group) => {
      const prefix = `${sanitizePdfText(group.category)}: `
      const bodyText = sanitizePdfText(group.items.join(', '))
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9.0)
      const prefixW = doc.getTextWidth(prefix)

      doc.setFont('helvetica', 'normal')
      const lines = doc.splitTextToSize(bodyText, CONTENT_W - prefixW)
      state.ensureSpace(lines.length * catLineH + 0.6)

      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...COLOR_DARK)
      doc.text(prefix, MARGIN_X, state.y)

      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...COLOR_BODY)
      doc.text(lines[0] || '', MARGIN_X + prefixW, state.y)
      for (let i = 1; i < lines.length; i += 1) {
        state.y += catLineH
        doc.text(lines[i], MARGIN_X, state.y)
      }
      state.y += catLineH + 0.6
    })
  }

  // 7. SKILLS (Compact Categorized Lines)
  if (model.skillGroups.length > 0 || model.skills.length > 0) {
    state.drawDivider()
    state.drawSectionHeading(copy.skillsHeading)

    if (model.skillGroups.length > 0) {
      drawCategoryLines(model.skillGroups)
    } else {
      drawThreeColumnBullets(doc, model.skills, state, 9, 4.1)
    }
  }

  // 8. TOOLS & TECHNOLOGIES (Compact Categorized Lines)
  if (model.toolGroups.length > 0 || model.tools.length > 0) {
    state.drawDivider()
    state.drawSectionHeading(copy.toolsHeading)

    if (model.toolGroups.length > 0) {
      drawCategoryLines(model.toolGroups)
    } else {
      drawThreeColumnBullets(doc, model.tools, state, 9, 4.1)
    }
  }

  const safeName = sanitizePdfText(model.fullName).replace(/[\\/:*?"<>|]/g, '')
  const fileName = `CV - ${safeName} (${model.langKey.toUpperCase()}).pdf`
  return { doc, fileName }
}

/**
 * Generates and directly triggers browser download for the ATS-friendly PDF.
 */
export async function downloadCvPdf(cvData, language = 'en') {
  const { doc, fileName } = await createCvPdf(cvData, language)
  doc.save(fileName)
  return fileName
}
