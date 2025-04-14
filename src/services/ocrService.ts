import { createWorker } from 'tesseract.js';

interface OCRResult {
  text: string;
  error?: string;
}

export class OCRService {
  private static instance: OCRService;
  private readonly apiEndpoint = '/api/ocr';

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

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`OCR processing failed: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.IsErroredOnProcessing) {
        throw new Error(result.ErrorMessage || 'OCR processing failed');
      }

      if (result.OCRExitCode !== 1) {
        throw new Error(result.ErrorMessage || 'OCR processing failed');
      }

      const extractedText = result.ParsedResults?.[0]?.ParsedText;
      if (!extractedText) {
        throw new Error('No text extracted from image');
      }

      return { text: extractedText };
    } catch (error) {
      // Check specifically for CORS and network-related errors
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
    if (forceTesseract) {
      console.log('Using Tesseract.js for OCR processing');
      return await this.tesseractProcess(imageFile);
    }

    try {
      // Try OCR.space first
      return await this.ocrSpaceProcess(imageFile);
    } catch (error) {
      // If it's a network error, fall back to Tesseract immediately
      if (error instanceof Error && error.message.includes('Network')) {
        console.warn('OCR.space network error detected, falling back to Tesseract.js');
        return await this.tesseractProcess(imageFile);
      }
      
      // For other errors, try Tesseract as fallback
      console.warn('OCR.space failed, falling back to Tesseract.js:', error);
      return await this.tesseractProcess(imageFile);
    }
  }
}

export default OCRService;
