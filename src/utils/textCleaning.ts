export function cleanIngredientText(text: string): string {
  try {
    if (!text) return '';
    
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
      // Remove common OCR errors
      .replace(/[|\\\/]/g, '')
      // Clean up extra spaces and punctuation
      .replace(/\s+/g, ' ')
      .replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '') // Remove non-alphanumeric chars at start/end
      .trim();
  } catch (error) {
    console.error('Error cleaning ingredient text:', error);
    return text ? text.trim() : '';
  }
}

// Additional utility for preprocessing OCR text
export function preprocessOcrText(text: string): string {
  try {
    if (!text) return '';
    
    return text
      // Fix common OCR errors
      .replace(/l\s*n\s*g\s*r\s*e\s*d\s*i\s*e\s*n\s*t\s*s/gi, 'Ingredients')
      .replace(/c\s*o\s*n\s*t\s*a\s*i\s*n\s*s/gi, 'Contains')
      .replace(/a\s*l\s*l\s*e\s*r\s*g\s*e\s*n/gi, 'Allergen')
      .replace(/n\s*u\s*t\s*r\s*i\s*t\s*i\s*o\s*n/gi, 'Nutrition')
      // Fix spacing issues
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
      // Normalize line breaks
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n') // Reduce multiple line breaks
      .trim();
  } catch (error) {
    console.error('Error preprocessing OCR text:', error);
    return text ? text.trim() : '';
  }
}