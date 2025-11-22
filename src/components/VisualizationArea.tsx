import { ArrayBar as ArrayBarType } from '../types';

interface VisualizationAreaProps {
  array: ArrayBarType[];
  arraySize: number;
}

const getBarColor = (state: ArrayBarType['state']) => {
  switch (state) {
    case 'comparing':
      return 'bg-yellow-400';
    case 'swapping':
      return 'bg-red-500';
    case 'sorted':
      return 'bg-green-500';
    case 'pivot':
      return 'bg-purple-500';
    default:
      return 'bg-blue-400';
  }
};

const VisualizationArea = ({ array, arraySize }: VisualizationAreaProps) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
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
                bar.state !== 'default'
                  ? '0 0 10px rgba(59, 130, 246, 0.5)'
                  : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VisualizationArea;
