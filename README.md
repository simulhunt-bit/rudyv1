# 🦦 Rudy AI

**Your AI adventure companion.** Rudy is a free, local-first V1 prototype for chatting, studying, coding, researching, brainstorming, and writing with one original AI companion.

## Features

- Original Rudy personality and polished responsive landing/chat interface
- Local browser conversation persistence (easy to replace with a future storage provider)
- Server-side OpenAI, Gemini, and automatic provider routing
- Provider selector, quick-action starters, settings, light/dark/system appearance
- Copy, regenerate, retry/error UI, local clear, sign-out prototype flow
- Metadata, robots, accessible focus states, reduced-motion support

## Stack

Next.js App Router, TypeScript, React, Tailwind CSS v4, and browser localStorage for V1.

## Run locally

1. Install Node.js 20.9 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and provide one or both server-only provider keys.
4. Run `npm run dev`, then open `http://localhost:3000`.
5. Run `npm run build` before deployment.

## Environment and security

`OPENAI_API_KEY` and `GEMINI_API_KEY` are read only in server route/provider modules. Never add `NEXT_PUBLIC_` to provider keys; do not commit `.env.local`. Set optional model variables when a provider model needs changing.

For production Google authentication, register `https://qartibe.space` as an authorized JavaScript origin and redirect URI in Google Cloud. This V1 deliberately uses a local prototype session until a server-side OAuth session store is connected. Request only basic identity scopes and keep any Google client secret server-only.

## Deployment

Deploy to a platform supporting Next.js server routes and configure environment variables in that platform's secret manager. A purely static export cannot make secret-backed AI API calls; the UI is static-friendly while `/api/chat` remains server-side by design.

## Future roadmap

Google Drive storage, durable user sessions, streamed responses, voice/media capabilities, BYOK, persistent memory, and more provider adapters can be added without changing the chat UI contract.
