const OverallBreakdown = () => {
  return (
    <div className="bg-white w- p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold">Overall Breakdown</h2>
      <p className="text-gray-600">Requested</p>
      <h3 className="text-2xl font-bold">3,611,500.00</h3>
      <p className="text-gray-600">Disbursed</p>
      <h3 className="text-2xl font-bold">2,305,500.00</h3>
      {/* Placeholder for Pie Chart */}
      <div className="mt-4 h-24 bg-gray-200 rounded-lg"></div>
    </div>
  );
};

export default OverallBreakdown;
