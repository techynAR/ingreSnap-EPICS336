import { AnalysisResult, IngredientData, ProcessedResult, TextSection } from '@/types/ingredients';
import { ingredientsDatabase } from '@/data/ingredients';
import { findClosestMatch } from '@/utils/ingredientMatcher';
import { extractTextSections } from '@/utils/textProcessing';
import { GeminiService } from './geminiService';

export async function analyzeIngredient(ingredient: string): Promise<AnalysisResult> {
  try {
    if (!ingredient || ingredient.trim().length === 0) {
      throw new Error('Empty ingredient provided');
    }

    const cleanedIngredient = ingredient.trim().toLowerCase();
    
    // Skip common non-ingredients
    const nonIngredientTerms = ['ingredients', 'contains', 'allergens', 'warning', 'nutrition'];
    if (nonIngredientTerms.some(term => cleanedIngredient === term)) {
      return {
        name: ingredient,
        description: 'This is a label, not an ingredient.',
        category: 'unknown',
        warnings: [],
        safetyLevel: 'unknown'
      };
    }

    // Try local database first
    const matchedIngredient = findClosestMatch(cleanedIngredient, ingredientsDatabase);
    
    if (matchedIngredient) {
      const match = ingredientsDatabase[matchedIngredient];
      return {
        name: ingredient,
        ...match
      };
    }

    // If not found in local database, use Gemini API
    try {
      const geminiService = GeminiService.getInstance();
      const analysis = await geminiService.analyzeIngredient(ingredient);
      return {
        name: ingredient,
        ...analysis
      };
    } catch (error) {
      console.error('Gemini analysis failed:', error);
      
      // Fallback to basic analysis
      const commonAllergens = ['peanut', 'tree nut', 'milk', 'egg', 'wheat', 'soy', 'fish', 'shellfish'];
      for (const allergen of commonAllergens) {
        if (cleanedIngredient.includes(allergen)) {
          return {
            name: ingredient,
            description: `This ingredient may contain ${allergen}, which is a common allergen.`,
            category: 'food',
            warnings: [`May contain ${allergen} allergen`],
            safetyLevel: 'caution'
          };
        }
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
  } catch (error) {
    console.error(`Error analyzing ingredient "${ingredient}":`, error);
    return {
      name: ingredient,
      description: 'Error analyzing this ingredient.',
      category: 'error',
      warnings: ['Analysis error occurred'],
      safetyLevel: 'unknown'
    };
  }
}

export async function processText(text: string): Promise<ProcessedResult> {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error('Empty text provided for processing');
    }

    // Clean up OCR text using Gemini
    let cleanedText = text;
    try {
      const geminiService = GeminiService.getInstance();
      cleanedText = await geminiService.cleanupOCRText(text);
    } catch (error) {
      console.error('Gemini OCR cleanup failed:', error);
    }

    // Extract different sections from the cleaned text
    const sections = extractTextSections(cleanedText);
    
    // Validate extracted ingredients
    if (sections.ingredients.length === 0) {
      // If no ingredients were found, try to extract from the entire text
      sections.ingredients = cleanedText
        .split(/[,;.]/)
        .map(item => item.trim())
        .filter(item => item.length > 2); // Filter out very short items
    }
    
    // Analyze ingredients with concurrency limit to prevent performance issues
    const analyzedIngredients: AnalysisResult[] = [];
    const batchSize = 5; // Process 5 ingredients at a time
    
    for (let i = 0; i < sections.ingredients.length; i += batchSize) {
      const batch = sections.ingredients.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(analyzeIngredient));
      analyzedIngredients.push(...batchResults);
    }

    // Filter out duplicate ingredients by name
    const uniqueIngredients = analyzedIngredients.filter((ingredient, index, self) => 
      index === self.findIndex(i => i.name.toLowerCase() === ingredient.name.toLowerCase())
    );

    return {
      ingredients: uniqueIngredients,
      allergens: sections.allergens,
      nutritionalInfo: sections.nutritionalInfo
    };
  } catch (error) {
    console.error('Error processing text:', error);
    return {
      ingredients: [],
      allergens: [],
      nutritionalInfo: []
    };
  }
}