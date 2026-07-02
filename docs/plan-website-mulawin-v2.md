# Website Plan — Barangay Mulawin V2 New Features

**Project:** Barangay Mulawin — Digital Services Portal (V2)
**Date:** 2026-07-01
**Version:** 0.1
**Owner:** Earl Clyde Bañez
**Status:** Draft

**Goal:** Extend the existing Next.js site with two new public routes (`/request` and `/track`) and one protected staff route (`/admin`), with copy and UX spec for each. This is not a new website — it is the feature additions to the existing site defined in [plan-website-mulawin-v2.md].

**PRD ref:** [prd-mulawin-v2.md](prd-mulawin-v2.md)
**SDD ref:** [sdd-mulawin-v2.md](sdd-mulawin-v2.md)
**Onboarding:** [onboarding-mulawin-v2.md](onboarding-mulawin-v2.md)

---

## Philosophy

- **One new entry point for residents:** The "Request a Document" button appears in the homepage hero and in the nav. It goes to `/request`. Everything else — the site, the officials, the news — continues to work exactly as it does today.
- **No account wall.** Residents submit a form and receive a reference number. That's it. No sign-up flow.
- **Admin is invisible to the public.** `/admin` is not linked anywhere on the public site. Staff access it by typing the URL directly.
- **Brand exact.** All new pages use the existing `globals.css` CSS variables — `--pink-`*, `--green-*`, `--surface`, `--radius-*`, `--shadow-*`. No new colors introduced.

---

## Tech Stack (no changes from existing site)


| Decision   | Choice                                                             |
| ---------- | ------------------------------------------------------------------ |
| Framework  | Next.js App Router (existing)                                      |
| Styling    | Tailwind CSS + existing `globals.css` CSS variables                |
| Fonts      | `Lexend`, `Source_Sans_3`, `Bebas_Neue` — same as current          |
| Icons      | `lucide-react` (consolidated named imports — see build constraint) |
| Database   | Prisma + PostgreSQL (Neon) — new addition for V2                   |
| Auth       | NextAuth.js — staff only, email+password                           |
| Validation | Zod — server-side; React state — client-side inline                |
| Deployment | Vercel (existing setup)                                            |


---

## New Routes Overview


| Route                  | Who               | Description                              |
| ---------------------- | ----------------- | ---------------------------------------- |
| `/request`             | Public            | 3-step document request form             |
| `/track`               | Public            | Reference number lookup + status display |
| `/admin`               | Staff only (auth) | Request queue dashboard                  |
| `/admin/requests/[id]` | Staff only        | Full request detail + action panel       |
| `/admin/login`         | Staff only        | Email + password login                   |


---

## Page Specs

---

### `/request` — Submit a Document Request

**Purpose:** Allow any resident to submit a document request without an account.

**Layout:** Single-column form, max-width 640px, centered. Sticky progress indicator at top (Step 1 / Step 2 / Step 3).

**Copy — Page title:** `Request a Barangay Document`
**Copy — Subtitle:** `Submit your request online. Pick up your document at the Barangay Hall — pay on-site at release.`

---

#### Step 1: Select Document Type

**Heading:** `What document do you need?`


| Document                   | Fee  | Processing Note   |
| -------------------------- | ---- | ----------------- |
| Barangay Clearance         | ₱50  | Same business day |
| Certificate of Residency   | ₱50  | Same business day |
| Certificate of Indigency   | ₱30  | 1–2 business days |
| Business Permit (Barangay) | ₱200 | 2–3 business days |


**UI:** Large selectable cards (full-width, tap/click to select, green checkmark on selection). Document name + fee + processing note per card. "Continue →" button activates only after selection.

**Validation:** Selection required — button disabled until one card is selected.

---

#### Step 2: Your Information

**Heading:** `Tell us about yourself`

**Fields:**


| Field           | Label              | Placeholder                                        | Validation                         |
| --------------- | ------------------ | -------------------------------------------------- | ---------------------------------- |
| `fullName`      | Full Name          | "e.g. Juan dela Cruz"                              | Required, min 3 chars              |
| `contactNumber` | Contact Number     | "e.g. 09171234567"                                 | Required, Philippine mobile format |
| `address`       | Complete Address   | "House No., Street, Sitio/Zone"                    | Required, min 10 chars             |
| `purpose`       | Purpose of Request | "e.g. For employment, for scholarship application" | Required, min 5 chars              |


**Inline validation:** Show error below each field on blur. Error text in `--pink-600`. Green checkmark icon when valid.

**"Continue →" / "← Back" navigation.**

---

#### Step 3: Review & Submit

**Heading:** `Review your request`

**Layout:** Summary card showing all entered information + document type + fee. Each section has a small "Edit" link that takes the user back to the relevant step.

**Fee notice (prominent, inside a surface card):**

> **Payment:** ₱[amount] — payable onsite at the Barangay Hall upon pickup. Cash only.

**Pickup instructions:**

> Pick up at: **Barangay Hall, Barangay Mulawin, Tanza, Cavite**
> Office hours: Monday–Friday, 8:00 AM – 5:00 PM
> Bring: This reference number + one valid government-issued ID.

**Submit button:** `Submit Request` — full-width on mobile, pink fill, white text, `rounded-xl`.

**Loading state:** Spinner inside button, text changes to "Submitting…", button disabled.

**Error state:** Red toast/banner at top of page — "Something went wrong. Your information has been saved. Please try again." Retry does not re-enter form data.

---

#### Success Screen (after submit)

**Heading (Bebas Neue, large):** `Your request has been submitted.`

**Reference number display:**

```
Reference Number
MUL-2026-001234
[Copy]
```

Large monospace font, pink border box, copy-to-clipboard button.

**Next steps (numbered list):**

1. Save your reference number — screenshot it or share it to yourself.
2. Wait for your document to be processed. Check your status at `/track`.
3. When the status shows **"For Pickup"**, visit the Barangay Hall with your reference number and a valid ID.
4. Pay ₱[amount] at the cashier and collect your document.

**CTA button:** `Track My Request →` — links to `/track?ref=MUL-2026-001234` (pre-filled).

---

### `/track` — Track Request Status

**Purpose:** Let residents check the current status of their request using their reference number.

**Layout:** Single-column, max-width 560px, centered. Minimal — input at top, result below.

**Copy — Page title:** `Track Your Request`
**Copy — Subtitle:** `Enter your reference number to check the status of your document request.`

**Input:** Text field — placeholder `MUL-2026-XXXXXX` — with a "Track →" button.

**Result card (shown after lookup):**


| Status           | Resident-facing label | Instruction shown                                                                                                                     |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `SUBMITTED`      | 📋 Submitted          | "Your request has been received. The barangay staff is reviewing it."                                                                 |
| `UNDER_REVIEW`   | 🔍 Under Review       | "Staff is processing your request. Please wait for confirmation."                                                                     |
| `FOR_PICKUP`     | ✅ Ready for Pickup    | "Your document is ready! Bring this reference number + a valid ID + ₱[fee] to the Barangay Hall during office hours."                 |
| `NEEDS_REVISION` | ⚠️ Needs Revision     | "There is an issue with your request: [staff note]. Please visit the Barangay Hall to resolve this, or contact us at (046) 418-2082." |
| `RELEASED`       | ✅ Released            | "Your document has been released. If you have questions, contact the barangay hall."                                                  |
| `REJECTED`       | ❌ Rejected            | "Your request could not be processed: [staff note]. Visit the Barangay Hall for assistance."                                          |


**Result card fields displayed:**

- Document type
- Requested by (full name)
- Date submitted
- Current status (badge)
- Status-specific instruction (from table above)
- Status history (collapsible — timeline of all transitions with timestamps)

**Not found state:** "No request found with reference number MUL-2026-XXXXXX. Please double-check the number and try again."

---

### `/admin/login` — Staff Login

**Layout:** Centered card, max-width 400px. Barangay logo at top.

**Copy — Heading:** `Staff Portal`
**Copy — Subheading:** `Barangay Mulawin — Authorized Access Only`

**Fields:** Email, Password. "Login" button — full-width, pink fill.

**Error:** "Invalid email or password." — inline, below form. Do not specify which field is wrong.

**Redirect:** On success → `/admin/requests`.

---

### `/admin/requests` — Staff Queue Dashboard

**Layout:** Full-width table, sticky header, responsive.

**Page heading:** `Document Requests`

**Filter tabs:** All · Submitted · Under Review · For Pickup · Needs Revision · Released · Rejected

**Table columns:**


| #   | Ref Number | Name | Document Type | Date Submitted | Status | Actions |
| --- | ---------- | ---- | ------------- | -------------- | ------ | ------- |


**Actions per row (based on current status):**

- `SUBMITTED` → "Review" (opens detail)
- `UNDER_REVIEW` → "Mark For Pickup", "Needs Revision", "Reject"
- `FOR_PICKUP` → "Record Release", "Print Claim Slip"
- `NEEDS_REVISION`, `REJECTED` → "View" only (no further transitions in V2)
- `RELEASED` → "View" (read-only, for audit)

**Search bar:** Filter by reference number or resident name.

**Pagination:** 25 rows per page. "Load more" or page numbers.

---

### `/admin/requests/[id]` — Request Detail & Actions

**Layout:** Two-column on desktop (request details left, action panel right), stacked on mobile.

**Left — Request Details:**

- Reference number (large, monospace)
- Document type + fee
- Resident: name, contact, address, purpose
- Date submitted + time
- Status badge (current)
- Status history timeline (all transitions with timestamps and actor)

**Right — Action Panel:**

Renders the correct set of actions based on current status:

**If `SUBMITTED` or `UNDER_REVIEW`:**

```
[Mark For Pickup]
[Needs Revision] → requires reason text input
[Reject]         → requires reason text input
```

**If `FOR_PICKUP`:**

```
[Record Release]
  OR Number: [input]
  Amount Collected: ₱[input]
  Released By: [input]
[Print Claim Slip]
```

**If `RELEASED`, `REJECTED`, `NEEDS_REVISION`:**

```
(No further actions)
Status history shown in full.
```

**All action buttons show a confirm dialog before committing.** Destructive actions (Reject, Release) have red confirm buttons.

---

## Copy Standards

All resident-facing copy must follow these rules:

1. **Plain Filipino/English.** If the average 40-year-old in Tanza cannot read it in under 5 seconds, rewrite it.
2. **No jargon.** Say "reference number" not "tracking ID." Say "ready for pickup" not "FOR_PICKUP."
3. **Instructions always follow status.** Every status the resident can see must have a clear next action. Never show a status with no instruction.
4. **Fee shown before commitment.** The fee must appear on Step 3 (review screen) before the submit button.
5. **Contact number always available.** Every page the resident visits must have the barangay hall contact number accessible — either in the footer or in the relevant instruction text.

---

## Homepage Changes Required (Existing Site)

**Add to Nav (`components/Header.tsx`):**

- New link: `Request a Document` → `/request`
- Position: After "Services", before "Contact"
- Mobile: Include in hamburger menu

**Add to Hero (`app/page.tsx`):**

- New CTA button alongside existing CTAs: `Request a Document →` — pink fill, links to `/request`

**Services page (`app/services/page.tsx`):**

- Add CTA at the bottom of each document card: `Request Online →` → `/request?type=[document-type]`

---

## Metadata & SEO

```ts
// /request
export const metadata = {
  title: "Request a Document — Barangay Mulawin",
  description: "Submit your barangay document request online. No account needed. Get a reference number and pick up at the hall.",
}

// /track
export const metadata = {
  title: "Track Your Request — Barangay Mulawin",
  description: "Check the status of your barangay document request using your reference number.",
}

// /admin (noindex)
export const metadata = {
  title: "Staff Portal — Barangay Mulawin",
  robots: "noindex, nofollow",
}
```

---

## What This Website Is NOT (V2 Scope Constraints)

- Not an online payment portal — cash only, at pickup
- Not an account system for residents — reference number only
- Not a document delivery system — pickup at hall only
- Not a multi-barangay platform — Barangay Mulawin only
- Not a messaging system — residents use the tracking page, not a chat

---

*Full FMD suite for Barangay Mulawin V2 — Document Index:*


| Doc          | File                                                                       | Description                      |
| ------------ | -------------------------------------------------------------------------- | -------------------------------- |
| BRD          | [brd-mulawin-v2.md](brd-mulawin-v2.md)                                     | Why build this                   |
| PRD          | [prd-mulawin-v2.md](prd-mulawin-v2.md)                                     | What to build                    |
| DSD          | [dsd-mulawin-v2.md](dsd-mulawin-v2.md)                                     | How it looks                     |
| SDD          | [sdd-mulawin-v2.md](sdd-mulawin-v2.md)                                     | How it's built                   |
| RFC          | [rfc-mulawin-v2-request-lifecycle.md](rfc-mulawin-v2-request-lifecycle.md) | How the request lifecycle works  |
| QAD          | [qad-mulawin-v2.md](qad-mulawin-v2.md)                                     | How we test it                   |
| GTM          | [gtm-mulawin-v2.md](gtm-mulawin-v2.md)                                     | How we launch it                 |
| Onboarding   | [onboarding-mulawin-v2.md](onboarding-mulawin-v2.md)                       | How staff and residents learn it |
| Website Plan | [plan-website-mulawin-v2.md](plan-website-mulawin-v2.md)                   | Copy and UX spec for new routes  |


