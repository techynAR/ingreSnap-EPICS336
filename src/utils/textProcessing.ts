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

    // Extract ingredients section with improved pattern matching
    const ingredientsPatterns = [
      /ingredients:?(.*?)(?=(allergen|contains|nutrition|may contain|$))/is,
      /ingred(?:ient)?s:?(.*?)(?=(allergen|contains|nutrition|may contain|$))/is,
      /^(?!allergen|contains|nutrition)(.*?)(?=(allergen|contains|nutrition|may contain|$))/is
    ];

    for (const pattern of ingredientsPatterns) {
      const match = normalized.match(pattern);
      if (match?.[1] && match[1].trim().length > 0) {
        const parsedIngredients = parseIngredients(match[1]);
        if (parsedIngredients.length > 0) {
          sections.ingredients = parsedIngredients;
          break;
        }
      }
    }

    // If no ingredients found yet, try a fallback approach
    if (sections.ingredients.length === 0) {
      // Fallback: treat the entire text as ingredients if no specific section found
      sections.ingredients = parseIngredients(normalized);
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
      const match = normalized.match(pattern);
      if (match) {
        // Extract the relevant capture group (may be in different positions)
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

    // Extract nutrition information with improved pattern matching
    const nutritionPatterns = [
      /nutrition(?:al)? (?:facts|information):?(.*?)(?=(ingredients|allergen|contains|$))/is,
      /nutrition(?:al)?:?(.*?)(?=(ingredients|allergen|contains|$))/is,
      /(?:serving size|calories|protein|carbohydrate|fat):?(.*?)(?=(ingredients|allergen|contains|$))/is
    ];

    for (const pattern of nutritionPatterns) {
      const match = normalized.match(pattern);
      if (match?.[1] && match[1].trim().length > 0) {
        const nutritionLines = match[1]
          .split(/[\n\r]/)
          .map(n => n.trim())
          .filter(n => n.length > 0 && /\d/.test(n)); // Must contain at least one digit
        
        if (nutritionLines.length > 0) {
          sections.nutritionalInfo = nutritionLines;
          break;
        }
      }
    }

    // Store any remaining text that wasn't categorized
    const categorizedText = [
      ...sections.ingredients.join(' '),
      ...sections.allergens.join(' '),
      ...sections.nutritionalInfo.join(' ')
    ].join(' ').toLowerCase();

    const remainingText = normalized
      .split(/[\n\r]/)
      .map(line => line.trim())
      .filter(line => {
        if (line.length === 0) return false;
        // Check if this line is already included in any other section
        return !categorizedText.includes(line.toLowerCase());
      });

    sections.otherText = remainingText;

    return sections;
  } catch (error) {
    console.error('Error extracting text sections:', error);
    // Return empty sections on error
    return {
      ingredients: [],
      allergens: [],
      nutritionalInfo: [],
      otherText: []
    };
  }
}