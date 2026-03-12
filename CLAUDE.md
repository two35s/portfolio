# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Youssef (two35s.github.io). React/Vite frontend hosted on GitHub Pages, with Supabase as the backend (database + auth).

## Commands

- `npm run dev` — start Vite dev server (default port 5173)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build
- `npm run lint` — ESLint (flat config, JS/JSX only)

### Supabase
- `supabase db push` — push migrations to remote database
- `supabase migration list` — list migration status
- Project ref: `cbblnjbdzazaxfkuufit` (West EU)

## Architecture

- **Frontend**: React 19 + Vite 7, client-side HashRouter (routes: `/`, `/projects`, `/projects/:id`, `/admin`)
- **Backend**: Supabase (PostgreSQL + Auth + RLS). Frontend queries Supabase directly via `@supabase/supabase-js`
- **Styling**: Component-scoped CSS files (no CSS modules or preprocessor), theme toggling via `data-theme` attribute on `<html>`
- **Effects**: three.js/postprocessing for 3D, custom cursor via @cursorify, ClickSpark effect component
- **Admin**: Auth-protected dashboard at `/admin` for project CRUD. Uses Supabase email/password auth with RLS policies (public read, authenticated write)

## Key Conventions

- ESM throughout (`"type": "module"`)
- ESLint rule: unused vars starting with uppercase or underscore are allowed (`varsIgnorePattern: '^[A-Z_]'`)
- Theme state lives in `App.jsx`, persisted to localStorage, passed down as props
- No test framework is configured
- Supabase config (public anon key + URL) lives in `src/lib/supabase.js`
