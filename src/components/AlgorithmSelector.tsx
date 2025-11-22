import { SortingAlgorithm } from '../types';

interface AlgorithmSelectorProps {
  selectedAlgorithm: SortingAlgorithm;
  onChange: (algorithm: SortingAlgorithm) => void;
  disabled: boolean;
}

const AlgorithmSelector = ({ selectedAlgorithm, onChange, disabled }: AlgorithmSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-semibold mb-3 text-gray-300">
        Algorithm
      </label>
      <select
        value={selectedAlgorithm}
        onChange={(e) => onChange(e.target.value as SortingAlgorithm)}
        disabled={disabled}
        className="w-full bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:border-blue-400"
      >
        <option value="bubble">Bubble Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="heap">Heap Sort</option>
      </select>
    </div>
  );
};

export default AlgorithmSelector;
