# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (Vite, localhost:5173)
npm run build      # TypeScript compile + Vite production build → dist/
npm run preview    # serve the dist/ build locally
npm run lint       # ESLint across all source files
npm run deploy     # build then publish dist/ to gh-pages branch
```

No test suite is configured.

## Architecture

The app is a single-page React + Vite + Tailwind CSS sorting algorithm visualizer. `App.tsx` renders only `<Visualizer />`, which owns all state and coordinates the two core hooks.

### Data flow

1. `useArrayGenerator` — owns the `ArrayBar[]` array state and regenerates it when `arraySize` changes.
2. `useSorting` — drives the animation loop. On `startSorting`, it instantiates a **generator function** for the chosen algorithm, then steps through it with `setTimeout` at a delay derived from the `speed` slider (`1000 / speed` ms). Each `yield` from a generator produces a `SortStep` whose `.array` is passed to `setArray`, causing a re-render.
3. `Visualizer` wires the two hooks together and passes callbacks down to the control components.

### Algorithm generators (`src/algorithms/`)

Every algorithm is a TypeScript generator (`function*`) that yields `SortStep` objects. Each step carries:
- `array: ArrayBar[]` — full snapshot with updated `state` fields (`'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot'`)
- Optional index hints: `comparingIndices`, `swappingIndices`, `sortedIndices`, `pivotIndex`

To add a new algorithm: implement a generator in `src/algorithms/yourSort.ts`, export it from `src/algorithms/index.ts` (also add to `algorithmInfo`), add the key to `SortingAlgorithm` in `src/types.ts`, and add a case in `useSorting.ts`.

### Key types (`src/types.ts`)

- `ArrayBar` — `{ value: number; state: BarState }`
- `SortStep` — one animation frame yielded by an algorithm generator
- `SortingAlgorithm` — union of algorithm key strings

### Styling

Tailwind utility classes only; no CSS modules. `src/index.css` imports Tailwind's base layers. Bar colors are driven by the `state` field on each `ArrayBar` and rendered in `VisualizationArea`.
