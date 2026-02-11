import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import imageRoute from './routes/generate-image.js';
import videoRoute from './routes/generate-video.js';
import audioRoute from './routes/generate-audio.js';
import chatRoute from './routes/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Babesu AI Backend Running' });
});

// Routes
app.post('/api/generate-image', imageRoute);
app.post('/api/generate-video', videoRoute);
app.post('/api/generate-audio', audioRoute);
app.post('/api/chat', chatRoute);

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
