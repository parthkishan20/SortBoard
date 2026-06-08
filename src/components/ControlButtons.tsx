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
            className="bg-white text-black hover:bg-zinc-200 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-lg text-lg"
          >
            <Play className="w-6 h-6" />
            Start Sorting
          </button>
          <button
            onClick={onGenerate}
            disabled={disabled}
            className="bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-500 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-lg text-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
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
              className="bg-zinc-800 border border-zinc-600 text-white hover:bg-zinc-700 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-lg text-lg"
            >
              <Pause className="w-6 h-6" />
              Pause
            </button>
          ) : (
            <button
              onClick={onResume}
              className="bg-white text-black hover:bg-zinc-200 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-lg text-lg"
            >
              <Play className="w-6 h-6" />
              Resume
            </button>
          )}
          <button
            onClick={onStop}
            className="bg-zinc-900 border border-zinc-600 text-white hover:bg-zinc-800 hover:border-zinc-400 px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-3 shadow-lg text-lg"
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
