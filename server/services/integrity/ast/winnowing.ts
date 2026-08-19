import { createHash } from "crypto";
import { AstNode } from "./parser";
import { stringifyAstStructure, normalizeAst } from "./normalizer";

export interface Fingerprint {
  hash: string;
  position: number;
}

/**
 * MD5/SHA256 helper to generate a deterministic integer hash
 */
export function hashStringToNumber(str: string): number {
  const hex = createHash("md5").update(str).digest("hex").slice(0, 8);
  return parseInt(hex, 16);
}

/**
 * Generate structural k-grams of the AST string representation
 */
export function getKgrams(input: string, k = 15): string[] {
  const cleanInput = input.replace(/\s+/g, ""); // strip formatting spaces
  const kgrams: string[] = [];
  if (cleanInput.length < k) {
    if (cleanInput.length > 0) kgrams.push(cleanInput);
    return kgrams;
  }
  for (let i = 0; i <= cleanInput.length - k; i++) {
    kgrams.push(cleanInput.substring(i, i + k));
  }
  return kgrams;
}

/**
 * Winnowing algorithm selection logic
 * w = window size
 */
export function winnow(hashes: number[], w = 4): Fingerprint[] {
  const fingerprints: Fingerprint[] = [];
  if (hashes.length === 0) return fingerprints;

  // Window size fallback if hashes count is small
  const windowSize = Math.min(w, hashes.length);
  let minIndex = -1;

  for (let i = 0; i <= hashes.length - windowSize; i++) {
    let minHash = Infinity;
    let localMinIdx = -1;

    for (let j = 0; j < windowSize; j++) {
      const idx = i + j;
      const h = hashes[idx];
      if (h <= minHash) {
        minHash = h;
        localMinIdx = idx;
      }
    }

    if (localMinIdx !== minIndex) {
      fingerprints.push({
        hash: minHash.toString(16),
        position: localMinIdx,
      });
      minIndex = localMinIdx;
    }
  }

  return fingerprints;
}

/**
 * Generates winnowed fingerprints directly from an raw AST node array
 */
export function getAstFingerprints(nodes: AstNode[], k = 15, w = 4): Fingerprint[] {
  const normalized = normalizeAst(nodes);
  const astString = stringifyAstStructure(normalized);
  const kgrams = getKgrams(astString, k);
  const hashes = kgrams.map((kg) => hashStringToNumber(kg));
  return winnow(hashes, w);
}
