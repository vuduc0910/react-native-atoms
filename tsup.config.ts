import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  legacyOutput: true,
})
