const DateFilter = () => {
  return (
    <div className="flex gap-2">
      {[
        "Today",
        "This Month",
        "This Year",
        "Last Year",
        "All Time",
        "Custom Date",
      ].map((filter) => (
        <button key={filter} className="px-4 py-2 bg-gray-200 rounded-md">
          {filter}
        </button>
      ))}
    </div>
  );
};

export default DateFilter;
