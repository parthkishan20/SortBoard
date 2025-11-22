export interface ArrayBar {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot';
}

export type SortingAlgorithm = 
  | 'bubble'
  | 'merge'
  | 'quick'
  | 'insertion'
  | 'selection'
  | 'heap';

export interface SortStep {
  array: ArrayBar[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  sortedIndices?: number[];
  pivotIndex?: number;
}
