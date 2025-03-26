import { useState } from "react";
import VehicleTable from "../components/fleet_management/VehicleTable";

const tabs = [
  "Vehicle List",
  "Vehicle Assignments",
  "Meter History",
  "Expense History",
  "Replacement Analysis",
];

function VehicleDetails() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("Vehicle List");

  return (
    <div className="px-8 h-screen">
      <h1 className="py-5 font-semibold text-2xl">Vehicle</h1>
      <div className="mt4 bg-gray-200/30 h-full rounded-t-xl border border-[#e0e6e930]">
        <nav className="flex relative px-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-gray-500 border-t-2 transition-colors duration-200 text-xs ${
                activeTab === tab
                  ? "text-green-600 font-medium border-green-600"
                  : "border-[#e0e6e930] hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="px-4">
          {activeTab === "Vehicle List" && <VehicleTable />}
          <div className="px-5 mt-5">
            {activeTab === "Vehicle Assignments" && (
              <p>Vehicle Assignments content here</p>
            )}
            {activeTab === "Meter History" && <p>Meter History content here</p>}
            {activeTab === "Expense History" && (
              <p>Expense History content here</p>
            )}
            {activeTab === "Replacement Analysis" && (
              <p>Replacement Analysis content here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetails;
