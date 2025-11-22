# 🎯 SortBoard

An **interactive sorting algorithm visualizer** built with React, Vite, TypeScript, and Tailwind CSS. Perfect for beginners learning how sorting algorithms work! Watch algorithms sort arrays step-by-step with beautiful animations.

🌐 **Live Demo**: [https://parthkishan20.github.io/SortBoard/](https://parthkishan20.github.io/SortBoard/)

## ✨ Features

- 🎨 **6 Sorting Algorithms** with step-by-step visualization
- ⚡ **Real-time Animations** - See exactly how each algorithm works
- 🎮 **Interactive Controls**:
  - Adjust array size (10-100 elements)
  - Control animation speed (1-100 steps/second)
  - Pause, resume, and stop sorting anytime
- 🎯 **Color-Coded States** - Different colors show what the algorithm is doing
- 📊 **Complexity Info** - Learn the time complexity of each algorithm
- 🎭 **Responsive Design** - Works on desktop, tablet, and mobile

## 📚 Sorting Algorithms Explained

### 🫧 Bubble Sort
**What it does**: Compares neighboring elements and swaps them if they're in the wrong order. Like bubbles rising to the surface!

**How it works**:
1. Start at the beginning of the array
2. Compare two adjacent elements
3. If the left one is bigger, swap them
4. Move to the next pair and repeat
5. Keep doing this until no more swaps are needed

**Time Complexity**: O(n²) - Slow for large arrays  
**Best for**: Learning and small datasets (10-50 items)  
**Fun fact**: Named "Bubble" because larger values "bubble up" to the end!

---

### 🔀 Merge Sort
**What it does**: Divides the array into smaller pieces, sorts them, then merges them back together. Like organizing cards by splitting the deck!

**How it works**:
1. Split the array in half repeatedly until you have single elements
2. Single elements are already "sorted"
3. Merge pairs of small arrays together in sorted order
4. Keep merging until you have one sorted array

**Time Complexity**: O(n log n) - Fast and reliable  
**Best for**: Large datasets (100+ items)  
**Fun fact**: Uses "divide and conquer" strategy - one of the most important algorithm techniques!

---

### ⚡ Quick Sort
**What it does**: Picks a "pivot" element and arranges all smaller elements before it and larger ones after it. Then repeats on each side!

**How it works**:
1. Pick a pivot (we use the last element)
2. Move all smaller elements to the left of the pivot
3. Move all larger elements to the right of the pivot
4. Now the pivot is in its final sorted position!
5. Repeat steps 1-4 for the left and right sections

**Time Complexity**: O(n log n) on average  
**Best for**: General purpose sorting  
**Fun fact**: One of the fastest sorting algorithms in practice! Used in many programming languages' built-in sort functions.

---

### 📥 Insertion Sort
**What it does**: Builds the sorted array one element at a time, like sorting playing cards in your hand!

**How it works**:
1. Start with the second element
2. Compare it with elements before it
3. Move it backward until you find its correct position
4. Insert it there
5. Move to the next element and repeat

**Time Complexity**: O(n²) but very fast for small or nearly sorted arrays  
**Best for**: Small arrays (under 50 items) or data that's almost sorted  
**Fun fact**: This is how most people naturally sort things in real life!

---

### 🎯 Selection Sort
**What it does**: Finds the smallest element and puts it first, then finds the next smallest, and so on. Like picking the shortest person first when arranging a line by height!

**How it works**:
1. Find the minimum element in the unsorted part
2. Swap it with the first unsorted element
3. Move the "sorted/unsorted" boundary one step right
4. Repeat until everything is sorted

**Time Complexity**: O(n²) - Not the fastest but very simple  
**Best for**: When memory writes are expensive (it does minimum swaps)  
**Fun fact**: Makes the least number of swaps compared to other O(n²) algorithms!

---

### 🏔️ Heap Sort
**What it does**: Organizes the array into a "heap" structure (like a pyramid), then repeatedly extracts the largest element.

**How it works**:
1. Build a "max heap" - a tree where parents are larger than children
2. The largest element is now at the top
3. Swap it with the last element (moving it to the sorted section)
4. "Heapify" the remaining elements to restore the heap property
5. Repeat until all elements are sorted

**Time Complexity**: O(n log n) - Guaranteed fast performance  
**Best for**: When you need guaranteed O(n log n) performance without extra memory  
**Fun fact**: Uses a clever tree structure even though the array looks flat!

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed on your computer
- Basic knowledge of terminal/command line

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/parthkishan20/SortBoard.git
cd SortBoard
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173/`

### Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 🛠️ Tech Stack

- **React 19** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite 7** - Lightning-fast build tool
- **Tailwind CSS 3** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 📁 Project Structure

```
sorting-visualizer/
├── src/
│   ├── algorithms/          # Sorting algorithm implementations
│   │   ├── bubbleSort.ts
│   │   ├── mergeSort.ts
│   │   ├── quickSort.ts
│   │   ├── insertionSort.ts
│   │   ├── selectionSort.ts
│   │   ├── heapSort.ts
│   │   └── index.ts         # Exports all algorithms
│   │
│   ├── components/          # React components
│   │   ├── Visualizer.tsx   # Main component
│   │   ├── Header.tsx       # App title and info
│   │   ├── AlgorithmSelector.tsx
│   │   ├── RangeSlider.tsx  # Reusable slider
│   │   ├── ControlButtons.tsx
│   │   ├── VisualizationArea.tsx
│   │   └── Legend.tsx       # Color legend
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useSorting.ts    # Sorting logic and animation
│   │   └── useArrayGenerator.ts
│   │
│   ├── types.ts             # TypeScript interfaces
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
│
├── public/
│   ├── logo.svg             # Animated logo
│   └── favicon.svg          # Browser icon
│
└── package.json
```

## 🔧 How It Works (Technical Details)

### Generator Functions
All sorting algorithms are implemented as **JavaScript generator functions** (`function*`). This allows us to:

- **Pause and resume** - Generators can yield control back
- **Step-by-step execution** - Each `yield` is one step
- **Memory efficient** - Only one step in memory at a time
- **Clean code** - No complex state management needed

Example from our Bubble Sort:
```typescript
export function* bubbleSort(arr: ArrayBar[]): Generator<SortStep> {
  const array = [...arr];
  
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      // Mark elements being compared
      array[j].state = 'comparing';
      array[j + 1].state = 'comparing';
      yield { array: [...array] };  // ← This pauses execution!
      
      // Swap if needed
      if (array[j].value > array[j + 1].value) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        yield { array: [...array] };
      }
    }
  }
}
```

### Custom Hooks
- **`useSorting`** - Manages sorting state, animation timing, and playback controls
- **`useArrayGenerator`** - Handles array generation and size changes

### Component Architecture
The app is split into small, focused components following React best practices:
- Each component has a single responsibility
- Props are strongly typed with TypeScript
- Reusable components (RangeSlider, ControlButtons)
- Custom hooks extract complex logic

## 🎮 How to Use

### Basic Steps:
1. **Choose an algorithm** from the dropdown menu
2. **Adjust array size** (10-100 elements) - Smaller is easier to follow!
3. **Set animation speed** (1-100 steps/sec) - Start slow to understand better
4. **Click "Generate Array"** to create random numbers
5. **Press "Start Sorting"** to watch the magic happen! ✨

### Pro Tips:
- 🐌 Start with **speed 10-20** and **size 20-30** to learn how algorithms work
- ⏸️ Use **Pause** to study what's happening at any moment
- 🔄 Try the same array with different algorithms to compare them
- 🎯 Watch the **yellow** (comparing) and **red** (swapping) colors to understand the logic

## 🎨 Color Legend

Understanding what you're seeing:

| Color | Meaning | What's Happening |
|-------|---------|------------------|
| 🔵 **Blue** | Unsorted | Elements waiting to be sorted |
| 🟡 **Yellow** | Comparing | Algorithm is checking these two values |
| 🔴 **Red** | Swapping | Elements are being swapped! |
| 🟣 **Purple** | Pivot | Special element in Quick Sort |
| 🟢 **Green** | Sorted | Element is in its final position! |

## 📖 Learning Path (For Beginners)

**Week 1 - Start Simple:**
1. Try **Bubble Sort** first - easiest to understand
2. Watch it with speed 10 and size 20
3. Notice how it compares neighbors and "bubbles" large numbers up

**Week 2 - Level Up:**
4. Try **Insertion Sort** - see how it builds the sorted part one by one
5. Try **Selection Sort** - notice it finds the minimum each time

**Week 3 - Advanced:**
6. Learn **Merge Sort** - see the divide-and-conquer magic
7. Try **Quick Sort** - watch how the pivot works
8. Challenge yourself with **Heap Sort**

**Pro Challenge:**
- Sort the same array with all 6 algorithms
- Which is fastest?
- Which makes the most swaps?
- Can you predict what will happen before running it?

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- ✨ Add new sorting algorithms

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for learning!

## 🙏 Acknowledgments

Built with ❤️ for students learning algorithms

---

**Happy Sorting! 🎉**

If you found this helpful, give it a ⭐ on GitHub!

