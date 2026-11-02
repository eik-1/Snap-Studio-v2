# SnapStudio

An AI photo studio for training personalized LoRA models and generating portraits, headshots, styled images, and virtual fashion try-ons.

SnapStudio combines a React dashboard with an Express API that manages AI provider requests, model training, subscriptions, credits, and saved image collections.

## Features

- Train a personalized Flux LoRA model from an uploaded ZIP of photos.
- Generate images from custom prompts using a trained model.
- Create headshots from preset styles.
- Restyle uploaded images with predefined transformations.
- Preview clothing with person and garment image uploads.
- Save, retrieve, and delete generated images.
- Manage subscriptions through Stripe and track generation, training, and fashion credits.
- Receive model training completion and failure updates through Server-Sent Events.

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, Vite, JavaScript |
| UI | Tailwind CSS, shadcn/ui, Radix UI, Framer Motion |
| Server state | TanStack Query |
| API | Node.js, Express, Multer |
| Authentication and data | Supabase Auth, database, and storage |
| AI | Fal.ai for training and generation; Replicate for older model workflows |
| Billing | Stripe |
| Analytics | PostHog |
| Deployment | Vercel frontend; Docker and GitHub Actions for the API |

## Backend architecture

### Authentication

The client signs users in through Supabase and attaches access tokens to authenticated API requests. Express middleware verifies those tokens against the project's published JWKS and checks the issuer.

### Asynchronous model training

1. The API checks the model name and available training credits.
2. It uploads the training archive to Fal.ai and submits a queued job.
3. It stores the provider request ID and initial model state in Supabase.
4. Fal.ai delivers the result to the training webhook.
5. The handler updates the model record and sends an SSE event to the user's connected client.

Image generation uses the stored LoRA model URL with a custom prompt or headshot preset. Controllers check credit balances before calling the provider and include credit restoration logic for failure paths. Users can save generated results to their collections.

### API overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/fal/trainImageModel` | Submit a training job |
| POST | `/fal/run-custom-prompt` | Generate images with a trained model |
| POST | `/fal/run-headshot` | Generate headshots from a preset |
| POST | `/fal/run-styles` | Restyle an uploaded image |
| POST | `/fal/fashion` | Generate virtual try-on images |
| POST | `/database/user-models` | Retrieve a user's models |
| POST | `/database/get-saved-images` | Retrieve saved images |
| POST | `/database/get-subscription` | Retrieve subscription details |
| GET | `/sse/events/:userId` | Receive model training updates |

Collection routes also cover saving and deleting images, with separate endpoints for headshots and fashion images. Provider callbacks are mounted under `/falWebhook`, `/replicateWebhook`, and `/webhook`.

See the route and controller files for payloads and authentication requirements.

## Project structure

| Path | Purpose |
| --- | --- |
| `frontend/` | React application, public pages, and authenticated dashboard |
| `server-supabase/index.js` | API entry point, middleware, CORS, and route registration |
| `server-supabase/controllers/` | AI integration, database operations, and webhook handlers |
| `server-supabase/routes/` | Generation, collection, billing, and SSE routes |
| `server-supabase/middlewares/` | Token verification and upload handling |
| `server-supabase/utils/` | Prompts, subscription plans, and response helpers |
| `.github/workflows/` | Deployment automation |

## Run locally

Use a recent Node.js version with npm. You also need a configured Supabase project and Fal.ai credentials. Billing requires Stripe configuration, and AI requests use paid external services.

### 1. Install dependencies

```bash
git clone https://github.com/eik-1/Snap-Studio-v2.git
cd Snap-Studio-v2

cd frontend
npm install
cd ../server-supabase
npm install
```

### 2. Configure the frontend

Create `frontend/.env`:

```dotenv
VITE_API_URL=http://localhost:3000
VITE_APP_URL=http://localhost:5173
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-supabase-public-key
```

Use a public Supabase key in the frontend. Keep server credentials in the API environment.

### 3. Configure the API

Create `server-supabase/.env` with the core settings:

```dotenv
PORT=3000
ALLOWED_CLIENT_URL=http://localhost:5173
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-server-supabase-key
FAL_API_KEY=your-fal-api-key
FAL_WEBHOOK_URL=https://your-public-api-url/falWebhook
```

Fal.ai needs a publicly reachable callback URL for training. Use an HTTPS tunnel when testing training against a local API.

To use the complete application:

- Provision the Supabase tables, storage, and access policies expected by the database controllers. Environment variables do not create these resources.
- Configure Supabase authentication and frontend redirect URLs.
- Configure Stripe credentials and webhook delivery, plus the plan IDs and payment links referenced in `server-supabase/utils/stripePlans.js`.
- Set `REPLICATE_API_TOKEN` if using the Replicate routes.
- Review the PostHog configuration for your deployment.

The server's `.env.example` is incomplete. Check the integration code when configuring billing and legacy workflows.

### 4. Start the applications

Run the API in one terminal:

```bash
cd server-supabase
npm start
```

Run the frontend in another:

```bash
cd frontend
npm run dev
```

Open the URL printed by Vite. Keep `ALLOWED_CLIENT_URL` aligned with the frontend's actual origin.

## Development commands

| Directory | Command | Purpose |
| --- | --- | --- |
| `frontend/` | `npm run dev` | Start the development server |
| `frontend/` | `npm run build` | Build the frontend |
| `frontend/` | `npm run lint` | Run ESLint |
| `frontend/` | `npm run preview` | Preview the frontend build |
| `server-supabase/` | `npm start` | Start the Express API |

## Implementation notes

SSE connections live in memory within the API process. A deployment with multiple API instances would need shared event delivery.

Neither application's package file defines an automated test script. Running the complete application also requires the external services and database configuration described above.

Older documentation references Appwrite and a `backend/` directory. The current application uses Supabase and `server-supabase/`.
