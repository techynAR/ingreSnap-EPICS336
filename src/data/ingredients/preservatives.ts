import { IngredientData } from '@/types/ingredients';

export const preservatives: Record<string, IngredientData> = {
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
  }
};