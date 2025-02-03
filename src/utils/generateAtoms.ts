#!/usr/bin/env node -r ts-node/register

import fs from 'node:fs'
import path from 'node:path'
import { generateStyle } from './generateStyle'

export async function generateAtoms() {
  console.log('Start generating atoms!')
  const configFilePath = path.join(process.cwd(), 'atoms.config.js')

  if (!fs.existsSync(configFilePath)) {
    console.error('File atoms.config.ts not found.')
    return
  }

  const config = await import(configFilePath)
  const outputFilePath = path.join(process.cwd(), `${config.default.outputDir}/atoms.ts`)
  console.log('Create content!')
  const atomsContent = generateStyle({
    radius: config.default.radiuses,
    sizes: config.default.sizes,
    stroke: config.default.strokes,
    shadows: config.default.shadows,
    fontSizes: config.default.fontSizes,
    fontWeights: config.default.fontWeights,
  })

  // Write the generated content to atoms.ts
  fs.writeFileSync(outputFilePath, atomsContent, 'utf8')
  console.log('Done!')
}
