import { theme } from "../theme.js";
import { escapeHtml } from "../layout.js";
import type { SectionInput } from "../index.js";

export function renderGreeting(section: SectionInput): string {
  return `
<tr>
  <td style="background:${theme.colors.primaryGradient};padding:44px 40px 40px;">
    <p style="margin:0 0 10px;font-family:${theme.fonts.label};font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.65);">
      ${escapeHtml(section.title)}
    </p>
    <h1 style="margin:0;font-family:${theme.fonts.serif};font-size:30px;font-weight:700;line-height:1.25;color:#ffffff;letter-spacing:-.01em;">
      ${escapeHtml(section.content)}
    </h1>
  </td>
</tr>`;
}
