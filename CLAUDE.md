# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

SnapStudio is an AI image-generation platform: users train a personalized LoRA model from photos of themselves, then generate custom images, headshots, fashion try-ons, and styled images. Monorepo with two independent apps:

- `frontend/` — Vite + React 18 SPA (JSX, not TypeScript), Tailwind + shadcn UI
- `server-supabase/` — Express API (ESM Node)

> **Note:** `README.md` and `instructions.md` are stale. They describe an Appwrite + Replicate stack and a `backend/` directory that no longer exist. The live stack is **Supabase** (auth/DB/storage), **Fal.ai** (primary image gen + training), **Replicate** (secondary/legacy training in `replicateController.js`), **Stripe** (subscriptions), and **PostHog** (analytics). Trust the code over those docs.

## Commands

Frontend (`cd frontend`):
- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run lint` — ESLint over the project
- `npm run preview` — preview the build

Server (`cd server-supabase`):
- `npm start` — `node index.js` (no watch/reload; restart manually). Listens on `PORT` (default 3000).
- No test suite exists in either app.

Path alias: `@/` → `frontend/src/` (configured in `jsconfig.json` / `vite.config.js`).

## Architecture

### Async AI generation flow (the core pattern)
Image generation and model training are long-running. The flow is:
1. Frontend calls a server endpoint (`/fal/*` or `/models/*`) with a Supabase JWT bearer token.
2. The controller submits a job to Fal.ai (`fal.subscribe` for quick jobs, `fal.queue.submit` + webhook for training) and writes/updates rows in Supabase.
3. On completion, Fal calls back to `/falWebhook` (training) or the controller pushes directly; the webhook/controller calls `sendEventToClients(data, userId)`.
4. `sendEventToClients` (in `routes/sseRoutes.js`) writes a Server-Sent Event to that user's open connection on `/sse/events/:userId`.
5. Frontend `useSSE` hook receives the event and refreshes via React Query.

When touching generation, keep all four pieces in sync: the controller, the route, the webhook handler, and the SSE push. The in-memory `clients` array in `sseRoutes.js` means SSE state is **not** shared across server instances — the deployment runs a single container.

### Auth
- Frontend authenticates against Supabase directly (`services/configs/supabase.js`); session/token handling lives in `services/configs/apiConfig.js`, which auto-refreshes and signs the user out on invalid sessions.
- Every API call goes through `services/utils/apiRequest.js`, which attaches `Authorization: Bearer <supabase access_token>`.
- Server verifies that JWT with `jsonwebtoken` against `SUPABASE_JWT_SECRET` in `middlewares/authMiddleware.js`, setting `req.userId = decode.sub`. Apply this middleware to any new authenticated route.

### Server request gating
`index.js` has a global `verifyOrigin` middleware that rejects requests whose `Origin`/`Referer` don't match `ALLOWED_CLIENT_URL`. Paths starting with `/webhook`, `/replicateWebhook`, `/falWebhook`, and `/sse` are explicitly exempted (external callers have no matching origin). Any new webhook or external-callback route **must** be prefixed accordingly or added to this exemption list, or it will 403.

Routes (mounted in `index.js`): `/models` (replicate), `/database`, `/webhook` (stripe), `/replicateWebhook`, `/falWebhook`, `/sse`, `/fal`. Stripe's webhook uses `express.raw` and is registered before the global `express.json` parser.

### Frontend state
React Query for server state. Cross-cutting client state lives in nested context providers wrapping the authenticated `/app` route tree (see `App.jsx`): `SubscriptionProvider`, `ImageProvider`, `ModelProvider`, `NotificationProvider`, `NavigationProvider`, plus a top-level `UserContext`. The app splits into a public landing area (`/`) and a protected dashboard (`/app/*`) guarded by `ProtectedRoute`.

All backend calls are centralized in `services/api/services.js` (functions like `generateImage`, `generateHeadshot`, `startTraining`, `getUserModels`). Add new endpoints there rather than calling `apiRequest` ad hoc from components.

### Subscriptions
Stripe plans are defined in `server-supabase/utils/stripePlans.js`, with price IDs and payment links pulled from env vars (`BASICMONTHLY_ID`, `PROMONTHLY_URL`, etc.). Plan changes touch both this file and the Stripe dashboard.

## Environment

Server (`.env`, see `.env.example` — note the example is incomplete): `REPLICATE_API_TOKEN`, `SUPABASE_KEY`, `SUPABASE_URL`, plus (required by code) `SUPABASE_JWT_SECRET`, `ALLOWED_CLIENT_URL`, `FAL_KEY`, Stripe keys + the plan price/URL vars, `PORT`.

Frontend (`VITE_`-prefixed): `VITE_API_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_KEY`. (The `VITE_APPWRITE_*` vars in `.env.example` are stale and unused.)

Note: `useSSE.js` and a few spots hardcode `http://localhost:3000` — check for hardcoded URLs when changing the server origin.

## Deployment

- Server: GitHub Actions (`.github/workflows/`) on push to `main` SSHes into an Azure VM, `git pull`, rebuilds the Docker image (`server-supabase/Dockerfile`), and restarts the `snap_server_container` (host `127.0.0.1:8080` → container `3000`). Single container — no horizontal scaling.
- Frontend: Vercel (`frontend/vercel.json` rewrites all routes to `/` for SPA client-side routing).
