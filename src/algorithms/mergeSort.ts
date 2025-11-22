import { ArrayBar, SortStep } from '../types';

export function* mergeSort(array: ArrayBar[]): Generator<SortStep> {
  const arr = [...array];
  yield* mergeSortHelper(arr, 0, arr.length - 1);
  
  // Mark all as sorted
  yield {
    array: arr.map(bar => ({ ...bar, state: 'sorted' as const })),
  };
}

function* mergeSortHelper(
  arr: ArrayBar[],
  left: number,
  right: number
): Generator<SortStep> {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  yield* mergeSortHelper(arr, left, mid);
  yield* mergeSortHelper(arr, mid + 1, right);
  yield* merge(arr, left, mid, right);
}

function* merge(
  arr: ArrayBar[],
  left: number,
  mid: number,
  right: number
): Generator<SortStep> {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    yield {
      array: arr.map((bar, idx) => ({
        ...bar,
        state: idx === k ? 'comparing' : bar.state,
      })),
      comparingIndices: [k],
    };

    if (leftArr[i].value <= rightArr[j].value) {
      arr[k] = { ...leftArr[i], state: 'default' };
      i++;
    } else {
      arr[k] = { ...rightArr[j], state: 'default' };
      j++;
    }
    k++;

    yield {
      array: [...arr],
    };
  }

  while (i < leftArr.length) {
    arr[k] = { ...leftArr[i], state: 'default' };
    i++;
    k++;
    yield { array: [...arr] };
  }

  while (j < rightArr.length) {
    arr[k] = { ...rightArr[j], state: 'default' };
    j++;
    k++;
    yield { array: [...arr] };
  }
}
