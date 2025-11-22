import { useState, useEffect } from 'react';
import { ArrayBar } from '../types';

export const useArrayGenerator = (initialSize: number = 50) => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [arraySize, setArraySize] = useState(initialSize);

  const generateArray = () => {
    const newArray: ArrayBar[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 500) + 10,
        state: 'default',
      });
    }
    setArray(newArray);
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  return {
    array,
    arraySize,
    setArray,
    setArraySize,
    generateArray,
  };
};
