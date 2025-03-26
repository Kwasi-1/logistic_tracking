import { Icon } from "@iconify/react";
import { useState } from "react";

// Reusable Input Component
function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="relative">
      <label className="bg-white px-1 text-[11px] font-semibold text-gray-500">
        {label.toUpperCase()}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border bg-[#F5F6F7] border-[#E5E7EB] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#619B7D] text-sm text-gray-600"
      />
    </div>
  );
}

// Reusable Select Component
function SelectField({ label, name, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="bg-white px-1 text-[11px] font-semibold text-gray-500">
        {label.toUpperCase()}
      </label>
      <div
        className="w-full border bg-[#F5F6F7] border-[#E5E7EB] px-3 py-2 rounded-md cursor-pointer focus:ring-2 focus:ring-[#619B7D]"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{value || "Select"}</span>
          <Icon
            icon={isOpen ? "uiw:up" : "uiw:down"}
            className="text-gray-400 text-xs"
          />
        </div>
      </div>
      {isOpen && (
        <ul className="absolute w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg z-10 max-h-40 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer ${
                value === option ? "bg-gray-100" : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// First Step Component
function FirstStep({ formData, handleInputChange }) {
  return (
    <div className="px6">
      <h1 className="capitalize text-xl mb-2">Vehicle details</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3  pb-24">
        <InputField
          label="VIN/SN"
          name="vin"
          placeholder="e.g., ABC12345"
          value={formData.vin}
          onChange={handleInputChange}
        />

        <InputField
          label="Vehicle Name"
          name="vehicleName"
          placeholder="e.g., Mercedes Truck"
          value={formData.vehicleName}
          onChange={handleInputChange}
        />

        <SelectField
          label="Type"
          name="type"
          options={["Car", "Truck", "Motorcycle"]}
          value={formData.type}
          onChange={handleInputChange}
        />

        <SelectField
          label="Status"
          name="status"
          options={["Active", "Inactive"]}
          value={formData.status}
          onChange={handleInputChange}
        />

        <SelectField
          label="Ownership"
          name="ownership"
          options={["Owned", "Leased"]}
          value={formData.ownership}
          onChange={handleInputChange}
        />

        <InputField
          label="Labels"
          name="labels"
          placeholder="Add labels"
          value={formData.labels}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

// Maintenance Schedule Component
function MaintenanceSchedule({ formData, handleInputChange }) {
  const [selectedOption, setSelectedOption] = useState(
    formData.serviceProgram || "None"
  );

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    handleInputChange({ target: { name: "serviceProgram", value } });
  };

  return (
    <div className="px-6">
      <h1 className="text-xl font-semibold mb-2">Maintenance Schedule</h1>
      <p className="text-sm text-gray-500 mb-4">
        Service Programs automatically manage Service Reminders for Assets that
        share common preventative maintenance needs.
      </p>

      <div className="space-y-4">
        {/* None Option */}
        <div
          className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer ${
            selectedOption === "None" ? "border-[#619B7D]" : "border-[#E5E7EB]"
          }`}
          onClick={() => handleOptionChange("None")}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedOption === "None"
                  ? "border-[#619B7D]"
                  : "border-gray-300"
              }`}
            >
              {selectedOption === "None" && (
                <div className="w-3 h-3 bg-[#619B7D] rounded-full" />
              )}
            </div>
            <p className="text-gray-700 font-medium">None</p>
          </div>
          <p className="text-gray-400 text-sm">
            No Service Reminders will be created
          </p>
        </div>

        {/* Existing Service Program Option */}
        <div
          className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer ${
            selectedOption === "Existing"
              ? "border-[#619B7D]"
              : "border-[#E5E7EB]"
          }`}
          onClick={() => handleOptionChange("Existing")}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedOption === "Existing"
                  ? "border-[#619B7D]"
                  : "border-gray-300"
              }`}
            >
              {selectedOption === "Existing" && (
                <div className="w-3 h-3 bg-[#619B7D] rounded-full" />
              )}
            </div>
            <p className="text-gray-700 font-medium">
              Choose an existing Service Program
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Lifecycle Component
function Lifecycle({ formData, handleInputChange }) {
  return (
    <div className="px-6">
      <h1 className="text-xl font-semibold mb-2">Lifecycle</h1>

      <InputField
        label="Date vehicle entered active fleet service"
        name="activeFleetServiceDate"
        type="date"
        value={formData.activeFleetServiceDate}
        onChange={handleInputChange}
      />

      <InputField
        label="In-Service Odometer"
        name="inServiceOdometer"
        type="number"
        placeholder="e.g., 10000"
        value={formData.inServiceOdometer}
        onChange={handleInputChange}
      />

      <h2 className="mt-4 text-lg font-semibold">Vehicle Life Estimates</h2>

      <InputField
        label="Estimated Service Life in Months"
        name="serviceLifeMonths"
        type="number"
        placeholder="e.g., 60"
        value={formData.serviceLifeMonths}
        onChange={handleInputChange}
      />

      <InputField
        label="Estimated Service Life in Meter"
        name="serviceLifeMeter"
        type="number"
        placeholder="e.g., 200000"
        value={formData.serviceLifeMeter}
        onChange={handleInputChange}
      />

      <InputField
        label="Estimated Resale Value"
        name="resaleValue"
        type="number"
        placeholder="e.g., 15000"
        value={formData.resaleValue}
        onChange={handleInputChange}
      />

      <h2 className="mt-4 text-lg font-semibold">Out-of-Service</h2>

      <InputField
        label="Out-of-Service Date"
        name="outOfServiceDate"
        type="date"
        value={formData.outOfServiceDate}
        onChange={handleInputChange}
      />

      <InputField
        label="Out-of-Service Odometer"
        name="outOfServiceOdometer"
        type="number"
        placeholder="e.g., 200000"
        value={formData.outOfServiceOdometer}
        onChange={handleInputChange}
      />
    </div>
  );
}

// Main Modal Component
function VehicleModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    vin: "",
    vehicleName: "",
    type: "Car",
    status: "Active",
    ownership: "Owned",
    labels: "",
  });

  const tabs = [
    "Details",
    "Maintnence",
    "Lifecycle",
    "Financial",
    "specifications",
    "Settings",
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="backdrop"
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg w-1/2 transition-transform duration-300 overflow-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-200 hover:text-gray-300 text-2xl font-bold"
        >
          &times;
        </button>
        {/* Modal Header */}
        <div className="mb-3 bg-[#619B7D] py-6 px-[30px] text-white">
          <h2 className="text-lg font-semibold">Add Vehicle</h2>
          <p>Enter the vehicle details below</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-around px-2 text-sm">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex-1 text-left py-2 mx-3 border-t-4 font-semibold  ${
                activeTab === index
                  ? "border-[#619B7D] text-[#619B7D]"
                  : "text-gray-400  border-[#F5F6F7]"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {/* Tab Content */}
        <div className="px-6 py-4">
          {activeTab === 0 && (
            <FirstStep
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {activeTab === 1 && (
            <MaintenanceSchedule
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {activeTab === 2 && (
            <Lifecycle
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {activeTab === 3 && <p>Financial Content Goes Here</p>}
          {activeTab === 4 && <p>Specifications Content Goes Here</p>}
        </div>

        {/* Buttons */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 flex justify-end gap-2 shadow-md">
          {/* {activeTab > 0 && ( */}
          <button
            className="border w-full border-gray-300 text-gray-500 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100"
            onClick={() => handleTabClick(activeTab - 1)}
          >
            Previous
          </button>
          {/* )} */}
          {activeTab < tabs.length - 1 ? (
            <button
              className="bg-[#619B7D] w-full text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#4a8062]"
              onClick={() => handleTabClick(activeTab + 1)}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-[#619B7D] w-full text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#4a8062]"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleModal;
