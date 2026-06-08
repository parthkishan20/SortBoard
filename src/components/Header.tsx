import { SortingAlgorithm } from '../types';
import { algorithmInfo } from '../algorithms';

interface HeaderProps {
  selectedAlgorithm: SortingAlgorithm;
}

const Header = ({ selectedAlgorithm }: HeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-3 tracking-tight text-white">
        SortBoard
      </h1>
      <p className="text-zinc-400 text-lg">
        <span className="font-semibold text-white">
          {algorithmInfo[selectedAlgorithm].name}
        </span>
        <span className="mx-2 text-zinc-600">•</span>
        <span className="text-zinc-400">
          {algorithmInfo[selectedAlgorithm].complexity}
        </span>
      </p>
    </div>
  );
};

export default Header;
