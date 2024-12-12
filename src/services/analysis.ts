import { AnalysisResult, IngredientData, ProcessedResult, TextSection } from '@/types/ingredients';
import { ingredientsDatabase } from '@/data/ingredients';
import { findClosestMatch } from '@/utils/ingredientMatcher';
import { extractTextSections } from '@/utils/textProcessing';

export async function analyzeIngredient(ingredient: string): Promise<AnalysisResult> {
  const matchedIngredient = findClosestMatch(ingredient, ingredientsDatabase);
  
  if (matchedIngredient) {
    const match = ingredientsDatabase[matchedIngredient];
    return {
      name: ingredient,
      ...match
    };
  }

  return {
    name: ingredient,
    description: 'This ingredient is not in our database. Consider consulting with a professional for more information.',
    category: 'unknown',
    warnings: ['Unknown ingredient - exercise caution'],
    safetyLevel: 'caution'
  };
}

export async function processText(text: string): Promise<ProcessedResult> {
  // Extract different sections from the text
  const sections = extractTextSections(text);
  
  // Analyze ingredients
  const analyzedIngredients = await Promise.all(
    sections.ingredients.map(analyzeIngredient)
  );

  return {
    ingredients: analyzedIngredients,
    allergens: sections.allergens,
    nutritionalInfo: sections.nutritionalInfo
  };
}