export const theme = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  colors: {
    bg: "#ffffff",
    surface: "#f8f9fb",
    border: "#e4e7ed",
    accent: "#5b6ef5",
    accentLight: "#eef0fe",
    textPrimary: "#1a1d23",
    textSecondary: "#5c6370",
    textMuted: "#9ca3af",
    success: "#16a34a",
  },
  radius: "12px",
  maxWidth: "600px",
} as const;

export type Theme = typeof theme;
