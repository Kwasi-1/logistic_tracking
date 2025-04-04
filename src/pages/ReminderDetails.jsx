import React from "react";
import { Icon } from "@iconify/react";

// Styling helpers for easy modifications
const styles = {
  card: "bg-gray-200/30 p-4 rounded-lg border border-[#e0e6e940] text-gray-700 mb-4",
  sectionTitle: "text-lg font-semibold mb-4",
  overdueText: "text-red-500 font-bold",
  detailRow:
    "flex justify-between items-center text-gray-500 font-semibold text-sm border-b border-gray-200/40 pb-2 pt-4",
};

// Sample data (replace with API data)
const vehicle = {
  id: "3100",
  make: "Chevrolet",
  model: "Express Cargo",
  year: 2014,
  mileage: "136,699 mi",
  operator: "Carlos Garcia",
  serviceTask: "Tire Rotation",
  status: "Overdue",
  nextDueDate: "12/28/2024",
  overdueBy: "3 months",
  overdueMiles: "9,364 miles overdue",
  lastCompleted: { date: "09/28/2024", mileage: "119,835 mi" },
  primaryMeter: "127,335 mi",
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

// Component for Status Badges
const StatusBadge = ({ text }) => {
  const statusColors = {
    "On-Time": "text-green-500 bg-green-100",
    Late: "text-red-500 bg-red-100",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-medium ${
        statusColors[text] || "text-gray-500 bg-gray-100"
      }`}
    >
      {text}
    </span>
  );
};

const DetailRow = ({ label, value, isOverdue = false }) => (
  <p className={styles.detailRow}>
    <span>{label}:</span>
    <span className={isOverdue ? styles.overdueText : ""}>{value}</span>
  </p>
);

const VehicleDetails = () => (
  <div className={styles.card}>
    <h2 className={styles.sectionTitle}>Vehicle Details</h2>
    <DetailRow
      label="Vehicle"
      value={`${vehicle.id} [${vehicle.year} ${vehicle.make} ${vehicle.model}]`}
    />
    <DetailRow label="Operator" value={vehicle.operator} />
    <DetailRow label="Status" value={vehicle.status} isOverdue />
    <DetailRow label="Service Task" value={vehicle.serviceTask} />
    <DetailRow
      label="Next Due"
      value={`${vehicle.overdueBy} • ${vehicle.overdueMiles}`}
      isOverdue
    />
    <DetailRow
      label="Last Completed"
      value={`${vehicle.lastCompleted.date} (${vehicle.lastCompleted.mileage})`}
    />
  </div>
);

// Next Due Component
const NextDue = () => (
  <div className={styles.card}>
    {/* Header */}
    <div className="flex items-center gap-2 mb-2">
      <h2 className="text-lg font-semibold">Next Due</h2>
      <p className="text-red-500 text-sm flex items-center">
        <Icon icon="mdi:calendar-alert" className="inline-block mr-1" />
        {vehicle.overdueBy}
      </p>
    </div>

    {/* Scheduled Date */}
    <div className={styles.detailRow}>
      <span>Scheduled Date</span>
      <span className="flex items-center gap-1">
        <Icon icon="mdi:flag-outline" />
        {vehicle.nextDueDate}
        <div className="text-red-500 text-xs font-semibold">Overdue</div>
      </span>
    </div>

    {/* Primary Meter */}
    <div className={styles.detailRow}>
      <span>Primary Meter</span>
      <span className="flex items-center gap-1">
        <Icon icon="mdi:counter" />
        {vehicle.primaryMeter}
      </span>
    </div>

    {/* Overdue Miles */}
    <div className={styles.detailRow}>
      <span>{vehicle.overdueBy}</span>
      <span className={styles.overdueText}>{vehicle.overdueMiles}</span>
    </div>
  </div>
);

const HistoryRow = ({ due, completed, compliance, complianceDetails }) => (
  <div className="grid grid-cols-4 text-sm py-2 border-b border-gray-200/40 last:border-none">
    <div>{due}</div>
    <div>{completed}</div>
    <div>
      <StatusBadge text={compliance} />
    </div>
    <div className="text-gray-500 text-xs">{complianceDetails}</div>
  </div>
);

// History Component
const History = () => (
  <div className={styles.card}>
    <h2 className={styles.sectionTitle}>History</h2>

    {/* Table Header */}
    <div className="grid grid-cols-4 text-gray-600 font-semibold text-sm border-b pb-2">
      <div>Due</div>
      <div>Completed</div>
      <div>Compliance</div>
      <div>Details</div>
    </div>

    {/* Table Rows */}
    {history.map((entry, index) => (
      <HistoryRow key={index} {...entry} />
    ))}
  </div>
);

// Main ReminderDetails Page
const ReminderDetails = () => {
  return (
    <div className="flex">
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tire Rotation</h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-6 mt-4">
          <VehicleDetails />
          <div>
            <NextDue />
            <History className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderDetails;
