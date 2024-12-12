export interface IngredientData {
  description: string;
  category: 'food' | 'chemical' | 'unknown' | 'error';
  warnings: string[];
  safetyLevel: 'safe' | 'caution' | 'warning' | 'unknown';
}

export interface AnalysisResult extends IngredientData {
  name: string;
}

export interface TextSection {
  ingredients: string[];
  allergens: string[];
  nutritionalInfo: string[];
  otherText: string[];
}

export interface ProcessedResult {
  ingredients: AnalysisResult[];
  allergens: string[];
  nutritionalInfo: string[];
}