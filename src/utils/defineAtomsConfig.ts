import { fontSize } from "../theme/fontSize";
import { fontWeight } from "../theme/fontWeight";
import { radius } from "../theme/radius";
import { shadows } from "../theme/shadows";
import { sizes } from "../theme/size";
import { stroke } from "../theme/stroke";
import type { ShadowProps } from "../types/theme";

interface AtomsConfig {
  outputDir: string;
  radiuses?: Record<string, number>;
  sizes?: Record<string, number>;
  shadows?: Record<string, ShadowProps>;
  strokes?: Record<string, number>;
  fontSizes?: Record<string, number>;
  fontWeights?: Record<string, string | number | undefined>;
  colors?: Record<string, string | string[]>;
  fontFamilies?: Record<string, string>;
}

export function defineAtomsConfig(config: AtomsConfig): Required<AtomsConfig> {
  return {
    outputDir: config.outputDir || "/themes",
    radiuses: config.radiuses || radius,
    sizes: config.sizes || sizes,
    shadows: config.shadows || shadows,
    strokes: config.strokes || stroke,
    fontSizes: config.fontSizes || fontSize,
    fontWeights: config.fontWeights || fontWeight,
    colors: config.colors || {},
    fontFamilies: config.fontFamilies || {},
  };
}
