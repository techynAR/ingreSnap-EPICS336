import React from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, AlertCircle } from 'lucide-react';

interface AnalysisResult {
  name: string;
  description: string;
  category: 'food' | 'chemical' | 'unknown' | 'error';
  warnings: string[];
  safetyLevel: 'safe' | 'caution' | 'warning' | 'unknown';
}

interface Props {
  results: AnalysisResult[];
}

const IngredientAnalysis: React.FC<Props> = ({ results }) => {
  const getSafetyIcon = (level: string) => {
    switch (level) {
      case 'safe':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'caution':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <div
          key={index}
          className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
        >
          <div className="flex items-start gap-3">
            {getSafetyIcon(result.safetyLevel)}
            <div className="flex-1">
              <h4 className="text-lg font-medium text-white">{result.name}</h4>
              <p className="text-gray-300 text-sm mt-1">{result.description}</p>
              {result.warnings.length > 0 && (
                <div className="mt-2">
                  <p className="text-red-400 text-sm font-medium">Warnings:</p>
                  <ul className="list-disc list-inside text-sm text-red-300">
                    {result.warnings.map((warning, idx) => (
                      <li key={idx}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                  {result.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  result.safetyLevel === 'safe' ? 'bg-green-900 text-green-300' :
                  result.safetyLevel === 'caution' ? 'bg-yellow-900 text-yellow-300' :
                  result.safetyLevel === 'warning' ? 'bg-red-900 text-red-300' :
                  'bg-gray-800 text-gray-300'
                }`}>
                  {result.safetyLevel}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default IngredientAnalysis;