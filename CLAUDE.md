# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page landing site for a personal tech brand ("Aliado en Ejecución") based in Popayán, Colombia. No build system, no framework, no dependencies — open `index.html` directly in a browser to preview.

## File Structure

| File | Purpose |
|------|---------|
| `index.html` | Self-contained page with all CSS inlined (dark palette variant) |
| `css/style.css` | Standalone stylesheet — light palette variant of the same design |
| `js/main.js` | External JS — functionally mirrors the inline `<script>` in `index.html` |
| `directive.md` | Original design brief (brand identity, palette, section specs) |
| `images/` | `hero.png` (Hero section) and `contact.png` (Contact section) |

**Important:** `index.html` does **not** link to `css/style.css` or `js/main.js`. The inline styles/script in `index.html` are the live version. `css/style.css` and `js/main.js` are a refactored light-mode variant maintained separately.

## Design System

The aesthetic is "Pixel-Professional" — pixel art elements over a professional base.

**Fonts:** `Press Start 2P` (pixel headings/labels), `VT323` (mono accents), `Inter` (body copy)

**Three accent tokens:**
- `--blue` — institutional trust
- `--green` — growth
- `--terra` — warmth / Popayán identity

**Pixel shadow pattern:** All interactive elements use hard offset box-shadows (e.g. `4px 4px 0 0 var(--terra)`) instead of blur shadows. Hover lifts the element with `translate(-2px, -2px)` and a larger offset.

## 3D Carousel Architecture

The portfolio section is a CSS 3D carousel — the most complex piece of the codebase.

**How it works:**
- `.carousel__ring` is a zero-size anchor element centered in `.carousel__stage`
- Each `.card` is positioned at `rotateY(--i * stepDeg) translateZ(--radius)` — this places them on the circumference
- `@keyframes spin` rotates the ring continuously around the Y-axis with a fixed X tilt (`rotateX(-38deg)`)
- JS overrides `ring.style.transform` and sets `ring.style.animation = "none"` for manual control

**Critical constraint:** Never add CSS `transform` (including `translateY`) to `.carousel`, `.carousel__stage`, or `.carousel__ring` via scroll-reveal or any parent — this collapses the 3D perspective context and breaks the orbit animation. The reveal system explicitly excludes `.carousel` for this reason.

**JS carousel state:**
- `manualMode = true` → ring stays frozen at the last JS-set angle
- `data-paused="true"` on `.carousel` → pauses CSS animation
- `data-selected="N"` on `.carousel` → dims/blurs non-selected cards
- Clicking a selected card or outside the carousel resumes auto-spin

**Mobile fallback (≤760px / ≤780px depending on variant):** The 3D context is disabled. `.carousel__stage` becomes a horizontal scroll container with `scroll-snap-type: x mandatory`. All 3D transforms on `.card` and `.carousel__ring` are overridden with `transform: none !important`.

## Sections

1. **Hero** — Two-column grid (text left, pixel-framed photo right). Marquee ticker below.
2. **Manifiesto** — 4-card grid (`m-card`), each with a pixel SVG icon. Cards use color-coded pixel shadows by `nth-child`.
3. **Portafolio** — 3D carousel with 5 case-study cards (Problem → Execution → Result format).
4. **Contacto** — Two-column: pixel-framed photo + blockquote left, contact form right. Form uses `checkValidity()` / `reportValidity()` — no backend integration yet.
5. **Footer** — Inverted colors (ink background). Year auto-updated via JS.

## Key Patterns

**Scroll reveal:** `.reveal` starts `opacity:0; translateY(20px)`. `IntersectionObserver` adds `.is-visible` at `threshold: 0.12`. Reduced-motion media query disables all decorative animations except the carousel spin.

**Pixel frame photos:** `.frame-pixel` wraps images with a layered box-shadow (`8px 8px` + `16px 16px`) and absolute-positioned corner accent squares. `.frame-pixel--alt` swaps the terra corner accent for blue.
