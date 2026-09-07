# The Two Wheelers

A motorcycle riding community website based in Nairobi, Kenya. Publishes trips/rides, a photo gallery of ride memories, and a password-protected admin CMS powered by Supabase.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- React Router
- Supabase (Auth, Postgres, Storage)

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

The project requires a `.env` file at the root with the following variables (this file is git-ignored and never committed):

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Scripts

| Command        | Description                  |
| -------------- | ---------------------------- |
| `npm run dev`  | Start the Vite dev server    |
| `npm run build`| Type-check and build         |
| `npm run lint` | Run ESLint                   |
| `npm run preview` | Preview the production build |

## Structure

```
src/
├── components/   # Reusable UI (Header, Footer, TripCard, ImageInput, ...)
├── context/      # Global app state (Supabase data + auth)
├── lib/          # Supabase client + shared helpers
├── pages/        # Route pages (Home, Trips, Gallery, Admin, ...)
├── App.tsx       # Router + layout
├── types.ts      # Shared TypeScript types
└── main.tsx      # Entry point
```

## Database

`supabase_schema.sql` and `supabase_admin_migration.sql` define the tables (`trips`, `gallery_images`, `home_content`, `profiles`), RLS policies, and storage buckets.
