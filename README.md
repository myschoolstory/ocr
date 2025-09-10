# OCR Image Text Extractor

A modern web application that extracts text from images using OCR (Optical Character Recognition) technology. Built with Next.js 14, Trigger.dev, and Tesseract.js.

## Features

- 🖼️ **Drag & Drop Interface** - Easy image uploading
- 🔍 **AI-Powered OCR** - Extract text from any image format
- 📊 **Confidence Scoring** - See how confident the OCR is about the results
- 💾 **Download Results** - Save extracted text as a .txt file
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- ⚡ **Serverless Architecture** - Deployed on Vercel with Trigger.dev backend

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Trigger.dev, Tesseract.js
- **Deployment**: Vercel
- **OCR Engine**: Tesseract.js (WebAssembly)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ocr-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Trigger.dev

1. Sign up at [trigger.dev](https://trigger.dev)
2. Create a new project
3. Get your project reference and secret key
4. Update `trigger.config.ts` with your project reference

### 4. Environment Variables

Create a `.env.local` file:
```env
TRIGGER_SECRET_KEY=your-trigger-secret-key
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

### 5. Development Setup

Start the development server:
```bash
npm run dev
```

In another terminal, start Trigger.dev CLI:
```bash
npm run trigger:dev
```

### 6. Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `TRIGGER_SECRET_KEY`
4. Deploy!

## File Structure

```
ocr-app/
├── app/
│   ├── api/ocr/
│   │   └── route.ts          # API endpoint for OCR processing
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page component
├── trigger/
│   └── ocr.ts               # Trigger.dev task for OCR processing
├── package.json
├── next.config.js
├── tailwind.config.js
├── trigger.config.ts
└── vercel.json
```

## How It Works

1. **Image Upload**: Users drag & drop or select an image file
2. **API Call**: Frontend sends image to `/api/ocr` endpoint
3. **Task Trigger**: API converts image to base64 and triggers Trigger.dev task
4. **OCR Processing**: Trigger.dev runs Tesseract.js on the server to extract text
5. **Results**: Extracted text and confidence score are returned to the frontend
6. **Download**: Users can download the extracted text as a file

## Supported Image Formats

- JPG/JPEG
- PNG
- GIF
- BMP
- TIFF
- WEBP

## Performance Considerations

- **File Size**: Large images may take longer to process
- **Quality**: Higher quality images generally produce better OCR results
- **Languages**: Currently configured for English (can be extended)
- **Timeout**: API calls timeout after 60 seconds

## Customization

### Adding More Languages

Modify the Tesseract configuration in `trigger/ocr.ts`:
```typescript
await Tesseract.recognize(imageBuffer, 'eng+spa+fra', {
  // eng = English, spa = Spanish, fra = French
})
```

### Styling

The app uses Tailwind CSS. Modify `app/page.tsx` to customize the design.

### OCR Settings

Adjust Tesseract parameters in `trigger/ocr.ts` for different OCR behaviors.

## Troubleshooting

### Common Issues

1. **Trigger.dev Connection**: Make sure your secret key is correct
2. **OCR Quality**: Try with higher resolution images
3. **Deployment**: Ensure environment variables are set in Vercel

### Logs

Check your Trigger.dev dashboard for detailed processing logs.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review [Trigger.dev documentation](https://trigger.dev/docs)
3. Open an issue on GitHub
