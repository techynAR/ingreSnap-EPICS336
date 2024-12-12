import { levenshteinDistance } from './stringDistance';

export function findClosestMatch(input: string, database: Record<string, any>): string | null {
  const normalizedInput = input.toLowerCase().trim();
  
  // Direct match
  if (normalizedInput in database) {
    return normalizedInput;
  }

  // Find best match using Levenshtein distance
  let bestMatch: string | null = null;
  let bestDistance = Infinity;
  const threshold = 3; // Maximum allowed distance

  for (const key of Object.keys(database)) {
    // Check if the input contains the key or vice versa
    if (normalizedInput.includes(key) || key.includes(normalizedInput)) {
      return key;
    }

    const distance = levenshteinDistance(normalizedInput, key);
    if (distance < bestDistance && distance <= threshold) {
      bestDistance = distance;
      bestMatch = key;
    }
  }

  return bestMatch;
}