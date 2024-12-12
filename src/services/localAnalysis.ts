import { AnalysisResult } from '@/types/analysis';

// Expanded ingredients database
const ingredientsDatabase: Record<string, Partial<AnalysisResult>> = {
  // Common Food Ingredients
  'water': {
    description: 'The most common ingredient in food and cosmetics, used as a solvent and base.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'salt': {
    description: 'Common mineral used for flavoring and preservation.',
    category: 'food',
    warnings: ['May contribute to high blood pressure if consumed in excess'],
    safetyLevel: 'safe'
  },
  'sugar': {
    description: 'Natural sweetener derived from plants.',
    category: 'food',
    warnings: ['May contribute to dental issues and diabetes if consumed in excess'],
    safetyLevel: 'caution'
  },
  'flour': {
    description: 'Ground wheat or other grains used as a base in baked goods.',
    category: 'food',
    warnings: ['Contains gluten - not suitable for celiac disease'],
    safetyLevel: 'safe'
  },

  // Preservatives
  'sodium benzoate': {
    description: 'Common preservative used to prevent bacterial growth.',
    category: 'chemical',
    warnings: ['May cause allergic reactions in sensitive individuals'],
    safetyLevel: 'caution'
  },
  'potassium sorbate': {
    description: 'Preservative used to inhibit mold growth.',
    category: 'chemical',
    warnings: ['May cause skin irritation in sensitive individuals'],
    safetyLevel: 'caution'
  },

  // Colorants
  'beta carotene': {
    description: 'Natural orange-red pigment found in carrots and other vegetables.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'red 40': {
    description: 'Artificial red food coloring.',
    category: 'chemical',
    warnings: ['May cause hyperactivity in some children', 'Artificial color'],
    safetyLevel: 'caution'
  },

  // Emulsifiers
  'lecithin': {
    description: 'Natural emulsifier found in egg yolks and soybeans.',
    category: 'food',
    warnings: ['May contain soy allergens'],
    safetyLevel: 'safe'
  },
  'polysorbate 80': {
    description: 'Synthetic emulsifier used to blend oil and water.',
    category: 'chemical',
    warnings: ['May cause digestive issues in sensitive individuals'],
    safetyLevel: 'caution'
  },

  // Sweeteners
  'aspartame': {
    description: 'Artificial sweetener commonly used in diet products.',
    category: 'chemical',
    warnings: ['Contains phenylalanine', 'Controversial health effects'],
    safetyLevel: 'warning'
  },
  'stevia': {
    description: 'Natural sweetener derived from the stevia plant.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },

  // Vitamins and Minerals
  'vitamin c': {
    description: 'Essential vitamin with antioxidant properties.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'zinc oxide': {
    description: 'Mineral used in sunscreens and fortified foods.',
    category: 'chemical',
    warnings: ['May cause skin irritation in some people'],
    safetyLevel: 'safe'
  }
};

function findClosestMatch(input: string): string | null {
  const normalizedInput = input.toLowerCase().trim();
  
  // Direct match
  if (normalizedInput in ingredientsDatabase) {
    return normalizedInput;
  }

  // Simple partial match
  for (const key of Object.keys(ingredientsDatabase)) {
    if (normalizedInput.includes(key) || key.includes(normalizedInput)) {
      return key;
    }
  }

  return null;
}

export async function analyzeIngredient(ingredient: string): Promise<AnalysisResult> {
  const matchedIngredient = findClosestMatch(ingredient);
  
  if (matchedIngredient) {
    const match = ingredientsDatabase[matchedIngredient];
    return {
      name: ingredient,
      description: match.description || 'No description available',
      category: match.category || 'unknown',
      warnings: match.warnings || [],
      safetyLevel: match.safetyLevel || 'unknown'
    };
  }

  // Default response for unknown ingredients
  return {
    name: ingredient,
    description: 'This ingredient is not in our database. Consider consulting with a professional for more information.',
    category: 'unknown',
    warnings: ['Unknown ingredient - exercise caution'],
    safetyLevel: 'caution'
  };
}

export async function analyzeIngredients(ingredients: string[]): Promise<AnalysisResult[]> {
  return Promise.all(ingredients.map(ingredient => analyzeIngredient(ingredient)));
}