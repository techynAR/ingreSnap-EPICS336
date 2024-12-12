export function cleanIngredientText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Remove parenthetical content
    .replace(/\([^)]*\)/g, '')
    // Remove common conjunctions
    .replace(/\b(and\/or|and|or)\b/g, '')
    // Remove percentage values
    .replace(/\d+(\.\d+)?%/g, '')
    // Remove special characters
    .replace(/[*†‡]/g, '')
    // Clean up extra spaces and punctuation
    .replace(/\s+/g, ' ')
    .trim();
}