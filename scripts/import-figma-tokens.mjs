#!/usr/bin/env node

/**
 * Figma Design Token Importer
 *
 * Fetches design variables (tokens) from a Figma file using the Variables REST API,
 * then writes them as:
 *   - src/tokens.json          (raw JSON for programmatic use)
 *   - src/app/figma-tokens.css (CSS custom properties ready for Tailwind v4)
 *
 * Usage:
 *   node scripts/import-figma-tokens.mjs <FIGMA_FILE_KEY>
 *
 * The script reads FIGMA_PERSONAL_TOKEN from a .env file in the project root.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// 1. Load environment
// ---------------------------------------------------------------------------

function loadEnv() {
  try {
    const envPath = resolve(ROOT, ".env");
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env is optional if the var is already set
  }
}

loadEnv();

const FIGMA_TOKEN = process.env.FIGMA_PERSONAL_TOKEN;
if (!FIGMA_TOKEN) {
  console.error(
    "Error: FIGMA_PERSONAL_TOKEN is not set. Add it to .env or export it."
  );
  process.exit(1);
}

const FILE_KEY = process.argv[2];
if (!FILE_KEY) {
  console.error(
    "Usage: node scripts/import-figma-tokens.mjs <FIGMA_FILE_KEY>\n" +
      "       The file key is the part after /design/ in your Figma URL."
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Figma API helpers
// ---------------------------------------------------------------------------

async function figmaFetch(path) {
  const url = `https://api.figma.com/v1${path}`;
  const res = await fetch(url, {
    headers: { "X-Figma-Token": FIGMA_TOKEN },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Figma API ${res.status}: ${body}`);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// 3. Fetch variables & collections
// ---------------------------------------------------------------------------

async function fetchVariables() {
  console.log(`Fetching variables from file ${FILE_KEY}…`);
  const data = await figmaFetch(`/files/${FILE_KEY}/variables/local`);
  return data.meta;
}

// ---------------------------------------------------------------------------
// 4. Resolve variable values
// ---------------------------------------------------------------------------

/** Convert a Figma RGBA color object {r,g,b,a} (0-1 range) to a CSS value. */
function figmaColorToCSS({ r, g, b, a }) {
  const to255 = (v) => Math.round(v * 255);
  if (a !== undefined && a < 1) {
    return `rgba(${to255(r)}, ${to255(g)}, ${to255(b)}, ${parseFloat(a.toFixed(3))})`;
  }
  const hex = [r, g, b]
    .map((v) => to255(v).toString(16).padStart(2, "0"))
    .join("");
  return `#${hex}`;
}

/**
 * Resolve the concrete value of a variable for a given mode.
 * Handles aliases (variable references) by recursively resolving.
 */
function resolveValue(variable, modeId, variablesById) {
  const modeValue = variable.valuesByMode[modeId];
  if (!modeValue) return undefined;

  // Alias – resolve recursively
  if (modeValue.type === "VARIABLE_ALIAS") {
    const target = variablesById[modeValue.id];
    if (!target) return undefined;
    const targetModeId = Object.keys(target.valuesByMode)[0];
    return resolveValue(target, targetModeId, variablesById);
  }

  return modeValue;
}

/** Convert a resolved Figma value to a CSS string. */
function toCSSValue(resolvedType, value) {
  if (value === undefined || value === null) return undefined;
  switch (resolvedType) {
    case "COLOR":
      return figmaColorToCSS(value);
    case "FLOAT":
      return `${value}px`;
    case "STRING":
      return String(value);
    case "BOOLEAN":
      return value ? "1" : "0";
    default:
      return String(value);
  }
}

/** Slugify a Figma variable name (e.g. "Primary/Blue 500") to a CSS token. */
function slugify(name) {
  return name
    .replace(/\//g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
}

// ---------------------------------------------------------------------------
// 5. Build token map
// ---------------------------------------------------------------------------

function buildTokens(meta) {
  const { variableCollections, variables } = meta;

  // Index variables by id
  const variablesById = {};
  for (const v of Object.values(variables)) {
    variablesById[v.id] = v;
  }

  const collections = [];

  for (const collection of Object.values(variableCollections)) {
    const modes = collection.modes; // [{ modeId, name }]

    const collectionTokens = {
      name: collection.name,
      modes: [],
    };

    for (const mode of modes) {
      const modeTokens = { name: mode.name, tokens: [] };

      // Gather variables that belong to this collection
      for (const varId of collection.variableIds) {
        const variable = variablesById[varId];
        if (!variable) continue;

        const resolved = resolveValue(variable, mode.modeId, variablesById);
        const cssValue = toCSSValue(variable.resolvedType, resolved);
        if (cssValue === undefined) continue;

        modeTokens.tokens.push({
          name: variable.name,
          cssName: `--${slugify(variable.name)}`,
          type: variable.resolvedType,
          value: cssValue,
          rawValue: resolved,
          description: variable.description || undefined,
        });
      }

      collectionTokens.modes.push(modeTokens);
    }

    collections.push(collectionTokens);
  }

  return collections;
}

// ---------------------------------------------------------------------------
// 6. Generate CSS
// ---------------------------------------------------------------------------

function generateCSS(collections) {
  const lines = [
    "/* Auto-generated by scripts/import-figma-tokens.mjs – do not edit */",
    "",
  ];

  for (const collection of collections) {
    lines.push(`/* ── ${collection.name} ── */`);

    if (collection.modes.length === 1) {
      // Single mode → write to :root
      const mode = collection.modes[0];
      lines.push(":root {");
      for (const token of mode.tokens) {
        const comment = token.description ? ` /* ${token.description} */` : "";
        lines.push(`  ${token.cssName}: ${token.value};${comment}`);
      }
      lines.push("}", "");
    } else {
      // Multiple modes – first mode is default (:root), others use data attributes
      for (let i = 0; i < collection.modes.length; i++) {
        const mode = collection.modes[i];
        const selector =
          i === 0 ? ":root" : `[data-theme="${slugify(mode.name)}"]`;
        lines.push(`${selector} {`);
        for (const token of mode.tokens) {
          const comment = token.description
            ? ` /* ${token.description} */`
            : "";
          lines.push(`  ${token.cssName}: ${token.value};${comment}`);
        }
        lines.push("}", "");
      }
    }
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// 7. Generate Tailwind v4 @theme block
// ---------------------------------------------------------------------------

function generateTailwindTheme(collections) {
  const lines = [
    "/* Auto-generated Tailwind v4 theme extension – do not edit */",
    "",
    "@theme {",
  ];

  for (const collection of collections) {
    lines.push(`  /* ${collection.name} */`);
    const mode = collection.modes[0]; // default mode
    for (const token of mode.tokens) {
      if (token.type === "COLOR") {
        lines.push(`  --color-${slugify(token.name)}: ${token.value};`);
      }
    }
  }

  lines.push("}", "");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// 8. Main
// ---------------------------------------------------------------------------

async function main() {
  const meta = await fetchVariables();
  const collections = buildTokens(meta);

  // Write raw JSON
  const jsonPath = resolve(ROOT, "src", "tokens.json");
  mkdirSync(dirname(jsonPath), { recursive: true });
  writeFileSync(jsonPath, JSON.stringify(collections, null, 2) + "\n");
  console.log(`✓ Written ${jsonPath}`);

  // Write CSS custom properties
  const cssPath = resolve(ROOT, "src", "app", "figma-tokens.css");
  writeFileSync(cssPath, generateCSS(collections));
  console.log(`✓ Written ${cssPath}`);

  // Write Tailwind @theme extension
  const themePath = resolve(ROOT, "src", "app", "figma-theme.css");
  writeFileSync(themePath, generateTailwindTheme(collections));
  console.log(`✓ Written ${themePath}`);

  // Summary
  const totalTokens = collections.reduce(
    (sum, c) => sum + c.modes.reduce((s, m) => s + m.tokens.length, 0),
    0
  );
  console.log(
    `\nImported ${totalTokens} tokens across ${collections.length} collection(s).`
  );
  console.log(
    'Add `@import "./figma-tokens.css";` and `@import "./figma-theme.css";` to globals.css to use them.'
  );
}

main().catch((err) => {
  console.error("Failed to import Figma tokens:", err.message);
  process.exit(1);
});
