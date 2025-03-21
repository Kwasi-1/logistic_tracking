// import GaugeChart from "./GaugeChart";

const OverallBreakdown = () => {
  return (
    <div className="bg-[#e0e6e930] min-w-80 p-4 font-sans rounded-lg">
      <h2 className="text-[15px] text-[#4b5563] font-semibold mb-5">
        Overall Breakdown
      </h2>
      <p className="text-gray-600 text-sm tracking-wider uppercase">
        Total Vehicles
      </p>
      <h3 className="text-lg font-[500] mb-5">3,611,500.00</h3>
      <p className="text-gray-600 text-sm tracking-wider uppercase">
        Active Vehicles
      </p>
      <h3 className="text-lg font-[500]">2,305,500.00</h3>
      {/* Placeholder for Pie Chart */}
      {/* <div className="mt-4 h-24 bg-gray-200 rounded-lg"></div> */}

      {/* <GaugeChart /> */}
    </div>
  );
};

export default OverallBreakdown;
