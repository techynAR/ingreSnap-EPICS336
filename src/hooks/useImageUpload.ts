import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { processText } from '@/services/analysis';
import type { AnalysisResult, ProcessedResult } from '@/types/ingredients';

export const useImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult[]>([]);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [nutritionalInfo, setNutritionalInfo] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setAnalysis([]);
    setAllergens([]);
    setNutritionalInfo([]);

    try {
      // 1. Process Image with OCR
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(imageUrl);
      await worker.terminate();

      // 2. Process and analyze the text
      const results = await processText(text);
      
      setAnalysis(results.ingredients);
      setAllergens(results.allergens);
      setNutritionalInfo(results.nutritionalInfo);
    } catch (err) {
      setError('Error processing image. Please try again.');
      console.error(err);
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