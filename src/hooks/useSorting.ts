import { useState, useRef } from 'react';
import { ArrayBar, SortingAlgorithm, SortStep } from '../types';
import {
  bubbleSort,
  mergeSort,
  quickSort,
  insertionSort,
  selectionSort,
  heapSort,
} from '../algorithms';

export const useSorting = (array: ArrayBar[], speed: number) => {
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sortingGeneratorRef = useRef<Generator<SortStep> | null>(null);
  const animationRef = useRef<number | null>(null);

  const getDelay = () => 1000 / speed;

  const startSorting = async (
    selectedAlgorithm: SortingAlgorithm,
    onUpdate: (array: ArrayBar[]) => void
  ) => {
    if (isSorting) return;

    setIsSorting(true);
    setIsPaused(false);

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
    await animateSorting(onUpdate);
  };

  const animateSorting = async (onUpdate: (array: ArrayBar[]) => void) => {
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

        onUpdate(result.value.array);
        animationRef.current = window.setTimeout(step, getDelay());
      };

      step();
    });
  };

  const pauseSorting = () => {
    setIsPaused(true);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  const resumeSorting = (onUpdate: (array: ArrayBar[]) => void) => {
    if (!isSorting || !isPaused) return;
    setIsPaused(false);
    animateSorting(onUpdate);
  };

  const stopSorting = (onReset: () => void) => {
    setIsSorting(false);
    setIsPaused(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    sortingGeneratorRef.current = null;
    onReset();
  };

  return {
    isSorting,
    isPaused,
    startSorting,
    pauseSorting,
    resumeSorting,
    stopSorting,
  };
};
