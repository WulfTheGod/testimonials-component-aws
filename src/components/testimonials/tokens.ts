// Design tokens for testimonials component

export const spacing = {
  cardPx: 24,
  cardPy: 22,
  gap: {
    sm: 16,
    md: 24,
  },
} as const;

export const radii = {
  card: 'rounded-2xl',
} as const;

export const shadows = {
  card: 'shadow-[0_10px_30px_rgba(0,0,0,0.06)]',
  cardActive: 'shadow-[0_14px_40px_rgba(0,0,0,0.10)]',
  cardHover: 'shadow-[0_20px_50px_rgba(0,0,0,0.12)]',
} as const;

export const opacity = {
  preview: 0.85,
  metadata: 0.7,
} as const;

export const colors = {
  emerald: {
    50: '#ecfdf5',
    500: '#10b981',
    600: '#059669',
  },
  gray: {
    100: '#f3f4f6',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    900: '#111827',
  },
  slate: {
    50: '#f8fafc',
    200: '#e2e8f0',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    900: '#0f172a',
  },
} as const;