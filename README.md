# AI Chatbot UI

> AI chatbot with conversation history and clean UI. Next.js 14 + z-ai-web-dev-sdk (server-side only).

![CI](https://github.com/arjundroid12/ai-chatbot-ui/actions/workflows/ci.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

- **AI-powered chat** via z-ai-web-dev-sdk (GLM model)
- **Conversation history** — full message context sent to the model
- **Clean chat UI** — color-coded user/AI bubbles, avatars, timestamps
- **Loading state** — "typing..." indicator while AI responds
- **Clear chat** button to start fresh
- **Session counter** — tracks exchanges in current session
- **API key stays server-side** — never exposed to the browser

## 🚀 Quick Start

```bash
git clone https://github.com/arjundroid12/ai-chatbot-ui.git
cd ai-chatbot-ui
npm install

# Set your API key (get one from your AI provider)
export ZAI_API_KEY="your-api-key"

npm run dev
# Visit http://localhost:3000
```

## 📡 API

### `POST /api/chat`

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'
```

Response:
```json
{ "content": "Hello! How can I help you today?" }
```

## 🔒 Security

- **API key is server-side only** — the `z-ai-web-dev-sdk` runs in the Next.js API route, never in the browser
- The `ZAI_API_KEY` env var is read by the SDK; never commit it
- For production, use Vercel/Render env vars or a secrets manager

## 📁 Project Structure

```
ai-chatbot-ui/
├── app/
│   ├── api/chat/route.js  # Server-side AI endpoint
│   ├── layout.js          # Root layout
│   └── page.js            # Chat UI (client component)
├── package.json
├── next.config.js
└── README.md
```

## 📄 License

MIT © Arjun Vashishtha
