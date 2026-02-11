<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🤖 Project Mikage - AI Studio App

Master production hub powered by Google Gemini AI.

View your app in AI Studio: https://ai.studio/apps/drive/1sNxMcUW0G2QXGeP8e-fKAiWVt6PsX9I2

---

# 🚀 Mikage Zenith v30.1 - Production Deployment

## Triển khai lên Vercel Pro

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Chạy local development
```bash
npm run dev
```

### Bước 3: Deploy lên Vercel

#### Phương án A: Vercel CLI (Khuyến nghị)
```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Phương án B: GitHub Integration
1. Kết nối repo với Vercel tại: https://vercel.com/new
2. Import `nookun987-pixel/babesu`
3. Framework: Next.js (auto-detect)
4. Click "Deploy"

### Environment Variables (Tùy chọn)
Thêm các biến môi trường tại Vercel Dashboard → Settings → Environment Variables:

- `GEMINI_API_KEY` - Google Gemini API key (required for AI features)
- `GCP_PROJECT_ID` - Google Cloud Project ID (optional)
- `GCP_BUCKET_NAME` - Storage bucket name (optional)
- `GCP_CREDENTIALS` - Service account JSON (optional)
- `OPENAI_API_KEY` - OpenAI API key for advanced features (optional)

### Vercel Pro Features
- ✅ Unlimited bandwidth
- ✅ Advanced analytics
- ✅ Edge Functions
- ✅ Team collaboration
- ✅ Priority support

Upgrade tại: https://vercel.com/account/billing

---

## 🔒 Security Best Practices

- ⚠️ **NEVER commit `.env` or `.env.local` files to GitHub**
- ✅ The `.gitignore` file is configured to protect your API keys
- ✅ Use `.env.example` as a template for other developers
- 🔐 When deploying (Vercel, Netlify, etc.), add environment variables in the hosting platform's settings

---

## 📦 Tech Stack

- **Framework**: Next.js 15
- **Frontend:** React 18 + TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Icons**: Lucide React
- **Charts**: Recharts
- **Deployment**: Vercel Pro
- **Storage**: Google Cloud Storage (optional)
- **API**: Serverless Functions

---

## 📝 License

MIT License
