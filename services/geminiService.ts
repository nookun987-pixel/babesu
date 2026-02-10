
import { GoogleGenAI, Type, VideoGenerationReferenceType } from "@google/genai";
import { ChatMessage, AspectRatio } from "../types";

export class GeminiService {
  private async getAI() {
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio.openSelectKey();
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateImage(prompt: string, aspectRatio: AspectRatio = "1:1", referenceImages: string[] = []): Promise<string> {
    const ai = await this.getAI();
    const parts: any[] = [];
    
    referenceImages.slice(0, 3).forEach((base64) => {
      const data = base64.includes(',') ? base64.split(',')[1] : base64;
      parts.push({ inlineData: { data, mimeType: 'image/png' } });
    });

    parts.push({ text: `Task: Generate cinematic AAA quality image. Subject: Mikage. Scenario: ${prompt}. Quality: 8k, raytracing. Output must be image data.` });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
            imageSize: "1K"
          }
        }
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      throw new Error("Không tìm thấy dữ liệu ảnh.");
    } catch (error: any) {
      if (error.message?.includes("Requested entity was not found")) {
        await (window as any).aistudio.openSelectKey();
      }
      throw error;
    }
  }

  async generateVideo(prompt: string, aspectRatio: "16:9" | "9:16" = "16:9", resolution: "720p" | "1080p" = "720p", referenceImages: string[] = [], onProgress?: (msg: string) => void): Promise<string> {
    const ai = await this.getAI();
    onProgress?.("Khởi tạo chuỗi video...");
    
    const useMultiRef = referenceImages.length > 1;
    const model = useMultiRef ? 'veo-3.1-generate-preview' : 'veo-3.1-fast-generate-preview';
    
    try {
      let operation = await ai.models.generateVideos({
        model,
        prompt,
        config: {
          numberOfVideos: 1,
          resolution: useMultiRef ? '720p' : resolution,
          aspectRatio,
          referenceImages: useMultiRef ? referenceImages.slice(0, 3).map(img => ({
            image: { imageBytes: img.includes(',') ? img.split(',')[1] : img, mimeType: 'image/png' },
            referenceType: VideoGenerationReferenceType.ASSET
          })) : undefined
        },
        image: !useMultiRef && referenceImages[0] ? {
          imageBytes: referenceImages[0].includes(',') ? referenceImages[0].split(',')[1] : referenceImages[0],
          mimeType: 'image/png'
        } : undefined
      });

      while (!operation.done) {
        await new Promise(r => setTimeout(r, 10000));
        operation = await ai.operations.getVideosOperation({ operation });
        onProgress?.("Đang kết xuất khung hình...");
      }

      const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
      const res = await fetch(`${uri}&key=${process.env.API_KEY}`);
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    } catch (error: any) {
      if (error.message?.includes("Requested entity was not found")) {
        await (window as any).aistudio.openSelectKey();
      }
      throw error;
    }
  }

  async suggestNextBeats(lastPrompt: string, context: string[]): Promise<any[]> {
    const ai = await this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on: "${lastPrompt}", context: ${context.join('->')}, suggest 3 next cinematic steps in JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              type: { type: Type.STRING },
              label: { type: Type.STRING },
              prompt: { type: Type.STRING },
              sub: { type: Type.STRING },
              sound: { type: Type.STRING },
              camera: { type: Type.STRING }
            },
            required: ['id', 'type', 'label', 'prompt', 'sub', 'sound', 'camera']
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  }

  async chat(history: ChatMessage[], message: string): Promise<string> {
    const ai = await this.getAI();
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: { systemInstruction: "Bạn là AI Core của Mikage. Trả lời ngắn gọn, chuyên nghiệp." },
      history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] }))
    });
    const res = await chat.sendMessage({ message });
    return res.text || "";
  }
}

export const geminiService = new GeminiService();
