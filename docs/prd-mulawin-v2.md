# Product Requirements Document (PRD)

**Project:** Barangay Mulawin — Digital Services Portal (V2)
**Date:** 2026-07-01
**Version:** 0.1
**Owner:** Earl Clyde Bañez
**Status:** Draft
**BRD:** [brd-mulawin-v2.md](brd-mulawin-v2.md)

---

## 1. Product Purpose & Value Proposition

The V2 portal lets any resident of Barangay Mulawin submit a document request from their phone in under 3 minutes, receive a reference number immediately, then visit the hall exactly once — to pay cash and collect. Staff manage the entire incoming queue through a password-protected dashboard: reviewing requests, marking them ready for pickup, recording the cash payment, and logging the release. The single differentiating mechanism is the reference number system: it ties the resident's online submission to the staff's queue entry and the release record, creating a closed-loop paper trail with zero paper.

---

## 2. Target Personas

**Primary Persona — The Busy Resident (Ana)**
- *Who they are:* 28–40, working adult, owns a smartphone, lives within Barangay Mulawin. Needs barangay clearance or certificates 1–3 times per year for employment, school, or government transactions.
- *Core frustration:* Has to take a half-day off work to visit the hall, only to find out the clerk is on break, or she's missing one requirement. She's done this twice for the same document.
- *What success looks like:* She submits the request on her phone during lunch, gets a reference number, visits the hall once after work, pays ₱50, and leaves with the document in hand.

**Secondary Persona — The Staff (Remil)**
- *Who they are:* Barangay Secretary, 30s, manages daily hall operations. Handles 5–15 document requests per day manually. Not a tech power user, but comfortable with web apps.
- *Core frustration:* Paper logbook gives no visibility. Has to call residents manually. No way to know how many are pending without flipping pages.
- *What success looks like:* She opens the dashboard in the morning, sees all pending requests sorted by submission time, processes them in order, and marks them released when the resident pays and picks up — all in one screen.

---

## 3. Core Features & Priorities

| Feature | Description | Priority |
|---------|-------------|----------|
| Resident request form | 3-step form: document type → personal info → review & submit | Must-Have |
| Reference number | Unique ID (e.g. `MUL-2026-001234`) returned immediately after submit | Must-Have |
| Status tracking page | Resident enters reference number to see current status + next instruction | Must-Have |
| Staff login | Secure admin login (email + password, session-based) | Must-Have |
| Staff request queue | Table view of all requests filterable by status | Must-Have |
| Status transitions | Staff moves request through lifecycle with required fields per transition | Must-Have |
| Cash payment recording | Staff logs amount, OR number, receiver name at release | Must-Have |
| Audit log | Immutable record of every status change, who made it, when | Must-Have |
| Rejection with reason | Staff can reject with a mandatory reason visible to resident | Should-Have |
| Needs-revision flag | Staff flags submission as incomplete; resident sees what's missing | Should-Have |
| Printable claim slip | Staff prints a simple slip with reference number + name for the folder | Should-Have |
| Request attachment upload | Resident uploads a photo of their valid ID at submission | Could-Have |
| SMS/email notification | Resident notified on status change | Won't-Have (V2) |
| Online payment | GCash / Maya integration | Won't-Have (V2) |

---

## 4. User Stories & Acceptance Criteria

**US-01 — Submit a Document Request**
> As a resident, I want to submit a document request online so that I don't have to visit the hall just to hand in a form.

Acceptance Criteria:
- Given I visit `/request`, when I complete the 3-step form and submit, then I receive a reference number on screen immediately.
- Given I submit, when the request is saved, then its status is `submitted` and it appears in the staff queue.
- Given a required field is empty, when I try to advance, then I see an inline error and cannot proceed.

**US-02 — Track My Request**
> As a resident, I want to check my request status by reference number so that I know when to come to the hall.

Acceptance Criteria:
- Given I have a reference number, when I enter it at `/track`, then I see the current status and a plain-language instruction.
- Given the status is `for_pickup`, then the instruction includes the office address and hours.
- Given an invalid reference number, then I see a clear "not found" message.

**US-03 — Staff Reviews the Queue**
> As a barangay staff member, I want to see all pending requests in one view so that I can process them in order.

Acceptance Criteria:
- Given I am logged in as staff, when I open `/admin/requests`, then I see a table of all requests sorted by submission time.
- Given I filter by `submitted`, then only unreviewed requests appear.
- Given I click a request row, then I see the full submission details.

**US-04 — Staff Approves / Flags / Rejects**
> As staff, I want to update a request's status so that the resident knows what to do next.

Acceptance Criteria:
- Given I view a request, when I click "Mark for Pickup", then the status changes to `for_pickup` and a log entry is created with my name and timestamp.
- Given I click "Needs Revision", then I must enter a reason before saving; the resident sees the reason on the tracking page.
- Given I click "Reject", then I must enter a reason; the audit log records my name and timestamp.
- Given I try to skip a status (e.g. `submitted → released` directly), then the system rejects the transition with an error.

**US-05 — Staff Records Release**
> As staff, I want to record the cash payment and mark a request as released so that there is a complete record of every document issued.

Acceptance Criteria:
- Given a request is `for_pickup`, when I click "Record Release", then I must enter the cash amount, OR number, and my name before saving.
- Given a non-zero fee and missing OR number, then I cannot save the release.
- Given the release is saved, then the request status changes to `released` and is removed from the active queue.
- Given I view the audit log, then the release entry shows amount, OR number, receiver, and timestamp.

---

## 5. UX & Design Intent

**Design reference:** [dsd-mulawin-v2.md](dsd-mulawin-v2.md)

**Key flows:**
- Resident submission: `/request` → Step 1 (document type) → Step 2 (personal info) → Step 3 (review) → Submit → Reference number screen. Target: under 3 minutes.
- Resident tracking: `/track` → enter reference number → status screen. Target: under 30 seconds.
- Staff queue: `/admin/login` → `/admin/requests` → click row → action buttons → confirm → back to queue.

**Constraints:**
- Resident flow: mobile-first, `max-w-lg`, single column, large tap targets (≥52px).
- Staff dashboard: optimized for desktop (min 1024px wide), data-dense table, sidebar navigation.
- All forms must show inline validation — no full-page error screens.
- Status transitions must show a confirmation dialog for irreversible actions (reject, release).
- Brand palette (pink/green) is locked; status colors are additive tokens only.

---

## 6. Out of Scope for This Release

- SMS/email notifications — deferred to V3; requires Twilio or SendGrid integration.
- Online payment — deferred; requires PCI-compliant gateway and BSP considerations.
- File/ID upload — could-have; deferred if time-constrained during build.
- Appointment slot scheduling — separate future feature.
- Public announcement editing via admin UI — separate CMS feature.

---

## 7. AI / Agent Feature Specifications

N/A — no AI components in V2. All request processing is human-reviewed by barangay staff.

---

## 8. Dependencies & Assumptions

**Dependencies:**
- Next.js 16 App Router (existing)
- Prisma ORM + PostgreSQL (Neon or Supabase — free tier sufficient for V2 volume)
- NextAuth.js v5 — staff session management
- Vercel — hosting + serverless API routes
- `zod` — runtime form validation
- `react-hook-form` — form state management

**Assumptions:**
- Staff will use the dashboard on a desktop or laptop at the barangay hall.
- Residents have a reference number they can use later (no account required).
- Document fees and requirements don't change frequently; static config is acceptable for V2.
- Internet connectivity at the barangay hall is reliable enough for staff dashboard use.

---

## 9. Milestones

| Milestone | Deliverable | Target |
|-----------|-------------|--------|
| M0 | DB schema, Prisma setup, NextAuth staff login, CI passing | Week 1 |
| M1 | Resident request form + reference number + status tracking page | Week 3 |
| M2 | Staff queue table + status transitions + audit log | Week 5 |
| M3 | Cash payment recording + release flow + printable claim slip | Week 7 |
| M4 | QA (UAT with Remil + 3 resident testers), bug fixes | Week 8–9 |
| Launch | Production deploy, staff onboarding, announcement on Facebook | Week 10 |

---

## Self-Check

- [ ] Every Must-Have feature in Section 3 has at least one user story in Section 4
- [ ] Acceptance criteria are testable (Given/When/Then format)
- [ ] Section 6 explicitly names things that were discussed but cut
- [ ] Section 7 is filled or marked N/A
- [ ] Section 9 has realistic dates
- [ ] This document answers *what* to build, not *how*

---

*Next document: [dsd-mulawin-v2.md](dsd-mulawin-v2.md) | [sdd-mulawin-v2.md](sdd-mulawin-v2.md)*
