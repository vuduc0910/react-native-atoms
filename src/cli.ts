#!/usr/bin/env node

import { generateAtoms } from './utils/generateAtoms'

const args = process.argv.slice(2)

if (args[0] === 'generate') {
  generateAtoms()
} else {
  console.error('Unknown command. Use "npx atoms generate" to generate atoms.js.')
}
