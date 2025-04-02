import React from "react";
import { AiOutlineWarning } from "react-icons/ai"; // Warning icon

const AlertCard = ({ riskScore, title, category, date }) => (
  <div className="bg-gray-200/40 text-gray-700 border border-yellow-500 p-4 rounded-lg">
    <p className="text-xs text-gray-500 mb-1">ALERT RISK SCORE: {riskScore}</p>

    {/* Header with Icon */}
    <div className="flex items-start space-x-2 mt-2">
      <AiOutlineWarning className="text-yellow-500 text-xl" />
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-gray-400">Driver KYC Alert</p>
      </div>
    </div>

    {/* Category & Date */}
    <div className="mt-6 text-xs flex justify-between">
      <div>
        <p className="text-gray-400">ALERT CATEGORY</p>
        <p className="font-semibold">{category}</p>
      </div>
      <div>
        <p className="text-gray-400">ALERT GENERATED TIME</p>
        <p className="font-semibold">{date}</p>
      </div>
    </div>
  </div>
);

const KYCAlerts = () => {
  const alerts = [
    {
      riskScore: "0.72",
      title: "Driver's License Expires in 30 Days",
      category: "License Expiry",
      date: "01 Apr 2025, 10:00",
    },
    {
      riskScore: "0.60",
      title: "Driver's License Issued Less Than 6 Months Ago",
      category: "New License Holder",
      date: "15 Mar 2025, 09:45",
    },
    {
      riskScore: "0.85",
      title: "Truck Failed Last Safety Inspection",
      category: "Vehicle Compliance",
      date: "12 Feb 2025, 14:20",
    },
    {
      riskScore: "0.40",
      title: "Driver Previously Blacklisted",
      category: "Blacklist Check",
      date: "10 Jan 2025, 08:00",
    },
    {
      riskScore: "0.30",
      title: "Truck Overdue for Maintenance",
      category: "Maintenance Alert",
      date: "05 Jan 2025, 16:45",
    },
  ];

  return (
    <div className="bg-gray-200/30 p-4 rounded-xl border border-gray-200/40">
      <h3 className="text-lg font-semibold mb-3">KYC Alerts</h3>

      {/* Scrollable Cards */}
      <div className="space-y-3 overflow-y-auto max-h-[700px] pr-2 scrollbar-hide">
        {alerts.map((alert, index) => (
          <AlertCard key={index} {...alert} />
        ))}
      </div>
    </div>
  );
};

export default KYCAlerts;
