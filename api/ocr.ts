import type { VercelRequest, VercelResponse } from '@vercel/node';
import FormData from 'form-data';
import fetch from 'node-fetch';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OCR_SPACE_API_KEY;
  
  if (!apiKey) {
    return response.status(500).json({ error: 'OCR API key not configured' });
  }

  try {
    const formData = new FormData();
    const file = request.body.file;
    formData.append('file', file);
    formData.append('language', 'eng');
    formData.append('isOverlayRequired', 'false');
    formData.append('detectOrientation', 'true');
    formData.append('scale', 'true');
    formData.append('OCREngine', '2');

    const ocrResponse = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: {
        'apikey': apiKey
      },
      body: formData
    });

    if (!ocrResponse.ok) {
      throw new Error(`OCR.space API error: ${ocrResponse.statusText}`);
    }

    const result = await ocrResponse.json();
    return response.status(200).json(result);
  } catch (error) {
    console.error('OCR processing error:', error);
    return response.status(500).json({ 
      error: 'Failed to process image',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}