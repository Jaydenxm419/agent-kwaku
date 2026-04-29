import { theme } from "../theme.js";
import { escapeHtml } from "../layout.js";
import type { SectionInput } from "../index.js";

export function renderTasks(section: SectionInput): string {
  const tasks = section.content.split("\n").filter(Boolean);
  if (tasks.length === 0) {
    return sectionRow(
      section.title,
      `<p style="margin:0;font-size:14px;color:${theme.colors.textMuted};font-style:italic;">No tasks today.</p>`,
    );
  }
  const itemsHtml = tasks
    .map(
      (t) => `
<tr>
  <td style="padding:8px 0;border-bottom:1px solid ${theme.colors.border};">
    <table cellpadding="0" cellspacing="0" border="0" role="presentation">
      <tr>
        <td style="width:20px;vertical-align:top;padding-top:1px;">
          <div style="width:16px;height:16px;border:2px solid ${theme.colors.border};border-radius:4px;"></div>
        </td>
        <td style="padding-left:10px;">
          <p style="margin:0;font-size:14px;color:${theme.colors.textPrimary};">${escapeHtml(t)}</p>
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
