---
name: batterytrace
description: Power bank environmental impact calculator — field-report visual system for making hidden costs visible
colors:
  near-black: "#0d0d0d"
  dark-surface: "#1a1a1a"
  border: "#2a2a2a"
  body-text: "#e0e0e0"
  text-secondary: "#999999"
  toxic-green: "#00c896"
  amber-warn: "#f5a623"
  danger-red: "#e8543d"
  recycle-teal: "#2dd4bf"
  landfill-coral: "#f4907c"
  selected-green: "#00b98b"
typography:
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(3rem, 5vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    letterSpacing: "0.06em"
    textTransform: "uppercase"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "rgba(255,255,255,0.12)"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "16px 36px"
  button-primary-hover:
    backgroundColor: "rgba(255,255,255,0.2)"
  metric-card:
    backgroundColor: "{colors.dark-surface}"
    rounded: "{rounded.lg}"
    padding: "28px"
  product-card:
    backgroundColor: "transparent"
    rounded: "{rounded.xl}"
  scenario-card:
    backgroundColor: "rgba(0,0,0,0.02)"
    rounded: "{rounded.lg}"
    padding: "16px"
---

# Design System: batterytrace

## 1. Overview

**Creative North Star: "The Field Report"**

batterytrace looks like a field investigator's report: raw data printed on near-black, methodology visible on the surface, numbers that don't need decoration to land. It is sober, precise, and urgent — the voice of someone who cracked open a power bank and catalogued what was inside. The visual system borrows from environmental impact statements and electronics teardown documentation: dense information, visible citations, industrial typography.

The system is **product-first**: design serves the task of selecting a product and seeing its cost. Every element earns its place. Decoration that doesn't convey data is removed. The aesthetic is technical without being cold — the warmth comes from the concreteness of the numbers, not from the color palette.

This system explicitly rejects: eco-branding (no leaf icons, no nature imagery, no earthy palettes), SaaS dashboard aesthetics (no KPI widgets, no admin chrome), glassmorphism as decoration, side-stripe border accents, and the cream/sand AI-default background.

**Key Characteristics:**
- Near-black foundation with toxic-warning green as the sole accent voice
- Single sans-serif family at varied weights; no display/body pairing
- Flat surfaces by default; depth only through tonal layering, never blur
- Data-first density: metric cards, tables, and citations are the vocabulary
- Dark default with full light mode; both modes avoid warm-neutral backgrounds

## 2. Colors

The palette is restrained: one near-black foundation, one toxic-warning green accent, and a small set of semantic signals for scenarios and states. No secondary or tertiary colors — the green carries all accent weight.

### Primary
- **Toxic-Warning Green** (`#00c896`): The sole accent. Used on primary data values, selected states, progress bars, and active indicators. Not "eco green" — this is instrumentation green, the color of something that demands attention. Applied at ≤10% of any given surface. Its rarity is the point.

### Neutral
- **Near-Black** (`#0d0d0d`): Page background in dark mode. The field-report canvas.
- **Dark Surface** (`#1a1a1a`): Card and panel backgrounds. One step above the page.
- **Border** (`#2a2a2a`): Dividers, card borders, input strokes. Present but quiet.
- **Body Text** (`#e0e0e0`): Primary text on dark surfaces. ≥4.5:1 against near-black.
- **Text Secondary** (`#999999`): Labels, metadata, secondary values. ≥4.5:1 against dark-surface.

### Semantic
- **Amber Warn** (`#f5a623`): Carbon footprint values. Warm signal on dark ground.
- **Danger Red** (`#e8543d`): Toxic substance values, destructive actions.
- **Recycle Teal** (`#2dd4bf`): Recycled/recovery scenario values. Cool contrast to landfill.
- **Landfill Coral** (`#f4907c`): Landfill scenario labels. Warm muted coral, not alarm-red.
- **Selected Green** (`#00b98b`): Product card selection ring. Slightly warmer than toxic-green for visibility on white backgrounds.

### Named Rules
**The One Voice Rule.** Toxic-warning green is the sole accent. No secondary palette, no decorative color. If it's not the accent, it's neutral. If it's semantic (carbon, water, toxicity, recycle), it uses its assigned signal color and nothing else.

**The No-Warm-Neutral Rule.** Neither dark mode nor light mode uses cream, sand, beige, or any warm-tinted near-white as a background. The dark mode is near-black. The light mode is a true off-white at chroma 0. Warmth is carried by the amber accent and the data, not by the canvas.

## 3. Typography

**Font:** System sans-serif stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`). One family, varied weights. No display/body pairing — the single stack carries hero headlines through data tables.

**Character:** Technical but not sterile. Light weights for display sizes create air; regular weight for body keeps density readable. Tabular numbers for all data values.

### Hierarchy
- **Display** (300, clamp(3rem, 5vw, 4.5rem), 1.05): Hero headlines only. Light weight on near-black creates precision without shouting. Letter-spacing: -0.02em.
- **Headline** (700, 28px, 1.2): Product names, section titles.
- **Title** (600, 22px, 1.3): Card titles, brand headers.
- **Body** (400, 14-16px, 1.6): Prose, descriptions, methodology text. Max line length 65-75ch.
- **Label** (600, 11-13px, 0.06em, uppercase): Metric labels, scenario headers, table headers. All-caps with tracking.

### Named Rules
**The Single-Family Rule.** One sans-serif stack for everything. No serif pairings, no mono exceptions. Variation comes from weight (300 → 700) and size, not from font changes.

**The Tabular Numbers Rule.** All data values use `font-variant-numeric: tabular-nums`. Numbers that change on interaction must not cause layout shift.

## 4. Elevation

This system is **flat by default**. Depth is conveyed through tonal layering (near-black → dark-surface → border), not shadows or blur. The calculator panel previously used backdrop-filter blur — this has been removed. Surfaces are solid.

### Shadow Vocabulary
None. No box-shadows on cards, buttons, or panels at rest. The system relies on border contrast and tonal steps for separation. If a future component genuinely needs elevation (tooltip, modal backdrop), use a single ambient shadow at `0 4px 24px rgba(0,0,0,0.12)` — no directional shadows, no layered shadow stacks.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. No blur. No glassmorphism. No decorative shadows. Separation comes from borders (`1px solid #2a2a2a`) and tonal contrast between adjacent surfaces.

## 5. Components

### Buttons
- **Shape:** Rounded corners (6px radius). No pill shapes. No circular buttons except close/dismiss icons.
- **Primary:** Translucent white fill (`rgba(255,255,255,0.12)`) on dark, white text, 1px border (`rgba(255,255,255,0.25)`), padding 16px 36px.
- **Hover:** Background deepens to `rgba(255,255,255,0.2)`, border lightens. Transition: background 0.15s, border-color 0.15s.
- **Focus:** 2px outline in toxic-green, offset 2px from border.
- **Ghost:** No fill, no border. Text only. Hover adds `rgba(255,255,255,0.06)` background.
- **Danger variant:** Uses danger-red for hover states (clear button, remove actions).

### Metric Cards
- **Shape:** Rounded corners (12px radius).
- **Background:** Dark Surface (`#1a1a1a`), 1px Border stroke.
- **Internal padding:** 28px all sides.
- **Hover:** Border lightens to `#444`. No transform, no shadow — just the border shift.
- **Metric value:** 42px, weight 700, letter-spacing -1.5px. Color varies by metric type (amber for carbon, blue for water, red for toxic, gray for degradation, green for recycle).
- **Progress bar:** 6px height, `#2a2a2a` track, gradient fill. Labels below in 12px text-secondary.

### Scenario Cards (Landfill / Recycle)
- **Shape:** 12px radius.
- **Background:** `rgba(0,0,0,0.02)`, 1px solid `rgba(0,0,0,0.07)` border.
- **No side-border stripes.** Previously used `border-left: 3px solid` — removed per the No Side-Stripes Rule. Scenario differentiation comes from the title color and the value color, not from border decoration.
- **Internal padding:** 16px.
- **Title:** 12px, weight 600, uppercase, letter-spacing 0.06em.

### Product Cards
- **Shape:** 16px radius.
- **Background:** Transparent at rest, white image area for product photos.
- **Hover:** translateY(-8px), box-shadow appears (one of the few shadow uses: product cards are interactive surfaces). Image scales 1.06x.
- **Selected:** 2px solid ring in selected-green, plus ambient shadow.
- **Internal info area:** 18px 20px padding. Product name 16px/600, specs 14px/secondary, carbon note 13px/selected-green.

### Navigation
- **Style:** Sticky top bar, near-black background with 95% opacity. Bottom border 1px border.
- **Logo:** 16px, weight 600. Accent dot in toxic-green.
- **Links:** 14px, text-secondary. Hover → body-text. 28px gap.
- **Mobile:** Logo left, links collapse (future: hamburger or bottom nav).

### Data Tables (BOM)
- **Shape:** 10px radius wrapper, 1px border.
- **Headers:** `rgba(255,255,255,0.04)` background, 11px uppercase label style, sticky top.
- **Cells:** 12px, 9px 12px padding. First column (category) in blue (`#60a5fa`) for visual scanning.
- **Row hover:** `rgba(255,255,255,0.02)` background.

### Modals
- **Overlay:** `rgba(0,0,0,0.84)` with 8px blur (blur reserved for overlay — this is functional, not decorative).
- **Panel:** Near-black with 1px border, 20px radius, max 780px width, 85vh max height.
- **Close button:** 32px circle, border stroke, hover fills to `rgba(255,255,255,0.08)`.

## 6. Do's and Don'ts

### Do:
- **Do** use toxic-warning green at ≤10% of any surface. Its rarity is the point.
- **Do** use `font-variant-numeric: tabular-nums` on every data value that changes.
- **Do** translate every technical number into a concrete equivalence (driving km, drinking days, generations).
- **Do** keep citations visible — the methodology link is a first-class element, not a footnote.
- **Do** use `text-wrap: balance` on hero headlines and `text-wrap: pretty` on methodology prose.
- **Do** respect `prefers-reduced-motion` — every animation needs a reduced-motion fallback.
- **Do** use the system font stack. One family, varied weights. Never introduce a second font.

### Don't:
- **Don't** use side-stripe borders (`border-left` or `border-right` greater than 1px as a colored accent). This is an absolute ban.
- **Don't** use glassmorphism, backdrop-filter blur, or frosted-glass effects. The flat-by-default rule is firm.
- **Don't** use greenwashing aesthetics: no leaf icons, no nature imagery, no earthy palettes, no "eco" language in the design.
- **Don't** use cream, sand, beige, or warm-tinted near-white backgrounds — in either dark or light mode.
- **Don't** nest cards inside cards. Metric cards are siblings, not children.
- **Don't** animate CSS layout properties (width, height, padding, margin). Use transform and opacity.
- **Don't** use decorative motion. Motion conveys state change, feedback, or loading — nothing else.
- **Don't** use gradient text (`background-clip: text` combined with gradient).
- **Don't** use Inter, Roboto, or any downloaded font. System stack only.
