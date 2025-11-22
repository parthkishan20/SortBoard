import { ArrayBar, SortStep } from '../types';

export function* selectionSort(array: ArrayBar[]): Generator<SortStep> {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      yield {
        array: arr.map((bar, idx) => ({
          ...bar,
          state: idx === minIdx || idx === j ? 'comparing' : bar.state,
        })),
        comparingIndices: [minIdx, j],
      };

      if (arr[j].value < arr[minIdx].value) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield {
        array: arr.map((bar, idx) => ({
          ...bar,
          state: idx === i || idx === minIdx ? 'swapping' : bar.state,
        })),
        swappingIndices: [i, minIdx],
      };
    }

    arr[i].state = 'sorted';
    yield {
      array: [...arr],
      sortedIndices: [i],
    };
  }

  arr[n - 1].state = 'sorted';
  yield {
    array: arr.map(bar => ({ ...bar, state: 'sorted' as const })),
  };
}
