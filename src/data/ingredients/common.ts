import { IngredientData } from '@/types/ingredients';

export const commonIngredients: Record<string, IngredientData> = {
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
  }
};