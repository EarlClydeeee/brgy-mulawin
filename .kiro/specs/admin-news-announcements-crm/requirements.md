# Requirements — Admin News & Announcements

## Goal

Replace static data in `lib/announcements.ts` with posts stored in the database. Admins manage posts at `/admin/news`. The homepage shows the 3 newest posts; `/news` shows all posts with one optional featured slot.

## Scope (v1)

| In scope | Out of scope (later) |
|---|---|
| Headline + caption CRUD | Up to 5 images per post |
| One optional image per post | Property-based tests |
| Featured toggle (max 1 at a time) | Separate storage helper module |
| Admin list, create, edit, delete | REST API routes |
| Public homepage + news page | Category/color/details fields |

## User stories

### Admin

1. **List posts** — `/admin/news` shows all posts (newest first) with headline, date, and featured badge. Empty state when none exist.
2. **Create post** — Form with headline (required, max 200) and caption (required, max 500). Optional single image (JPEG/PNG/WebP, max 5 MB). Redirects to list on success.
3. **Edit post** — Same form, pre-filled. Keeps original `createdAt`.
4. **Delete post** — Confirm before delete. Removes DB record; best-effort image cleanup.
5. **Feature a post** — Toggle marks one post featured and clears others. News page shows featured block only when one exists.

### Public

6. **Homepage** — Top 3 newest posts in the announcements section. Empty message if none.
7. **News page** — Featured post (if any) + grid of the rest. Click opens modal with headline, caption, date, and image.

### Security

8. **Admin only** — Unauthenticated users cannot access `/admin/news` or mutate posts. Same auth pattern as document requests.

## Acceptance checklist

- [ ] Post model migrated and working
- [ ] Admin can create, edit, delete, and feature posts
- [ ] Homepage reads from DB (not `announcements.ts`)
- [ ] News page reads from DB (not `newsArticles`)
- [ ] Static `lib/announcements.ts` no longer used by public pages
