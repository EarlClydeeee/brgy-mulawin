# Implementation Plan — Admin News (Simplified)

## Overview

Replace static `lib/announcements.ts` with a database-driven CMS. Five tasks, ship each fully before moving to the next.

## Tasks

- [x] 1. Database
  - [x] 1.1 Add `Post` model to `prisma/schema.prisma`
  - [x] 1.2 Add migration SQL file
  - [x] 1.3 Run `npx prisma generate` to regenerate Prisma client with Post type

- [x] 2. Server actions — `app/actions/news.ts`
  - [x] 2.1 Add `requireAdmin` helper and Zod schema (headline 1–200, caption 1–500) and export `PostActionState` type
  - [x] 2.2 Implement `createPost` — validate, optional single image upload to Supabase Storage inline, `prisma.post.create`, `revalidatePath`, redirect to `/admin/news`
  - [x] 2.3 Implement `updatePost` — same validation, replace/remove single image best-effort, `prisma.post.update`, `revalidatePath`, redirect
  - [x] 2.4 Implement `deletePost` — best-effort image delete, `prisma.post.delete`, `revalidatePath`
  - [x] 2.5 Implement `toggleFeatured` — `prisma.$transaction` to unfeature all then feature one; return `{ success, error }`

- [x] 3. Admin UI — `/admin/news`
  - [x] 3.1 Create `app/admin/news/_components.tsx` — `PostForm` (headline, caption, single file input, `useActionState`), `FeatureButton` (`useTransition`, calls `toggleFeatured`), `DeleteButton` (confirm dialog, calls `deletePost`)
  - [x] 3.2 Create `app/admin/news/page.tsx` — `force-dynamic`, `prisma.post.findMany` ordered newest first, list cards matching requests page style, "New Post" button, empty state
  - [x] 3.3 Create `app/admin/news/new/page.tsx` — render `<PostForm mode="create" />`
  - [x] 3.4 Create `app/admin/news/[id]/edit/page.tsx` — fetch post, `notFound()` if missing, render `<PostForm mode="edit" initialValues={post} />`
  - [x] 3.5 Update `app/admin/layout.tsx` — add "News" nav link, update subtitle

- [x] 4. Public pages — wire to database
  - [x] 4.1 Update `components/AnnouncementsSection.tsx` — convert to async Server Component, `prisma.post.findMany({ take: 3, orderBy: { createdAt: 'desc' } })`, extract client child for modal state only
  - [x] 4.2 Update `components/NewsContent.tsx` — convert to async Server Component, fetch all posts, featured slot when `isFeatured=true`, client child for modal
  - [x] 4.3 Update `components/AnnouncementModal.tsx` — accept a `Post`-compatible shape (headline, caption, createdAt, imageUrls); remove dependency on `category`/`color`/`details`

- [x] 5. Smoke test
  - [x] 5.1 Build the project (`npx prisma generate && next build`) and verify zero TypeScript/build errors

## Notes

- Tasks 1.1 and 1.2 are already complete (schema has Post model, migration SQL exists).
- Image handling is inline in `app/actions/news.ts` — no separate `lib/storage.ts`.
- Public pages query Prisma directly — no `getPosts`/`getTopPosts` action wrappers.
- Reuse existing `AnnouncementModal` with a mapped post shape instead of creating a new PostModal.
- `requireAdmin()` must be called at the top of every mutating Server Action (redirect to `/admin/login`).
- Match `app/admin/requests/page.tsx` for card style, empty state, and page header conventions.
- Zod v4 syntax — check actual installed version before writing schemas.
- Next.js 16 app router — read `node_modules/next/dist/docs/` before using any routing API.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.3"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4", "2.5"] },
    { "id": 3, "tasks": ["3.1"] },
    { "id": 4, "tasks": ["3.2", "3.3", "3.4", "3.5"] },
    { "id": 5, "tasks": ["4.1", "4.2", "4.3"] },
    { "id": 6, "tasks": ["5.1"] }
  ]
}
```
