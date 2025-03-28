import React, { useState } from "react";
import ModalLayout from "../../../layouts/ModalLayout";
import { FaCalendarAlt, FaDollarSign } from "react-icons/fa";

const DriverModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    dateOfBirth: "",
    employeeNumber: "",
    startDate: "",
    leaveDate: "",
    licenseNumber: "",
    licenseClass: "",
    licenseState: "",
    hourlyRate: "",
    phoneNumber: "",
    email: "",
    address: "",
    experience: "",
    vehicleType: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Driver Details"
      description="Fill in the driver's information"
      tabs={["Personal Details", "Contact Information", "Basic Details"]}
    >
      {/* -------- Personal Details Tab -------- */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Personal Details</h3>
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <FaCalendarAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full p-2 pl-10 border rounded-md"
            />
          </div>
          <input
            type="text"
            name="employeeNumber"
            placeholder="Employee Number"
            value={formData.employeeNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <FaCalendarAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full p-2 pl-10 border rounded-md"
            />
          </div>
          <div className="relative">
            <FaCalendarAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              name="leaveDate"
              value={formData.leaveDate}
              onChange={handleInputChange}
              className="w-full p-2 pl-10 border rounded-md"
            />
          </div>
        </div>

        <input
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          value={formData.licenseNumber}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="licenseClass"
            placeholder="License Class"
            value={formData.licenseClass}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="licenseState"
            placeholder="License State/Province/Region"
            value={formData.licenseState}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="relative">
          <FaDollarSign className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            name="hourlyRate"
            placeholder="Hourly Labor Rate"
            value={formData.hourlyRate}
            onChange={handleInputChange}
            className="w-full p-2 pl-10 border rounded-md"
          />
        </div>
      </div>

      {/* -------- Contact Information Tab -------- */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Contact Information</h3>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="address"
          placeholder="Residential Address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* -------- Basic Details Tab -------- */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Basic Details</h3>
        <input
          type="text"
          name="experience"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="vehicleType"
          placeholder="Preferred Vehicle Type"
          value={formData.vehicleType}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </ModalLayout>
  );
};

export default DriverModal;
