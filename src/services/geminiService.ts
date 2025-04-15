import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private static instance: GeminiService;
  private ai: GoogleGenerativeAI;
  public model: any;

  private constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is not configured");
    }
    this.ai = new GoogleGenerativeAI(apiKey);
    this.model = this.ai.getGenerativeModel({ model: "gemini-pro" });
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async generateContent(prompt: any): Promise<any> {
    try {
      const result = await this.model.generateContent(prompt);
      if (!result || !result.response) {
        throw new Error('Invalid response from Gemini API');
      }
      return result;
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }
}

export default GeminiService;
