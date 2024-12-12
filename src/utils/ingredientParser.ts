import { cleanIngredientText } from './textCleaning';

export function parseIngredients(text: string): string[] {
  // Split ingredients considering various delimiters
  const ingredients = text
    .split(/[,;.]/)
    .map(ingredient => cleanIngredientText(ingredient))
    .filter(ingredient => {
      // Remove empty strings and common non-ingredient text
      return (
        ingredient.length > 0 &&
        !ingredient.includes('contains') &&
        !ingredient.includes('allergen') &&
        !ingredient.includes('manufactured') &&
        !ingredient.includes('facility') &&
        !ingredient.includes('processed')
      );
    });

  return ingredients;
}