import { theme } from "../theme.js";
import { escapeHtml } from "../layout.js";
import type { SectionInput } from "../index.js";

export function renderWeather(section: SectionInput): string {
  const lines = section.content.split("\n").filter(Boolean);
  const linesHtml = lines
    .map((l) => `<p style="margin:0 0 6px;font-size:15px;color:${theme.colors.textPrimary};">${escapeHtml(l)}</p>`)
    .join("");
  return `
<tr>
  <td style="padding:20px 24px 0;">
    ${sectionCard(section.title, linesHtml)}
  </td>
</tr>`;
}

function sectionCard(title: string, bodyHtml: string): string {
  return `
<div style="background-color:${theme.colors.surface};border-radius:${theme.radius};padding:20px 22px;border:1px solid ${theme.colors.border};">
  <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:${theme.colors.textMuted};">${escapeHtml(title)}</p>
  ${bodyHtml}
</div>`;
}
