import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function generateImage(req, res) {
  try {
    const { prompt, aspectRatio = '16:9', referenceImages = [] } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // ⚠️ CRITICAL: Sử dụng IMAGEN-3.0, KHÔNG PHẢI gemini-flash
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // TODO: Implement actual Imagen 3.0 API call
    // Hiện tại Google Gemini SDK chưa hỗ trợ trực tiếp Imagen 3.0
    // Cần dùng REST API hoặc chờ SDK update
    
    // Placeholder response (cần thay bằng actual Imagen API)
    const imageUrl = await callImagenAPI(prompt, aspectRatio, referenceImages, API_KEY);

    res.json({
      success: true,
      imageUrl: imageUrl,
      prompt: prompt
    });

  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ 
      error: error.message || 'Image generation failed' 
    });
  }
}

// Helper function cho Imagen 3.0 API
async function callImagenAPI(prompt, aspectRatio, referenceImages, apiKey) {
  // Imagen 3.0 REST API endpoint
  const endpoint = `https://aiplatform.googleapis.com/v1/projects/${process.env.GCP_PROJECT_ID}/locations/us-central1/publishers/google/models/imagen-3.0-generate-001:predict`;
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      instances: [{
        prompt: prompt,
        sampleCount: 1
      }],
      parameters: {
        aspectRatio: aspectRatio,
        safetyFilterLevel: 'block_some',
        personGeneration: 'allow_all'
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Imagen API error: ${response.status}`);
  }

  const data = await response.json();
  return data.predictions[0].bytesBase64Encoded 
    ? `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`
    : null;
}
