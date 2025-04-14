import { TextSection } from '@/types/ingredients';
import { parseIngredients } from './ingredientParser';

export function extractTextSections(text: string): TextSection {
  try {
    const sections: TextSection = {
      ingredients: [],
      allergens: [],
      nutritionalInfo: [],
      otherText: []
    };

    // Find exact "INGREDIENTS:" text (case insensitive)
    const ingredientsMatch = text.match(/ingredients:\s*(.*?)(?=(?:nutrition|allergen|contains|\n\n|$))/is);
    
    if (!ingredientsMatch) {
      return sections;
    }

    // Get only the ingredients text
    const ingredientsText = ingredientsMatch[1].trim();
    
    if (ingredientsText) {
      // Split by commas, clean up each ingredient
      sections.ingredients = ingredientsText
        .split(/,(?![^(]*\))/) // Split by commas not inside parentheses
        .map(ingredient => ingredient.trim())
        .filter(ingredient => ingredient.length > 0);
    }

    // Extract allergens only if they're explicitly marked
    const allergenMatch = text.match(/allergens?:?\s*(.*?)(?=(?:nutrition|ingredients|\n\n|$))/is);
    if (allergenMatch?.[1]) {
      sections.allergens = allergenMatch[1]
        .split(/[,.]/)
        .map(a => a.trim())
        .filter(a => a.length > 0);
    }

    // Extract nutrition info only if it's explicitly marked
    const nutritionMatch = text.match(/nutrition(?:al)?\s*(?:information|facts):?\s*(.*?)(?=(?:ingredients|allergen|\n\n|$))/is);
    if (nutritionMatch?.[1]) {
      sections.nutritionalInfo = nutritionMatch[1]
        .split(/[\n\r]/)
        .map(n => n.trim())
        .filter(n => n.length > 0 && /\d/.test(n));
    }

    return sections;
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
