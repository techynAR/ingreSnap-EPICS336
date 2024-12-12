import OpenAI from 'openai';
import { AnalysisResult } from '@/types/analysis';
import { localAnalyzeIngredient } from './localAnalysis';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeIngredients(ingredients: string[]): Promise<AnalysisResult[]> {
  const results: AnalysisResult[] = [];
  let useLocalAnalysis = false;

  // Test API connectivity with the first ingredient
  if (ingredients.length > 0) {
    try {
      const testResult = await analyzeIngredientWithGPT(ingredients[0]);
      results.push(testResult);
    } catch (error) {
      console.warn('OpenAI API unavailable, falling back to local analysis');
      useLocalAnalysis = true;
      results.push(await localAnalyzeIngredient(ingredients[0]));
    }
  }

  // Process remaining ingredients
  for (const ingredient of ingredients.slice(1)) {
    try {
      const analysis = useLocalAnalysis 
        ? await localAnalyzeIngredient(ingredient)
        : await analyzeIngredientWithGPT(ingredient);
      results.push(analysis);
    } catch (error) {
      console.error(`Error analyzing ingredient: ${ingredient}`, error);
      results.push({
        name: ingredient,
        description: 'Unable to analyze this ingredient',
        category: 'unknown',
        warnings: [],
        safetyLevel: 'unknown'
      });
    }
  }

  return results;
}

async function analyzeIngredientWithGPT(ingredient: string): Promise<AnalysisResult> {
  const prompt = `Analyze the following food/cosmetic ingredient and provide a structured response:
Ingredient: "${ingredient}"

Please provide:
1. A brief description of what this ingredient is
2. Its category (food, chemical, or additive)
3. Any potential warnings or allergens
4. Safety level (safe, caution, or warning) with reasoning

Format the response as a JSON object with these exact keys: description, category, warnings (array), safetyLevel`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert in food and cosmetic ingredients analysis. Provide accurate, scientific information about ingredients."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const analysisText = response.choices[0].message.content;
    if (!analysisText) throw new Error('Empty response from OpenAI');
    
    const analysis = JSON.parse(analysisText);
    return {
      name: ingredient,
      description: analysis.description,
      category: mapCategory(analysis.category),
      warnings: analysis.warnings,
      safetyLevel: analysis.safetyLevel.toLowerCase() as 'safe' | 'caution' | 'warning' | 'unknown'
    };
  } catch (error) {
    console.error('Error analyzing with GPT:', error);
    throw error;
  }
}

function mapCategory(category: string): 'food' | 'chemical' | 'unknown' | 'error' {
  category = category.toLowerCase();
  if (category.includes('food')) return 'food';
  if (category.includes('chemical') || category.includes('additive')) return 'chemical';
  return 'unknown';
}