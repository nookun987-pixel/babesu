# 🎯 Babesu AI Studio

AI Studio Web để render ảnh (Imagen), video (Veo), audio (TTS), và chat (Gemini).

## 🏗️ Kiến trúc

```
studio/
├── frontend/    # Vite + React
└── backend/     # Node + Express
```

## 🚀 Chạy Project

### Backend:
```bash
cd studio/backend
npm install
cp .env.example .env
# Điền API keys vào .env
npm run dev
```

### Frontend:
```bash
cd studio/frontend
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:3001

## 🔑 Environment Variables

Xem `studio/backend/.env.example`

Required variables:
- `GEMINI_API_KEY` - Your Google Gemini API key (get it at https://aistudio.google.com/app/apikey)
- `GCP_PROJECT_ID` - Your Google Cloud Project ID (for Imagen API)

## 📚 API Models

| Loại | Model |
|------|-------|
| Text | gemini-2.5-flash |
| Image | imagen-3.0 |
| Video | Veo |
| Audio | TTS model |

## 🔒 Security

- ✅ API keys are stored securely in backend only
- ✅ Frontend calls backend REST API endpoints
- ✅ No API keys exposed to client-side code
- ⚠️ Never commit `.env` files to version control

## 📦 Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Backend:** Node.js + Express
- **AI:** Google Gemini API, Imagen 3.0, Veo
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React

## ⚠️ Important Notes

1. **Imagen 3.0 API**: Currently using REST API placeholder. Will be updated when official SDK is released.
2. **Veo API**: Waiting for official API access.
3. **Setup**: Make sure to add `GEMINI_API_KEY` and `GCP_PROJECT_ID` to `studio/backend/.env`

## 📞 Troubleshooting

If you encounter issues:
- Check if backend is running: `http://localhost:3001/health`
- Verify API keys are set in `studio/backend/.env`
- Ensure Vite proxy config is correct in `studio/frontend/vite.config.ts`

## 📝 License

MIT License
