import { useContext } from 'react'
import { ThemeContext, type ThemeContextValue } from '../providers/ThemeProvider'
import type { ColorSchemaName, ThemeToken } from '../types/theme'

export function useTheme<T extends ThemeToken, S extends ColorSchemaName>() {
  const context = useContext(ThemeContext) as ThemeContextValue<T, S>
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
