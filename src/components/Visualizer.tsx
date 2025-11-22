import { useState } from 'react';
import { SortingAlgorithm } from '../types';
import { useArrayGenerator } from '../hooks/useArrayGenerator';
import { useSorting } from '../hooks/useSorting';
import Header from './Header';
import AlgorithmSelector from './AlgorithmSelector';
import RangeSlider from './RangeSlider';
import ControlButtons from './ControlButtons';
import VisualizationArea from './VisualizationArea';
import Legend from './Legend';

const Visualizer = () => {
  const [speed, setSpeed] = useState(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>('bubble');

  const { array, arraySize, setArray, setArraySize, generateArray } = useArrayGenerator(50);
  
  const {
    isSorting,
    isPaused,
    startSorting,
    pauseSorting,
    resumeSorting,
    stopSorting,
  } = useSorting(array, speed);

  const handleStart = () => startSorting(selectedAlgorithm, setArray);
  const handleResume = () => resumeSorting(setArray);
  const handleStop = () => stopSorting(generateArray);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header selectedAlgorithm={selectedAlgorithm} />

        {/* Controls */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 mb-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onChange={setSelectedAlgorithm}
              disabled={isSorting}
            />

            <RangeSlider
              label="Array Size"
              value={arraySize}
              min={10}
              max={100}
              onChange={setArraySize}
              disabled={isSorting}
              color="#3b82f6"
              displayValue={arraySize.toString()}
            />

            <RangeSlider
              label="Speed"
              value={speed}
              min={1}
              max={100}
              onChange={setSpeed}
              disabled={false}
              color="#a855f7"
              displayValue={`${speed} steps/s`}
            />
          </div>

          <ControlButtons
            isSorting={isSorting}
            isPaused={isPaused}
            onStart={handleStart}
            onPause={pauseSorting}
            onResume={handleResume}
            onStop={handleStop}
            onGenerate={generateArray}
            disabled={isSorting}
          />
        </div>

        <VisualizationArea array={array} arraySize={arraySize} />
        <Legend />
      </div>
    </div>
  );
};

export default Visualizer;
