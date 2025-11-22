export { bubbleSort } from './bubbleSort';
export { mergeSort } from './mergeSort';
export { quickSort } from './quickSort';
export { insertionSort } from './insertionSort';
export { selectionSort } from './selectionSort';
export { heapSort } from './heapSort';

export const algorithmInfo: Record<string, { name: string; complexity: string }> = {
  bubble: { name: 'Bubble Sort', complexity: 'O(n²)' },
  merge: { name: 'Merge Sort', complexity: 'O(n log n)' },
  quick: { name: 'Quick Sort', complexity: 'O(n log n)' },
  insertion: { name: 'Insertion Sort', complexity: 'O(n²)' },
  selection: { name: 'Selection Sort', complexity: 'O(n²)' },
  heap: { name: 'Heap Sort', complexity: 'O(n log n)' },
};
