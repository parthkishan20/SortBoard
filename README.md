# SortBoard

A React-based sorting algorithm visualizer built with Vite, TypeScript, and Tailwind CSS. Watch different sorting algorithms come to life with smooth animations and real-time visualizations.

## Features

- 🎨 **6 Sorting Algorithms**: Bubble, Merge, Quick, Insertion, Selection, and Heap Sort
- ⚡ **Real-time Animation**: Watch each step of the sorting process
- 🎮 **Interactive Controls**: 
  - Adjust array size (10-100 elements)
  - Control animation speed (1-100 steps/second)
  - Pause, resume, and stop sorting at any time
- 🎯 **Visual States**: Different colors for comparing, swapping, sorted, and pivot elements
- 📊 **Complexity Display**: Shows time complexity for each algorithm

## Sorting Algorithms

| Algorithm | Time Complexity | Best For |
|-----------|----------------|----------|
| Bubble Sort | O(n²) | Educational purposes |
| Merge Sort | O(n log n) | Large datasets |
| Quick Sort | O(n log n) | General purpose |
| Insertion Sort | O(n²) | Small or nearly sorted arrays |
| Selection Sort | O(n²) | Simple implementation |
| Heap Sort | O(n log n) | Guaranteed performance |

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework

## Project Structure

```
src/
├── App.tsx              # Main application component
├── Visualizer.tsx       # Sorting visualizer component with controls
├── SortingAlgorithms.ts # Sorting algorithm implementations using generators
├── types.ts             # TypeScript type definitions
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## How It Works

The sorting algorithms are implemented as **generator functions** that yield each step of the sorting process. This allows for:

- Step-by-step animation control
- Pause and resume functionality
- Smooth visual transitions between states
- Efficient memory usage

Each algorithm yields `SortStep` objects containing:
- Current array state
- Indices being compared/swapped
- Visual state for each element (comparing, swapping, sorted, pivot)

## Usage

1. **Select an Algorithm**: Choose from the dropdown menu
2. **Adjust Array Size**: Use the slider to set the number of elements (10-100)
3. **Set Speed**: Control animation speed (1-100 steps per second)
4. **Generate Array**: Click to create a new random array
5. **Start Sorting**: Click the play button to begin visualization
6. **Control Playback**: Pause, resume, or stop the sorting process

## Color Legend

- 🔵 **Blue**: Unsorted elements
- 🟡 **Yellow**: Elements being compared
- 🔴 **Red**: Elements being swapped
- 🟣 **Purple**: Pivot element (Quick Sort)
- 🟢 **Green**: Sorted elements

## License

MIT

