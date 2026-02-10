<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🤖 Project Mikage - AI Studio App

Master production hub powered by Google Gemini AI.

View your app in AI Studio: https://ai.studio/apps/drive/1sNxMcUW0G2QXGeP8e-fKAiWVt6PsX9I2

---

## 🚀 Run Locally

**Prerequisites:** Node.js (v18+)

### Installation Steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nookun987-pixel/babesu.git
   cd babesu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Then open `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   🔑 Get your API key at: https://aistudio.google.com/app/apikey

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🔒 Security Best Practices

- ⚠️ **NEVER commit `.env` or `.env.local` files to GitHub**
- ✅ The `.gitignore` file is configured to protect your API keys
- ✅ Use `.env.example` as a template for other developers
- 🔐 When deploying (Vercel, Netlify, etc.), add `GEMINI_API_KEY` in the hosting platform's environment variables settings

---

## 📦 Tech Stack

- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API
- **Charts:** Recharts
- **Icons:** Lucide React

---

## 📝 License

MIT License
Update README with security guidelines and setup instructions
