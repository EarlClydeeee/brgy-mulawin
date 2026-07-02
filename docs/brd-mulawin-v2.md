# Business Requirements Document (BRD)

**Project:** Barangay Mulawin — Digital Services Portal (V2)
**Date:** 2026-07-01
**Version:** 0.1
**Owner:** Earl Clyde Bañez
**Status:** Draft
**Supersedes:** [brd-mulawin.md](../brd-mulawin.md)

---

## 1. Executive Summary

Barangay Mulawin's official website (V1) successfully put service information online for ~12,500 residents of Tanza, Cavite. V2 completes the journey: residents can now submit document requests online from any device, receive a reference number, and simply show up at the barangay hall to pay and collect — no more guesswork, no wasted trips. Barangay staff manage the entire queue through a protected web dashboard, transitioning from paper-based to digital workflows without requiring new infrastructure.

---

## 2. The Problem & Opportunity

**The Problem:**

V1 told residents *what* to bring. It did not remove the physical act of submitting the request. Residents still queue at the hall to hand over a form, wait for processing, return for pickup — often making 2–3 trips for a single document. For working residents, each trip costs half a day. For the 7-member council staff, paper queues have no priority order, no audit trail, and no way to give residents an honest wait-time estimate.

**The Opportunity:**

The submission step — filling out a form and getting an acknowledgment — is 100% digitizable with no change to the existing cash-on-pickup model. No payment gateway, no eGov integration, no SMS infrastructure is required. The only blocker was the absence of a request form and a staff dashboard. V2 builds exactly that on the existing Next.js stack already deployed on Vercel.

**Target Users:**

- **Resident:** Maria, 32, works at a BPO in Tanza, needs a barangay clearance for pre-employment. She has 30 minutes of lunch break to do admin tasks on her phone. She cannot afford to take a half-day off to visit the hall and find out she brought the wrong ID.
- **Staff:** Remil, Barangay Secretary, manages incoming requests daily. She currently writes names on a logbook, calls residents manually, and has no visibility into how many requests are pending at any time.

---

## 3. Strategic Alignment

**Primary Goal (0–6 months post V2 launch):** 60% of all document requests submitted through the online portal, measured by ratio of online submissions to total releases logged.

**Secondary Goals:**
- Eliminate duplicate trips caused by incomplete submissions (target: 0 residents turned away for missing info after submitting online).
- Give staff a single source of truth — all pending, approved, and released requests visible in one dashboard.
- Create an auditable digital record of every request and release, replacing the paper logbook.

---

## 4. Scope

**In Scope — V2:**
- Resident request submission form (document type, personal info, purpose)
- Unique reference number generated per request
- Resident self-service status tracking by reference number
- Staff login (protected admin dashboard)
- Staff request queue with filters (pending, for pickup, released)
- Status transitions: `submitted → under_review → for_pickup → released` (and `needs_revision`, `rejected`)
- Onsite cash payment recording (amount, OR number, received by)
- Immutable audit log for every status change
- Release desk confirmation flow

**Out of Scope — V2:**
- Online payment / GCash / Maya integration
- SMS or email notifications to residents
- Appointment / slot scheduling
- Integration with national eGov PH systems
- Multi-barangay support
- Public-facing admin content management (announcements, news editing via UI)
- Mobile app (iOS/Android)

---

## 5. Success Metrics

| Metric | Baseline | Target | Timeline |
|--------|----------|--------|----------|
| Online submissions as % of total releases | 0% | ≥60% | 90 days post-launch |
| Avg. trips per completed request | ~2.5 | ≤1.5 | 90 days |
| Staff queue resolution time (submit → for_pickup) | Unknown | ≤1 business day | 60 days |
| Requests with complete info on first submission | Unknown | ≥85% | 60 days |
| Resident satisfaction (post-pickup survey) | N/A | ≥80% positive | 90 days |
| Audit log coverage (% of releases with payment record) | 0% | 100% | Day 1 |

---

## 6. Stakeholders & Owners

| Role | Person | Responsibility |
|------|--------|----------------|
| Sponsor / Decision Maker | Hon. Tricia L. Gutierrez | Final approval, staff adoption |
| Business Owner / Operations | Remil D. Sosa | Request queue, cash recording, release |
| Product / Tech Lead | Earl Clyde Bañez | Architecture, build, deployment |
| QA / User Acceptance | Barangay Secretary + 1 kagawad | Test resident and staff flows before launch |

---

## Self-Check

- [ ] Section 1 can be read by a non-technical person and makes immediate sense
- [ ] Section 2 quantifies the problem (not just describes it)
- [ ] Section 5 has at least one metric with a number and a timeline
- [ ] Section 4 explicitly names at least one thing that is out of scope
- [ ] Nothing in this document describes *how* to build the solution (that's the SDD's job)

---

*Next document: [prd-mulawin-v2.md](prd-mulawin-v2.md)*
