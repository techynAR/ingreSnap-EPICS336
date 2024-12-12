export interface AnalysisResult {
  name: string;
  description: string;
  category: 'food' | 'chemical' | 'unknown' | 'error';
  warnings: string[];
  safetyLevel: 'safe' | 'caution' | 'warning' | 'unknown';
}

export interface IngredientAnalysis {
  results: AnalysisResult[];
  timestamp: number;
}