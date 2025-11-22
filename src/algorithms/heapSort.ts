import { ArrayBar, SortStep } from '../types';

export function* heapSort(array: ArrayBar[]): Generator<SortStep> {
  const arr = [...array];
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    yield {
      array: arr.map((bar, idx) => ({
        ...bar,
        state: idx === 0 || idx === i ? 'swapping' : bar.state,
      })),
      swappingIndices: [0, i],
    };

    arr[i].state = 'sorted';
    yield* heapify(arr, i, 0);
  }

  arr[0].state = 'sorted';
  yield {
    array: arr.map(bar => ({ ...bar, state: 'sorted' as const })),
  };
}

function* heapify(
  arr: ArrayBar[],
  n: number,
  i: number
): Generator<SortStep> {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    yield {
      array: arr.map((bar, idx) => ({
        ...bar,
        state: idx === left || idx === largest ? 'comparing' : bar.state,
      })),
      comparingIndices: [left, largest],
    };

    if (arr[left].value > arr[largest].value) {
      largest = left;
    }
  }

  if (right < n) {
    yield {
      array: arr.map((bar, idx) => ({
        ...bar,
        state: idx === right || idx === largest ? 'comparing' : bar.state,
      })),
      comparingIndices: [right, largest],
    };

    if (arr[right].value > arr[largest].value) {
      largest = right;
    }
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    yield {
      array: arr.map((bar, idx) => ({
        ...bar,
        state: idx === i || idx === largest ? 'swapping' : bar.state,
      })),
      swappingIndices: [i, largest],
    };

    yield* heapify(arr, n, largest);
  }
}
