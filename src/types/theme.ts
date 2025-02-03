import type { TextStyle, ViewStyle } from 'react-native'
export type ShadowProps = {
  shadowOffset: {
    width: number
    height: number
  }
  shadowOpacity: number
  shadowRadius: number
  elevation?: number // for android
}

export type AtomsStyle<T> = Record<keyof T, TextStyle | ViewStyle>

export type ThemeToken = Record<string, unknown>
export type ColorSchemaName = string
