import React, { useState } from "react";
import StatusText from "./StatusText";
import { Icon } from "@iconify/react/dist/iconify.js";

const data = [
  {
    shipment: "SHIP104",
    driver: "Jane Doe",
    currentLocation: "Accra, Ghana",
    eta: "1 week",
    etaProgress: 100,
    submissionStatus: true,
    destination: "Kumasi, Ghana",
    destinationProgress: 62,
  },
  {
    shipment: "SHIP103",
    driver: "John Doe",
    currentLocation: "Tema, Ghana",
    eta: "2 days",
    etaProgress: 75,
    submissionStatus: true,
    destination: "Takoradi, Ghana",
    destinationProgress: 88,
  },
  {
    shipment: "SHIP102",
    driver: "Michael Smith",
    currentLocation: "Cape Coast, Ghana",
    eta: "5 hours",
    etaProgress: 50,
    submissionStatus: false,
    destination: "Tamale, Ghana",
    destinationProgress: 45,
  },
  {
    shipment: "SHIP101",
    driver: "Sarah Johnson",
    currentLocation: "Koforidua, Ghana",
    eta: "3 days",
    etaProgress: 30,
    submissionStatus: true,
    destination: "Ho, Ghana",
    destinationProgress: 25,
  },
  {
    shipment: "SHIP107",
    driver: "Sarah Johnson",
    currentLocation: "Koforidua, Ghana",
    eta: "3 days",
    etaProgress: 30,
    submissionStatus: true,
    destination: "Ho, Ghana",
    destinationProgress: 25,
  },
];

const ShipmentOverview = () => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Sorting Function
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-4 bg-[#e0e6e930] w-full rounded-xl border border-[#e0e6e930]">
      <h1 className="text-gray-600 capitalize font-semibold text-lg mb-4">
        deliveries
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full rounded-lg text-sm text-left">
          <thead className="border-b font-semibold border-gray-300">
            <tr className="text-gray-600 text-[14px] border-b">
              {[
                { label: "ShipmentId", key: "shipmentId" },
                { label: "Driver", key: "driver" },
                { label: "Current Location", key: "currentLocation" },
                { label: "ETA", key: "eta" },
                { label: "Status", key: "Status" },
                { label: "Destination", key: "destination" },
              ].map((col) => (
                <th
                  key={col.key}
                  className="p-3 cursor-pointer hover:text-gray-500"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  {sortColumn === col.key &&
                    (sortDirection === "asc" ? (
                      <Icon
                        icon="icon-park-solid:up-one"
                        className="inline text-gray-400"
                      />
                    ) : (
                      <Icon
                        icon="icon-park-solid:down-one"
                        className="inline text3xl text-gray-400"
                      />
                    ))}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className="border-t border-[#e5e7eb] text-[14px] text-gray-600"
              >
                <td className="p-3">{row.shipment}</td>
                <td className="p-3">{row.driver}</td>
                <td className="p-3">{row.currentLocation}</td>

                {/* ETA Progress Bar */}
                <td className="p-3 w-40">
                  {row.eta}
                  <div className="w-full bg-gray-200 h-2 rounded-md mt-1">
                    <div
                      className="h-2 rounded-md "
                      style={{
                        width: `${Math.min(row.etaProgress, 100)}%`,
                        backgroundColor:
                          row.etaProgress >= 100 ? "#619b7d" : "#facc15",
                      }}
                    ></div>
                  </div>
                </td>

                {/* Submission Status */}
                <td className="p-3">
                  {/* <StatusText
                    text={row.submissionStatus ? "Delivered" : "Not Delivered"}
                  /> */}
                  <div
                    className={`rounded-full flex justify-center items-center w-5 h-5 p-[2px] ${
                      row.submissionStatus ? "bg-[#619b7d] " : "bg-red-600"
                    }
                    `}
                  >
                    <Icon
                      icon={
                        row.submissionStatus
                          ? "akar-icons:check"
                          : "emojione-monotone:exclamation-mark"
                      }
                      className="text-sm text-white"
                    />
                  </div>
                </td>

                {/* Destination Progress Bar */}
                <td className="p-3">{row.destination}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentOverview;
