import type { AtomsStyle, ThemeToken } from "../types/theme";

export function generateTheme<T extends ThemeToken>(theme: T): AtomsStyle<T> {
  const data: ThemeToken = {};
  for (const [key, value] of Object.entries(theme)) {
    if (key.startsWith("text_")) {
      data[key] = {
        color: value,
      };
      continue;
    }
    if (key.startsWith("bg_")) {
      data[key] = {
        backgroundColor: value,
      };
      continue;
    }
    if (key.startsWith("stroke_") || key.startsWith("border_")) {
      data[key] = {
        borderColor: value,
      };
      continue;
    }
    if (key.startsWith("shadow_")) {
      data[key] = {
        shadowColor: value,
      };
    }
  }

  return data as AtomsStyle<T>;
}
