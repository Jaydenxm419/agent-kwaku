import { theme } from "../theme.js";
import { escapeHtml } from "../layout.js";
import type { SectionInput } from "../index.js";

export function renderQuote(section: SectionInput): string {
  const lines = section.content.split("\n").filter(Boolean);
  const quoteText = lines[0] ?? section.content;
  const attribution = lines[1] ?? "";
  return `
<tr>
  <td style="padding:20px 24px 0;">
    <div style="background-color:${theme.colors.accentLight};border-radius:${theme.radius};padding:22px 24px;border-left:4px solid ${theme.colors.accent};">
      <p style="margin:0 0 ${attribution ? "10px" : "0"};font-size:15px;font-style:italic;color:${theme.colors.textPrimary};line-height:1.6;">
        "${escapeHtml(quoteText)}"
      </p>
      ${attribution ? `<p style="margin:0;font-size:12px;font-weight:600;color:${theme.colors.textSecondary};">— ${escapeHtml(attribution)}</p>` : ""}
    </div>
  </td>
</tr>`;
}
