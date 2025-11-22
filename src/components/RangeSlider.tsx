interface RangeSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  color: string;
  displayValue: string;
}

const RangeSlider = ({
  label,
  value,
  min,
  max,
  onChange,
  disabled = false,
  color,
  displayValue,
}: RangeSliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <label className="block text-sm font-semibold mb-3 text-gray-300">
        {label}: <span className={`text-${color}-400`}>{displayValue}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${percentage}%, #374151 ${percentage}%, #374151 100%)`,
        }}
      />
    </div>
  );
};

export default RangeSlider;
