export const theme = {
  // Typography — Noto Serif for headlines, Inter for body, Public Sans for labels
  fonts: {
    serif: "'Noto Serif', Georgia, 'Times New Roman', serif",
    sans: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    label: "'Public Sans', 'Helvetica Neue', Arial, sans-serif",
  },

  colors: {
    // Page canvas — warm editorial paper
    canvas: "#f2ede4",

    // Surface tiers — hierarchy through background shift, no borders
    surfaceLowest: "#ffffff",
    surface: "#f9f7f3",
    surfaceContainer: "#f0ece3",
    surfaceDim: "#e8e3d8",

    // Brand
    primary: "#094cb2",
    primaryContainer: "#dce8ff",
    primaryGradient: "linear-gradient(135deg, #094cb2 0%, #2763d4 100%)",

    // Archival gold
    tertiary: "#6d5e00",
    tertiaryContainer: "#f5e89c",

    // Text
    onSurface: "#1c1b18",
    onSurfaceVariant: "#4a4845",
    muted: "#7c7870",

    // Ghost border (only use when absolutely needed)
    ghostBorder: "rgba(28, 27, 24, 0.08)",
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  },

  maxWidth: "600px",
} as const;

export type Theme = typeof theme;
