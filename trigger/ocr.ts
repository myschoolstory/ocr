import { task } from "@trigger.dev/sdk/v3";
import Tesseract from "tesseract.js";

interface OCRPayload {
  imageData: string;
  fileName: string;
  mimeType: string;
}

interface OCRResult {
  id: string;
  text: string;
  confidence: number;
  status: 'completed' | 'processing' | 'failed';
}

export const ocrProcess = task({
  id: "ocr-process",
  run: async (payload: OCRPayload): Promise<OCRResult> => {
    try {
      console.log(`Processing OCR for file: ${payload.fileName}`);
      
      // Convert base64 back to buffer
      const imageBuffer = Buffer.from(payload.imageData, 'base64');
      
      // Process image with Tesseract
      const { data } = await Tesseract.recognize(imageBuffer, 'eng', {
        logger: m => console.log(m) // Optional: log progress
      });
      
      const result: OCRResult = {
        id: `ocr_${Date.now()}`,
        text: data.text,
        confidence: data.confidence,
        status: 'completed'
      };
      
      console.log(`OCR completed with ${result.confidence}% confidence`);
      return result;
      
    } catch (error) {
      console.error('OCR processing failed:', error);
      
      return {
        id: `ocr_${Date.now()}`,
        text: '',
        confidence: 0,
        status: 'failed'
      };
    }
  },
});