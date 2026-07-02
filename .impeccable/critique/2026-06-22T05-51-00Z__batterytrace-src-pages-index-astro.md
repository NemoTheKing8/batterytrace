---
target: calculator section
total_score: 20
p0_count: 1
p1_count: 2
timestamp: 2026-06-22T05-51-00Z
slug: batterytrace-src-pages-index-astro
---
# Critique: Calculator Section
Target: batterytrace/src/pages/index.astro
Score: 20/40 — Acceptable

## Heuristic Scores
| # | Heuristic | Score |
|---|-----------|-------|
| 1 | Visibility of System Status | 2 |
| 2 | Match System / Real World | 2 |
| 3 | User Control and Freedom | 3 |
| 4 | Consistency and Standards | 1 |
| 5 | Error Prevention | 3 |
| 6 | Recognition Rather Than Recall | 1 |
| 7 | Flexibility and Efficiency | 2 |
| 8 | Aesthetic and Minimalist Design | 1 |
| 9 | Error Recovery | 3 |
| 10 | Help and Documentation | 2 |

## Anti-Patterns
- LLM: Split dark/light personality, gradient-as-bandage, microscopic typography, upside-down interaction flow
- Detector: Clean (0 findings after earlier fixes)

## Priority Issues
- P0: Interaction flow backwards — results update off-screen from selection
- P1: Split visual identity — dark panel + light product grid = two websites
- P1: Scenario cards invisible — rgba(0,0,0,0.02) on #0d1117
- P2: Microscopic typography — 10px labels, 7 text sizes under 14px
- P2: Empty state dead — no preview, no sample data
- P3: 100vh hero blocks calculator

## Persona Red Flags
- Jordan (First-Timer): Scrolls past dead panel, clicks product, can't see result
- Alex (Power User): No keyboard nav, no multi-select comparison
- Sam (Screen Reader): No aria-live, no ARIA labels on product cards
