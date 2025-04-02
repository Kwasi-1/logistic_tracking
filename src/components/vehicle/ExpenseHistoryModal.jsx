import React, { useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import Textarea from "../common/Textarea";

const ExpenseEntryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    vehicle: "",
    expenseType: "",
    amount: "",
    vendorName: "",
    date: "2025-04-01",
    notes: "",
    flags: {
      frequency: "single", // Default selected radio button
    },
  });

  // Handle input/select changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle radio button changes
  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      flags: { ...formData.flags, frequency: e.target.value },
    });
  };

  // Submit handler
  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    onClose(); // Close modal after submission
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="New Fuel Entry"
      description="Fill in the details below to log a new fuel entry."
    >
      {/* Fuel Entry Details */}
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Vehicle *"
          name="vehicle"
          options={["Please select", "Vehicle 1", "Vehicle 2"]}
          value={formData.vehicle}
          onChange={handleChange}
        />

        <SelectField
          label="Expense Type"
          name="expenseType"
          options={["Please select", "Expense 1", "Expense 2"]}
          value={formData.expenseType}
          onChange={handleChange}
        />

        <InputField
          label="Amount"
          name="amount"
          type="number"
          placeholder="$100.00"
          value={formData.amount}
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
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />

        {/* Frequency Selection */}
        <div className="mt-4 col-span-2">
          <label className="text-sm font-semibold text-gray-700">
            Frequency
          </label>
          <div className="mt-2 flex gap-20">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="radio"
                name="frequency"
                value="single"
                checked={formData.flags.frequency === "single"}
                onChange={handleRadioChange}
              />
              <span>Single Expense</span>
            </label>

            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="radio"
                name="frequency"
                value="recurring"
                checked={formData.flags.frequency === "recurring"}
                onChange={handleRadioChange}
              />
              <span>Recurring Expense</span>
            </label>
          </div>
        </div>

        {/* Notes */}
        <div className="col-span-2 my-4">
          <Textarea
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add your comments"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-[#619B7D] text-white rounded-md"
        >
          Save Expense Entry
        </button>
      </div>
    </ModalLayout>
  );
};

export default ExpenseEntryModal;
