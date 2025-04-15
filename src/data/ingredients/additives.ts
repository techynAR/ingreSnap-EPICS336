import { IngredientData } from '@/types/ingredients';

export const additives: Record<string, IngredientData> = {
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
  'citric acid': {
    description: 'Natural acid used as a preservative and flavoring.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'ascorbic acid': {
    description: 'Vitamin C, used as an antioxidant and preservative.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'natural flavors': {
    description: 'Flavoring derived from natural sources.',
    category: 'food',
    warnings: ['May contain allergens'],
    safetyLevel: 'caution'
  },
  'artificial flavors': {
    description: 'Synthetic flavoring compounds.',
    category: 'chemical',
    warnings: ['Artificial ingredients'],
    safetyLevel: 'caution'
  },
  'yellow 5': {
    description: 'Artificial yellow food coloring.',
    category: 'chemical',
    warnings: ['May cause allergic reactions', 'Artificial color'],
    safetyLevel: 'caution'
  },
  'blue 1': {
    description: 'Artificial blue food coloring.',
    category: 'chemical',
    warnings: ['May cause allergic reactions', 'Artificial color'],
    safetyLevel: 'caution'
  },
  'calcium carbonate': {
    description: 'Mineral supplement and stabilizer.',
    category: 'chemical',
    warnings: [],
    safetyLevel: 'safe'
  },
  'xanthan gum': {
    description: 'Natural thickener and stabilizer.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'carrageenan': {
    description: 'Natural thickener derived from seaweed.',
    category: 'food',
    warnings: ['May cause digestive issues in sensitive individuals'],
    safetyLevel: 'caution'
  },
  'mono and diglycerides': {
    description: 'Emulsifiers used to blend ingredients.',
    category: 'chemical',
    warnings: ['May contain trans fats'],
    safetyLevel: 'caution'
  }
};
