import { ArrayBar as ArrayBarType } from '../types';

interface VisualizationAreaProps {
  array: ArrayBarType[];
  arraySize: number;
}

const getBarColor = (state: ArrayBarType['state']) => {
  switch (state) {
    case 'comparing':
      return 'bg-white';
    case 'swapping':
      return 'bg-zinc-300';
    case 'sorted':
      return 'bg-zinc-500';
    case 'pivot':
      return 'bg-zinc-100';
    default:
      return 'bg-zinc-600';
  }
};

const VisualizationArea = ({ array, arraySize }: VisualizationAreaProps) => {
  return (
    <div className="bg-zinc-950 rounded-2xl shadow-2xl p-8 border border-zinc-800">
      <div className="flex items-end justify-center min-h-[500px] gap-0.5 px-4">
        {array.map((bar, idx) => (
          <div
            key={idx}
            className={`transition-all duration-200 ease-in-out ${getBarColor(
              bar.state
            )} rounded-t-lg shadow-lg`}
            style={{
              height: `${bar.value}px`,
              width: `${Math.max(3, Math.min(20, 800 / arraySize))}px`,
              boxShadow:
                bar.state !== 'default' && bar.state !== 'sorted'
                  ? '0 0 8px rgba(255, 255, 255, 0.35)'
                  : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VisualizationArea;
