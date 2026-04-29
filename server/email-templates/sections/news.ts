import { theme } from "../theme.js";
import { escapeHtml } from "../layout.js";
import type { SectionInput } from "../index.js";

export function renderNews(section: SectionInput): string {
  const items = section.content.split("\n").filter(Boolean);

  if (items.length === 0) {
    return sectionRow(
      section.title,
      `<p style="margin:0;font-family:${theme.fonts.sans};font-size:14px;color:${theme.colors.muted};font-style:italic;">No headlines today.</p>`,
    );
  }

  // Alternate surface tiers — no divider lines
  const itemsHtml = items
    .map((item, i) => {
      const bg = i % 2 === 0 ? theme.colors.surface : theme.colors.surfaceContainer;
      return `
<tr>
  <td style="background-color:${bg};padding:14px 26px;">
    <table cellpadding="0" cellspacing="0" border="0" role="presentation">
      <tr>
        <td style="width:22px;vertical-align:top;padding-top:3px;">
          <p style="margin:0;font-family:${theme.fonts.label};font-size:11px;font-weight:600;color:${theme.colors.tertiary};">${String(i + 1).padStart(2, "0")}</p>
        </td>
        <td style="padding-left:10px;">
          <p style="margin:0;font-family:${theme.fonts.sans};font-size:14px;color:${theme.colors.onSurface};line-height:1.5;">${escapeHtml(item)}</p>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
    })
    .join("");

  return sectionRow(
    section.title,
    `<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-radius:${theme.radius.lg};overflow:hidden;">${itemsHtml}</table>`,
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
