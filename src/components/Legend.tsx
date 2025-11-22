const Legend = () => {
  const legendItems = [
    { color: 'bg-blue-400', label: 'Unsorted' },
    { color: 'bg-yellow-400', label: 'Comparing' },
    { color: 'bg-red-500', label: 'Swapping' },
    { color: 'bg-purple-500', label: 'Pivot' },
    { color: 'bg-green-500', label: 'Sorted' },
  ];

  return (
    <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-700">
      <h3 className="text-center text-sm font-semibold mb-4 text-gray-300 uppercase tracking-wider">
        Color Legend
      </h3>
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        {legendItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 px-4 py-2 bg-gray-700 rounded-lg"
          >
            <div className={`w-6 h-6 ${item.color} rounded-md shadow-lg`}></div>
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
