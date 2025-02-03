import type { TextStyle } from 'react-native'

type WeighKey = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold'

export const fontWeight: Record<WeighKey, TextStyle['fontWeight']> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
}
