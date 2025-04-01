import React, { useState } from "react";
import ModalLayout from "../../../layouts/ModalLayout";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";

const FuelEntryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    vehicle: "",
    fuelEntryDate: "2025-04-01",
    fuelEntryTime: "14:52",
    vendorName: "",
    reference: "",
    flags: {
      personal: false,
      partialFuelUp: false,
      resetUsage: false,
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      flags: { ...formData.flags, [e.target.name]: e.target.checked },
    });
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="New Fuel Entry"
      description="Fill in the details below to log a new fuel entry."
    >
      {/* Fuel Entry Details */}
      <div>
        <SelectField
          label="Vehicle *"
          name="vehicle"
          options={["Please select", "Vehicle 1", "Vehicle 2"]}
          value={formData.vehicle}
          onChange={handleChange}
        />

        <InputField
          label="Fuel Entry Date *"
          name="fuelEntryDate"
          type="date"
          value={formData.fuelEntryDate}
          onChange={handleChange}
        />

        <InputField
          label="Fuel Entry Time"
          name="fuelEntryTime"
          type="time"
          value={formData.fuelEntryTime}
          onChange={handleChange}
        />

        <SelectField
          label="Vendor Name"
          name="vendorName"
          options={["Please select", "Vendor 1", "Vendor 2"]}
          value={formData.vendorName}
          onChange={handleChange}
        />

        <InputField
          label="Reference"
          name="reference"
          value={formData.reference}
          onChange={handleChange}
          placeholder="e.g. invoice number, transaction ID, etc."
        />

        {/* Flags */}
        <div className="mt-4">
          <label className="text-sm font-semibold text-gray-700">Flags</label>
          <p className="text-xs text-gray-500">
            Enable the options below to flag transactions for personal use,
            ensure accurate metrics for partial fill-ups, or reset usage after a
            missed entry.
          </p>

          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="personal"
                checked={formData.flags.personal}
                onChange={handleCheckboxChange}
              />
              <span>Personal</span>
            </label>

            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="partialFuelUp"
                checked={formData.flags.partialFuelUp}
                onChange={handleCheckboxChange}
              />
              <span>Partial fuel-up</span>
            </label>

            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="resetUsage"
                checked={formData.flags.resetUsage}
                onChange={handleCheckboxChange}
                disabled
              />
              <span>Reset usage</span>
            </label>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default FuelEntryModal;
