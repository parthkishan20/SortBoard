const Legend = () => {
  const legendItems = [
    { color: 'bg-zinc-600', label: 'Unsorted' },
    { color: 'bg-white', label: 'Comparing' },
    { color: 'bg-zinc-300', label: 'Swapping' },
    { color: 'bg-zinc-100', label: 'Pivot' },
    { color: 'bg-zinc-500', label: 'Sorted' },
  ];

  return (
    <div className="mt-8 bg-zinc-950 rounded-2xl shadow-xl p-6 border border-zinc-800">
      <h3 className="text-center text-xs font-semibold mb-4 text-zinc-500 uppercase tracking-widest">
        Legend
      </h3>
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {legendItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg"
          >
            <div className={`w-5 h-5 ${item.color} rounded-sm`}></div>
            <span className="font-medium text-zinc-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
