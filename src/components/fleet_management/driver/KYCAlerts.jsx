import React from "react";

const KYCAlerts = () => {
  const alerts = [
    { text: "Potentially Sanctioned Entity", date: "29 Aug 2022" },
    { text: "Potentially Sanctioned Entity", date: "29 Jan 2022" },
    { text: "Potentially Sanctioned Entity", date: "13 Jul 2021" },
    { text: "IP Address from a different location", date: "07 Jul 2021" },
  ];

  return (
    <div className="bg-gray-200/30 p-4 rounded-xl border border-[#e0e6e9]">
      <h3 className="text-lg font-semibold">KYC Alerts</h3>
      <ul className="mt-2 space-y-2">
        {alerts.map((alert, index) => (
          <li key={index} className="bg-gray-200/40 p-2 rounded">
            <p className="text-sm">{alert.text}</p>
            <p className="text-xs text-gray-400">{alert.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KYCAlerts;
