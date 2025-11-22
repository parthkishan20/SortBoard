import { ArrayBar, SortStep } from '../types';

export function* insertionSort(array: ArrayBar[]): Generator<SortStep> {
  const arr = [...array];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    yield {
      array: arr.map((bar, idx) => ({
        ...bar,
        state: idx === i ? 'comparing' : bar.state,
      })),
      comparingIndices: [i],
    };

    while (j >= 0 && arr[j].value > key.value) {
      yield {
        array: arr.map((bar, idx) => ({
          ...bar,
          state: idx === j || idx === j + 1 ? 'comparing' : bar.state,
        })),
        comparingIndices: [j, j + 1],
      };

      arr[j + 1] = arr[j];
      j--;

      yield {
        array: [...arr],
      };
    }

    arr[j + 1] = key;
    yield {
      array: [...arr],
    };
  }

  yield {
    array: arr.map(bar => ({ ...bar, state: 'sorted' as const })),
  };
}
