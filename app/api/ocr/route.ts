import { NextRequest, NextResponse } from 'next/server';
import { tasks } from "@trigger.dev/sdk/v3";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    
    // Trigger the OCR job
    const handle = await tasks.trigger("ocr-process", {
      imageData: base64,
      fileName: image.name,
      mimeType: image.type
    });

    // Wait for the result (you can also return the handle and poll later)
    const result = await handle.result();
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('OCR API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' }, 
      { status: 500 }
    );
  }
}