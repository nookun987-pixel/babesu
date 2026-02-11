import { ChatMessage } from '../types';

class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  async chat(history: ChatMessage[], newMessage: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('⚠️ Chưa cấu hình API key. Vui lòng thêm VITE_GEMINI_API_KEY vào file .env.local');
    }

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: newMessage
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'Không nhận được phản hồi từ AI';
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      throw new Error(error.message || 'Lỗi kết nối với Gemini API');
    }
  }
}

export const geminiService = new GeminiService();
