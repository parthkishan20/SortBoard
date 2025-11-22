import { SortingAlgorithm } from '../types';
import { algorithmInfo } from '../algorithms';

interface HeaderProps {
  selectedAlgorithm: SortingAlgorithm;
}

const Header = ({ selectedAlgorithm }: HeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
        Sorting Visualizer
      </h1>
      <p className="text-gray-300 text-lg">
        <span className="font-semibold text-blue-400">
          {algorithmInfo[selectedAlgorithm].name}
        </span>
        <span className="mx-2">•</span>
        <span className="text-purple-400">
          {algorithmInfo[selectedAlgorithm].complexity}
        </span>
      </p>
    </div>
  );
};

export default Header;
