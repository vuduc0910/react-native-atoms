import { createContext, useMemo } from "react";
import type { AtomsStyle, ColorSchemaName, ThemeToken } from "../types/theme";
import { generateTheme } from "../utils/generateTheme";

interface ThemeProviderProps<T extends ThemeToken, S extends ColorSchemaName> {
  children: React.ReactNode;
  colorScheme: S;
  themeModes: Record<S, T>;
}

export type ThemeContextValue<
  T extends ThemeToken,
  S extends ColorSchemaName
> = {
  atoms: AtomsStyle<T>;
  colorScheme: S;
};
const defaultValue: ThemeContextValue<ThemeToken, ColorSchemaName> = {
  atoms: {},
  colorScheme: "",
};

export const ThemeContext =
  createContext<ThemeContextValue<ThemeToken, string>>(defaultValue);

export function ThemeColorProvider<
  T extends ThemeToken,
  S extends ColorSchemaName
>({ children, colorScheme, themeModes }: ThemeProviderProps<T, S>) {
  const theme = useMemo(() => {
    const currentTheme = themeModes[colorScheme];
    if (!currentTheme) {
      throw new Error(`Invalid color scheme: ${colorScheme}`);
    }
    return currentTheme as T;
  }, [colorScheme, themeModes]);
  const atoms = generateTheme<T>(theme);
  return (
    <ThemeContext.Provider value={{ atoms, colorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
