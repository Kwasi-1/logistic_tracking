import { useState } from "react";

const applications = [
  {
    id: "APP-1121",
    name: "KORANG CECILIA",
    product: "FAST SME LOAN",
    amount: "€10,000.00",
    date: "20/03/2025 13:39 PM",
    status: "Open",
  },
  {
    id: "APP-1120",
    name: "APPIAH DORIS",
    product: "FAST SME LOAN",
    amount: "€10,000.00",
    date: "20/03/2025 13:23 PM",
    status: "Open",
  },
];

const tabs = ["Driver", "Vehicle", "Shipment"];

const OpenApplications = () => {
  const [activeTab, setActiveTab] = useState("Purchasing");

  return (
    <div className="col-span-5 bg-[#e0e6e930] px-6 rounded-lg">
      {/* Navigation Tabs */}
      <nav className="flex relative">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-gray-500 border-t ${
              activeTab === tab
                ? "text-green-600 font-medium border-green-600"
                : " "
            }`}
          >
            {tab}
          </button>
        ))}
        {/* Active Tab Indicator */}
        {/* <div
          className="absolute bottom-0 h-[2px] bg-green-600 transition-all"
          style={{
            left: `${tabs.indexOf(activeTab) * 120}px`,
            width: "120px",
          }}
        ></div> */}
      </nav>

      {/* Content Section */}
      <h2 className="text-lg font-semibold mt-4">Shipment</h2>
      <div className="overflow-x-auto">
        <table className="w-full mt-2 border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="text-left p-3">Shipment ID</th>
              <th className="text-left p-3">Order created</th>
              <th className="text-left p-3"> PickUp Point </th>
              <th className="text-left p-3"> Destination</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr
                key={app.id}
                className="border-b hover:bg-gray-200 transition"
              >
                <td className="p-3">{app.id}</td>
                <td className="p-3">{app.name}</td>
                <td className="p-3">{app.product}</td>
                <td className="p-3 font-semibold">{app.amount}</td>
                <td className="p-3">{app.date}</td>
                <td className="p-3 text-yellow-500 font-medium">
                  {app.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpenApplications;
