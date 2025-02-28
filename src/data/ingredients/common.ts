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
  },
  'enriched flour': {
    description: 'Ground wheat flour enriched with nutrients.',
    category: 'food',
    warnings: ['Contains gluten - not suitable for celiac disease'],
    safetyLevel: 'safe'
  },
  'corn syrup': {
    description: 'Sweet syrup made from cornstarch.',
    category: 'food',
    warnings: ['High sugar content - may contribute to obesity and diabetes'],
    safetyLevel: 'caution'
  },
  'corn syrup solids': {
    description: 'Dehydrated corn syrup used as a sweetener.',
    category: 'food',
    warnings: ['High sugar content - may contribute to obesity and diabetes'],
    safetyLevel: 'caution'
  },
  'dextrose': {
    description: 'A simple sugar derived from starch.',
    category: 'food',
    warnings: ['May contribute to high blood sugar levels if consumed in excess'],
    safetyLevel: 'caution'
  },
  'fructose': {
    description: 'A natural sugar found in fruits and honey.',
    category: 'food',
    warnings: ['May contribute to metabolic disorders if consumed in excess'],
    safetyLevel: 'caution'
  },
  'glycerin': {
    description: 'A sugar alcohol used as a sweetener and moisture retainer.',
    category: 'food',
    warnings: ['May cause digestive discomfort if consumed in large amounts'],
    safetyLevel: 'caution'
  },
  'soy lecithin': {
    description: 'Natural emulsifier found in soybeans.',
    category: 'food',
    warnings: ['May contain soy allergens'],
    safetyLevel: 'safe'
  },
  'dried potatoes': {
    description: 'Dehydrated potatoes used as a thickener or base ingredient.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'corn starch': {
    description: 'A starch derived from corn, used as a thickener.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'corn oil': {
    description: 'Oil extracted from corn kernels, used in cooking.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'sea salt': {
    description: 'Unrefined salt obtained from seawater.',
    category: 'food',
    warnings: ['May contribute to high blood pressure if consumed in excess'],
    safetyLevel: 'safe'
  },
  'annatto extracts': {
    description: 'Natural food coloring derived from the annatto seed.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  }
};
