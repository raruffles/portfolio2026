# DESIGN.md — Lu Dias Concept (Editorial Couture System)

## Reference Fusion Architecture
- **Hero Architecture (Studio Diez reference):** Full-bleed 3-column media triptych (`60svh`, zero gutters, transparent overlay navigation bar transitioning to frosted porcelain on scroll) paired directly above a monumental edge-to-edge grotesque wordmark (`LU DIAS CONCEPT®`) on warm architectural stone (`#EAE7DF`).
- **Editorial Magazine Chapter (Gest Włosy / Slovianka reference):** Alabaster porcelain spread (`#FAF8F5`) with top metadata pill strip, giant edge-to-edge translucent watermark (`LU DIAS CONCEPT`) drifting horizontally on scroll, flanking `Bodoni Moda` editorial headings with animated hand-drawn brush underline, central portrait overlapped by an interactive Scope pill card (alternating blush-linen `#EFE7E3` and deep espresso `#1F1D1B` pills), and floating frosted `Google Rate 4,9` glass card.

## Color Tokens
| Role | Token | Hex |
|---|---|---|
| Architectural Warm Stone | `--stone-100` | `#EAE7DF` |
| Alabaster Porcelain | `--porcelain` | `#FAF8F5` |
| Blush Linen Pill | `--blush-pill` | `#EFE7E3` |
| Deep Espresso Ink | `--ink-950` / `--ink-900` | `#151413` / `#1F1D1B` |
| Warm Taupe Secondary | `--ink-700` | `#4A4440` |
| Couture Bronze Rosewood | `--rosewood-600` | `#8D5B54` |

## Typography
- **Architectural Wordmark:** `Archivo` (`800`, `-0.04em` tracking, edge-to-edge display).
- **Editorial Serif:** `Bodoni Moda` (`400–600`, italic cadence for magazine headlines, reviews, and ratings).
- **Body / UI:** `Manrope` (`300–700`, `tabular-nums` on ratings and phone/address details).

## Motion System (Emil Kowalski Discipline + Native Scroll-Driven CSS)
- **Curves:** `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`, `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`.
- **Choreography:** WAAPI curtain reveal on the 3-column hero triptych (`85ms` stagger) + kinetic character rise on `LU DIAS CONCEPT®`, native `view-timeline` parallax on watermark & floating glass cards, SVG `stroke-dashoffset` brush underline draw, one-shot `clip-path` image curtains, blurry-seam (`blur(2px)`) crossfades on case/scope switching, and fine-pointer-gated magnetic hover/press feedback (`scale(0.97)`).
