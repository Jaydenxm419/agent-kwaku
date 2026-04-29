import { theme } from "../theme.js";
import { escapeHtml } from "../layout.js";
import type { SectionInput } from "../index.js";

export function renderWeather(section: SectionInput): string {
  const lines = section.content.split("\n").filter(Boolean);
  const [primary, ...details] = lines;
  const detailsHtml = details.length
    ? details
        .map(
          (d) =>
            `<p style="margin:6px 0 0;font-family:${theme.fonts.sans};font-size:13px;color:${theme.colors.onSurfaceVariant};line-height:1.5;">${escapeHtml(d)}</p>`,
        )
        .join("")
    : "";
  return `
<tr>
  <td style="padding:28px 36px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation"
           style="background-color:${theme.colors.surface};border-radius:${theme.radius.lg};overflow:hidden;">
      <tr>
        <td style="padding:22px 26px 22px;">
          <p style="margin:0 0 14px;font-family:${theme.fonts.label};font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${theme.colors.muted};">${escapeHtml(section.title)}</p>
          <p style="margin:0;font-family:${theme.fonts.serif};font-size:22px;font-weight:600;color:${theme.colors.onSurface};line-height:1.3;">${escapeHtml(primary ?? "")}</p>
          ${detailsHtml}
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}
