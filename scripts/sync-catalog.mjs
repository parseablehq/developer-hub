#!/usr/bin/env node
/**
 * Copies integration logos from the `datasources` submodule into
 * `public/integrations/logos/` so they're served as static assets.
 *
 * Runs on `predev` and `prebuild`. Soft-fails (warns, exits 0) when the
 * submodule is absent so a fresh clone without `--recurse-submodules` can
 * still build. The IntegrationGallery component renders a placeholder in
 * that case.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const submoduleDir = path.join(root, 'vendor', 'datasources');
const manifestPath = path.join(submoduleDir, 'dist', 'integrations.json');
const assetsDir = path.join(submoduleDir, 'assets');
const outDir = path.join(root, 'public', 'integrations', 'logos');

function warn(msg) {
  console.warn(`[sync-catalog] ${msg}`);
}

function log(msg) {
  console.log(`[sync-catalog] ${msg}`);
}

if (!fs.existsSync(manifestPath)) {
  warn(
    `Skipping — ${path.relative(root, manifestPath)} not found. ` +
      `Run: git submodule update --init --recursive`,
  );
  process.exit(0);
}

if (!fs.existsSync(assetsDir)) {
  warn(`Skipping — assets dir not found at ${path.relative(root, assetsDir)}`);
  process.exit(0);
}

fs.mkdirSync(outDir, { recursive: true });

const entries = fs.readdirSync(assetsDir, { withFileTypes: true });
let copied = 0;
for (const entry of entries) {
  if (!entry.isFile()) continue;
  if (!/\.(svg|png)$/i.test(entry.name)) continue;

  const src = path.join(assetsDir, entry.name);
  const dest = path.join(outDir, entry.name.toLowerCase());
  fs.copyFileSync(src, dest);
  copied++;
}

log(`Copied ${copied} logos → ${path.relative(root, outDir)}`);
