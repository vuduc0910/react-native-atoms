import type { AtomsStyle, ThemeToken } from "../types/theme";

const PREFIXES: Record<string, string> = {
  text_: "color",
  bg_: "backgroundColor",
  stroke_: "borderColor",
  border_: "borderColor",
  shadow_: "shadowColor",
};

export function generateTheme<T extends ThemeToken>(theme: T): AtomsStyle<T> {
  const data: ThemeToken = {};
  for (const [key, value] of Object.entries(theme)) {
    for (const [prefix, property] of Object.entries(PREFIXES)) {
      if (key.startsWith(prefix)) {
        data[key] = { [property]: value };
        break;
      }
    }
  }

  return data as AtomsStyle<T>;
}
