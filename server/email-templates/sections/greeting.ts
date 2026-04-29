import { theme } from "../theme.js";
import { escapeHtml } from "../layout.js";
import type { SectionInput } from "../index.js";

export function renderGreeting(section: SectionInput): string {
  return `
<tr>
  <td style="background-color:${theme.colors.accent};padding:36px 32px 32px;">
    <p style="margin:0 0 6px;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.7);">
      ${escapeHtml(section.title)}
    </p>
    <p style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.3;">
      ${escapeHtml(section.content)}
    </p>
  </td>
</tr>`;
}
