import { ArrayBar, SortStep } from '../types';

export function* quickSort(array: ArrayBar[]): Generator<SortStep> {
  const arr = [...array];
  yield* quickSortHelper(arr, 0, arr.length - 1);
  
  // Mark all as sorted
  yield {
    array: arr.map(bar => ({ ...bar, state: 'sorted' as const })),
  };
}

function* quickSortHelper(
  arr: ArrayBar[],
  low: number,
  high: number
): Generator<SortStep> {
  if (low < high) {
    const pi = yield* partition(arr, low, high);
    yield* quickSortHelper(arr, low, pi - 1);
    yield* quickSortHelper(arr, pi + 1, high);
  }
}

function* partition(
  arr: ArrayBar[],
  low: number,
  high: number
): Generator<SortStep, number> {
  const pivot = arr[high].value;
  let i = low - 1;

  yield {
    array: arr.map((bar, idx) => ({
      ...bar,
      state: idx === high ? 'pivot' : bar.state,
    })),
    pivotIndex: high,
  };

  for (let j = low; j < high; j++) {
    yield {
      array: arr.map((bar, idx) => ({
        ...bar,
        state: idx === high ? 'pivot' : idx === j ? 'comparing' : bar.state,
      })),
      comparingIndices: [j],
      pivotIndex: high,
    };

    if (arr[j].value < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];

      yield {
        array: arr.map((bar, idx) => ({
          ...bar,
          state: idx === high ? 'pivot' : idx === i || idx === j ? 'swapping' : bar.state,
        })),
        swappingIndices: [i, j],
        pivotIndex: high,
      };
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  yield {
    array: [...arr],
    swappingIndices: [i + 1, high],
  };

  return i + 1;
}
