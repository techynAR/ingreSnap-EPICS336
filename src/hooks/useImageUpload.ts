import { useState } from 'react';
import { createWorker, createScheduler, PSM, OEM } from 'tesseract.js';
import { processText } from '@/services/analysis';
import type { AnalysisResult } from '@/types/ingredients';
import { preprocessOcrText } from '@/utils/textCleaning';

export const useImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult[]>([]);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [nutritionalInfo, setNutritionalInfo] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    try {
      // Create image URL
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      // Initialize Tesseract worker
      // Note: In v6, the logger parameter has changed and needs to be a function
      const worker = await createWorker('eng');
      
      // Configure OCR engine for better text recognition
      await worker.setParameters({
        tessedit_ocr_engine_mode: OEM.LSTM_ONLY,
        tessedit_pageseg_mode: PSM.AUTO,
        tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.():;%-_',
        preserve_interword_spaces: '1'
      });

      // Perform OCR
      const { data } = await worker.recognize(imageUrl);
      const { text } = data;
      
      // Clean up resources
      await worker.terminate();

      // Validate extracted text
      if (!text || text.trim().length === 0) {
        throw new Error('No text could be extracted from the image. Please ensure the image contains clear, readable text.');
      }

      // Preprocess the OCR text to fix common errors
      const processedText = preprocessOcrText(text);

      // Process and analyze the text
      const results = await processText(processedText);
      
      // Validate results
      if (!results.ingredients || results.ingredients.length === 0) {
        throw new Error('No ingredients could be identified in the image. Please ensure the image shows an ingredient list clearly.');
      }

      setAnalysis(results.ingredients);
      setAllergens(results.allergens);
      setNutritionalInfo(results.nutritionalInfo);

      // Clean up the object URL
      URL.revokeObjectURL(imageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error processing image. Please try again.';
      setError(errorMessage);
      console.error('Image processing error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    image,
    analysis,
    allergens,
    nutritionalInfo,
    loading,
    error,
    handleImageUpload,
  };
};