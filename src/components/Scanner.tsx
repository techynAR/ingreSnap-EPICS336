import React, { useState } from 'react';
import { Upload, Scan, AlertCircle, Camera, Info, Github, ChevronDown, ChevronUp, Cloud, Laptop, X, ExternalLink } from 'lucide-react';
import IngredientAnalysis from './IngredientAnalysis';
import { ingredientsDatabase } from '../data/ingredients';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { OCRService } from '../services/ocrService';
import { parseIngredients as processIngredientText } from '../utils/ingredientParser';
import { analyzeIngredient } from '../services/analysis';

// Define types for analysis results
interface AnalysisResult {
  name: string;
  description: string;
  category: 'food' | 'chemical' | 'unknown' | 'error';
  warnings: string[];
  safetyLevel: 'safe' | 'caution' | 'warning' | 'unknown';
}

const extractAllergens = (text: string): string[] => {
  const commonAllergens = [
    'milk', 'dairy', 'eggs', 'peanuts', 'tree nuts', 'soy', 'wheat', 'fish',
    'shellfish', 'sesame', 'gluten', 'lactose', 'nuts'
  ];

  const lowerText = text.toLowerCase();
  return commonAllergens.filter(allergen => lowerText.includes(allergen));
};

const extractNutritionalInfo = (text: string): string[] => {
  const lines = text.split('\n');
  
  return lines.filter(line => {
    const lowerLine = line.toLowerCase();
    return (
      lowerLine.includes('calories') ||
      lowerLine.includes('protein') ||
      lowerLine.includes('fat') ||
      lowerLine.includes('carbohydrate') ||
      lowerLine.includes('sugar') ||
      lowerLine.includes('sodium') ||
      /\d+\s*g/.test(line) ||
      /\d+\s*mg/.test(line)
    );
  });
};

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
  const [useLocalOCR, setUseLocalOCR] = useState(false);
  const [showOCRChoice, setShowOCRChoice] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setShowOCRChoice(true);
  };

  const handleOCRChoice = async (useLocal: boolean) => {
    setUseLocalOCR(useLocal);
    setShowOCRChoice(false);
    if (selectedFile) {
      await handleImageUpload(selectedFile);
    }
    setSelectedFile(null);
  };

  const handleImageUpload = async (file: File | undefined) => {
    if (!file) {
      setError('No file selected');
      return;
    }

    if (!file.type?.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size too large. Please upload an image smaller than 10MB');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis([]);
    setAllergens([]);
    setNutritionalInfo([]);

    try {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      const ocrService = OCRService.getInstance();
      const { text, error: ocrError } = await ocrService.processImage(file, useLocalOCR);

      if (ocrError) {
        throw new Error(ocrError);
      }

      if (!text || text.trim().length === 0) {
        throw new Error('No text could be extracted from the image. Please ensure the image contains clear, readable text.');
      }

      setExtractedText(text);

      const ingredients = processIngredientText(text);
      
      if (ingredients.length === 0) {
        throw new Error('No ingredients could be identified in the image. Please ensure the image shows an ingredient list clearly.');
      }

      // Analyze each ingredient and wait for all results
      const analysisPromises = ingredients.map(ingredient => analyzeIngredient(ingredient));
      const analysisResults = await Promise.all(analysisPromises);
      
      const potentialAllergens = extractAllergens(text);
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
      if (image) {
        URL.revokeObjectURL(image);
      }
    }
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
      handleFileSelect(e.dataTransfer.files[0]);
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
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  disabled={loading}
                />
              </label>
            </motion.div>

            <AnimatePresence>
              {showOCRChoice && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-white">Choose Processing Method</h3>
                      <button
                        onClick={() => setShowOCRChoice(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <button
                        onClick={() => handleOCRChoice(false)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center">
                          <Cloud className="h-6 w-6 mr-3" />
                          <div className="text-left">
                            <div className="font-medium">Cloud Processing</div>
                            <div className="text-sm text-emerald-200">Better accuracy, requires internet</div>
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                      </button>
                      
                      <button
                        onClick={() => handleOCRChoice(true)}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center">
                          <Laptop className="h-6 w-6 mr-3" />
                          <div className="text-left">
                            <div className="font-medium">Local Processing</div>
                            <div className="text-sm text-gray-300">Privacy-focused, works offline</div>
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                      </button>

                      <div className="mt-6 border-t border-gray-700 pt-4">
                        <h4 className="text-sm font-medium text-white mb-2">Privacy Information</h4>
                        <p className="text-sm text-gray-400 mb-3">
                          Cloud processing uses OCR.space, which follows strict data protection practices:
                        </p>
                        <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside mb-3">
                          <li>All uploaded images are deleted after processing</li>
                          <li>No personal data is collected or stored</li>
                          <li>Compliant with GDPR and European data protection laws</li>
                        </ul>
                        <div className="flex items-center gap-2">
                          <a
                            href="https://ocr.space/privacypolicy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                          >
                            View Privacy Policy
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mt-4">
                        Local processing runs entirely in your browser using Tesseract.js - no data leaves your device.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

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

            {(analysis.length > 0 || allergens.length > 0) && (
              <motion.div 
                ref={resultsRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 space-y-6"
              >
                {/* Analysis Results */}
                {analysis.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Ingredient Analysis</h3>
                    <IngredientAnalysis results={analysis} />
                  </div>
                )}

                {/* Allergens */}
                {allergens.length > 0 && (
                  <div className="bg-yellow-900/20 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">Potential Allergens Detected</h3>
                    <ul className="list-disc list-inside text-yellow-200">
                      {allergens.map((allergen, index) => (
                        <li key={index}>{allergen}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Nutritional Info */}
                {nutritionalInfo.length > 0 && (
                  <div className="bg-blue-900/20 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Nutritional Information</h3>
                    <ul className="list-none space-y-1 text-blue-200">
                      {nutritionalInfo.map((info, index) => (
                        <li key={index}>{info}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Extracted Text Toggle */}
                <div className="mt-4">
                  <button
                    onClick={toggleExtractedText}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Info className="h-4 w-4" />
                    {showExtractedText ? 'Hide' : 'Show'} extracted text
                    {showExtractedText ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {showExtractedText && (
                    <div className="mt-2 p-4 bg-gray-700 rounded-lg">
                      <pre className="text-gray-300 text-sm whitespace-pre-wrap">{extractedText}</pre>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Scanner;