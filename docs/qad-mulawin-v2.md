# QA & Test Plan (QAD)

**Project:** Barangay Mulawin — Digital Services Portal (V2)
**Date:** 2026-07-01
**Version:** 0.1
**Owner:** Earl Clyde Bañez
**Status:** Draft
**PRD:** [prd-mulawin-v2.md](prd-mulawin-v2.md)
**RFC:** [rfc-mulawin-v2-request-lifecycle.md](rfc-mulawin-v2-request-lifecycle.md)

---

## 1. Testing Strategy & Scope

**In Scope:**
- All Must-Have features from PRD §3: request form, reference number, status tracking, staff login, queue, status transitions, payment recording, audit log
- Should-Have features: rejection with reason, needs-revision flag, printable claim slip
- Full resident submission flow (mobile)
- Full staff queue + release flow (desktop)
- All 6 status transition paths including terminal states
- Auth: staff login, session persistence, session expiry, logout
- Invalid transition enforcement (server-side validation)

**Out of Scope:**
- Load/stress testing above 100 concurrent users (V2 scale does not require it)
- Full WCAG accessibility audit (addressed in DSD; manual spot-check only for V2)
- Could-Have feature: file/ID upload (deferred)
- Won't-Have features: SMS/email notifications, online payment
- iOS/Android native app (web only)

**Testing levels:**

| Level | Tooling | Owner |
|-------|---------|-------|
| Type checking | `tsc --noEmit` | Engineer (CI) |
| Lint | ESLint + Next.js config | Engineer (CI) |
| Build verification | `next build` | Engineer (CI) |
| Manual functional | Physical devices (mobile + desktop browser) | Earl Clyde Bañez |
| User acceptance (UAT) | Real browser, staging environment | Remil D. Sosa (staff) + 3 resident testers |

> Note: Unit and integration tests are V3 scope. V2 relies on type safety (Prisma + Zod + TypeScript) + manual UAT at this scale.

---

## 2. Test Environments & Data

**Staging URL:** Vercel preview deploy — auto-generated per PR, plus a stable `staging.brgymulawin.vercel.app` (or equivalent).

**Production URL:** `https://nextjs-brgy-mulawin-website.vercel.app`

**Test credentials:**
- Staff account: `qa.staff@brgymulawin.test` / stored in `.env.test` (never committed)
- Second staff account for multi-staff audit log testing: `qa.staff2@brgymulawin.test`

**Data policy:** Use Neon `staging` branch for all testing. Never use production data for tests. Reset test data before each UAT cycle.

**Test data setup:**

```bash
# Generate Prisma client + push schema to staging DB
npx prisma generate
npx prisma db push --accept-data-loss   # staging only — never run on prod

# Seed document types + staff accounts
npx prisma db seed
```

**Seed data to include:**
- 4 document types: Barangay Clearance (₱50), Certificate of Residency (₱30), Certificate of Indigency (free), Business Permit (₱200)
- 2 staff user accounts (hashed passwords via `bcryptjs`)
- 5 pre-seeded requests in various statuses for staff queue testing

---

## 3. Core Test Scenarios

### Happy Paths (all must pass before launch)

| ID | Scenario | Steps | Expected Result | US-ID |
|----|----------|-------|-----------------|-------|
| H-01 | Resident submits a document request | Visit `/request` → select document type → fill personal info → review → submit | Reference number displayed (format `MUL-YYYY-XXXXXX`); request appears in staff queue as `SUBMITTED` | US-01 |
| H-02 | Resident tracks request by reference number | Visit `/track` → enter reference number → submit | Current status displayed with plain-language instruction matching status | US-02 |
| H-03 | Staff views request queue | Log in → visit `/admin/requests` | Table shows all requests sorted by `submittedAt` ascending; status badges correct | US-03 |
| H-04 | Staff approves request for pickup | Click request row → click "Mark for Pickup" → confirm | Status changes to `FOR_PICKUP`; audit log entry created with staff name + timestamp | US-04 |
| H-05 | Staff flags needs revision | Click request row → click "Needs Revision" → enter reason → confirm | Status changes to `NEEDS_REVISION`; resident tracking page shows revision note | US-04 |
| H-06 | Staff rejects request | Click request row → click "Reject" → enter reason → confirm | Status changes to `REJECTED`; rejection reason visible on resident tracking page | US-04 |
| H-07 | Staff records cash payment and releases | Open `FOR_PICKUP` request → click "Record Release" → enter amount + OR number + name → confirm | Status changes to `RELEASED`; payment row created; request removed from active queue | US-05 |

### Sad Paths (edge cases and error handling)

| ID | Scenario | Input / Trigger | Expected Behavior |
|----|----------|-----------------|-------------------|
| S-01 | Resident submits form with required field empty | Leave `fullName` blank → click Next | Inline validation error shown; cannot advance to next step |
| S-02 | Resident enters invalid reference number | Enter `MUL-0000-000000` on `/track` | "No request found" message; no 500 error |
| S-03 | Staff attempts invalid status transition via API | PATCH `/api/admin/requests/[id]/status` with `{ to: "RELEASED" }` directly | Returns `400` with reason: "Use the /release endpoint" |
| S-04 | Staff attempts `SUBMITTED → RELEASED` skip | PATCH with `{ to: "RELEASED" }` on a `SUBMITTED` request | Returns `400`; status unchanged; audit log has no new entry |
| S-05 | Staff tries to release without OR number (paid document) | POST `/release` with `orNumber: ""` on a ₱50 document | Returns `400` with reason: "OR number required for paid documents" |
| S-06 | Staff tries to release an already-released request | POST `/release` on a `RELEASED` request | Returns `409 Conflict`; no duplicate payment row created |
| S-07 | Staff logs in with wrong password | Enter incorrect password → submit | Returns error message "Invalid credentials"; no session created |
| S-08 | Unauthenticated access to admin endpoint | Call `GET /api/admin/requests` with no session cookie | Returns `401 Unauthorized` |
| S-09 | Session expires mid-session | Manually expire session cookie → click any admin action | Redirected to `/admin/login`; no data lost |
| S-10 | Network drops during resident form submission | Submit form → simulate network failure | Form shows error state; input values preserved; resident can retry |

---

## 4. Automation vs. Manual Testing

### Automated (CI — runs on every PR and push to `main`)

```yaml
# .github/workflows/ci.yml additions for V2
- name: TypeScript check
  run: npx tsc --noEmit

- name: Prisma generate
  run: npx prisma generate

- name: Lint
  run: npm run lint

- name: Build
  run: npm run build
```

**CI gate:** PR cannot merge if any step fails. Build failure on `main` blocks production deploy.

### Manual / Exploratory (required before each production release)

**Resident flow (mobile device — Chrome on Android or Safari on iOS):**
- Complete H-01 and H-02 end-to-end on a real phone
- Verify form is usable on a 375px viewport (iPhone SE size)
- Verify reference number is copyable on mobile

**Staff flow (desktop browser — Chrome or Edge):**
- Complete H-03 through H-07 end-to-end in one sitting
- Verify queue table is readable and sortable
- Verify confirm dialogs prevent accidental actions (click Cancel, verify nothing changed)
- Verify printable claim slip renders correctly in browser print dialog

**Sad path verification (manual):**
- S-03, S-05, S-06: test via browser dev tools (Network tab → replay requests with modified payloads)
- S-07, S-08, S-09: test via browser (wrong credentials, cookie deletion)
- S-10: test via Chrome DevTools → Network → Offline mode

**UAT sign-off (Remil D. Sosa):**
- Complete one full request lifecycle from submission (as resident) to release (as staff) on staging
- Confirm queue is understandable without training documentation
- Sign off via written message or email before production deploy

---

## 5. Bug Triage Protocol

| Severity | Definition | Action |
|----------|------------|--------|
| **P0 — Blocker** | Request submission fails and data is lost; release records a payment but status stays `FOR_PICKUP`; admin routes accessible without auth; production DB corrupted | Cannot launch. Fix immediately. |
| **P1 — High** | Invalid status transition accepted by server; wrong status shown on resident tracking; OR number not saved on release; staff login broken | Cannot launch. Fix before release. |
| **P2 — Medium** | UI glitch on mobile form; queue table sort not working; claim slip formatting broken | Can launch. Fix in next update. |
| **P3 — Low** | Copy error on status instruction; spacing issue on desktop; wrong color on status badge | Can launch. Backlog. |

**Bug tracking:** GitHub Issues with labels `bug/P0`, `bug/P1`, `bug/P2`, `bug/P3`.

---

## 6. Release Criteria (Definition of Done)

Launch is approved when **all** of the following are true:

- [ ] All P0 bugs resolved and verified fixed
- [ ] All P1 bugs resolved and verified fixed
- [ ] Happy path scenarios H-01 through H-07 pass — verified manually on staging
- [ ] Sad path scenarios S-01 through S-10 verified manually on staging
- [ ] CI pipeline green: typecheck + lint + prisma generate + build all pass
- [ ] Remil D. Sosa completes UAT on staging and signs off on staff flow
- [ ] 3 resident testers complete H-01 and H-02 on staging from their own devices
- [ ] Prisma migration `migrate deploy` tested on a fresh Neon staging branch
- [ ] `DATABASE_URL` and `NEXTAUTH_SECRET` confirmed set in Vercel production environment variables
- [ ] Feature flag `ENABLE_REQUEST_SYSTEM=true` set in Vercel production environment

---

## 7. AI / LLM Evaluation

N/A — no AI components in V2.

---

## Self-Check

- [ ] Every Must-Have PRD feature has at least one Happy Path scenario
- [ ] Every Happy Path has at least one corresponding Sad Path
- [ ] Automated checks are defined and will run in CI
- [ ] Section 7 is marked N/A
- [ ] Release criteria are binary (pass/fail), not subjective
- [ ] Test data setup command is documented

---

*Next document: [gtm-mulawin-v2.md](gtm-mulawin-v2.md)*
