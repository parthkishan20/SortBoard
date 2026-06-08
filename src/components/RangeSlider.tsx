interface RangeSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  displayValue: string;
}

const RangeSlider = ({
  label,
  value,
  min,
  max,
  onChange,
  disabled = false,
  displayValue,
}: RangeSliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <label className="block text-sm font-semibold mb-3 text-zinc-400 uppercase tracking-wider">
        {label}: <span className="text-white">{displayValue}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer slider disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: `linear-gradient(to right, #ffffff 0%, #ffffff ${percentage}%, #27272a ${percentage}%, #27272a 100%)`,
        }}
      />
    </div>
  );
};

export default RangeSlider;
