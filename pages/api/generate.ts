import type { NextApiRequest, NextApiResponse } from 'next';

type StoryStep = {
  title: string;
  description: string;
};

type ResponseData = {
  steps: StoryStep[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ steps: [], error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ steps: [], error: 'Valid prompt is required' });
  }

  try {
    // AI-powered story evolution logic
    // TODO: Integrate with OpenAI/Gemini API when keys are available
    
    const characterName = prompt.includes('Mikage') ? 'Mikage' : 'Nhân vật chính';
    const baseAction = prompt.split(',')[0] || prompt.substring(0, 50);
    
    const steps: StoryStep[] = [
      {
        title: "Giai đoạn chuẩn bị",
        description: `${characterName} tập trung năng lượng, không gian xung quanh bắt đầu biến dạng với các hạt năng lượng tím phát sáng mãnh liệt.`
      },
      {
        title: "Hành động cao trào",
        description: `${characterName} tung cú lướt với tốc độ ánh sáng, để lại vệt sáng tím xé toạc không gian, tạo ra vụ nổ năng lượng khổng lồ.`
      },
      {
        title: "Kết thúc cảnh",
        description: `${characterName} đứng giữa tàn dư chiến trường, năng lượng từ từ tan biến vào mây trời rực rỡ dưới ánh hoàng hôn tráng lệ.`
      }
    ];

    // Log for monitoring
    console.log(`[Story Generation] Prompt: ${prompt.substring(0, 100)}...`);
    
    return res.status(200).json({ steps });
    
  } catch (error) {
    console.error('Error generating story:', error);
    return res.status(500).json({ 
      steps: [], 
      error: 'Internal server error during story generation' 
    });
  }
}
