import type { ShadowProps } from '../types/theme'

type ShadowKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

export const shadows: Record<ShadowKey, ShadowProps> = {
  xs: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.05,
  },
  sm: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.06,
  },
  md: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.06,
  },
  lg: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 6,
    shadowOpacity: 0.03,
  },
  xl: {
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 16,
  },
  '2xl': {
    shadowOffset: {
      width: 0,
      height: 24,
    },
    shadowRadius: 48,
    shadowOpacity: 0.18,
  },
  '3xl': {
    shadowOffset: {
      width: 0,
      height: 32,
    },
    shadowRadius: 64,
    shadowOpacity: 0.14,
  },
}
