# Y/B.

Youssef's personal portfolio — built with React, Vite, Express, and PostgreSQL.

## Getting Started

### Frontend
```bash
npm install
npm run dev        # dev server on localhost:5173
npm run build      # production build
npm run lint       # eslint
```

### Backend
```bash
cd backend
npm install
npm run dev        # dev server on localhost:3001 (requires .env)
```

Backend expects a `.env` with:
- `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`
- Optional: `CORS_ORIGIN` (comma-separated list, defaults to `http://localhost:5173`)

Frontend API settings:
- `VITE_API_BASE_URL` (optional, defaults to `/api`)
- `VITE_API_PROXY_TARGET` (optional dev proxy target, defaults to `http://localhost:3001`)

## Stack

| Layer      | Tech                                              |
|------------|---------------------------------------------------|
| Frontend   | React 19, Vite 7, react-router-dom                |
| Backend    | Express, PostgreSQL (pg)                           |
| Styling    | Component-scoped CSS, dark/light theme toggle      |
| Effects    | Three.js, postprocessing, @cursorify, ClickSpark    |
