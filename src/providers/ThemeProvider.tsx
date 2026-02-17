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
  const value = useMemo(() => {
    const currentTheme = themeModes[colorScheme];
    if (!currentTheme) {
      throw new Error(`Invalid color scheme: ${colorScheme}`);
    }
    const atoms = generateTheme<T>(currentTheme as T);
    return { atoms, colorScheme } as const;
  }, [colorScheme, themeModes]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
