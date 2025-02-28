import { cleanIngredientText } from './textCleaning';

export function parseIngredients(text: string): string[] {
  try {
    if (!text || text.trim().length === 0) {
      return [];
    }

    // Common non-ingredient phrases to filter out
    const nonIngredientPhrases = [
      'ingredients', 'contains', 'allergen', 'manufactured', 'facility', 
      'processed', 'warning', 'nutrition', 'facts', 'information'
    ];

    // Split ingredients considering various delimiters
    const ingredients = text
      .split(/[,;.]/)
      .map(ingredient => cleanIngredientText(ingredient))
      .filter(ingredient => {
        // Remove empty strings and common non-ingredient text
        if (ingredient.length === 0) return false;
        
        // Check if this is just a label or heading
        if (nonIngredientPhrases.some(phrase => 
          ingredient === phrase || 
          ingredient.startsWith(phrase + ':') || 
          ingredient.startsWith(phrase + ' ')
        )) {
          return false;
        }
        
        // Filter out items that are likely not ingredients
        if (ingredient.length < 2) return false;
        if (/^\d+$/.test(ingredient)) return false; // Just numbers
        
        return true;
      });

    // Remove duplicates
    return [...new Set(ingredients)];
  } catch (error) {
    console.error('Error parsing ingredients:', error);
    return [];
  }
}