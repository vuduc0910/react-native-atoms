import type { TextStyle, ViewStyle } from "react-native";
export type ShadowProps = {
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation?: number; // for android
};

type StartsWith<
  S extends string,
  Prefix extends string
> = S extends `${Prefix}${infer _}` ? true : false;

export type AtomsStyle<T> = {
  [K in keyof T]: K extends string
    ? StartsWith<K, "bg_"> extends true
      ? ViewStyle
      : StartsWith<K, "stroke_"> extends true
      ? ViewStyle
      : StartsWith<K, "text_"> extends true
      ? TextStyle
      : TextStyle | ViewStyle
    : TextStyle | ViewStyle;
};

export type ThemeToken = Record<string, unknown>;
export type ColorSchemaName = string;
