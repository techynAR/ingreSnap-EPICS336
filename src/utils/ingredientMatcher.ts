import { levenshteinDistance } from './stringDistance';

export function findClosestMatch(input: string, database: Record<string, any>): string | null {
  try {
    if (!input || input.trim().length === 0) {
      return null;
    }

    const normalizedInput = input.toLowerCase().trim();
    
    // Direct match
    if (normalizedInput in database) {
      return normalizedInput;
    }

    // Check for partial matches first (more reliable than distance)
    for (const key of Object.keys(database)) {
      // Check if the input contains the key or vice versa
      if (normalizedInput.includes(key) || key.includes(normalizedInput)) {
        return key;
      }
    }

    // Find best match using Levenshtein distance as fallback
    let bestMatch: string | null = null;
    let bestDistance = Infinity;
    const threshold = Math.min(3, Math.floor(normalizedInput.length * 0.3)); // Dynamic threshold based on input length

    for (const key of Object.keys(database)) {
      // Skip very different length strings
      if (Math.abs(key.length - normalizedInput.length) > threshold * 2) {
        continue;
      }

      const distance = levenshteinDistance(normalizedInput, key);
      if (distance < bestDistance && distance <= threshold) {
        bestDistance = distance;
        bestMatch = key;
      }
    }

    return bestMatch;
  } catch (error) {
    console.error('Error finding closest match:', error);
    return null;
  }
}