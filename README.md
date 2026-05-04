# Celestial Astrology App

**Live:** https://astrology-app-hazel.vercel.app

A multi-system astrology web app. Enter your birth details once and get readings across ten different systems — all in one place.

## How it works

1. You enter your name and date of birth on the profile page
2. The app stores your details in local state (nothing is sent to a server)
3. Each module runs its own calculator against your birth data — no external API calls for the readings themselves
4. If you tap the AI reading button on any module, it sends your reading data to a Gemini-powered API route which returns a personalised interpretation

## Modules

| Module | System |
|---|---|
| Astrology | Western sun/moon/rising |
| MBTI | Myers-Briggs personality type |
| Numerology | Life path, expression, soul urge numbers |
| Chinese Zodiac | Animal sign by birth year |
| Human Design | Energy type, authority, profile |
| Mayan | Tzolk'in day sign and tone |
| BaZi | Four Pillars of Destiny |
| Zi Wei Dou Shu | Purple Star Astrology |
| Star Mansions | 28 Lunar Mansions |
| BaZi+ | Extended Chinese astrology |

## Stack

- Next.js + TypeScript
- Tailwind CSS
- Google Gemini API (AI readings only)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file:

```
GEMINI_API_KEY=your_key_here
```

Get a free key at [aistudio.google.com](https://aistudio.google.com). The app works without it — AI readings will be disabled but all calculators still run.
