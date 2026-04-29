import { theme } from "../theme.js";
import { escapeHtml } from "../layout.js";
import type { SectionInput } from "../index.js";

export function renderNews(section: SectionInput): string {
  const items = section.content.split("\n").filter(Boolean);
  if (items.length === 0) {
    return sectionRow(
      section.title,
      `<p style="margin:0;font-size:14px;color:${theme.colors.textMuted};font-style:italic;">No headlines today.</p>`,
    );
  }
  const itemsHtml = items
    .map(
      (item, i) => `
<tr>
  <td style="padding:10px 0;${i < items.length - 1 ? `border-bottom:1px solid ${theme.colors.border};` : ""}">
    <table cellpadding="0" cellspacing="0" border="0" role="presentation">
      <tr>
        <td style="width:6px;vertical-align:top;padding-top:6px;">
          <div style="width:6px;height:6px;border-radius:50%;background-color:${theme.colors.accent};"></div>
        </td>
        <td style="padding-left:12px;">
          <p style="margin:0;font-size:14px;color:${theme.colors.textPrimary};line-height:1.4;">${escapeHtml(item)}</p>
        </td>
      </tr>
    </table>
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
