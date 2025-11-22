import { Play, Pause, Square, RotateCcw } from 'lucide-react';

interface ControlButtonsProps {
  isSorting: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onGenerate: () => void;
  disabled?: boolean;
}

const ControlButtons = ({
  isSorting,
  isPaused,
  onStart,
  onPause,
  onResume,
  onStop,
  onGenerate,
  disabled = false,
}: ControlButtonsProps) => {
  return (
    <div className="flex gap-4 mt-8 justify-center flex-wrap">
      {!isSorting ? (
        <>
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl text-lg"
          >
            <Play className="w-6 h-6" />
            Start Sorting
          </button>
          <button
            onClick={onGenerate}
            disabled={disabled}
            className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <RotateCcw className="w-6 h-6" />
            Generate Array
          </button>
        </>
      ) : (
        <>
          {!isPaused ? (
            <button
              onClick={onPause}
              className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl text-lg"
            >
              <Pause className="w-6 h-6" />
              Pause
            </button>
          ) : (
            <button
              onClick={onResume}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl text-lg"
            >
              <Play className="w-6 h-6" />
              Resume
            </button>
          )}
          <button
            onClick={onStop}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl text-lg"
          >
            <Square className="w-6 h-6" />
            Stop
          </button>
        </>
      )}
    </div>
  );
};

export default ControlButtons;
