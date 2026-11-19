---
name: human-prose
description: Enforces concise, natural, human-written prose in deliverables and academic reports. Eliminates unmistakable AI writing patterns such as excessive bolding, list sprawl, numbered headings, horizontal dividers, H4+ subheadings, and bloated filler.
---

# Human Prose — Concise & Natural Deliverable Writing

Write like a sharp human engineer or researcher submitting a clear, direct report. Never produce sprawling walls of bullet points, bold-highlighted clauses, or over-structured AI templates.

## Structural Rules (Strict)

1. **Heading hierarchy limited to H1, H2, and H3:** Use `#` for the document title, `##` for major sections, and `###` only when a subsection is genuinely needed. Never use `####` or deeper headings.
2. **No numbered headings:** Write natural titles such as `## Macrolocalización` or `### Cálculo de muestra`, never `## 1. Macrolocalización` or `### 2.1 Cálculo de muestra`.
3. **No section dividers:** Never place `---` horizontal rules between sections or after the header.
4. **Short, self-contained documents:** Trim documents ruthlessly to a few well-contained paragraphs per section. Target roughly 25%–35% of the length of an exhaustive AI draft by cutting repetition, restatements, and filler.

## Formatting & Anti-AI-Slop Rules

1. **Paragraphs over lists:** Default to flowing, cohesive paragraphs of 3 to 5 sentences. Convert narrative bullet points, nested sub-bullets, and numbered pseudo-paragraphs into continuous prose. Keep lists or compact tables strictly when the content is genuinely discrete (e.g., survey items, a weighted comparison matrix, or a short bibliography), never as a crutch for explaining ideas.
2. **Minimal bolding:** Eliminate bold lead-ins (`**Concepto:** explicación...`) and mid-sentence bolding of numbers or phrases. Use `**bold**` only in minimal table headers or rare essential labels; narrative paragraphs should read as clean plain text.
3. **Eliminate robotic filler and meta-tags:**
   - Cut empty academic throat-clearing (*"En estricto apego a los lineamientos..."*, *"Resulta fundamental señalar que..."*, *"De forma integral y holística..."*).
   - Never repeat status placeholders like `*(Pendiente de recolección en campo)*` across dozens of rows or sections; state once in plain prose what remains pending field collection.
4. **Word / Google Docs / PDF readiness for external deliverables:**
   - Zero `file:///` links, zero internal repository filenames, and zero code backticks (`` ` ``).
   - Zero blockquotes (`>`), GitHub alerts (`[!NOTE]`, `[!IMPORTANT]`), Mermaid blocks, or raw LaTeX `$...$` formulas.
   - Replace markdown task checkboxes (`- [ ]`) with Unicode `☐` when questionnaires are included, and use plain text equations (e.g., `n = (z^2 * N * p * q) / [e^2 * (N - 1) + z^2 * p * q]`).
   - Write all business and technical concepts in natural Spanish rather than English code identifiers.

## Quick Verification Checklist

Before finishing any deliverable under this skill, verify that:
- Horizontal rules (`---`) count is `0`.
- `H4+` (`####`) count is `0`.
- Numbered headings (`^#{1,3}\s+\d+`) count is `0`.
- Bold markers (`**`) are near zero outside table headers.
- Each section reads as a few concise, well-contained paragraphs rather than a bullet dump.
