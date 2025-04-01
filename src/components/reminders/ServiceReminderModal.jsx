import React, { useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";

const ServiceReminderModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    vehicle: "",
    serviceTask: "",
    timeInterval: "",
    timeIntervalUnit: "months",
    timeDueThreshold: "2",
    timeDueThresholdUnit: "weeks",
    primaryMeterInterval: "",
    primaryMeterDueThreshold: "",
    enableNotifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    console.log("Service Reminder Submitted:", formData);
    onClose();
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="New Service Reminder"
      description="Set up a recurring service reminder for your vehicle."
    >
      <form className="space-y-4">
        {/* Vehicle Selection */}
        <SelectField
          label="Vehicle *"
          name="vehicle"
          value={formData.vehicle}
          onChange={handleChange}
          options={["Select Vehicle", "2016 Ford F-150", "2018 Toyota Prius"]}
        />

        {/* Service Task Selection */}
        <SelectField
          label="Service Task *"
          name="serviceTask"
          value={formData.serviceTask}
          onChange={handleChange}
          options={[
            "Select Service Task",
            "Oil Change",
            "Tire Rotation",
            "Brake Inspection",
          ]}
        />

        {/* Time Interval */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Time Interval"
            name="timeInterval"
            type="number"
            min="1"
            value={formData.timeInterval}
            onChange={handleChange}
          />
          <SelectField
            label="Unit"
            name="timeIntervalUnit"
            value={formData.timeIntervalUnit}
            onChange={handleChange}
            options={["Days", "Months"]}
          />
        </div>

        {/* Time Due Soon Threshold */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Time Due Soon Threshold"
            name="timeDueThreshold"
            type="number"
            min="1"
            value={formData.timeDueThreshold}
            onChange={handleChange}
          />
          <SelectField
            label="Threshold Unit"
            name="timeDueThresholdUnit"
            value={formData.timeDueThresholdUnit}
            onChange={handleChange}
            options={["Days", "Weeks"]}
          />
        </div>

        {/* Primary Meter Interval */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Primary Meter Interval"
            name="primaryMeterInterval"
            type="number"
            min="0"
            value={formData.primaryMeterInterval}
            onChange={handleChange}
            placeholder="Enter miles"
          />
          <InputField
            label="Primary Meter Due Soon Threshold"
            name="primaryMeterDueThreshold"
            type="number"
            min="0"
            value={formData.primaryMeterDueThreshold}
            onChange={handleChange}
            placeholder="Enter miles"
          />
        </div>

        {/* Enable Notifications */}
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

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#619B7D] text-white rounded-md"
          >
            Save Service Reminder
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default ServiceReminderModal;
