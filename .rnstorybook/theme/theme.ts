const palette = {
  success: '#15803D',
  cyan: '#0DF2F2',
  cyanLight: '#E0F7FA',
  dark: '#111827',
  black: '#000000',
  gray900: '#1F2937',
  gray700: '#374151',
  gray600: '#4B5563',
  gray500: '#6B7280',
  gray400: '#9CA3AF',
  gray200: '#E5E7EB',
  gray100: '#F3F4F6',
  gray50: '#F9FAFB',
  gray40: '#F1F5F9',
  white: '#FFFFFF',
  white80: '#FFFFFFCC',
  red: '#FF4B4B',
  yellow: '#FACC15',
};

export const theme = {
  colors: {
    primary: palette.cyan,
    onPrimary: palette.dark,
    background: palette.white,
    white: palette.white,
    cyanLight: palette.cyanLight,

    backgroundAlt: palette.gray50,
    backgroundMuted: palette.gray100,

    text: palette.dark,
    textSecondary: palette.gray700,
    textMuted: palette.gray400,
    textLight: palette.gray500,
    textLighter: palette.gray600,

    border: palette.gray200,
    borderStrong: palette.gray900,
    borderLight: palette.gray100,

    error: palette.red,
    disabled: palette.gray400,
    transparent: 'transparent',
    overlay: 'rgba(17, 24, 39, 0.15)',
    overlayLight: palette.white80,
    yellow: palette.yellow,
  },

  spacing: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 32,
  },

  borderRadius: {
    s: 4,
    m: 8,
    l: 12,
    full: 999,
  },

  fontWeights: {
    bold: '700',
    semiBold: '600',
    medium: '500',
    regular: '400',
  } as const,

  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
      color: palette.dark,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 32,
      color: palette.dark,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
      color: palette.dark,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 26,
      color: palette.gray700,
    },
    bodyMedium: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
      color: palette.gray700,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: palette.gray600,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: palette.gray400,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
  } as const,
};
