# Watch Display Web App — Design Spec
**Date:** 2026-03-25
**Status:** Approved

---

## Overview

A real-time browser clock app rendering three hyper-realistic watch faces in a swipeable carousel. No backend, no persistence, no external APIs. Built with React + Vite + Tailwind CSS.

---

## Project Structure

```
playground/watch-app/
├── src/
│   ├── App.jsx                  ← root: clock state, carousel shell, navigation
│   ├── components/
│   │   ├── CasioWatch.jsx       ← digital LCD watch face
│   │   ├── SeikoWatch.jsx       ← dress analog watch face
│   │   ├── TissotWatch.jsx      ← dive analog watch face
│   │   └── AnalogHands.jsx      ← shared hand renderer (hour, minute, second)
│   └── index.jsx                ← React entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (JSX) |
| Build | Vite |
| Styling | Tailwind CSS + inline styles for gradients |
| Animations | CSS transitions with cubic-bezier timing |
| State | useState, useEffect |
| Clock source | Browser `Date` |

---

## Clock State (`App.jsx`)

```js
const [time, setTime] = useState(new Date());
useEffect(() => {
  const id = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(id);
}, []);
```

`time` is passed as a prop to the active watch component on every tick.

---

## Components

### `AnalogHands.jsx`

Shared renderer used by both analog watches. Accepts a `time` prop and a `style` prop object for per-watch hand customization (color, width, length, cap size).

**Rotation math:**
- Hour hand: `(h % 12) * 30 + m * 0.5 + s / 120`
- Minute hand: `m * 6 + s * 0.1`
- Second hand: `s * 6`

**Second hand transition:** `0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)` — slight overshoot simulates mechanical sweep.
**Hour/minute transition:** `1s cubic-bezier(0.4, 2.08, 0.55, 0.44)`.

Each hand is an absolutely positioned `div` with `transformOrigin: bottom center`, `bottom: 50%`, `left: 50%`. A center cap `div` overlays all hands.

---

### `CasioWatch.jsx`

Replicates the Casio F-91W aesthetic.

- **Case:** Dark grey/black rounded rectangle. Inset shadow border simulating resin bezel.
- **LCD panel:** Muted green gradient (`#8a9e6a → #6a7e4a`) with inset shadow.
- **Display layout:**
  - Top row: day abbreviation (MON–SUN) + zero-padded date and month
  - Center: large `HH:MM` in 12-hour format — `"Courier New", monospace`
  - Bottom row: zero-padded seconds + AM/PM indicator
- **Buttons:** Three pill labels at the bottom (MODE / ALARM / LIGHT) — decorative, non-interactive.
- **Brand:** "CASIO" label above LCD.

---

### `SeikoWatch.jsx`

Replicates the Seiko Presage dress watch aesthetic.

- **Case:** Circular, gold/champagne gradient ring with drop shadow.
- **Dial:** Warm cream (`#faf5ea → #ede0c4`) with subtle radial highlight.
- **Markers (SVG):**
  - `12 / 3 / 6 / 9`: serif text numerals
  - All other hours: thin SVG rectangle tick, rotated toward center
  - Minutes: small circles at non-hour positions
- **Brand text:** "SEIKO" + "PRESAGE" centered on upper dial, serif font.
- **Hands:** Dark charcoal/brown, tapered via `AnalogHands`.
- **Crown:** Gold-toned pill on right side.
- **Crystal:** Subtle linear gradient overlay for glass reflection.

---

### `TissotWatch.jsx`

Replicates the Tissot Seastar 1000 dive watch aesthetic.

- **Bezel:** Dark metallic with 60 SVG tick marks. Gold triangle marker at 12 o'clock.
- **Dial:** Deep navy (`#0a1a2e → #0d2040`) with conic gradient texture and radial highlight.
- **Markers (SVG):**
  - `12 / 3 / 6 / 9`: applied rectangular indices — white fill with outline
  - Other hours: smaller white rectangles
  - Minutes: white dots at non-hour positions
- **Brand text:** "TISSOT" + "1853" + "SEASTAR" + "300M/1000FT" on dial.
- **Hands:** White/silver (hour + minute) via `AnalogHands`. Red second hand.
- **Crown:** Ridged metallic cylinder on right side.
- **Crystal:** Linear gradient glare overlay.

---

## Carousel (`App.jsx`)

### State
```js
const [current, setCurrent] = useState(0);        // 0 = Casio, 1 = Seiko, 2 = Tissot
const [transitioning, setTransitioning] = useState(false);
const [direction, setDirection] = useState(0);    // -1 | 1
```

### Transition
- `goTo(index)`: sets `direction`, sets `transitioning = true`, after 400ms sets `current`, resets `transitioning`.
- During transition: `opacity: 0`, `translateX(direction * -40px)`, `scale(0.95)`.
- At rest: `opacity: 1`, `translateX(0)`, `scale(1)`.
- Transition: `400ms cubic-bezier(0.25, 0.1, 0.25, 1)`.

### Navigation
- **Desktop:** Left/right arrow buttons — `opacity: 0` by default, `opacity: 1` on parent hover. Slide in from edges (200ms).
- **Mobile:** `touchstart` records X. `touchend` diffs — delta > 50px triggers `prev()` or `next()`.
- **Dots:** Three dots below watch. Active dot expands to pill shape (`width: 24px`). Click navigates directly.

### Layout
- Dark background: `linear-gradient(135deg, #0a0a0f, #111120, #0a0a0f)`.
- Watch centered vertically and horizontally (`min-height: 100vh`, flexbox column center).
- Watch model label above the face in small uppercase serif text, fades during transition.
- Fixed max-width container on desktop; full-screen on mobile.

---

## Accessibility & UX

- Buttons have visible focus states (browser default).
- Touch targets (arrows, dots) meet 44×44px minimum.
- No instructions needed: arrows appear on hover, swipe works on touch devices.

---

## Non-Goals (from PRD)

- No user accounts, persistence, or settings
- No alarm/stopwatch/timer
- No e-commerce integration
- No SSR or backend
