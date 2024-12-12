import { IngredientData } from '@/types/ingredients';

export const sweeteners: Record<string, IngredientData> = {
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
  }
};