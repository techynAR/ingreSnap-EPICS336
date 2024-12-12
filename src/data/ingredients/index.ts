import { commonIngredients } from './common';
import { preservatives } from './preservatives';
import { additives } from './additives';
import { sweeteners } from './sweeteners';
import { IngredientData } from '@/types/ingredients';

export const ingredientsDatabase: Record<string, IngredientData> = {
  ...commonIngredients,
  ...preservatives,
  ...additives,
  ...sweeteners,
};