const RangeBar = ({ value, total, color }) => {
  return (
    <div className="w-full rounded-xl h-4 bg-gray-200 mt-2">
      <div
        className="h-full rounded-xl min-w-[7px]"
        style={{
          // width: ${(value / total) * 100}%,
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
};

export default RangeBar;
