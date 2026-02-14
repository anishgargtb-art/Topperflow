# TopperFlow

Subscription-based AI study planner and analytics platform for students.

## Directory Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── Dockerfile
│   └── package.json
├── scripts/
├── docker-compose.yml
├── .env.example
└── package.json
```

## Features
- Next.js + Tailwind frontend with pages: Home, Dashboard, Login, Signup, Pricing, Profile.
- Firebase Google OAuth login and backend token exchange.
- Express REST API with JWT-protected routes.
- PostgreSQL schema + migration script.
- Stripe subscription checkout + webhook skeleton.
- AI planner generation and analytics engine skeleton.
- Dockerized frontend/backend and deployment scripts.

## Setup
1. Copy env template.
   ```bash
   cp .env.example .env
   ```
2. Install dependencies.
   ```bash
   npm install
   npm install --workspace frontend
   npm install --workspace backend
   ```
3. Run database migration.
   ```bash
   npm run migrate --workspace backend
   ```
4. Start development servers.
   ```bash
   npm run dev
   ```

## Scripts
- Root:
  - `npm run dev`
  - `npm run build`
  - `npm run start`
  - `npm run test`
- Backend:
  - `npm run migrate --workspace backend`
  - `npm run test --workspace backend`
- Frontend:
  - `npm run dev --workspace frontend`

## API Endpoints
- `POST /api/auth/google`
- `POST /api/planner/generate`
- `GET /api/analytics`
- `POST /api/payments/create-session`
- `POST /api/payments/webhook`
- `GET /api/user/profile`

## Deployment
- Frontend (Vercel): `./scripts/deploy-frontend-vercel.sh`
- Backend (Render/AWS): `./scripts/deploy-backend-render.sh`
