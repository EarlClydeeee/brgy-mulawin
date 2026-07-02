# Go-To-Market (GTM) Strategy

**Project:** Barangay Mulawin — Digital Services Portal (V2)
**Date:** 2026-07-01
**Version:** 0.1
**Owner:** Earl Clyde Bañez
**Status:** Draft
**PRD:** [prd-mulawin-v2.md](prd-mulawin-v2.md)

---

## 1. Product Summary (GTM View)

**What it does (one sentence):** Barangay Mulawin's V2 portal lets any resident submit a document request online in under 3 minutes and pick it up at the hall once — eliminating the wasted second and third trips that working residents cannot afford.

**Who it's for:** Residents of Barangay Mulawin, Tanza, Cavite — particularly working adults aged 20–50 who use their phone for daily tasks and have been burned by showing up at the hall unprepared or at the wrong time.

**Core value proposition:** Submit from your phone. Get a reference number. Show up once.

**Category:** Local Government / Public Service Web Portal — no app store involved; web-based, mobile-accessible.

---

## 2. Target Audience

**Primary (Resident):**
- *Who:* Working adults 20–45 within Barangay Mulawin. Uses Facebook Messenger daily. Has needed a barangay clearance at least once in the past year. Has already visited the hall and been turned away or made to wait.
- *Where they hang out:* Barangay Mulawin Facebook page, community group chats (Messenger/Viber), family group chats.
- *What they already believe:* "The barangay hall is slow." "I have to take a half-day off just to get one document." "I don't know what to bring."
- *What will make them try this:* A Facebook post from the official Barangay Mulawin page with a simple before/after: "Dati: pumunta ka para mag-request. Ngayon: mag-request ka online, pumunta para kunin lang." One clear link to the portal.

**Secondary (Barangay Officials / Community Leaders):**
- *Who:* Kagawads, SK officers, community leaders who refer residents to barangay services.
- *Why secondary:* They are multipliers — once they know the portal exists, they will direct residents to it organically through their networks.

---

## 3. Pricing Model

**Model:** Free — this is a government service, not a commercial product.

| Tier | Price | What's Included |
|------|-------|-----------------|
| Resident access | Free | Online request submission, reference number, status tracking |
| Staff dashboard | Free | Admin queue, status management, payment recording, audit log |

**No payment gateway required.** Document fees (e.g. ₱50 for clearance) are collected onsite in cash at pickup. The portal is a workflow tool, not a payment processor.

---

## 4. Positioning & Messaging

**Tagline:** *"Mag-request online. Pumunta para kunin lang."*
(English: "Request online. Come just to pick it up.")

**English tagline (for formal materials):** *"One trip. That's all."*

**Primary message:**
Stop making multiple trips to the barangay hall. With Barangay Mulawin's new online request system, you can submit your document request from your phone in minutes, get a reference number, and visit the hall exactly once — to pay and pick up your document. No more guessing what to bring. No more waiting to find out your slot is full.

**Proof points:**
- Reference number system — every submission is tracked and tied to a unique ID, so staff know exactly what you need before you arrive.
- Real-time status tracking — check if your document is ready before making the trip.
- Built on the official Barangay Mulawin website — same portal, same officials, fully legitimate.

**Objection handling:**

| Objection | Response |
|-----------|----------|
| "Sigurado ba ito? Legit ba?" | This is the official Barangay Mulawin website — the same site where you see the officials and announcements. Your request goes directly to the barangay secretary. |
| "Wala akong email o account." | Hindi kailangan. Mag-fill ka lang ng form, makakakuha ka ng reference number. Wala kang kailangang account. |
| "Paano kung mali ang na-submit ko?" | Makikita ng staff ang iyong request at maaaring mag-flag ng "Needs Revision" — makikita mo ito kapag nag-track ka ng status. |
| "Mas mabilis ba kaysa pumunta na lang agad?" | Para sa barangay clearance at certificate of residency — oo. Isang beses na lang kailangan pumunta: para bayaran at kunin. |

---

## 5. Launch Channels & Tactics

**Owned channels:**

| Channel | Current Reach | Planned Action |
|---------|---------------|----------------|
| Barangay Mulawin Facebook Page | Existing followers | Official launch post (Tagalog) with direct link + step-by-step screenshot walkthrough |
| Barangay Mulawin Website (`/`) | V1 visitors | Add "Request a Document" CTA on homepage hero and nav — links to `/request` |
| Barangay Hall physical notice board | All hall visitors | Printed QR code poster pointing to `/request` — "Scan to request online" |
| Staff verbal referral | Every walk-in | Staff trained to say: "Pwede ka na mag-request online next time — ibibigay ko sa iyo ang link." |

**Community / earned channels:**

| Channel | Tactic | Timing |
|---------|--------|--------|
| Barangay Mulawin Facebook Page | Launch post with before/after visual + link | Launch day |
| Community Viber/Messenger group chats | Kagawads share the link with caption in Tagalog | Launch week |
| Barangay hall announcements | Verbal announcement during community meetings or events | First 2 weeks post-launch |
| Word of mouth | Residents who successfully use the portal will share — no action needed beyond making the first experience great | Ongoing |

**Content assets needed before launch:**

- [ ] Facebook launch post (Tagalog) — problem/solution copy + direct link + one screenshot of the reference number screen
- [ ] Step-by-step screenshot guide (3 images: form, review, reference number) — for Facebook post carousel
- [ ] QR code poster (A4, printable) — QR pointing to `/request`, title "Mag-request ng Barangay Document Online"
- [ ] Updated homepage hero CTA — "Request a Document" button added to homepage
- [ ] Staff briefing note — 1-page summary of what changed and how to direct residents (see onboarding doc)

---

## 6. Launch Phases

| Phase | Criteria to Enter | Target | Goal |
|-------|-------------------|--------|------|
| **Internal testing** | All P0/P1 bugs resolved; Remil signs off on staff flow | Week 9 of build | Staff and developer test all flows on staging; catch last issues |
| **Soft launch** | QAD release criteria met; all content assets ready | Week 10 | Go live silently — no announcement. Monitor for errors. 5–10 real requests to validate end-to-end. |
| **Full launch** | Soft launch stable for 3 days; no P0/P1 in production | Week 11 | Facebook announcement post; QR posters printed and posted; staff begins verbally directing residents |
| **Post-launch (30 days)** | — | Week 14 | Measure adoption rate; collect resident feedback; identify top 3 friction points for V3 |

---

## 7. Success Metrics (30-day post-launch)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Online submissions in first 30 days | ≥50 requests | `DocumentRequest` table count |
| Online submissions as % of total releases | ≥30% in month 1 → ≥60% by month 3 | Ratio of online requests to `RELEASED` records |
| Requests with complete info on first try | ≥80% (no `NEEDS_REVISION` flag) | `RequestStatusLog` — count requests that never hit `NEEDS_REVISION` |
| Staff queue resolution time | ≤1 business day average | `submittedAt` to `FOR_PICKUP` timestamp diff |
| Resident tracking page visits | ≥2× submission count (residents check status at least once) | Vercel Analytics on `/track` |
| Resident satisfaction | ≥80% positive (informal survey at pickup, or Facebook comments) | Manual collection by staff |

---

## Self-Check

- [ ] Section 2 ICP is specific enough to name clearly
- [ ] Section 3 pricing is clear — free, no payment processor needed
- [ ] Section 5 content assets are enumerated and all must be created before launch
- [ ] Section 6 has binary criteria for moving between phases
- [ ] Section 7 metrics are measurable from day 1
- [ ] This document is written before launch, not as a retrospective

---

*Next document: [onboarding-mulawin-v2.md](onboarding-mulawin-v2.md)*
