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
    <div className="mb-4 border border-gray-300 px-3 rounded-lg py-1 focus:border-[#619B7D]">
      <label className="block text-[11px] font-semibold text-gray-500">
        {label.toUpperCase()}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full focus:outline-none text-sm text-gray-600"
      />
    </div>
  );
}

// Reusable Select Component with Dropdown
function SelectField({ label, name, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  return (
    <div className="mb-4 border border-gray-300 px-3 rounded-lg py-1 relative">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleDropdown}
      >
        <div>
          <label className="block text-[11px] font-semibold text-gray-500">
            {label.toUpperCase()}
          </label>
          <div className="text-sm text-gray-600">{value}</div>
        </div>
        {isOpen ? (
          <Icon icon="uiw:up" className="text-gray-400 text-xs" />
        ) : (
          <Icon icon="uiw:down" className="text-gray-400 text-xs" />
        )}
        {/* <Icon icon="uiw:down" className="text-gray-400 text-lg" /> */}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute w-full bg-white border border-gray-200 rounded-lg mt-1 -ml-3 shadow-lg z-10 max-h-40 overflow-y-auto">
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
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white py-6 px-[30px] rounded-xl shadow-lg w-[500px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-6 text-gray-800">
          Add Vehicle
        </h2>

        {/* VIN Input */}
        <div className="mb-4 flex gap-2">
          <div className="border border-gray-300 px-3 rounded-lg py-1 w-full">
            <label className="block text-[11px] font-semibold text-gray-500">
              VIN/SN
            </label>
            <input
              type="text"
              name="vin"
              placeholder="VIN/SN"
              className="w-full focus:outline-none text-sm text-gray-600"
              value={formData.vin}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Other Form Fields */}
        <InputField
          label="Vehicle Name"
          name="vehicleName"
          placeholder="eg. Mercedes Truck"
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

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-9">
          <button
            className="bg-[#619B7D] w-full text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#4a8062] transition-all duration-300"
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
