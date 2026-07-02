# Onboarding Strategy & Flow: Barangay Mulawin V2 (ONBOARDING.md)

**Project:** Barangay Mulawin — Digital Services Portal (V2)
**Date:** 2026-07-01
**Version:** 0.1
**Owner:** Earl Clyde Bañez
**Status:** Draft

This document covers two onboarding contexts: (A) **Staff onboarding** — how barangay hall staff learn to use the admin dashboard, and (B) **Resident onboarding** — how residents are guided through their first request submission.

---

## Part A: Staff Onboarding

### 1. The Strategy: "First Use in 10 Minutes"

Staff are not power users. Remil D. Sosa and the kagawads who may assist her are comfortable with Facebook and basic web apps, but have no training budget and no IT support. The onboarding must be self-contained in a single printed guide and a 10-minute live walkthrough. No video tutorials. No long manuals. The guide assumes the staff member is sitting at the barangay hall desktop and has the staging URL in front of them.

---

### 2. Staff Onboarding Flow

| Step | Action | What They See |
|------|--------|---------------|
| **1. Login** | Open browser → go to `[site]/admin/login` → enter email + password | Login form; pink/green brand; "Barangay Mulawin Staff Portal" heading |
| **2. Queue overview** | Land on `/admin/requests` | Table of all requests sorted by oldest first; status badge per row |
| **3. Review a request** | Click any row | Full request detail panel: name, contact, document type, purpose, status history |
| **4. Approve for pickup** | Click "Mark for Pickup" → read confirm dialog → click Confirm | Status badge updates to green "For Pickup"; row moves to correct filter tab |
| **5. Flag needs revision** | Click "Needs Revision" → type reason → Confirm | Status updates; revision note saved and visible on resident tracking page |
| **6. Reject** | Click "Reject" → type reason → Confirm | Status updates to red "Rejected"; resident sees reason on tracking page |
| **7. Record release** | Find a "For Pickup" request → click "Record Release" → enter OR number + amount + name → Confirm | Payment recorded; status changes to "Released"; row archived |
| **8. Print claim slip** | On any "For Pickup" request → click "Print Claim Slip" → browser print dialog | Simple slip: reference number, name, document type, date — for the physical folder |

---

### 3. Staff Quick Reference Card (Print-ready)

> Print this card and tape it to the monitor at the barangay hall.

```
BARANGAY MULAWIN STAFF PORTAL — QUICK GUIDE
============================================

LOGIN:   [site-url]/admin/login
         Email: [staff email]
         Password: [ask Earl if forgotten]

DAILY WORKFLOW:
  1. Open the portal and log in.
  2. Go to "Requests" — you will see all pending items.
  3. Click any row to review the full request.
  4. Choose an action:
     - MARK FOR PICKUP → document is ready, resident can come
     - NEEDS REVISION  → something is missing (type the reason)
     - REJECT          → cannot process (type the reason)
  5. When resident arrives with reference number + valid ID:
     - Find request by reference number (use the search bar)
     - Verify name matches their ID
     - Collect cash payment
     - Click RECORD RELEASE → enter OR number + amount + your name
     - Print claim slip for your folder

IMPORTANT RULES:
  - Never mark RELEASED without recording the OR number
  - If a request was already released, the system will block a second release
  - If you forget your password, contact Earl Clyde Bañez
```

---

### 4. Staff Onboarding Walkthrough (Live)

**Who conducts it:** Earl Clyde Bañez (developer) + Remil D. Sosa (barangay secretary)
**Duration:** ~10 minutes
**When:** Before soft launch, on the actual hall desktop

**Walkthrough steps:**
1. Show Remil the login page — she logs in herself.
2. Show the queue — explain the filter tabs (All / Submitted / For Pickup / Released).
3. Walk through a pre-seeded test request — demonstrate approve → for pickup flow.
4. Demonstrate the release flow — enter a fake OR number, confirm, show the record in the audit log.
5. Show how a resident's tracking page updates after each action (open on phone simultaneously).
6. Hand over the printed Quick Reference Card.
7. Ask Remil to do one complete cycle on her own (submit a test request as a resident, then process it as staff).

**Sign-off:** Remil confirms she can complete steps 1–8 above independently before soft launch proceeds.

---

### 5. Staff Onboarding Design Principles

- **One printed card over a manual.** The quick reference card must fit on a single A5 sheet. If it doesn't fit, the UI is too complex — fix the UI.
- **Real data in training.** Use pre-seeded test requests that look like real submissions. Staff should practice with realistic names and document types.
- **Mistakes are recoverable.** Emphasize during walkthrough: status transitions are logged but not reversible via the UI in V2. If an error is made (e.g. rejected by accident), Earl must fix it via Prisma Studio. Add self-service correction in V3.
- **No email or SMS needed.** Staff do not need to contact residents. The resident checks the tracking page. Staff's only job is to process the queue and record releases.

---

## Part B: Resident Onboarding

### 1. The Strategy: "Zero Confusion, Zero Account"

Residents arrive at `/request` with no prior context about the system. They may be skeptical ("Is this official?") or uncertain ("What if I fill it out wrong?"). The form must answer both concerns in the first screen — official branding establishes legitimacy, and the 3-step structure with clear labels eliminates uncertainty about what's expected. No account. No password. No email. Just fill the form, get the number.

---

### 2. The 3-Step Resident Request Flow

**Step 1 — Choose Document Type**
- Prompt: "What document do you need?"
- Options: Large selectable cards — Barangay Clearance, Certificate of Residency, Certificate of Indigency, Business Permit
- Each card shows: document name, fee (e.g. ₱50), processing time (e.g. Same day)
- Philosophy: Resident knows what they need before they start. Starting with document type sets context for all subsequent fields.

**Step 2 — Your Information**
- Fields: Full Name, Contact Number, Complete Address, Purpose of Request
- All required. Inline validation — errors shown immediately on blur, not on submit.
- Design note: One column, large inputs, large labels. No optional fields shown in V2.

**Step 3 — Review & Submit**
- Summary of all entered information + selected document type
- Fee and pickup instructions shown clearly: "You will pay ₱50 at the barangay hall upon pickup."
- Single "Submit Request" button — pink, full-width on mobile
- No back navigation from this step (use browser back or the "Edit" links per section)

**Success Screen**
- Reference number displayed in large monospace font: `MUL-2026-001234`
- Copy-to-clipboard button
- Clear instructions: "Save this number. Visit the Barangay Hall during office hours to pay and pick up your document. Check your status at [site]/track."
- Link to the status tracking page pre-filled with the reference number

---

### 3. Resident Onboarding Walkthrough

**Persona:** Ana, 32, first-time user. Saw the Facebook post from the barangay page.

1. **Opening:** She taps the link from Facebook. Lands on `/request`. Sees the official pink/green barangay branding — same as the site she's seen before. Feels legitimate.
2. **Engagement:** She taps "Barangay Clearance" — the card highlights with a green checkmark. She can see the fee (₱50) and that it's same-day. She taps "Continue."
3. **The Hook:** The form is short — just 4 fields. She fills them in under 2 minutes. No confusing fields. No ID upload required.
4. **Verification:** She taps "Submit Request." Sees her reference number: `MUL-2026-001234`. She screenshots it and shares it to herself on Messenger.
5. **Closure:** She taps "Check Status" — sees `SUBMITTED`. She knows what to do next: wait for it to say "For Pickup," then go to the hall once with her ID and ₱50.

---

### 4. Resident Onboarding Design Principles

- **No account = no friction.** The reference number is the only identifier. Residents keep it the same way they keep a receipt — in their camera roll or Messenger.
- **Fee shown before submission.** Residents must see the fee on the review screen before they submit. No surprises at the pickup desk.
- **Status instructions are written in plain Filipino/English.** "Your document is ready. Bring your reference number and a valid ID." — not "Status: FOR_PICKUP."
- **The success screen is the most important screen.** It must clearly communicate what to do next. If the resident leaves without knowing they need to check the tracking page, the feature has failed.
- **Form data is never lost on error.** If the API call fails on submit, the form state is preserved. The resident sees an error and can retry without re-entering their information.

---

*Next document: [plan-website-mulawin-v2.md](plan-website-mulawin-v2.md)*
