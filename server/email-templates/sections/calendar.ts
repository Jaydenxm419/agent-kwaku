import { theme } from "../theme.js";
import { escapeHtml } from "../layout.js";
import type { SectionInput } from "../index.js";

export function renderCalendar(section: SectionInput): string {
  const events = section.content.split("\n").filter(Boolean);

  if (events.length === 0) {
    return sectionRow(
      section.title,
      `<p style="margin:0;font-family:${theme.fonts.sans};font-size:14px;color:${theme.colors.muted};font-style:italic;">No events scheduled.</p>`,
    );
  }

  // Alternate surface tiers instead of borders
  const eventsHtml = events
    .map((e, i) => {
      const bg = i % 2 === 0 ? theme.colors.surfaceLowest : theme.colors.surface;
      return `
<tr>
  <td style="background-color:${bg};padding:12px 26px;">
    <table cellpadding="0" cellspacing="0" border="0" role="presentation">
      <tr>
        <td style="width:3px;background:${theme.colors.primary};border-radius:2px;vertical-align:stretch;">&nbsp;</td>
        <td style="padding-left:14px;">
          <p style="margin:0;font-family:${theme.fonts.sans};font-size:14px;color:${theme.colors.onSurface};line-height:1.45;">${escapeHtml(e)}</p>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
    })
    .join("");

  return sectionRow(
    section.title,
    `<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-radius:${theme.radius.md};overflow:hidden;">${eventsHtml}</table>`,
    false,
  );
}

function sectionRow(title: string, bodyHtml: string, pad = true): string {
  return `
<tr>
  <td style="padding:28px 36px 0;">
    <p style="margin:0 0 16px;font-family:${theme.fonts.label};font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${theme.colors.muted};">${escapeHtml(title)}</p>
    ${pad ? `<div style="background-color:${theme.colors.surface};border-radius:${theme.radius.lg};padding:20px 26px;">${bodyHtml}</div>` : bodyHtml}
  </td>
</tr>`;
}
