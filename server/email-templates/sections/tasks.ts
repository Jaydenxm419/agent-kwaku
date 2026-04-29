import { theme } from "../theme.js";
import { escapeHtml } from "../layout.js";
import type { SectionInput } from "../index.js";

export function renderTasks(section: SectionInput): string {
  const tasks = section.content.split("\n").filter(Boolean);

  if (tasks.length === 0) {
    return sectionRow(
      section.title,
      `<p style="margin:0;font-family:${theme.fonts.sans};font-size:14px;color:${theme.colors.muted};font-style:italic;">Nothing on the list today.</p>`,
    );
  }

  const tasksHtml = tasks
    .map(
      (t, i) => `
<tr>
  <td style="padding:${i === 0 ? "0" : "12px"} 0 0;">
    <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%">
      <tr>
        <td style="width:20px;vertical-align:top;padding-top:2px;">
          <div style="width:18px;height:18px;border-radius:5px;border:2px solid ${theme.colors.ghostBorder};background-color:${theme.colors.surfaceLowest};"></div>
        </td>
        <td style="padding-left:12px;">
          <p style="margin:0;font-family:${theme.fonts.sans};font-size:14px;color:${theme.colors.onSurface};line-height:1.45;">${escapeHtml(t)}</p>
        </td>
      </tr>
    </table>
  </td>
</tr>`,
    )
    .join("");

  return sectionRow(
    section.title,
    `<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">${tasksHtml}</table>`,
  );
}

function sectionRow(title: string, bodyHtml: string): string {
  return `
<tr>
  <td style="padding:28px 36px 0;">
    <p style="margin:0 0 16px;font-family:${theme.fonts.label};font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${theme.colors.muted};">${escapeHtml(title)}</p>
    <div style="background-color:${theme.colors.surface};border-radius:${theme.radius.lg};padding:22px 26px;">
      ${bodyHtml}
    </div>
  </td>
</tr>`;
}
