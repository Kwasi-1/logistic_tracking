import { Icon } from "@iconify/react/dist/iconify.js";
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

function VehicleModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    vin: "",
    vehicleName: "",
    type: "Car",
    status: "Active",
    ownership: "Owned",
    labels: "",
  });

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
        className={`fixed top-0 right-0 h-full bg-white shadow-lg w-1/2 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Modal Header */}
        <div className="mb-6 bg-[#619B7D] py-6 px-[30px] text-white">
          <h2 className="text-lg font-semibold">Add Vehicle</h2>
          <p>Enter the vehicle details below</p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-6 pb24">
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

        {/* Buttons at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 flex justify-end gap-2 shadow-md">
          <button
            className="border w-full border-gray-300 text-gray-500 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
            onClick={onClose}
          >
            Previous
          </button>
          <button
            className="bg-[#619B7D] w-full text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#4a8062] transition-all duration-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehicleModal;
