# Product

## Register

product

## Users

Consumer electronics users in China, browsing on mobile and desktop. They arrive curious or mildly concerned about what happens to their power bank after its useful life. Most have never seen environmental impact data for consumer electronics presented this way. Their context: a quick check while shopping, or a friend sharing a link.

**Job to be done:** Select a brand → pick a model → see the environmental cost in concrete, human-scale terms they understand.

## Product Purpose

batterytrace makes the hidden environmental cost of power banks visible. It takes academic LCA data (carbon, water, toxicity, degradation, recyclability, energy payback) and translates it into everyday equivalences — driving distance, drinking water days, generations of descendants. Every number carries a citation.

Success: a user walks away with one number they'll remember and tell someone else.

## Brand Personality

**Sober, precise, urgent.** The voice is data journalism, not activism. Numbers do the heavy lifting; the interface stays out of the way. Trust through transparency, not persuasion through imagery. The urgency comes from the data itself, not from emotional language.

References: IPCC assessment reports (information density, citation-forward), McDonald's Nutrition Calculator (product→instant data model), ProPublica investigative data pieces (tight prose, prominent methodology).

## Anti-references

- **No greenwashing aesthetics.** No leaf icons, no eco-utopian imagery, no "together we can save the planet" copy, no nature photography, no earthy/forest color palettes.
- **No SaaS dashboard look.** No analytics-chart widgets, no admin-panel chrome, no KPI cards with trend arrows.
- **No activist/poster design.** The tone is fact-forward, not campaign-forward. The data persuades; the design doesn't shout.
- **No cream/sand/beige warm-neutral backgrounds** (even in light mode — the AI default of 2026).

## Design Principles

1. **Every number earns its place.** If a metric can't be tied to a citation, it doesn't ship. Source annotation is a first-class design element, not a footnote.
2. **Concrete over abstract.** "14.8 kg CO₂eq" means little; "≈ driving 61 km" lands. Translate every technical number into lived experience.
3. **Depth without clutter.** The full methodology is one click away. The surface shows the headline; the curious can drill into the model.
4. **Tool-first, not story-first.** Users are in a task (check a product, compare two). The interface supports that flow; it doesn't force a linear narrative.
5. **Trust through restraint.** No hyperbole, no selective highlighting of worst-case numbers, no hiding favorable data. If a product's numbers are average, show that honestly.

## Accessibility & Inclusion

- Target: WCAG 2.2 AA
- All metric cards must have text equivalents for screen readers
- Progress bars must include aria labels with numeric values
- Dark mode default with full light mode toggle
- Respect `prefers-reduced-motion` — progress bar animations and transitions must have reduced-motion fallbacks
- Color is never the sole differentiator for metric severity (always paired with labels)
- Body text contrast ≥ 4.5:1 against background in both dark and light modes
