import { TextSection } from '@/types/ingredients';
import { parseIngredients } from './ingredientParser';

export function extractTextSections(text: string): TextSection {
  try {
    const normalized = text.toLowerCase();
    
    const sections: TextSection = {
      ingredients: [],
      allergens: [],
      nutritionalInfo: [],
      otherText: []
    };

    // Find the ingredients section starting point
    const ingredientsStart = normalized.indexOf('ingredients');
    if (ingredientsStart === -1) {
      // If no "ingredients" found, try alternate spellings/formats
      const alternateStarts = [
        normalized.indexOf('ingred'),
        normalized.indexOf('contains:'),
        normalized.indexOf('contains ')
      ].filter(index => index !== -1);

      if (alternateStarts.length > 0) {
        const startIndex = Math.min(...alternateStarts);
        const textToProcess = normalized.slice(startIndex);
        return processTextSections(textToProcess, sections);
      }

      // If no starting point found, return empty sections
      return sections;
    }

    // Process only the text after "ingredients"
    const textToProcess = normalized.slice(ingredientsStart);
    return processTextSections(textToProcess, sections);

  } catch (error) {
    console.error('Error extracting text sections:', error);
    return {
      ingredients: [],
      allergens: [],
      nutritionalInfo: [],
      otherText: []
    };
  }
}

function processTextSections(text: string, sections: TextSection): TextSection {
  // Extract ingredients section with improved pattern matching
  const ingredientsPatterns = [
    /ingredients:?(.*?)(?=(allergen|contains|nutrition|may contain|$))/is,
    /ingred(?:ient)?s:?(.*?)(?=(allergen|contains|nutrition|may contain|$))/is,
    /^(?!allergen|contains|nutrition)(.*?)(?=(allergen|contains|nutrition|may contain|$))/is
  ];

  for (const pattern of ingredientsPatterns) {
    const match = text.match(pattern);
    if (match?.[1] && match[1].trim().length > 0) {
      const parsedIngredients = parseIngredients(match[1]);
      if (parsedIngredients.length > 0) {
        sections.ingredients = parsedIngredients;
        break;
      }
    }
  }

  // Extract allergens with improved pattern matching
  const allergenPatterns = [
    /allergen(?:s)?:?(.*?)(?=(ingredients|nutrition|$))/is,
    /contains:?(.*?)(?=(ingredients|nutrition|$))/is,
    /may contain:?(.*?)(?=(ingredients|nutrition|$))/is,
    /manufactured in a facility that(?:.*?)(contains|processes)(.*?)(?=(\.|$))/is,
    /warning:?(.*?)(allergen|contain)(?:s)?:?(.*?)(?=(\.|$))/is
  ];

  for (const pattern of allergenPatterns) {
    const match = text.match(pattern);
    if (match) {
      const allergenText = match[1] || match[2] || match[3] || '';
      if (allergenText.trim().length > 0) {
        const allergens = allergenText
          .split(/[,.]/)
          .map(a => a.trim())
          .filter(a => a.length > 0)
          .map(a => a.replace(/^(contains|processes|and|or)\s+/, ''));
        
        sections.allergens.push(...allergens);
      }
    }
  }

  // Remove duplicates from allergens
  sections.allergens = [...new Set(sections.allergens)];

  // Extract nutrition information
  const nutritionPatterns = [
    /nutrition(?:al)? (?:facts|information):?(.*?)(?=(ingredients|allergen|contains|$))/is,
    /nutrition(?:al)?:?(.*?)(?=(ingredients|allergen|contains|$))/is,
    /(?:serving size|calories|protein|carbohydrate|fat):?(.*?)(?=(ingredients|allergen|contains|$))/is
  ];

  for (const pattern of nutritionPatterns) {
    const match = text.match(pattern);
    if (match?.[1] && match[1].trim().length > 0) {
      const nutritionLines = match[1]
        .split(/[\n\r]/)
        .map(n => n.trim())
        .filter(n => n.length > 0 && /\d/.test(n));
      
      if (nutritionLines.length > 0) {
        sections.nutritionalInfo = nutritionLines;
        break;
      }
    }
  }

  return sections;
}
