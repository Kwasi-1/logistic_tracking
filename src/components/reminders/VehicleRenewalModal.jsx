import React, { useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";

function VehicleRenewalModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    vehicle: "",
    renewalType: "",
    dueDate: "",
    dueSoonThreshold: "3",
    dueSoonUnit: "weeks",
    enableNotifications: true,
    watchers: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    onClose(); // Close modal after submission
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="New Vehicle Renewal Reminder"
      description="Set up a renewal reminder for your vehicle."
    >
      <form>
        <div className="grid grid-cols-2 gap-4">
          {/* Vehicle Select Field */}
          <SelectField
            label="Vehicle *"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            options={["Select Vehicle", "2016 Ford F-150", "2018 Toyota Prius"]}
          />

          {/* Renewal Type Select Field */}
          <SelectField
            label="Vehicle Renewal Type *"
            name="renewalType"
            value={formData.renewalType}
            onChange={handleChange}
            options={[
              "Select Type",
              "Emission Test",
              "Registration",
              "Inspection",
              "Insurance",
            ]}
          />

          {/* Due Date Input Field */}
          <InputField
            label="Due Date *"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
          />

          {/* Due Soon Threshold & Unit */}
          <div className="flex items-center space-x-4">
            <InputField
              label="Due Soon Threshold"
              name="dueSoonThreshold"
              type="number"
              min="1"
              value={formData.dueSoonThreshold}
              onChange={handleChange}
            />
            <SelectField
              label="Unit"
              name="dueSoonUnit"
              value={formData.dueSoonUnit}
              onChange={handleChange}
              options={["Days", "Weeks"]}
            />
          </div>

          {/* Enable Notifications Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enableNotifications"
              name="enableNotifications"
              checked={formData.enableNotifications}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label htmlFor="enableNotifications" className="text-gray-700">
              Enable Notifications
            </label>
          </div>

          {/* Watchers Select Field */}
          <SelectField
            label="Watchers"
            name="watchers"
            value={formData.watchers}
            onChange={handleChange}
            options={["Select Watcher", "John Doe", "Jane Smith"]}
          />

          {/* Comment Input Field */}
          <InputField
            label="Comment"
            name="comment"
            type="text"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#619B7D] text-white rounded-md"
          >
            Save Vehicle Renewal Reminder
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}

export default VehicleRenewalModal;
