# @fan-plus/atoms

## Setup

1. Add package `@fan-plus/atoms`
2. Create file `atoms.config.js`
3. Export the configuration

```typescript
type AtomsConfig {
  outputDir: string
  colors?: Record<string, string | string[]>
  radiuses?: Record<string, number>
  sizes?: Record<string, number>
  shadows?: Record<string, ShadowProps>
  strokes?: Record<string, number>
  fontSizes?: Record<string, number>
  fontWeights?: Record<string, string | number | undefined>
}


module.exports = defineAtomsConfig(AtomsConfig)
```


## Generate

Run the following command to generate atom styles based on the configuration inside `atoms.config.js`:

```
npx atoms generate
```


## Note

1. If you want to import TypeScript inside `atoms.config.js` (currently, we only support JavaScript for this config), place `require('ts-node').register()` at the top of `atoms.config.js`.
