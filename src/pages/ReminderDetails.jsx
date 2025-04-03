import React from "react";
import { Icon } from "@iconify/react";

// Sample data (replace with actual API data)
const vehicle = {
  id: "3100",
  make: "Chevrolet",
  model: "Express Cargo",
  year: 2014,
  vin: "1GCSGAFX4E1198882",
  mileage: "136,699 mi",
  operator: { name: "Carlos Garcia", profilePic: "" },
  serviceTask: "Tire Rotation",
  status: "Overdue",
  nextDueDate: "12/28/2024",
  overdueBy: "3 months",
  overdueMiles: "9,364 miles overdue",
  lastCompleted: { date: "09/28/2024", mileage: "119,835 mi" },
};

const history = [
  {
    due: "Sep 27, 2024",
    completed: "09/28/2024",
    compliance: "On-Time",
    complianceDetails: "1 day, 12 hours behind • 481 miles ahead",
  },
  {
    due: "Jul 1, 2025",
    completed: "06/27/2024",
    compliance: "Late",
    complianceDetails: "1 year, 4 days ahead • 105,316 miles behind",
  },
];

const StatusText = ({ text }) => {
  const getStatusColor = () => {
    if (text === "On-Time") return "text-green-500 bg-green-100";
    if (text === "Late") return "text-red-500 bg-red-100";
    return "text-gray-500 bg-gray-100";
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
    >
      {text}
    </span>
  );
};

const ReminderDetails = () => {
  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 p-6 ">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tire Rotation</h1>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-2 gap-6 mt-4">
          {/* Vehicle Details */}
          <div className="bg-gray-200/30 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Details</h2>
            <p>
              <strong>Vehicle:</strong> {vehicle.id} [{vehicle.year}{" "}
              {vehicle.make} {vehicle.model}]
            </p>
            <p>
              <strong>Operator:</strong> {vehicle.operator.name}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="text-red-500 font-bold">{vehicle.status}</span>
            </p>
            <p>
              <strong>Service Task:</strong> {vehicle.serviceTask}
            </p>
            <p className="text-red-500">
              <strong>Next Due:</strong> {vehicle.overdueBy} <br />
              {vehicle.overdueMiles}
            </p>
            <p>
              <strong>Last Completed:</strong> {vehicle.lastCompleted.date} (
              {vehicle.lastCompleted.mileage})
            </p>
          </div>

          <div>
            {/* Next Due Section */}
            <div className="bg-gray-200/30 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Next Due</h2>
              <p className="text-red-500 text-sm">
                <Icon icon="mdi:calendar-alert" className="inline-block" />{" "}
                {vehicle.overdueBy}
              </p>
              <p>
                <strong>Scheduled Date:</strong> {vehicle.nextDueDate}
              </p>
              <p className="text-red-500">{vehicle.overdueMiles}</p>
            </div>

            {/* History Section */}
            <div className="bg-gray-200/30 p-4 rounded-lg mt-4">
              <h2 className="text-lg font-semibold mb-4">History</h2>
              <div className="grid grid-cols-4 text-gray-600 font-semibold text-sm border-b pb-2">
                <div>Due</div>
                <div>Completed</div>
                <div>Compliance</div>
                <div></div>
              </div>
              {history.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 text-sm py-2 border-b last:border-none"
                >
                  <div>{item.due}</div>
                  <div>{item.completed}</div>
                  <div>
                    <StatusText text={item.compliance} />
                  </div>
                  <div className="text-gray-500">{item.complianceDetails}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderDetails;
