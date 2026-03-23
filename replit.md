# ScapeLabs Association Website

## Overview
A fully bilingual (RO/EN) React + Vite + Tailwind CSS website for Asociația ScapeLabs, a Romanian tech NGO focused on technology, urban innovation, education, and public spaces. The site features interactive 3D elements (Three.js), form submissions, a multi-step onboarding flow, and complete RO/EN i18n.

## CRITICAL RULE — BILINGUAL CONTENT
**Every piece of content MUST be added in BOTH Romanian (`ro`) and English (`en`) in `frontend/src/i18n/translations.ts`.**
- Never add a string to only one language.
- The type system enforces this: `Translations = typeof translations.ro`, so missing keys in `en` will cause TypeScript errors.
- All components use `const { t } = useLanguage()` to access translations.

## i18n System
- **File**: `frontend/src/i18n/translations.ts` — source of truth for all UI strings
- **Context**: `frontend/src/i18n/LanguageContext.tsx` — provides `lang`, `setLang`, `t` via React context
- **Auto-detection**: reads `navigator.language` on first load (en → 'en', everything else → 'ro')
- **Persistence**: stored in `localStorage` as `scapelabs-lang`
- **Toggle**: EN/RO button in `DynamicIslandHeader.tsx` shows the OTHER language (click to switch)
- **Provider**: `LanguageProvider` wraps the entire app in `frontend/src/main.tsx`

## Project Architecture
- **Frontend**: React 19 + Vite 6 + Tailwind CSS 4 + Framer Motion + Three.js
  - Located in `frontend/`
  - Entry point: `frontend/src/main.tsx`
  - Vite config: `frontend/vite.config.ts`
  - Dev server runs on port 5000
- **Backend**: Express.js server (`server/index.cjs`)
  - Handles form submissions with nodemailer
  - Runs on port 3001 in dev, port 5000 in production
  - Bilingual email support: uses `language` field from form request to send RO or EN email labels

## Key Files
- `frontend/src/i18n/translations.ts` — ALL UI text strings (RO + EN)
- `frontend/src/i18n/LanguageContext.tsx` — language context + hook
- `frontend/src/main.tsx` — app entry, wraps with `LanguageProvider`
- `frontend/src/App.tsx` — main app with client-side routing
- `frontend/src/client.ts` — HTTP client for backend API calls (includes `language` field)
- `frontend/src/components/` — UI components (all use `useLanguage()`)
- `frontend/src/pages/` — page components (Onboarding, PrivacyPolicy, TermsOfService)
- `server/index.cjs` — Express backend with bilingual email templates

## Workflow
- **Start application**: `node server/index.cjs & (cd frontend && npx vite dev)`
- Backend: port 3001 (dev), Vite proxies `/forms` and `/health` to it

## Design System
- Background: `#030303`
- Cyan accent: `#00F0FF`
- Red accent: `#FF003C`
- Font: system + mono for terminal elements
- Animations: Framer Motion throughout

## Recent Changes
- **2026-03-23**: Full i18n system implemented
  - Created `translations.ts` with complete RO/EN strings for all components
  - Created `LanguageContext.tsx` with browser language auto-detection + localStorage persistence
  - Updated all components: DynamicIslandHeader (with toggle), Hero, Manifesto, WowVision, LabVisions, PilotProjects, Blueprint, VibeStory, BlackProjects, FinalCTA, Recruitment (modal + form), Partners (modal + form), Footer
  - Updated pages: Onboarding, PrivacyPolicy, TermsOfService
  - Updated `client.ts` to include `language` field in form requests
  - Updated `server/index.cjs` with bilingual email label system (RO/EN)
