import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'fundiquotations-web-portal',
    timestamp: new Date().toISOString()
  });
});

// Server-side download audit endpoint (validates payload & channel before confirmation)
app.post('/api/download/track', (req, res) => {
  const { versionId, versionName, apkChannel, sourcePage, language } = req.body ?? {};

  if (
    typeof versionId !== 'string' ||
    !/^[a-zA-Z0-9_-]{1,128}$/.test(versionId) ||
    typeof versionName !== 'string' ||
    versionName.length < 1 ||
    versionName.length > 40 ||
    apkChannel !== 'customer'
  ) {
    return res.status(400).json({
      ok: false,
      error: 'Invalid download tracking payload. Only published Customer APK events are accepted.'
    });
  }

  const safeSource = typeof sourcePage === 'string' && sourcePage.length <= 60 ? sourcePage : 'download';
  const safeLanguage = language === 'sw' ? 'sw' : 'en';

  return res.status(200).json({
    ok: true,
    recordedAt: new Date().toISOString(),
    event: {
      versionId,
      versionName,
      apkChannel: 'customer',
      sourcePage: safeSource,
      language: safeLanguage
    }
  });
});

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FundiQuotations Web Portal running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
