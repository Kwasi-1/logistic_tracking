import React from "react";

const DriverSummary = () => {
  return (
    <div className="bg-gray-200/30 flex gap-8 p-6 text-sm rounded-xl border border-[#e0e6e930] h-full">
      <div>
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gray-500 rounded-full"></div>
          <div>
            <h2 className="text-[17px] font-bold">Chioma Ngozi</h2>
            <p className="text-[15px] text-gray-400">Priority Customer</p>
          </div>
        </div>

        <div className="mt-4 flex space-x-2 text-xs">
          <button className="border border-[#12B76A]  px-3 py-1 rounded text-[#12B76A]">
            Approve
          </button>
          <button className="border border-[#F94144] px-3 py-1 rounded text-[#F94144]">
            Reject
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-4 text-sm text-gray-600">
        <div flex className=" flex flex-col">
          Crypto Score: <span className="font-bold">40%</span>
        </div>
        <div flex className=" flex flex-col">
          KYC Score: <span className="font-bold">35%</span>
        </div>
        <div flex className=" flex flex-col">
          Fraud Score: <span className="font-bold">No Value</span>
        </div>
        <div flex className=" flex flex-col">
          Transaction Monitoring: <span className="font-bold">No Value</span>
        </div>
        <div flex className=" flex flex-col">
          Terrorism Financing: <span className="font-bold">15%</span>
        </div>
        <div flex className=" flex flex-col">
          Politically Exposed:{" "}
          <span className="text-red-500 font-bold">True</span>
        </div>
      </div>
    </div>
  );
};

export default DriverSummary;
