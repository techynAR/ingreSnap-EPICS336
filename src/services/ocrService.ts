import { createWorker } from 'tesseract.js';

interface OCRResult {
  text: string;
  error?: string;
}

export class OCRService {
  private static instance: OCRService;
  private readonly apiKey = import.meta.env.VITE_OCR_SPACE_API_KEY;

  private constructor() {}

  public static getInstance(): OCRService {
    if (!OCRService.instance) {
      OCRService.instance = new OCRService();
    }
    return OCRService.instance;
  }

  private async ocrSpaceProcess(imageFile: File): Promise<OCRResult> {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('language', 'eng');
      formData.append('isOverlayRequired', 'false');
      formData.append('detectOrientation', 'true');
      formData.append('scale', 'true');
      formData.append('OCREngine', '2');

      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        headers: {
          'apikey': this.apiKey
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`OCR processing failed: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.IsErroredOnProcessing) {
        throw new Error(result.ErrorMessage || 'OCR processing failed');
      }

      const extractedText = result.ParsedResults?.[0]?.ParsedText;
      if (!extractedText) {
        throw new Error('No text extracted from image');
      }

      return { text: extractedText };
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error occurred');
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('OCR processing error:', errorMessage);
      return { text: '', error: errorMessage };
    }
  }

  private async tesseractProcess(imageFile: File): Promise<OCRResult> {
    try {
      const worker = await createWorker('eng');
      const imageUrl = URL.createObjectURL(imageFile);
      
      const { data } = await worker.recognize(imageUrl);
      await worker.terminate();
      URL.revokeObjectURL(imageUrl);

      if (!data.text || data.text.trim().length === 0) {
        throw new Error('No text could be extracted from the image');
      }

      return { text: data.text };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Tesseract processing error:', errorMessage);
      return { text: '', error: errorMessage };
    }
  }

  public async processImage(imageFile: File, forceTesseract = false): Promise<OCRResult> {
    if (forceTesseract || !this.apiKey) {
      console.log('Using Tesseract.js for OCR processing');
      return await this.tesseractProcess(imageFile);
    }

    try {
      return await this.ocrSpaceProcess(imageFile);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Network')) {
        console.warn('OCR.space network error detected, falling back to Tesseract.js');
        return await this.tesseractProcess(imageFile);
      }
      
      console.warn('OCR.space failed, falling back to Tesseract.js:', error);
      return await this.tesseractProcess(imageFile);
    }
  }
}

export default OCRService;
