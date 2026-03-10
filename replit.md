# ScapeLabs Association Website

## Overview
A React + Vite + Tailwind CSS website for Asociația ScapeLabs, a Romanian innovation lab focused on technology, education, and public spaces. The site features interactive 3D elements (Three.js), form submissions, and a multi-step onboarding flow.

## Project Architecture
- **Frontend**: React 19 + Vite 6 + Tailwind CSS 4 + Framer Motion + Three.js
  - Located in `frontend/`
  - Entry point: `frontend/main.tsx`
  - Vite config: `frontend/vite.config.ts`
  - Dev server runs on port 5000
- **Backend**: Originally built with Encore.dev framework (located in `backend/`)
  - The backend requires the Encore CLI to run, which is not available on Replit
  - Form submissions (partner/team applications) call an external Encore backend via HTTP
  - Backend URL configured via `VITE_CLIENT_TARGET` env var

## Key Files
- `frontend/App.tsx` - Main app with client-side routing
- `frontend/client.ts` - HTTP client for backend API calls (refactored from Encore-generated client)
- `frontend/components/` - UI components (Hero, Manifesto, Partners, Recruitment, etc.)
- `frontend/pages/` - Page components (Onboarding, PrivacyPolicy, TermsOfService)

## Recent Changes
- **2026-02-09**: Initial Replit setup
  - Refactored `client.ts` to remove `encore.dev` dependencies and inline types
  - Configured Vite for port 5000 with `host: '0.0.0.0'` and `allowedHosts: true`
  - Set up static deployment (builds to `frontend/dist`)

## Development
- Run: `cd frontend && npx vite dev`
- Build: `cd frontend && npx vite build`
- The frontend dev server binds to `0.0.0.0:5000`

## Environment Variables
- `VITE_CLIENT_TARGET` - Backend API base URL (defaults to empty string if not set)

## User Preferences
- None recorded yet
