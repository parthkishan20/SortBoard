# 🔍 How SortBoard Works - Complete Technical Guide

This document explains **exactly** how the SortBoard sorting visualizer works, from the first line of code to the final animation on screen. Perfect for understanding the entire system!

---

## 📋 Table of Contents

1. [Application Flow Overview](#application-flow-overview)
2. [Project Bootstrap & Entry Point](#project-bootstrap--entry-point)
3. [Component Architecture](#component-architecture)
4. [Sorting Algorithm Implementation](#sorting-algorithm-implementation)
5. [Animation Engine](#animation-engine)
6. [State Management](#state-management)
7. [User Interaction Flow](#user-interaction-flow)
8. [Build & Deployment Process](#build--deployment-process)

---

## 🚀 Application Flow Overview

Here's the complete journey from start to finish:

```
User opens website
    ↓
index.html loads → main.tsx executes
    ↓
React initializes → App.tsx renders
    ↓
Visualizer.tsx mounts → useArrayGenerator creates random array
    ↓
User sees interface → selects algorithm & clicks "Start"
    ↓
useSorting hook activates → generator function starts
    ↓
Generator yields steps → animation loop displays them
    ↓
Array gets sorted → all bars turn green
    ↓
Done! 🎉
```

---

## 🎯 Project Bootstrap & Entry Point

### Step 1: HTML Entry Point (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SortBoard - Sorting Algorithm Visualizer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**What happens:**
1. Browser loads `index.html`
2. Finds empty `<div id="root"></div>` - this is where our React app will live
3. Loads `main.tsx` as a module (Vite handles the TypeScript compilation)

---

### Step 2: React Initialization (`src/main.tsx`)

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**What happens:**
1. Imports React's `createRoot` - the modern React 18+ way to render
2. Imports global CSS (Tailwind directives + custom styles)
3. Finds the `#root` div from HTML
4. Creates a React root and renders `<App />` inside it
5. `StrictMode` helps catch bugs during development

---

### Step 3: Root Component (`src/App.tsx`)

```typescript
import Visualizer from './components/Visualizer.tsx';

function App() {
  return <Visualizer />;
}

export default App;
```

**What happens:**
- Simple wrapper that renders the main `Visualizer` component
- This is where you'd add routing, global context, or theme providers in larger apps

---

## 🏗️ Component Architecture

### Component Hierarchy

```
App
 └── Visualizer (main container)
      ├── Header (title + algorithm info)
      ├── Controls Section
      │    ├── AlgorithmSelector (dropdown)
      │    ├── RangeSlider (array size)
      │    ├── RangeSlider (speed)
      │    └── ControlButtons (play/pause/stop)
      ├── VisualizationArea (the bars)
      └── Legend (color meanings)
```

---

### The Main Component: `Visualizer.tsx`

This component **orchestrates everything**. Here's how it works:

```typescript
const Visualizer = () => {
  // 1. Local state for UI controls
  const [speed, setSpeed] = useState(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>('bubble');

  // 2. Custom hook: manages array generation
  const { array, arraySize, setArray, setArraySize, generateArray } = useArrayGenerator(50);
  
  // 3. Custom hook: manages sorting logic
  const {
    isSorting,
    isPaused,
    startSorting,
    pauseSorting,
    resumeSorting,
    stopSorting,
  } = useSorting(array, speed);

  // 4. Event handlers
  const handleStart = () => startSorting(selectedAlgorithm, setArray);
  const handleResume = () => resumeSorting(setArray);
  const handleStop = () => stopSorting(generateArray);

  // 5. Render UI
  return (
    <div>
      <Header selectedAlgorithm={selectedAlgorithm} />
      {/* Controls and visualization components */}
    </div>
  );
};
```

**Key responsibilities:**
- Manages UI state (speed, selected algorithm)
- Uses custom hooks for complex logic
- Passes data and callbacks to child components
- Composes all UI pieces together

---

### Custom Hook: `useArrayGenerator.ts`

**Purpose:** Generate and manage the array of bars

```typescript
export const useArrayGenerator = (initialSize: number = 50) => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [arraySize, setArraySize] = useState(initialSize);

  const generateArray = () => {
    const newArray: ArrayBar[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 500) + 10,  // Random height 10-510
        state: 'default',  // Initial state
      });
    }
    setArray(newArray);
  };

  // Generate new array when size changes
  useEffect(() => {
    generateArray();
  }, [arraySize]);

  return { array, arraySize, setArray, setArraySize, generateArray };
};
```

**How it works:**
1. Creates an array of objects: `{ value: number, state: string }`
2. `value` = height of the bar (random 10-510 pixels)
3. `state` = color state ('default', 'comparing', 'swapping', 'sorted', 'pivot')
4. Automatically regenerates when size changes (via `useEffect`)
5. Returns everything Visualizer needs to work with the array

---

### Custom Hook: `useSorting.ts`

**Purpose:** Handle all sorting logic and animation timing

```typescript
export const useSorting = (array: ArrayBar[], speed: number) => {
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sortingGeneratorRef = useRef<Generator<SortStep> | null>(null);
  const animationRef = useRef<number | null>(null);

  const startSorting = async (selectedAlgorithm, onUpdate) => {
    // 1. Get the right generator function
    let generator;
    switch (selectedAlgorithm) {
      case 'bubble': generator = bubbleSort(array); break;
      case 'merge': generator = mergeSort(array); break;
      // ... etc
    }
    
    // 2. Store it and start animation
    sortingGeneratorRef.current = generator;
    await animateSorting(onUpdate);
  };

  const animateSorting = async (onUpdate) => {
    const step = () => {
      // Get next step from generator
      const result = sortingGeneratorRef.current.next();
      
      if (result.done) {
        // Sorting complete!
        setIsSorting(false);
        return;
      }
      
      // Update the UI with new array state
      onUpdate(result.value.array);
      
      // Schedule next step based on speed
      animationRef.current = setTimeout(step, 1000 / speed);
    };
    
    step();  // Start the loop
  };

  return { isSorting, isPaused, startSorting, pauseSorting, resumeSorting, stopSorting };
};
```

**How it works:**
1. **Stores the generator** in a ref (persists across renders)
2. **Calls `.next()`** on the generator to get each step
3. **Updates the UI** by calling `setArray()` with new state
4. **Uses `setTimeout`** to control animation speed
5. **Pausing** = just stop calling `.next()`, generator remembers its position
6. **Resuming** = continue calling `.next()` from where we left off

---

## 🧮 Sorting Algorithm Implementation

### The Magic: Generator Functions

All algorithms use **JavaScript generators** (`function*`). This is the secret sauce!

**What's a generator?**
- A function that can pause and resume
- Uses `yield` to pause and return a value
- Perfect for step-by-step animations

### Example: Bubble Sort

```typescript
export function* bubbleSort(arr: ArrayBar[]): Generator<SortStep> {
  const array = [...arr];  // Copy to avoid mutating original
  
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      
      // STEP 1: Mark elements we're comparing (yellow)
      array[j].state = 'comparing';
      array[j + 1].state = 'comparing';
      yield { array: [...array] };  // ← PAUSE HERE, show UI
      
      // STEP 2: Should we swap?
      if (array[j].value > array[j + 1].value) {
        array[j].state = 'swapping';
        array[j + 1].state = 'swapping';
        
        // Swap the elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        
        yield { array: [...array] };  // ← PAUSE HERE, show swap
      }
      
      // STEP 3: Reset to default
      array[j].state = 'default';
      array[j + 1].state = 'default';
    }
    
    // Mark this element as sorted (green)
    array[array.length - 1 - i].state = 'sorted';
    yield { array: [...array] };
  }
}
```

**What happens when you call `bubbleSort(myArray)`:**

1. **Initial call:** Returns a generator object (not running yet!)
2. **First `.next()`:** Runs until first `yield`, pauses, returns the array
3. **Second `.next()`:** Continues from where it left off, runs to next `yield`
4. **Repeat** until the function ends (`done: true`)

**Why this is brilliant:**
- ✅ No complex state management
- ✅ Algorithm looks like normal sorting code
- ✅ Perfect for animations (one yield = one frame)
- ✅ Can pause/resume naturally

---

### Example: Quick Sort (More Complex)

```typescript
export function* quickSort(arr: ArrayBar[]): Generator<SortStep> {
  const array = [...arr];
  
  function* quickSortHelper(low: number, high: number): Generator<SortStep> {
    if (low < high) {
      // Partition and get pivot index
      const pivotIndex = yield* partition(low, high);
      
      // Recursively sort left and right
      yield* quickSortHelper(low, pivotIndex - 1);
      yield* quickSortHelper(pivotIndex + 1, high);
    }
  }
  
  function* partition(low: number, high: number): Generator<SortStep, number> {
    const pivot = array[high];
    array[high].state = 'pivot';  // Purple color
    yield { array: [...array] };
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      array[j].state = 'comparing';
      yield { array: [...array] };
      
      if (array[j].value < pivot.value) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        array[i].state = 'swapping';
        array[j].state = 'swapping';
        yield { array: [...array] };
      }
    }
    
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;  // Return pivot position
  }
  
  yield* quickSortHelper(0, array.length - 1);
  
  // Mark all as sorted
  array.forEach(bar => bar.state = 'sorted');
  yield { array: [...array] };
}
```

**Advanced features:**
- `yield*` delegates to another generator
- Recursive calls still work!
- Can return values from generators (`Generator<SortStep, number>`)

---

## 🎬 Animation Engine

### How Animation Works

```
User clicks "Start"
    ↓
handleStart() calls startSorting()
    ↓
Creates generator: bubbleSort(array)
    ↓
Starts animateSorting() loop
    ↓
┌─────────────────────────────────┐
│  Animation Loop (recursive)     │
│                                 │
│  1. generator.next()            │  ← Get next step
│  2. result.value.array          │  ← Extract new array state
│  3. setArray(newArray)          │  ← Update React state
│  4. React re-renders            │  ← UI updates (bars change color/position)
│  5. setTimeout(loop, delay)     │  ← Wait based on speed
│  6. Back to step 1              │
└─────────────────────────────────┘
    ↓
Generator returns done: true
    ↓
Animation stops, all bars green ✓
```

### Speed Control

```typescript
const getDelay = () => 1000 / speed;
```

- Speed = 1 → Delay = 1000ms (1 step per second)
- Speed = 50 → Delay = 20ms (50 steps per second)
- Speed = 100 → Delay = 10ms (100 steps per second)

---

## 🎨 State Management

### TypeScript Types (`src/types.ts`)

```typescript
export interface ArrayBar {
  value: number;        // Height of the bar (10-510)
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot';
}

export type SortingAlgorithm = 
  | 'bubble' 
  | 'merge' 
  | 'quick' 
  | 'insertion' 
  | 'selection' 
  | 'heap';

export interface SortStep {
  array: ArrayBar[];    // Current state of the array
}
```

### State Flow

```
User Input (slider change)
    ↓
setSpeed(newValue)  [React useState]
    ↓
Visualizer re-renders
    ↓
New speed passed to useSorting hook
    ↓
Animation uses new delay calculation
```

### Color Mapping

```typescript
const getBarColor = (state: ArrayBar['state']) => {
  switch (state) {
    case 'comparing':  return 'bg-yellow-400';  // 🟡 Checking
    case 'swapping':   return 'bg-red-500';     // 🔴 Swapping
    case 'sorted':     return 'bg-green-500';   // 🟢 Done
    case 'pivot':      return 'bg-purple-500';  // 🟣 Quick Sort pivot
    default:           return 'bg-blue-400';    // 🔵 Unsorted
  }
};
```

---

## 🎮 User Interaction Flow

### Complete User Journey

#### 1. **Page Load**
```
index.html → main.tsx → App.tsx → Visualizer.tsx
    ↓
useArrayGenerator runs → generates 50 random bars
    ↓
User sees interface with blue bars
```

#### 2. **Changing Array Size**
```
User drags "Array Size" slider to 30
    ↓
<RangeSlider onChange={setArraySize} />
    ↓
setArraySize(30) updates state
    ↓
useEffect in useArrayGenerator detects change
    ↓
generateArray() creates 30 new random bars
    ↓
UI re-renders with 30 bars
```

#### 3. **Selecting Algorithm**
```
User selects "Quick Sort" from dropdown
    ↓
<AlgorithmSelector onChange={setSelectedAlgorithm} />
    ↓
setSelectedAlgorithm('quick')
    ↓
Header updates to show "Quick Sort • O(n log n)"
```

#### 4. **Starting Sort**
```
User clicks "Start Sorting"
    ↓
<ControlButtons onStart={handleStart} />
    ↓
handleStart() → startSorting('quick', setArray)
    ↓
useSorting creates quickSort(array) generator
    ↓
animateSorting() loop begins
    ↓
Every 20ms (if speed=50):
  - generator.next() → new array state
  - setArray() → React updates
  - Bars change color/position
    ↓
Generator done → all bars green
```

#### 5. **Pause/Resume**
```
User clicks "Pause"
    ↓
pauseSorting() called
    ↓
clearTimeout(animationRef) → stops the loop
    ↓
Generator stays at current position (paused)
    ↓
User clicks "Resume"
    ↓
resumeSorting() → animateSorting() restarts
    ↓
Continues from exact same spot!
```

#### 6. **Stop**
```
User clicks "Stop"
    ↓
stopSorting(generateArray)
    ↓
Clears timeout, resets generator
    ↓
Calls generateArray() → fresh random array
    ↓
Back to initial state
```

---

## 📦 Build & Deployment Process

### Development Mode

```bash
npm run dev
```

**What happens:**
1. Vite starts dev server on `localhost:5173`
2. Watches for file changes
3. Hot Module Replacement (HMR) - changes appear instantly
4. TypeScript compiled on-the-fly
5. Tailwind CSS processes utility classes

### Production Build

```bash
npm run build
```

**What happens:**
1. TypeScript compiles all `.tsx` → `.js`
2. Vite bundles everything:
   - Tree-shaking (removes unused code)
   - Minification (compress code)
   - Code splitting (separate chunks)
3. Tailwind purges unused CSS (only keeps classes you use)
4. Output goes to `dist/` folder:
   ```
   dist/
   ├── index.html
   ├── assets/
   │   ├── index-[hash].js   (~206KB)
   │   └── index-[hash].css  (~15KB)
   └── favicon.svg
   ```

### GitHub Pages Deployment

```bash
npm run deploy
```

**What happens:**
1. Runs `npm run build` (creates `dist/`)
2. Uses `gh-pages` package
3. Pushes `dist/` folder to `gh-pages` branch
4. GitHub serves from that branch at:
   ```
   https://parthkishan20.github.io/SortBoard/
   ```

**Configuration (`vite.config.ts`):**
```typescript
export default defineConfig({
  base: '/SortBoard/',  // Important for GitHub Pages!
})
```

This ensures all asset paths work on GitHub's subdomain.

---

## 🔗 Data Flow Summary

### The Complete Picture

```
┌─────────────────────────────────────────────────────────┐
│                     USER ACTIONS                        │
└────────────┬────────────────────────────────────────────┘
             ↓
┌────────────────────────────────────────────────────────┐
│  REACT COMPONENTS (UI Layer)                           │
│  - Visualizer.tsx                                      │
│  - Header, Controls, VisualizationArea, etc.          │
└────────────┬───────────────────────────────────────────┘
             ↓
┌────────────────────────────────────────────────────────┐
│  CUSTOM HOOKS (Logic Layer)                            │
│  - useArrayGenerator: Manages array state              │
│  - useSorting: Controls sorting & animation            │
└────────────┬───────────────────────────────────────────┘
             ↓
┌────────────────────────────────────────────────────────┐
│  GENERATOR FUNCTIONS (Algorithm Layer)                 │
│  - bubbleSort(), mergeSort(), quickSort(), etc.        │
│  - Yield steps one at a time                           │
└────────────┬───────────────────────────────────────────┘
             ↓
┌────────────────────────────────────────────────────────┐
│  ANIMATION ENGINE                                      │
│  - setTimeout loop                                     │
│  - Calls generator.next() at controlled intervals      │
└────────────┬───────────────────────────────────────────┘
             ↓
┌────────────────────────────────────────────────────────┐
│  STATE UPDATES                                         │
│  - setArray() triggers React re-render                 │
└────────────┬───────────────────────────────────────────┘
             ↓
┌────────────────────────────────────────────────────────┐
│  VISUAL UPDATE                                         │
│  - Bars change color and position                      │
│  - User sees the animation                             │
└─────────────────────────────────────────────────────────┘
```

---

## 🎓 Key Takeaways

### Why This Architecture Works

1. **Separation of Concerns**
   - UI components just render
   - Hooks manage complex logic
   - Algorithms are pure functions

2. **Generator Pattern**
   - Algorithms look clean and readable
   - Natural pause/resume capability
   - No complex state machines needed

3. **React Best Practices**
   - Custom hooks for reusable logic
   - Props for component communication
   - Single source of truth (state lifted up)

4. **TypeScript Safety**
   - Catch errors at compile time
   - IDE autocomplete
   - Self-documenting code

5. **Performance**
   - Only re-render what changed
   - Efficient array copying
   - Controlled animation timing

---

## 🚀 What You Learned

By building this project, you've mastered:

- ✅ Modern React (hooks, functional components)
- ✅ TypeScript for type safety
- ✅ Generator functions for complex flows
- ✅ Custom hooks for logic reuse
- ✅ Component composition
- ✅ Animation timing and control
- ✅ Build tools (Vite)
- ✅ Deployment (GitHub Pages)
- ✅ CSS frameworks (Tailwind)
- ✅ Algorithm visualization

---

**Now you understand every single piece of how SortBoard works! 🎉**

Questions? Read through this guide again - every step is explained!
