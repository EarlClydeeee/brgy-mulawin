# Design System Document (DSD)

**System Name:** Barangay Mulawin V2 Design Foundation
**Date:** 2026-07-01
**Version:** 0.1
**Owner:** Earl Clyde Bañez
**Status:** Draft
**PRD:** [prd-mulawin-v2.md](prd-mulawin-v2.md)

---

## 1. Design Philosophy & Vision

**Core aesthetic:** Civic trust with warmth. The existing pink/green palette communicates approachability and community — this stays. V2 layers a "clarity-first" discipline on top: every form field, status badge, and staff table must communicate its state without ambiguity. Think GOV.UK's information hierarchy married to the warmth of a community health app.

**Emotional intent:**
- Resident flow: *uncertainty → guided confidence → relief* — the resident should feel held by the form, not tested by it. Each step narrows anxiety.
- Staff dashboard: *clarity → control → completion* — staff should feel in command of the queue, never lost in it.

**Aesthetic references:** GOV.UK Design System (form clarity), Notion (table density), Linear (status badges), existing V1 Barangay Mulawin site (pink/green palette, rounded cards).

**What this system explicitly avoids:**
- Playful animations during request submission (this is a government transaction, not a game)
- Dark mode — not appropriate for a civic LGU portal serving a broad age range
- Information overload on the resident form — one decision per screen
- Decorative gradients inside form fields or data tables

---

## 2. Brand Primitives

### Colors — Existing (from `globals.css`, locked)

| Token | Value | Usage |
|-------|-------|-------|
| `--pink-500` | `#f0436e` | Primary CTAs, active nav |
| `--pink-100` | `#ffe4ec` | Soft backgrounds, badges |
| `--green-500` | `#2e9e44` | Secondary CTAs, success states |
| `--green-100` | `#daf2de` | Soft backgrounds, badges |
| `--background` | `#fdfafa` | Page background |
| `--foreground` | `#1a1a2e` | Body text |
| `--surface` | `#ffffff` | Cards, panels, form fields |

### Colors — New V2 Status Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-status-submitted` | `#6366f1` | Indigo — new, unreviewed request |
| `--color-status-review` | `#f59e0b` | Amber — under staff review |
| `--color-status-revision` | `#f97316` | Orange — needs revision from resident |
| `--color-status-pickup` | `#2e9e44` | Green — approved, ready for pickup |
| `--color-status-released` | `#64748b` | Slate — completed and released |
| `--color-status-rejected` | `#ef4444` | Red — rejected by staff |

### Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display / Hero | Bebas Neue | 400 | clamp(3rem, 8vw, 6rem) |
| Section Heading | Lexend | 700 | 28–36px |
| Body | Source Sans 3 | 400 | 16px / 1.5 |
| Form Label | Source Sans 3 | 600 | 14px |
| Caption / Badge | Source Sans 3 | 700 | 11px uppercase |
| Table Header | Source Sans 3 | 600 | 13px |
| Reference Number | system `font-mono` | 600 | 18px |

**Font loading:** Google Fonts via `next/font/google` — preload, `swap`. Already configured in `layout.tsx`.

### Elevation

| Level | Shadow | Usage |
|-------|--------|-------|
| `--shadow-sm` | `0 2px 8px rgb(0 0 0/7%)` | Inline cards, list items |
| `--shadow-md` | `0 4px 20px rgb(0 0 0/9%)` | Form panels, staff table |
| `--shadow-lg` | `0 8px 40px rgb(0 0 0/12%)` | Modals, confirm dialogs |

---

## 3. Layout & Spatial System

**Base unit:** `4px` — all spacing is a multiple of this.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `4px` | Icon-to-label gaps |
| `--space-2` | `8px` | Internal component padding |
| `--space-4` | `16px` | Default element spacing |
| `--space-6` | `24px` | Card padding, section gaps |
| `--space-8` | `32px` | Large section separations |
| `--space-12` | `48px` | Screen-level top/bottom padding |

**Resident flow layout:** Single column, `max-w-lg`, centered, `px-4`. Form stepper pinned at top. One primary action per step.

**Staff dashboard layout:** Left sidebar `240px` fixed, content area fills remaining width. Table `min-w-[640px]` with horizontal scroll on smaller screens. Sidebar collapses to icon rail at `< 1024px`.

**Breakpoints:**
- Mobile: `< 640px`
- Tablet: `640px – 1023px`
- Desktop: `≥ 1024px` (primary for staff dashboard)

---

## 4. Core Component Specs

### Form Stepper (new — resident request flow)
- 3 steps shown as numbered pills: `① Document Type · ② Your Info · ③ Review`
- Active: filled pink circle, white number, bold label
- Completed: green checkmark circle
- Inactive: gray outline circle
- Navigation: "Back" button only — no clicking stepper nodes directly

### Status Badge (new)
- `border-radius: 9999px`, `padding: 3px 10px`
- `font-size: 11px`, `font-weight: 700`, `text-transform: uppercase`, `letter-spacing: 0.08em`
- Background: status color at 15% opacity; text: full status color
- Never show a red badge on the resident tracking page without an explanation sentence below it

### Data Table — Staff Queue (new)
- Full-width, `border-collapse: separate`, `border-spacing: 0`
- Row hover: `bg-gray-50`
- Sortable columns: ↑↓ indicator on hover, active sort highlighted
- Sticky header on scroll
- Clickable rows (`cursor-pointer`) — entire row opens request detail

### Confirm Dialog (new — irreversible actions)
- Reuse existing modal pattern (`rounded-t-3xl sm:rounded-3xl`, backdrop blur)
- Red top bar for destructive actions (reject); green for release
- Two buttons: Cancel (ghost, autofocused) + Confirm (filled, matches action color)
- Autofocus on Cancel by default — prevents accidental confirmation

### Reference Number Display (new)
- `font-mono`, `text-2xl`, `font-semibold`
- Pink left-border accent, `bg-pink-50` container
- Inline "Copy to clipboard" icon button
- Shown on: submission success screen, resident tracking page

### Buttons — Extended States

| Variant | Background | Text | Pressed | Disabled |
|---------|-----------|------|---------|----------|
| Primary | `--pink-500` | white | scale 0.97, darken 8% | 40% opacity |
| Success/Release | `--green-500` | white | scale 0.97, darken 8% | 40% opacity |
| Danger/Reject | `#ef4444` | white | scale 0.97, darken 8% | 40% opacity |
| Ghost | transparent | `--pink-500` | `--pink-50` bg | 40% opacity |

**Border radius:** `9999px` (pill) for primary actions; `12px` for form inputs.
**Minimum tap target:** `52px` height on all resident-facing buttons.

### Inputs & Forms

- Background: `--surface` (`#ffffff`)
- Border: `1px solid #e2e6ea`
- Border radius: `12px`
- Focus ring: `2px solid --pink-500`, offset `2px`
- Error state: `#ef4444` border + error text below linked via `aria-describedby`
- Padding: `14px 16px`
- Font: Source Sans 3, 400, 16px

---

## 5. Motion & Micro-interactions

| Interaction | Duration | Easing | Notes |
|-------------|----------|--------|-------|
| Form step advance | `220ms` | ease-out | Slide + fade; outgoing left, incoming right |
| Form field error shake | `120ms` | ease-in-out | 3px horizontal oscillation ×2 |
| Status badge change | `200ms` | ease | Fade opacity 0→1 |
| Modal open | `300ms` | spring | Slide up (mobile), scale from 0.97 (desktop) |
| Table row hover | `100ms` | ease | `bg-gray-50` fill |
| Success screen entrance | `400ms` | spring | Fade up + scale 0.96→1 |
| Confirm dialog | `200ms` | ease-out | Fade backdrop, scale panel in |

**Avoid:** transitions >400ms on any staff-facing action — the queue must feel instant.

**Reduced motion:** Wrap step slide in `@media (prefers-reduced-motion: reduce)` — use fade-only fallback.

---

## 6. Accessibility

- **Contrast:** WCAG AA minimum on all status badge text/background pairs. Verify `--color-status-submitted` indigo on white meets ≥4.5:1.
- **Focus rings:** `2px solid #f0436e`, offset `3px` on all interactive elements.
- **Form labels:** Always visible, never placeholder-only. Error messages linked via `aria-describedby`.
- **ARIA live regions:** Status tracking page uses `aria-live="polite"` on status badge — screen reader announces changes.
- **Touch targets:** ≥52×52px on all resident-flow buttons. Table rows: min `48px` height.
- **Keyboard navigation:** Tab order follows visual order in form. Confirm dialog traps focus. Escape closes modal.
- **Reduced motion:** Wrap signature animations in `prefers-reduced-motion` media query.

---

## 7. Taste-Skill Settings

```
DESIGN_VARIANCE:    5   (civic clarity over decoration; no trendy flourishes)
MOTION_INTENSITY:   3   (functional only; nothing ambient or looping)
VISUAL_DENSITY:     7   (staff dashboard is data-dense by necessity)
```

**Chosen variant:** `minimal-trust`
**Reason:** The product handles government transactions. Residents and staff need to trust it immediately. Decoration competes with clarity; restraint signals competence.

---

## 8. Anti-Pattern Register

| Pattern | Status | Location | Fix Applied |
|---------|--------|----------|-------------|
| — | — | — | — |

---

## Self-Check

- [ ] Section 2 has exact HEX values — not "a muted blue"
- [ ] Section 3 spacing scale is consistent (all multiples of 4px)
- [ ] Section 4 defines all component states including Disabled and Pressed
- [ ] Section 7 taste-skill dials are set and a variant is chosen
- [ ] WCAG AA contrast verified for all new status color tokens
- [ ] This document exists in code as CSS variables or a config file

---

*Next document: [sdd-mulawin-v2.md](sdd-mulawin-v2.md)*
