import { TextSection } from '@/types/ingredients';
import { parseIngredients } from './ingredientParser';

export function extractTextSections(text: string): TextSection {
  const normalized = text.toLowerCase();
  
  const sections: TextSection = {
    ingredients: [],
    allergens: [],
    nutritionalInfo: [],
    otherText: []
  };

  // Extract ingredients section
  const ingredientsMatch = normalized.match(/ingredients:?(.*?)(?=(allergen|contains|nutrition|may contain|$))/s);
  if (ingredientsMatch?.[1]) {
    sections.ingredients = parseIngredients(ingredientsMatch[1]);
  }

  // Extract allergens with improved pattern matching
  const allergenPatterns = [
    /allergen(?:s)?:?(.*?)(?=(ingredients|nutrition|$))/s,
    /contains:?(.*?)(?=(ingredients|nutrition|$))/s,
    /may contain:?(.*?)(?=(ingredients|nutrition|$))/s,
    /manufactured in a facility that(?:.*?)(contains|processes)(.*?)(?=(\.|$))/s
  ];

  for (const pattern of allergenPatterns) {
    const match = normalized.match(pattern);
    if (match?.[1]) {
      const allergens = match[1]
        .split(/[,.]/)
        .map(a => a.trim())
        .filter(a => a.length > 0)
        .map(a => a.replace(/^(contains|processes|and|or)\s+/, ''));
      
      sections.allergens.push(...allergens);
    }
  }

  // Remove duplicates from allergens
  sections.allergens = [...new Set(sections.allergens)];

  // Extract nutrition information
  const nutritionMatch = normalized.match(/nutrition(?:al)? (?:facts|information):?(.*?)(?=(ingredients|allergen|contains|$))/s);
  if (nutritionMatch?.[1]) {
    sections.nutritionalInfo = nutritionMatch[1]
      .split(/\n/)
      .map(n => n.trim())
      .filter(n => n.length > 0);
  }

  return sections;
}