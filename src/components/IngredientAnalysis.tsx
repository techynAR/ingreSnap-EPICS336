import React from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {results.map((result, index) => (
        <motion.div
          key={index}
          variants={item}
          transition={{ duration: 0.5 }}
          className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <div className="flex items-start gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + (index * 0.05), duration: 0.3, type: 'spring' }}
            >
              {getSafetyIcon(result.safetyLevel)}
            </motion.div>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-white">{result.name}</h4>
              <p className="text-gray-300 text-sm mt-1">{result.description}</p>
              {result.warnings.length > 0 && (
                <motion.div 
                  className="mt-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ delay: 0.3 + (index * 0.05), duration: 0.3 }}
                >
                  <p className="text-red-400 text-sm font-medium">Warnings:</p>
                  <ul className="list-disc list-inside text-sm text-red-300">
                    {result.warnings.map((warning, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (idx * 0.05), duration: 0.3 }}
                      >
                        {warning}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
              <motion.div 
                className="mt-2 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + (index * 0.05), duration: 0.3 }}
              >
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
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default IngredientAnalysis;