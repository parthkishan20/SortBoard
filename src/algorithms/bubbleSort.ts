import { ArrayBar, SortStep } from '../types';

export function* bubbleSort(array: ArrayBar[]): Generator<SortStep> {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing
      yield {
        array: arr.map((bar, idx) => ({
          ...bar,
          state: idx === j || idx === j + 1 ? 'comparing' : bar.state,
        })),
        comparingIndices: [j, j + 1],
      };

      if (arr[j].value > arr[j + 1].value) {
        // Swapping
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield {
          array: arr.map((bar, idx) => ({
            ...bar,
            state: idx === j || idx === j + 1 ? 'swapping' : bar.state,
          })),
          swappingIndices: [j, j + 1],
        };
      }
    }
    
    // Mark as sorted
    arr[n - i - 1].state = 'sorted';
    yield {
      array: [...arr],
      sortedIndices: [n - i - 1],
    };
  }

  arr[0].state = 'sorted';
  yield { array: [...arr] };
}
