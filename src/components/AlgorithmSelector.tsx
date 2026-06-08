import { SortingAlgorithm } from '../types';

interface AlgorithmSelectorProps {
  selectedAlgorithm: SortingAlgorithm;
  onChange: (algorithm: SortingAlgorithm) => void;
  disabled: boolean;
}

const AlgorithmSelector = ({ selectedAlgorithm, onChange, disabled }: AlgorithmSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-semibold mb-3 text-zinc-400 uppercase tracking-wider">
        Algorithm
      </label>
      <select
        value={selectedAlgorithm}
        onChange={(e) => onChange(e.target.value as SortingAlgorithm)}
        disabled={disabled}
        className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white focus:border-white disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:border-zinc-400"
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
