<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cloud Agent environment

Boot starts PostgreSQL 16 and the Next.js dev server on port 3000. Open http://localhost:3000.

`start` writes `.env.local` when these are unset:

- `DATABASE_URL` defaults to `postgresql://postgres:postgres@127.0.0.1:5432/postgres`
- `CONTACT_RATE_LIMIT_SECRET` is generated once under `/var/lib/brgy-mulawin/`
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` use local placeholders so public pages and the contact form can run

Sign-in, document requests, and admin storage need the real Supabase project values for `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Keep this environment on the local database.

Install with `npm ci`. The app checks are `npm run lint` and `npm run build`. Prisma migrations run on boot with `prisma migrate deploy`.
