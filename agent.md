# Sorting Visualizer — Agent

## Project Summary

- A small interactive sorting algorithm visualizer built with React, Vite, TypeScript and Tailwind CSS.
- Purpose: educational demo to visualize common sorting algorithms, control speed/size, and compare algorithm behaviour.

## Business Requirements

- Provide a responsive UI that visualizes array state while running sorting algorithms.
- Allow users to choose algorithm, set array size and speed, start/pause/reset the animation.
- Keep visuals clear and accessible (color contrast, keyboard operability where reasonable).
- Prioritize smooth animations, deterministic behavior for reproducible demonstrations, and small bundle size.

## Technical Details

- Frameworks & Tooling: React + Vite (dev server, HMR), TypeScript, Tailwind CSS for utility-first styling.
- Key directories and files:
  - `src/components/` — UI components and controls (see `Visualizer.tsx`, `VisualizationArea.tsx`, `ControlButtons.tsx`, `AlgorithmSelector.tsx`).
  - `src/algorithms/` — algorithm implementations returning step sequences (`bubbleSort.ts`, `mergeSort.ts`, etc.).
  - `src/hooks/` — reusable hooks used by the visualizer (`useArrayGenerator.ts`, `useSorting.ts`).
  - `src/main.tsx`, `src/App.tsx` — app entry and top-level layout.
  - `index.html`, `vite.config.ts`, `tailwind.config.js` — build/dev configuration.
- Scripts (from `package.json`):

```bash
npm install
npm run dev       # start development server (vite)
npm run build     # produce production build
npm run preview   # run local preview of production build
npm run lint      # run eslint across the codebase
npm run deploy    # (optional) deploy using gh-pages (project includes `deploy` script)
```

## Developer Notes & Strategy

1. Keep algorithm implementations pure and separate from rendering. Each algorithm should produce a deterministic sequence of steps (reads/writes/swaps) that the visualizer consumes.
2. Keep UI components presentational where possible; move state and orchestration into `useSorting` and small controllers.
3. Favor simplicity over clever micro-optimizations: clear code is better for teaching.
4. Add minimal unit tests for algorithm correctness if/when adding a test harness.

## Coding Standards

- Use TypeScript types for algorithm step shapes and component props.
- Keep components small and focused; prefer composition over large monolithic components.
- Maintain accessible controls (labels, aria attributes) and keyboard focus order for interactive elements.
- Keep styles in Tailwind utilities and small component-level classes; avoid heavy global CSS.
- Run `npm run lint` and ensure no new ESLint errors before merging changes.

## Performance & UX Considerations

- Avoid re-rendering the entire list unnecessarily; prefer keyed lists and memoization for large arrays.
- Ensure animation timing is driven by a single source of truth (speed setting) to keep play/pause behavior predictable.
- Keep the default array size and animation speed reasonable for a smooth experience on lower-end machines.

## QA / Manual Testing Checklist

- Verify each algorithm sorts correctly for small and mid-sized arrays.
- Check that start/pause/reset produce consistent state transitions.
- Validate UI at multiple viewport sizes and on macOS (dev host) and a common Linux CI image.

## Where to look first

- `src/algorithms/` — algorithm implementations and step formats.
- `src/hooks/useSorting.ts` — orchestrates the sorting playback and state updates.
- `src/components/Visualizer.tsx` and `src/components/VisualizationArea.tsx` — rendering and visual mapping.

## Next steps (recommended)

- Add small unit tests for each algorithm to guarantee correctness under refactors.
- Add brief developer README section showing how algorithms should expose step sequences.

## Style preferences

- Keep messages and docs concise and neutral. Prefer clarity over stylistic flourishes.
