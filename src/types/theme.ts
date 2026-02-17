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

type PrefixStyleMap = {
  bg_: ViewStyle;
  stroke_: ViewStyle;
  border_: ViewStyle;
  shadow_: ViewStyle;
  text_: TextStyle;
};

type StyleForKey<K extends string> = {
  [P in keyof PrefixStyleMap]: K extends `${P & string}${string}`
    ? PrefixStyleMap[P]
    : never;
}[keyof PrefixStyleMap];

export type AtomsStyle<T> = {
  [K in keyof T]: K extends string
    ? StyleForKey<K> extends never
      ? TextStyle | ViewStyle
      : StyleForKey<K>
    : TextStyle | ViewStyle;
};

export type ThemeToken = Record<string, unknown>;
export type ColorSchemaName = string;
