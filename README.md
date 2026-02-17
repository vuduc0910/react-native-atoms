# @vuduc0801/react-native-atoms

A utility-first styling library for React Native, inspired by atomic CSS. Generate type-safe style atoms from a configuration file and consume them via a theme provider with dark/light mode support.

## Requirements

- React 19+
- React Native 0.84+

## Installation

```bash
npm install @vuduc0801/react-native-atoms
```

## Setup

### 1. Create `atoms.config.js`

```js
const { defineAtomsConfig } = require("@vuduc0801/react-native-atoms");

module.exports = defineAtomsConfig({
  outputDir: "./src/themes",
  colors: {
    primary: "#3B82F6",
    secondary: "#6366F1",
    gray: ["#F9FAFB", "#F3F4F6", "#D1D5DB", "#6B7280", "#111827"],
  },
  radiuses: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  sizes: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
  },
  strokes: {
    0: 0,
    1: 1,
    2: 2,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
  },
  fontFamilies: {
    sans: "Inter",
    mono: "JetBrainsMono",
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      shadowOpacity: 0.05,
      elevation: 1,
    },
  },
});
```

### Config options

| Option | Type | Description |
|--------|------|-------------|
| `outputDir` | `string` | Directory for generated atoms file |
| `colors` | `Record<string, string \| string[]>` | Color tokens. Arrays generate indexed variants (`bg_gray_0`, `bg_gray_1`, ...) |
| `radiuses` | `Record<string, number>` | Border radius tokens (`rounded_sm`, `rounded_t_sm`, `rounded_b_sm`) |
| `sizes` | `Record<string, number>` | Spacing/dimension tokens used for padding, margin, gap, width, height |
| `strokes` | `Record<string, number>` | Border width tokens (`border_1`, `border_t_1`, ...) |
| `fontSizes` | `Record<string, number>` | Font size tokens (`text_sm`, `text_base`, ...) |
| `fontWeights` | `Record<string, string \| number>` | Font weight tokens |
| `fontFamilies` | `Record<string, string>` | Font family tokens (`font_sans`, `font_mono`) |
| `shadows` | `Record<string, ShadowProps>` | Shadow tokens (`shadow_sm`, ...) |

### 2. Generate atoms

```bash
npx atoms generate
```

This reads `atoms.config.js` from your project root and generates a typed atoms file in the configured `outputDir`.

## Usage

### Theme provider

Define your theme tokens per color scheme and wrap your app with `ThemeColorProvider`:

```tsx
import { ThemeColorProvider } from "@vuduc0801/react-native-atoms";

const lightTheme = {
  text_primary: "#111827",
  bg_primary: "#FFFFFF",
  stroke_border: "#D1D5DB",
};

const darkTheme = {
  text_primary: "#F9FAFB",
  bg_primary: "#111827",
  stroke_border: "#374151",
};

const themeModes = { light: lightTheme, dark: darkTheme };

export default function App() {
  return (
    <ThemeColorProvider colorScheme="light" themeModes={themeModes}>
      {/* your app */}
    </ThemeColorProvider>
  );
}
```

Theme tokens are mapped to styles by prefix:

| Prefix | Style property |
|--------|---------------|
| `text_` | `color` |
| `bg_` | `backgroundColor` |
| `stroke_` | `borderColor` |
| `border_` | `borderColor` |
| `shadow_` | `shadowColor` |

### useTheme hook

Access the current theme atoms and color scheme from any component:

```tsx
import { useTheme } from "@vuduc0801/react-native-atoms";
import { View, Text } from "react-native";

function MyComponent() {
  const { atoms, colorScheme } = useTheme();

  return (
    <View style={[atoms.bg_primary, atoms.p_4, atoms.rounded_md]}>
      <Text style={[atoms.text_primary, atoms.text_base]}>
        Current scheme: {colorScheme}
      </Text>
    </View>
  );
}
```

### Generated atom examples

The generated atoms file includes utility styles similar to Tailwind CSS:

```tsx
// Layout
atoms.flex_row
atoms.flex_col
atoms.flex_1
atoms.justify_center
atoms.align_center

// Spacing
atoms.p_4        // padding: 16
atoms.px_2       // paddingLeft: 8, paddingRight: 8
atoms.mt_3       // marginTop: 12
atoms.gap_2      // gap: 8

// Sizing
atoms.w_full     // width: '100%'
atoms.h_8        // height: 32

// Typography
atoms.text_base  // fontSize: 16
atoms.text_center
atoms.font_sans  // fontFamily: 'Inter'
atoms.font_weight_700

// Borders
atoms.rounded_md // borderRadius: 8
atoms.border_1   // borderWidth: 1

// Colors (from theme)
atoms.bg_primary
atoms.text_primary
atoms.stroke_border

// Colors (from config)
atoms.bg_gray_0  // backgroundColor of first gray color
atoms.text_gray_4

// Other
atoms.shadow_sm
atoms.absolute
atoms.overflow_hidden
atoms.resize_cover
```

## Note

If you want to import TypeScript inside `atoms.config.js`, place `require('ts-node').register()` at the top of the file.
