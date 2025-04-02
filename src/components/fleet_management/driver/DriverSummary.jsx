import React from "react";

// User Information Component
const UserInfo = () => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-gray-500 rounded-full"></div>
        <div>
          <h2 className="text-[17px] font-bold">Chioma Ngozi</h2>
          <p className="text-[14px] text-gray-400">Priority Customer</p>
        </div>
      </div>
    </div>
  );
};

// Action Buttons Component
const DriverActions = () => {
  return (
    <div className="mt-4 flex space-x-2 text-xs">
      <button className="border border-[#12B76A] px-3 py-1 rounded text-[#12B76A]">
        Approve
      </button>
      <button className="border border-[#F94144] px-3 py-1 rounded text-[#F94144]">
        Reject
      </button>
    </div>
  );
};

// Driver Summary Component
const DriverSummary = () => {
  const stats = [
    { label: "Crypto Score", value: "40%" },
    { label: "KYC Score", value: "35%" },
    { label: "Fraud Score", value: "No Value" },
    { label: "Transaction Monitoring", value: "No Value" },
    { label: "Terrorism Financing", value: "15%" },
    { label: "Politically Exposed", value: "True", danger: true },
  ];

  return (
    <div className="bg-gray-200/30 flex gap-8 p-6 text-sm rounded-xl border border-[#e0e6e930] h-full ">
      {/* Left Section: User Info & Actions */}
      <div className="w-[300px]">
        <UserInfo />
        <DriverActions />
      </div>

      {/* Right Section: Statistics */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-4 text-gray-500 w-full">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col w-full uppercase  text-[13px]">
            {stat.label}:{" "}
            <span className={`font-bold mt-1 text-gray-700 ${stat.danger ? "text-red-500" : ""}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverSummary;
