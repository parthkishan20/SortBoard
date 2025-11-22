import { useState, useEffect, useRef } from 'react';
import { ArrayBar, SortingAlgorithm, SortStep } from './types';
import {
  bubbleSort,
  mergeSort,
  quickSort,
  insertionSort,
  selectionSort,
  heapSort,
  algorithmInfo
} from './algorithms';

const Visualizer = () => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const sortingGeneratorRef = useRef<Generator<SortStep> | null>(null);
  const animationRef = useRef<number | null>(null);

  // Generate random array
  const generateArray = () => {
    if (isSorting) return;
    
    const newArray: ArrayBar[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 500) + 10,
        state: 'default',
      });
    }
    setArray(newArray);
  };

  // Initialize array on mount and when size changes
  useEffect(() => {
    generateArray();
  }, [arraySize]);

  // Get delay based on speed
  const getDelay = () => {
    return 1000 / speed;
  };

  // Start sorting
  const startSorting = async () => {
    if (isSorting) return;

    setIsSorting(true);
    setIsPaused(false);

    // Get the appropriate sorting algorithm
    let generator: Generator<SortStep>;
    switch (selectedAlgorithm) {
      case 'bubble':
        generator = bubbleSort(array);
        break;
      case 'merge':
        generator = mergeSort(array);
        break;
      case 'quick':
        generator = quickSort(array);
        break;
      case 'insertion':
        generator = insertionSort(array);
        break;
      case 'selection':
        generator = selectionSort(array);
        break;
      case 'heap':
        generator = heapSort(array);
        break;
      default:
        generator = bubbleSort(array);
    }

    sortingGeneratorRef.current = generator;
    await animateSorting();
  };

  // Animate sorting steps
  const animateSorting = async () => {
    return new Promise<void>((resolve) => {
      const step = () => {
        if (!sortingGeneratorRef.current || isPaused) {
          resolve();
          return;
        }

        const result = sortingGeneratorRef.current.next();
        
        if (result.done) {
          setIsSorting(false);
          sortingGeneratorRef.current = null;
          resolve();
          return;
        }

        setArray(result.value.array);
        animationRef.current = window.setTimeout(step, getDelay());
      };

      step();
    });
  };

  // Pause sorting
  const pauseSorting = () => {
    setIsPaused(true);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  // Resume sorting
  const resumeSorting = () => {
    if (!isSorting || !isPaused) return;
    setIsPaused(false);
    animateSorting();
  };

  // Stop sorting
  const stopSorting = () => {
    setIsSorting(false);
    setIsPaused(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    sortingGeneratorRef.current = null;
    generateArray();
  };

  // Get bar color based on state
  const getBarColor = (state: ArrayBar['state']) => {
    switch (state) {
      case 'comparing':
        return 'bg-yellow-400';
      case 'swapping':
        return 'bg-red-500';
      case 'sorted':
        return 'bg-green-500';
      case 'pivot':
        return 'bg-purple-500';
      default:
        return 'bg-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Sorting Visualizer
          </h1>
          <p className="text-gray-300 text-lg">
            <span className="font-semibold text-blue-400">{algorithmInfo[selectedAlgorithm].name}</span> 
            <span className="mx-2">•</span>
            <span className="text-purple-400">{algorithmInfo[selectedAlgorithm].complexity}</span>
          </p>
        </div>

        {/* Controls */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 mb-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Algorithm Selection */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-300">Algorithm</label>
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value as SortingAlgorithm)}
                disabled={isSorting}
                className="w-full bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:border-blue-400"
              >
                <option value="bubble">🔵 Bubble Sort</option>
                <option value="merge">🔀 Merge Sort</option>
                <option value="quick">⚡ Quick Sort</option>
                <option value="insertion">📥 Insertion Sort</option>
                <option value="selection">🎯 Selection Sort</option>
                <option value="heap">🌳 Heap Sort</option>
              </select>
            </div>

            {/* Array Size */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-300">
                Array Size: <span className="text-blue-400">{arraySize}</span>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={arraySize}
                onChange={(e) => setArraySize(Number(e.target.value))}
                disabled={isSorting}
                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((arraySize - 10) / 90) * 100}%, #374151 ${((arraySize - 10) / 90) * 100}%, #374151 100%)`
                }}
              />
            </div>

            {/* Speed Control */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-300">
                Speed: <span className="text-purple-400">{speed} steps/s</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${speed}%, #374151 ${speed}%, #374151 100%)`
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={generateArray}
                disabled={isSorting}
                className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 px-4 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
              >
                🔄 Generate Array
              </button>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4 mt-8 justify-center flex-wrap">
            {!isSorting ? (
              <button
                onClick={startSorting}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl text-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Start Sorting
              </button>
            ) : (
              <>
                {!isPaused ? (
                  <button
                    onClick={pauseSorting}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl text-lg"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
                    </svg>
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={resumeSorting}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl text-lg"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                    Resume
                  </button>
                )}
                <button
                  onClick={stopSorting}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.25 3A2.25 2.25 0 003 5.25v9.5A2.25 2.25 0 005.25 17h9.5A2.25 2.25 0 0017 14.75v-9.5A2.25 2.25 0 0014.75 3h-9.5z" />
                  </svg>
                  Stop
                </button>
              </>
            )}
          </div>
        </div>

        {/* Visualization Area */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <div className="flex items-end justify-center min-h-[500px] gap-0.5 px-4">
            {array.map((bar, idx) => (
              <div
                key={idx}
                className={`transition-all duration-200 ease-in-out ${getBarColor(bar.state)} rounded-t-lg shadow-lg`}
                style={{
                  height: `${bar.value}px`,
                  width: `${Math.max(3, Math.min(20, 800 / arraySize))}px`,
                  boxShadow: bar.state !== 'default' ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-700">
          <h3 className="text-center text-sm font-semibold mb-4 text-gray-300 uppercase tracking-wider">Color Legend</h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-700 rounded-lg">
              <div className="w-6 h-6 bg-blue-400 rounded-md shadow-lg"></div>
              <span className="font-medium">Unsorted</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-700 rounded-lg">
              <div className="w-6 h-6 bg-yellow-400 rounded-md shadow-lg"></div>
              <span className="font-medium">Comparing</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-700 rounded-lg">
              <div className="w-6 h-6 bg-red-500 rounded-md shadow-lg"></div>
              <span className="font-medium">Swapping</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-700 rounded-lg">
              <div className="w-6 h-6 bg-purple-500 rounded-md shadow-lg"></div>
              <span className="font-medium">Pivot</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-700 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-md shadow-lg"></div>
              <span className="font-medium">Sorted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
