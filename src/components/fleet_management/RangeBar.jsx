const RangeBar = ({ value, total }) => {
  const percentage = (value / total) * 100;

  return (
    <div className="w-full rounded-xl h-2 bg-gray-200 mt-2">
      <div
        className="h-full rounded-xl min-w-[7px] transition-all duration-300"
        style={{
          width: `${percentage}%`,
          backgroundColor: percentage === 100 ? "green" : "red",
        }}
      ></div>
    </div>
  );
};

export default RangeBar;
