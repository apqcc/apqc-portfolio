# APQC portfolio: animated site
Open `index.html` in a browser. Vanilla HTML/CSS/JS, no build step. Logo PNGs are cut from your uploaded JPGs (`assets/`); originals are in `assets/brand/`. Content is placeholder.

## Files
`animations.css` (tokens, keyframes, utilities) · `style.css` (layout) · `main.js` (class triggers, parallax values, counters) · `site-map.json`

Tokens: `--ease-out-expo`, `--ease-spring`, `--dur-fast/normal/slow` (200/500/900ms), `--stagger` (80ms, 40ms on mobile), reveal threshold 15%.

## Added on every page
- Header: shrinks on scroll (IntersectionObserver sentinel), current page underlined, logo scales down
- Page transitions: native cross-document View Transitions; navy wipe fallback (used on `file://` and unsupported browsers)
- Hero: title words sweep in from a mask, pen-tool motif draws in, subtitle fades, CTA scales from 0.95 with spring
- Loading sequence: hero items stagger 80ms apart; scroll-reveal footer
- Buttons: lift + shadow (shadow fades via pseudo-element)

## Per page
- **Home**: 3 project cards (stagger up, tilt up to 4deg, image zoom), capabilities list (heading slides left, list slides right), 3 stat counters, CTA band slides in from both sides, parallax on hero motifs (0.5x and 0.3x)
- **Work**: 6-card staggered grid with tilt and zoom, CTA band
- **About**: sticky in-page nav with active-section highlight, portrait slides left / bio slides right, skills stagger, process steps alternate left/right, counters
- **Contact**: form slides left / details right, field underline grows on focus, submit shows a confirmation (demo only, no backend)

## Quality checks
- Only `transform` and `opacity` are animated; all header, button and underline effects use pseudo-elements
- No scroll listeners: IntersectionObserver for triggers; a rAF loop for parallax runs only while the hero is visible
- No layout shift: fixed header height, reserved counter width (tabular figures), width/height on images
- `prefers-reduced-motion`: all motion off, all content visible
- Progressive: content is hidden only after JS adds `.js`; without JS everything shows
- Mobile (<768px): no parallax, shorter stagger; tilt only for fine pointers on wide screens
- Print: all content visible, no animation
