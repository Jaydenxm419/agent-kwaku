import { theme } from "./theme.js";

export function wrapLayout(innerHtml: string, date: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Morning Brief — ${escapeHtml(date)}</title>
  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600&family=Public+Sans:wght@400;500;600&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background-color:${theme.colors.canvas};font-family:${theme.fonts.sans};-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
    <tr>
      <td align="center" style="padding:36px 16px 48px;">
        <table width="${theme.maxWidth}" cellpadding="0" cellspacing="0" border="0" role="presentation"
               style="max-width:${theme.maxWidth};width:100%;background-color:${theme.colors.surfaceLowest};border-radius:${theme.radius.xl};overflow:hidden;box-shadow:0 2px 32px rgba(28,27,24,0.05),0 1px 4px rgba(28,27,24,0.04);">
          ${innerHtml}
          <tr>
            <td style="padding:28px 36px 32px;background-color:${theme.colors.surface};text-align:center;">
              <p style="margin:0;font-family:${theme.fonts.label};font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:${theme.colors.muted};">
                Curated by Boop &nbsp;·&nbsp; ${escapeHtml(date)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
