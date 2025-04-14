import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiService {
  private static instance: GeminiService;
  private genAI: GoogleGenerativeAI;
  private model: any;

  private constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key is not configured');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async analyzeIngredient(ingredient: string): Promise<{
    description: string;
    category: 'food' | 'chemical' | 'unknown' | 'error';
    warnings: string[];
    safetyLevel: 'safe' | 'caution' | 'warning' | 'unknown';
  }> {
    try {
      const prompt = `Analyze this food/cosmetic ingredient and provide detailed information in JSON format:
      
Ingredient: "${ingredient}"

Provide:
1. A brief but informative description
2. Category (must be exactly one of: food, chemical, unknown)
3. Any potential warnings or health considerations (as an array)
4. Safety level (must be exactly one of: safe, caution, warning, unknown)

Format the response as a strict JSON object with these exact keys: description, category, warnings, safetyLevel

Example format:
{
  "description": "Natural sweetener derived from sugar cane",
  "category": "food",
  "warnings": ["May affect blood sugar levels", "Not suitable for diabetics"],
  "safetyLevel": "caution"
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }
      
      const analysis = JSON.parse(jsonMatch[0]);
      
      // Validate the response format
      if (!analysis.description || !analysis.category || !Array.isArray(analysis.warnings) || !analysis.safetyLevel) {
        throw new Error('Invalid response structure');
      }

      return {
        description: analysis.description,
        category: analysis.category as 'food' | 'chemical' | 'unknown' | 'error',
        warnings: analysis.warnings,
        safetyLevel: analysis.safetyLevel as 'safe' | 'caution' | 'warning' | 'unknown'
      };
    } catch (error) {
      console.error('Gemini analysis error:', error);
      return {
        description: 'Unable to analyze this ingredient',
        category: 'unknown',
        warnings: ['Analysis failed'],
        safetyLevel: 'unknown'
      };
    }
  }

  public async cleanupOCRText(text: string): Promise<string> {
    try {
      const prompt = `Clean up and correct this OCR-extracted text from a food/cosmetic product ingredient list. 
Fix common OCR errors, maintain ingredient names, and format it clearly:

${text}

Return only the cleaned text, no explanations.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Gemini OCR cleanup error:', error);
      return text;
    }
  }
}

export default GeminiService;