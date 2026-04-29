import { theme } from "../theme.js";
import { escapeHtml } from "../layout.js";
import type { SectionInput } from "../index.js";

export function renderCalendar(section: SectionInput): string {
  const events = section.content.split("\n").filter(Boolean);
  if (events.length === 0) {
    return sectionRow(
      section.title,
      `<p style="margin:0;font-size:14px;color:${theme.colors.textMuted};font-style:italic;">No events today.</p>`,
    );
  }
  const itemsHtml = events
    .map(
      (e) => `
<tr>
  <td style="padding:8px 0;border-bottom:1px solid ${theme.colors.border};">
    <p style="margin:0;font-size:14px;color:${theme.colors.textPrimary};">${escapeHtml(e)}</p>
  </td>
</tr>`,
    )
    .join("");
  const tableHtml = `
<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
  ${itemsHtml}
</table>`;
  return sectionRow(section.title, tableHtml);
}

function sectionRow(title: string, bodyHtml: string): string {
  return `
<tr>
  <td style="padding:20px 24px 0;">
    <div style="background-color:${theme.colors.surface};border-radius:${theme.radius};padding:20px 22px;border:1px solid ${theme.colors.border};">
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:${theme.colors.textMuted};">${escapeHtml(title)}</p>
      ${bodyHtml}
    </div>
  </td>
</tr>`;
}
