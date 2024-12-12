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
  }
};