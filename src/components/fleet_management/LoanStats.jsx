import RangeBar from "./Range";

const LoanStats = () => {
  const stats = [
    { label: "Total Vehicles", value: 124, total: 200 },
    { label: "Active Vehicles", value: 98, total: 200 },
    { label: "In Maintenance", value: 11, total: 200 },
    { label: "Avg Daily Trips", value: 36, total: 200 },
    { label: "Avg Trip Distance", value: 28.5, total: 200 },
    // { label: "Fuel Efficiency", value: 8.7, total: 200 },
  ];

  return (
    <div className="bg-[#e0e6e930] p-4 px-6 rounded-lg flex justify-between">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="uppercase flex flex-col min-w-40 gap-16 text-left"
        >
          <div>
            <p className="text-gray-600 text-[15px] mt-2">{stat.label}</p>
            <h3 className="text-xl font-semibold">{stat.value}</h3>
          </div>
          <div>
            <p className="text-left">{(stat.value / stat.total) * 100}%</p>
            <RangeBar value={stat.value} total={stat.total} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanStats;
