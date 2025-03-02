import React, { useState } from 'react';
import { Upload, Scan, AlertCircle, Camera, Info, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import IngredientAnalysis from './IngredientAnalysis';
import { ingredientsDatabase } from '../data/ingredients';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Define types for analysis results
interface AnalysisResult {
  name: string;
  description: string;
  category: 'food' | 'chemical' | 'unknown' | 'error';
  warnings: string[];
  safetyLevel: 'safe' | 'caution' | 'warning' | 'unknown';
}

const Scanner = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult[]>([]);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [nutritionalInfo, setNutritionalInfo] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [showExtractedText, setShowExtractedText] = useState(false);

  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: uploadRef, inView: uploadInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: resultsRef, inView: resultsInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const handleImageUpload = async (file: File) => {
    if (!file) {
      setError('No file selected');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size too large. Please upload an image smaller than 10MB');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis([]);
    setAllergens([]);
    setNutritionalInfo([]);

    // Create image URL
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    try {
      // Initialize Tesseract worker
      const worker = await createWorker('eng');
      
      // Perform OCR
      const { data } = await worker.recognize(imageUrl);
      const { text } = data;
      
      // Clean up resources
      await worker.terminate();

      // Set extracted text
      setExtractedText(text);

      if (!text || text.trim().length === 0) {
        throw new Error('No text could be extracted from the image. Please ensure the image contains clear, readable text.');
      }

      // Process the extracted text
      const ingredients = processIngredientText(text);
      
      if (ingredients.length === 0) {
        throw new Error('No ingredients could be identified in the image. Please ensure the image shows an ingredient list clearly.');
      }

      // Analyze each ingredient
      const analysisResults = ingredients.map(ingredient => analyzeIngredient(ingredient));
      
      // Extract potential allergens
      const potentialAllergens = extractAllergens(text);
      
      // Extract nutritional info
      const nutrition = extractNutritionalInfo(text);

      setAnalysis(analysisResults);
      setAllergens(potentialAllergens);
      setNutritionalInfo(nutrition);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error processing image. Please try again.';
      setError(errorMessage);
      console.error('Image processing error:', err);
    } finally {
      setLoading(false);
      // Clean up the object URL
      URL.revokeObjectURL(imageUrl);
    }
  };

  // Process the extracted text to identify ingredients
  const processIngredientText = (text: string): string[] => {
    // Convert to lowercase for easier matching
    const lowerText = text.toLowerCase();
    
    // Try to find the ingredients section
    let ingredientsSection = lowerText;
    
    // Look for common ingredient list markers
    const ingredientsMarkers = ['ingredients:', 'ingredients', 'contains:'];
    for (const marker of ingredientsMarkers) {
      if (lowerText.includes(marker)) {
        const startIndex = lowerText.indexOf(marker) + marker.length;
        // Try to find the end of the ingredients section
        const endMarkers = ['nutrition facts', 'allergens:', 'may contain', 'manufactured in'];
        let endIndex = lowerText.length;
        
        for (const endMarker of endMarkers) {
          const markerIndex = lowerText.indexOf(endMarker, startIndex);
          if (markerIndex !== -1 && markerIndex < endIndex) {
            endIndex = markerIndex;
          }
        }
        
        ingredientsSection = lowerText.substring(startIndex, endIndex).trim();
        break;
      }
    }
    
    // Split by common delimiters
    const ingredients = ingredientsSection
      .split(/[,.]/)
      .map(item => item.trim())
      .filter(item => item.length > 2); // Filter out very short items
    
    return ingredients;
  };

  // Analyze a single ingredient
  const analyzeIngredient = (ingredient: string): AnalysisResult => {
    // Clean the ingredient name
    const cleanedName = ingredient.toLowerCase().trim();
    
    // Try to find the ingredient in our database
    for (const [key, data] of Object.entries(ingredientsDatabase)) {
      if (cleanedName.includes(key) || key.includes(cleanedName)) {
        return {
          name: ingredient,
          description: data.description,
          category: data.category,
          warnings: data.warnings,
          safetyLevel: data.safetyLevel
        };
      }
    }
    
    // Check for common allergens not in database
    const commonAllergens = ['peanut', 'tree nut', 'milk', 'egg', 'wheat', 'soy', 'fish', 'shellfish'];
    for (const allergen of commonAllergens) {
      if (cleanedName.includes(allergen)) {
        return {
          name: ingredient,
          description: `This ingredient may contain ${allergen}, which is a common allergen.`,
          category: 'food',
          warnings: [`May contain ${allergen} allergen`],
          safetyLevel: 'caution'
        };
      }
    }
    
    // Default for unknown ingredients
    return {
      name: ingredient,
      description: 'This ingredient is not in our database. Consider consulting with a professional for more information.',
      category: 'unknown',
      warnings: ['Unknown ingredient - exercise caution'],
      safetyLevel: 'caution'
    };
  };

  // Extract potential allergens from text
  const extractAllergens = (text: string): string[] => {
    const lowerText = text.toLowerCase();
    const allergenMarkers = ['allergens:', 'contains:', 'may contain:', 'warning:'];
    const commonAllergens = [
      'peanuts', 'tree nuts', 'milk', 'eggs', 'wheat', 'soy', 'fish', 'shellfish', 
      'gluten', 'sesame', 'mustard', 'celery', 'lupin', 'molluscs', 'sulphites'
    ];
    
    const foundAllergens: string[] = [];
    
    // Look for explicit allergen sections
    for (const marker of allergenMarkers) {
      if (lowerText.includes(marker)) {
        const startIndex = lowerText.indexOf(marker) + marker.length;
        let endIndex = lowerText.indexOf('\n', startIndex);
        if (endIndex === -1) endIndex = lowerText.length;
        
        const allergenSection = lowerText.substring(startIndex, endIndex).trim();
        const sectionAllergens = allergenSection
          .split(/[,.]/)
          .map(a => a.trim())
          .filter(a => a.length > 0);
        
        foundAllergens.push(...sectionAllergens);
      }
    }
    
    // Also check for common allergens in the entire text
    for (const allergen of commonAllergens) {
      if (lowerText.includes(allergen) && !foundAllergens.some(a => a.includes(allergen))) {
        foundAllergens.push(`Contains ${allergen}`);
      }
    }
    
    return foundAllergens;
  };

  // Extract nutritional information
  const extractNutritionalInfo = (text: string): string[] => {
    const lowerText = text.toLowerCase();
    const nutritionMarkers = ['nutrition facts', 'nutritional information'];
    
    for (const marker of nutritionMarkers) {
      if (lowerText.includes(marker)) {
        const startIndex = lowerText.indexOf(marker);
        let endIndex = lowerText.indexOf('ingredients', startIndex);
        if (endIndex === -1) endIndex = lowerText.length;
        
        const nutritionSection = lowerText.substring(startIndex, endIndex).trim();
        return nutritionSection
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0 && /\d/.test(line)); // Must contain at least one digit
      }
    }
    
    return [];
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const toggleExtractedText = () => {
    setShowExtractedText(!showExtractedText);
  };

  return (
    <section id="get-started" className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Scan Your Product
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload a clear image of your product's ingredient list, and we'll help you understand what's inside.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="bg-gray-800 rounded-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Upload Section */}
            <motion.div 
              ref={uploadRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={uploadInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <label
                htmlFor="image-upload"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 ${
                  dragActive ? 'border-emerald-500' : 'border-gray-600'
                } border-dashed rounded-lg cursor-pointer hover:border-emerald-500 transition-colors relative`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {loading ? (
                    <Scan className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
                  ) : (
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Camera className="w-12 h-12 text-gray-400 mb-4" />
                    </motion.div>
                  )}
                  <p className="text-sm text-gray-400 text-center">
                    <span className="font-semibold">Click to upload</span> or drag and drop<br />
                    <span className="text-xs">Supported formats: JPG, PNG, GIF (max 10MB)</span>
                  </p>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  disabled={loading}
                />
              </label>
            </motion.div>

            {/* Error State */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 text-red-500 justify-center mb-4 p-4 bg-red-500/10 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            {/* Results - Only show if analysis has data */}
            {(analysis.length > 0 || allergens.length > 0) && (
              <motion.div 
                ref={resultsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={resultsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
                className="mt-8 space-y-6"
              >
                {/* Ingredients Analysis */}
                {analysis.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Ingredients Analysis:</h3>
                    <IngredientAnalysis results={analysis} />
                  </motion.div>
                )}

                {/* Allergens */}
                {allergens.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Allergen Information:</h3>
                    <div className="bg-red-900/50 rounded-lg p-4">
                      <ul className="list-disc list-inside space-y-2">
                        {allergens.map((allergen, index) => (
                          <motion.li 
                            key={index} 
                            className="text-red-200"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.3 }}
                          >
                            {allergen}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {/* Nutritional Information */}
                {nutritionalInfo.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Nutritional Information:</h3>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <ul className="space-y-2">
                        {nutritionalInfo.map((info, index) => (
                          <motion.li 
                            key={index} 
                            className="text-gray-200"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.3 }}
                          >
                            {info}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {/* Developer Section - Hidden by default */}
                {extractedText && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-8 border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <motion.button 
                      onClick={toggleExtractedText}
                      className="w-full flex items-center justify-between bg-gray-700 p-4 text-left hover:bg-gray-600 transition-colors"
                      whileHover={{ backgroundColor: 'rgba(75, 85, 99, 1)' }}
                    >
                      <div className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-emerald-400" />
                        <span className="font-medium text-white">Developer Information</span>
                      </div>
                      <motion.div
                        animate={{ rotate: showExtractedText ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {showExtractedText ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </motion.div>
                    </motion.button>
                    
                    {showExtractedText && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-gray-800"
                      >
                        <div className="mb-4">
                          <p className="text-gray-300 mb-2">
                            This raw extracted text is helpful for developers to improve our OCR and text processing algorithms. 
                            If you notice any issues with the analysis, please consider contributing to our project.
                          </p>
                          <motion.a
                            href="https://github.com/techynAR/ingreSnap-EPICS336"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="h-4 w-4" />
                            <span>Contribute on GitHub</span>
                          </motion.a>
                        </div>
                        <div className="bg-gray-900 rounded p-3">
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Raw Extracted Text:</h4>
                          <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                            {extractedText}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Scanner;