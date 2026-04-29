import { theme } from "../theme.js";
import { escapeHtml } from "../layout.js";
import type { SectionInput } from "../index.js";

export function renderQuote(section: SectionInput): string {
  const lines = section.content.split("\n").filter(Boolean);
  const quoteText = lines[0] ?? section.content;
  const attribution = lines[1] ?? "";

  return `
<tr>
  <td style="padding:28px 36px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation"
           style="background-color:${theme.colors.tertiaryContainer};border-radius:${theme.radius.lg};overflow:hidden;">
      <tr>
        <td style="padding:28px 30px 26px;">
          <p style="margin:0 0 4px;font-family:${theme.fonts.label};font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${theme.colors.tertiary};">${escapeHtml(section.title)}</p>
          <p style="margin:16px 0 ${attribution ? "14px" : "0"};font-family:${theme.fonts.serif};font-size:18px;font-weight:400;font-style:italic;color:${theme.colors.onSurface};line-height:1.65;letter-spacing:.01em;">
            &#8220;${escapeHtml(quoteText)}&#8221;
          </p>
          ${attribution ? `<p style="margin:0;font-family:${theme.fonts.label};font-size:12px;font-weight:600;letter-spacing:.04em;color:${theme.colors.tertiary};">— ${escapeHtml(attribution)}</p>` : ""}
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}
