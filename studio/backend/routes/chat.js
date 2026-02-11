import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function chat(req, res) {
  try {
    const { messages, userMessage } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: 'Missing user message' });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // ✅ ĐÚNG: Dùng gemini-2.5-flash cho TEXT
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const chat = model.startChat({
      history: messages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      response: text
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: error.message || 'Chat failed' 
    });
  }
}
