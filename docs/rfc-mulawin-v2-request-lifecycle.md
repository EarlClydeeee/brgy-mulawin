# Request for Comments (RFC) / Tech Spec

**Title:** Request Lifecycle State Machine — Status Transition Enforcement
**Date:** 2026-07-01
**Author:** Earl Clyde Bañez
**Status:** Draft
**PRD Reference:** [prd-mulawin-v2.md §3 (Core Features) and §4 (US-03, US-04, US-05)](prd-mulawin-v2.md)
**SDD Reference:** [sdd-mulawin-v2.md §3 (Data Architecture) and §4 (API Design)](sdd-mulawin-v2.md)
**RFC ID:** `mulawin-rfc-001`

---

## 1. Context & Objective

**The problem this solves:**

A document request moves through six possible statuses: `SUBMITTED → UNDER_REVIEW → FOR_PICKUP → RELEASED`, with side branches to `NEEDS_REVISION` and `REJECTED`. The risk is not complexity — it is invalid transitions. If a staff member can mark a request `RELEASED` without a payment record, the OR number audit trail breaks. If a resident's tracking page shows `FOR_PICKUP` before a staff member has reviewed, trust breaks. These rules must be enforced at the API layer, not left to UI guard rails that can be bypassed. This RFC specifies the state machine module that makes invalid transitions impossible server-side.

**Reference in PRD/SDD:**

Implements PRD §3 (status transitions, cash payment recording, audit log — all Must-Have) and US-03, US-04, US-05. Architecture lives in SDD §3 (`RequestStatusLog`, `Payment` tables) and §4 (`PATCH /api/admin/requests/[id]/status`, `POST /api/admin/requests/[id]/release`).

**Success criteria:**
- Every status transition is validated before the DB write — invalid transitions return `400` with a clear reason.
- Every successful transition atomically writes the new status + a `RequestStatusLog` row in a single Prisma transaction.
- A `RELEASED` status is only reachable via the `/release` endpoint, which requires a payment record. The `/status` endpoint cannot set `RELEASED` directly.
- No transition can be made without a valid staff session.
- Duplicate release attempts on an already-`RELEASED` request return `409 Conflict`, not a duplicate payment row.

---

## 2. Proposed Solution

**Approach:**

A `validateTransition(from, to, role)` pure function holds the complete allowed-transition table. It returns `{ ok: true }` or `{ ok: false, reason: string }`. The PATCH `/status` route calls this before any DB write. The POST `/release` route is a separate endpoint that only handles the `FOR_PICKUP → RELEASED` path — it requires additional payment fields and runs an atomic Prisma transaction that writes the `Payment` row and updates the `DocumentRequest.status` in one operation. This separation makes it impossible to set `RELEASED` without a payment record, regardless of what payload the client sends to the `/status` route.

**Architecture changes:**

- Add `lib/request-lifecycle.ts` — `validateTransition()` function + allowed transition table + per-transition payload validators
- Add `lib/request-reference.ts` — reference number generator (`MUL-YYYY-XXXXXX`)
- Add `app/api/admin/requests/[id]/status/route.ts` — PATCH handler for all transitions except release
- Add `app/api/admin/requests/[id]/release/route.ts` — POST handler for `FOR_PICKUP → RELEASED` with payment
- Add `app/api/requests/route.ts` — POST handler for resident submission
- Add `app/api/requests/track/route.ts` — GET handler for status lookup by reference number

---

## 3. Technical Details & Contracts

### Status Transition Table

```
SUBMITTED ──────→ UNDER_REVIEW
SUBMITTED ──────→ REJECTED          (staff skips review — e.g. duplicate request)

UNDER_REVIEW ───→ FOR_PICKUP
UNDER_REVIEW ───→ NEEDS_REVISION
UNDER_REVIEW ───→ REJECTED

NEEDS_REVISION ─→ UNDER_REVIEW      (resident has been told; staff re-reviews)
NEEDS_REVISION ─→ REJECTED

FOR_PICKUP ─────→ RELEASED          (only via /release endpoint — requires payment)

RELEASED ───────→ (terminal — no further transitions)
REJECTED ───────→ (terminal — no further transitions)
```

### TypeScript Contracts (`lib/request-lifecycle.ts`)

```typescript
import { RequestStatus } from "@prisma/client";

// All valid transitions keyed by fromStatus
const ALLOWED_TRANSITIONS: Record<RequestStatus, RequestStatus[]> = {
  SUBMITTED:      [RequestStatus.UNDER_REVIEW, RequestStatus.REJECTED],
  UNDER_REVIEW:   [RequestStatus.FOR_PICKUP, RequestStatus.NEEDS_REVISION, RequestStatus.REJECTED],
  NEEDS_REVISION: [RequestStatus.UNDER_REVIEW, RequestStatus.REJECTED],
  FOR_PICKUP:     [], // release-only — handled by /release endpoint
  RELEASED:       [], // terminal
  REJECTED:       [], // terminal
};

export type TransitionResult =
  | { ok: true }
  | { ok: false; reason: string };

export function validateTransition(
  from: RequestStatus,
  to: RequestStatus,
): TransitionResult {
  if (to === RequestStatus.RELEASED) {
    return { ok: false, reason: "Use the /release endpoint to mark a request as released." };
  }
  const allowed = ALLOWED_TRANSITIONS[from];
  if (!allowed.includes(to)) {
    return {
      ok: false,
      reason: `Cannot transition from ${from} to ${to}.`,
    };
  }
  return { ok: true };
}

// Per-transition required payload fields
export type StatusTransitionPayload =
  | { to: "UNDER_REVIEW"; note?: string }
  | { to: "FOR_PICKUP"; note?: string }
  | { to: "NEEDS_REVISION"; revisionNote: string }   // required
  | { to: "REJECTED"; rejectionReason: string };     // required

export type ReleasePayload = {
  amountPaid: number;    // in centavos
  orNumber: string;      // Official Receipt number — required if fee > 0
  receivedByName: string;
};
```

### Zod Schemas

```typescript
// lib/schemas/request.ts
import { z } from "zod";

export const submitRequestSchema = z.object({
  documentTypeId: z.string().cuid(),
  fullName:       z.string().min(2).max(100),
  contactNumber:  z.string().min(7).max(20),
  address:        z.string().min(5).max(200),
  purpose:        z.string().min(5).max(500),
});

export const statusTransitionSchema = z.discriminatedUnion("to", [
  z.object({ to: z.literal("UNDER_REVIEW"), note: z.string().optional() }),
  z.object({ to: z.literal("FOR_PICKUP"),   note: z.string().optional() }),
  z.object({ to: z.literal("NEEDS_REVISION"), revisionNote: z.string().min(5) }),
  z.object({ to: z.literal("REJECTED"),     rejectionReason: z.string().min(5) }),
]);

export const releaseSchema = z.object({
  amountPaid:      z.number().int().nonnegative(),
  orNumber:        z.string().min(1).max(50),
  receivedByName:  z.string().min(2).max(100),
});
```

### Atomic Release Transaction (Prisma)

```typescript
// app/api/admin/requests/[id]/release/route.ts (core logic)
await prisma.$transaction(async (tx) => {
  const request = await tx.documentRequest.findUniqueOrThrow({
    where: { id: params.id },
    include: { payment: true },
  });

  if (request.status !== "FOR_PICKUP") {
    throw new Error(`Request is ${request.status}, not FOR_PICKUP.`);
  }
  if (request.payment) {
    throw new Error("Request already released. (409)");
  }
  if (request.documentType.fee > 0 && !body.orNumber) {
    throw new Error("OR number is required for paid documents.");
  }

  await tx.payment.create({
    data: {
      requestId:    request.id,
      amountDue:    request.documentType.fee,
      amountPaid:   body.amountPaid,
      orNumber:     body.orNumber,
      receivedById: session.user.id,
    },
  });

  await tx.documentRequest.update({
    where: { id: request.id },
    data:  { status: "RELEASED" },
  });

  await tx.requestStatusLog.create({
    data: {
      requestId:   request.id,
      fromStatus:  "FOR_PICKUP",
      toStatus:    "RELEASED",
      note:        `OR# ${body.orNumber} — ₱${body.amountPaid / 100}`,
      changedById: session.user.id,
    },
  });
});
```

### Status Instruction Map (resident tracking)

```typescript
// lib/status-instructions.ts
export const STATUS_INSTRUCTIONS: Record<string, string> = {
  SUBMITTED:      "Your request has been received. We are reviewing it — please check back soon.",
  UNDER_REVIEW:   "Your request is being processed by our staff. We will update this page shortly.",
  NEEDS_REVISION: "We need more information. Please visit the Barangay Hall or call (046) 418-2082.",
  FOR_PICKUP:     "Your document is ready! Visit the Barangay Hall during office hours (Mon–Fri 8AM–5PM). Bring this reference number and a valid ID. Payment is due upon pickup.",
  RELEASED:       "Your document has been released. Thank you for using our online request service.",
  REJECTED:       "Your request was not approved. Please visit the Barangay Hall for assistance.",
};
```

---

## 4. Alternatives Considered

| Option | Why Rejected |
|--------|-------------|
| **Client-side transition enforcement only** | Any client can call the API directly with arbitrary payloads. UI guards are cosmetic — enforcement must be server-side. |
| **XState state machine library** | Excellent tool, but adds a dependency and learning curve for a transition table that fits in 10 lines of a plain object. Overkill at this scale. |
| **Event sourcing (append-only events, derive state)** | Correct architecture for complex audit requirements. Unnecessary complexity for a 6-state machine with ~100 requests/day. The `RequestStatusLog` table gives us the audit trail we need without full event sourcing. |
| **Single `/status` endpoint handles all transitions including release** | Merging release into the status endpoint makes it impossible to require payment fields only when transitioning to `RELEASED`. Discriminated union schemas can handle it technically, but the separate endpoint makes the requirement explicit and easier to audit. |

---

## 5. AI / Agent Implementation Notes

N/A — no AI components in this RFC.

---

## 6. Security, Privacy & Performance

**Security surface:**
- All transition endpoints require `getServerSession()` — unauthenticated requests return `401` before any DB access.
- `validateTransition()` is called before the Prisma write — no DB round-trip for invalid transitions.
- The `RELEASED` status cannot be set via the `/status` endpoint by design. The `/release` endpoint is the only path to `RELEASED`.
- Idempotency: duplicate release attempts are caught by the `request.payment` existence check in the transaction — returns `409`, not a duplicate row.

**Performance:**
- `validateTransition()` is a pure in-memory function — 0ms.
- Prisma `$transaction` for release: 2–3 sequential DB writes. Target < 300ms on Neon.
- Queue list query: `findMany` with status filter + `orderBy submittedAt`. Add index on `(status, submittedAt)` for production.

**Privacy:**
- `RequestStatusLog.note` may contain OR numbers — treat as internal-only; not exposed to the resident tracking endpoint.
- Resident tracking endpoint (`/api/requests/track`) returns status + instruction only — never returns payment details or staff names to the resident.

---

## 7. Execution Plan

**Can this ship behind a feature flag?** Yes — `ENABLE_REQUEST_SYSTEM=true` env var. When off, the `/request` and `/track` pages show "Coming soon." Admin routes remain accessible for staff testing.

**Ticket breakdown:**

| Ticket | Description | Size |
|--------|-------------|------|
| `MUL-01` | Prisma schema + `migrate dev` + seed script (document types + 1 staff user) | S |
| `MUL-02` | `lib/request-lifecycle.ts` — `validateTransition()` + transition table + Zod schemas | S |
| `MUL-03` | `lib/request-reference.ts` — reference number generator with year-scoped sequential counter | S |
| `MUL-04` | `POST /api/requests` — resident submission endpoint + `GET /api/requests/track` | M |
| `MUL-05` | NextAuth.js setup — staff login, session middleware, `/admin/login` page | M |
| `MUL-06` | `GET /api/admin/requests` + `GET /api/admin/requests/[id]` — queue list + detail | M |
| `MUL-07` | `PATCH /api/admin/requests/[id]/status` — transition endpoint with `validateTransition()` | M |
| `MUL-08` | `POST /api/admin/requests/[id]/release` — atomic release + payment transaction | M |
| `MUL-09` | Resident UI: 3-step request form + reference number success screen | L |
| `MUL-10` | Resident UI: `/track` status page with instruction text | S |
| `MUL-11` | Staff UI: queue table + filter tabs + request detail panel | L |
| `MUL-12` | Staff UI: action buttons + confirm dialogs (approve, revise, reject, release) | M |
| `MUL-13` | Printable claim slip (`/api/admin/requests/[id]/claim-slip`) | S |
| `MUL-14` | End-to-end manual test: full happy path + all sad paths from QAD | M |

**Rollout order:** MUL-01 → MUL-02 + MUL-03 (parallel) → MUL-04 → MUL-05 → MUL-06 + MUL-07 + MUL-08 (parallel) → MUL-09 + MUL-10 (parallel) → MUL-11 → MUL-12 → MUL-13 → MUL-14 → enable feature flag in staging → UAT → prod.

---

## Self-Check

- [ ] Section 3 has exact TypeScript interface contracts
- [ ] Section 3 schema is exact Prisma DDL
- [ ] Section 4 has real rejected alternatives with genuine reasoning
- [ ] Section 5 is marked N/A
- [ ] Section 7 ticket list is specific enough to act on immediately after approval
- [ ] Nothing in this RFC duplicates PRD (features) or SDD (global architecture)

---

*Next document: [qad-mulawin-v2.md](qad-mulawin-v2.md)*
